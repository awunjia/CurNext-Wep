import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import { buildJobApplicationConfirmationEmail } from "@/lib/job-application-confirmation-email";
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { assertResumeFile } from "@/lib/resume";
import { uploadResumeToR2 } from "@/lib/r2";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = {
  name: 80,
  email: 160,
  phone: 40,
  coverLetter: 5000,
  jobOpeningId: 64,
} as const;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function clientIp(request: Request): string | undefined {
  const candidates = [
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];

  for (const value of candidates) {
    if (value) return value.slice(0, 80);
  }

  return undefined;
}

function hashIp(ip: string | undefined): string | undefined {
  if (!ip) return undefined;
  return createHash("sha256").update(ip).digest("hex");
}

type ParsedApplication = {
  jobOpeningId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  turnstileToken: string;
  resume: File;
};

function parseFormData(form: FormData): {
  data?: ParsedApplication;
  error?: string;
} {
  const jobOpeningId = clean(form.get("jobOpeningId"), MAX_LEN.jobOpeningId);
  const firstName = clean(form.get("firstName"), MAX_LEN.name);
  const lastName = clean(form.get("lastName"), MAX_LEN.name);
  const email = normalizeEmail(clean(form.get("email"), MAX_LEN.email));
  const phone = clean(form.get("phone"), MAX_LEN.phone) || undefined;
  const coverLetter =
    clean(form.get("coverLetter"), MAX_LEN.coverLetter) || undefined;
  const turnstileToken = clean(form.get("turnstileToken"), 2048);
  const privacyConsent = form.get("privacyConsent") === "true";
  const resume = form.get("resume");

  if (!jobOpeningId) {
    return { error: "Job opening is required" };
  }
  if (!firstName || !lastName) {
    return { error: "First and last name are required" };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { error: "A valid email address is required" };
  }
  if (!(resume instanceof File)) {
    return { error: "A resume file is required." };
  }
  const resumeError = assertResumeFile(resume);
  if (resumeError) {
    return { error: resumeError };
  }
  if (!privacyConsent) {
    return {
      error:
        "Consent to process your application data is required to submit.",
    };
  }
  if (!turnstileToken) {
    return { error: "Turnstile verification is required" };
  }

  return {
    data: {
      jobOpeningId,
      firstName,
      lastName,
      email,
      phone,
      coverLetter,
      turnstileToken,
      resume,
    },
  };
}

async function findExistingApplication(jobOpeningId: string, email: string) {
  return prisma.jobCandidate.findFirst({
    where: {
      jobOpeningId,
      email,
      deletedAt: null,
    },
    select: { id: true },
  });
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const parsed = parseFormData(form);

    if (!parsed.data) {
      return NextResponse.json(
        { ok: false, error: parsed.error ?? "Invalid request" },
        { status: 400 },
      );
    }

    const ipAddress = clientIp(request);
    const turnstile = await verifyTurnstileToken(
      parsed.data.turnstileToken,
      ipAddress,
    );

    if (!turnstile.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Security verification failed. Please try again.",
        },
        { status: 400 },
      );
    }

    const opening = await prisma.jobOpening.findFirst({
      where: {
        id: parsed.data.jobOpeningId,
        status: "OPEN",
        deletedAt: null,
        publishedAt: { not: null },
      },
      select: { id: true, title: true, location: true, publicSlug: true },
    });

    if (!opening) {
      return NextResponse.json(
        { ok: false, error: "This role is no longer open for applications." },
        { status: 404 },
      );
    }

    if (await findExistingApplication(opening.id, parsed.data.email)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "An application for this role with this email already exists. Please use a different email or wait for our team to contact you.",
        },
        { status: 409 },
      );
    }

    const uploaded = await uploadResumeToR2({
      file: parsed.data.resume,
      jobOpeningId: opening.id,
    });

    // Re-check after upload to reduce duplicate race before create.
    if (await findExistingApplication(opening.id, parsed.data.email)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "An application for this role with this email already exists. Please use a different email or wait for our team to contact you.",
        },
        { status: 409 },
      );
    }

    await prisma.jobCandidate.create({
      data: {
        jobOpeningId: opening.id,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        coverLetter: parsed.data.coverLetter,
        resumeStorageKey: uploaded.storageKey,
        resumeFileName: uploaded.fileName,
        resumeContentType: uploaded.contentType,
        stage: "APPLIED",
        source: "curnext.app/careers",
        applicationIpHash: hashIp(ipAddress),
      },
    });

    const emailContent = buildJobApplicationConfirmationEmail({
      firstName: parsed.data.firstName,
      email: parsed.data.email,
      roleTitle: opening.title,
      location: opening.location,
    });

    const mailResult = await sendMail({
      to: parsed.data.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    if (!mailResult.sent) {
      console.error(
        "[job-application] confirmation email failed",
        mailResult.error,
      );
    } else {
      console.info(
        "[job-application] confirmation email sent to",
        parsed.data.email,
      );
    }

    return NextResponse.json({
      ok: true,
      message: mailResult.sent
        ? "Application received. Check your inbox for a confirmation email."
        : "Application received. We will be in touch if there is a fit.",
      emailSent: mailResult.sent,
    });
  } catch (error) {
    console.error("[job-application]", error);

    const message = error instanceof Error ? error.message : "";
    if (
      message.includes("Unique constraint") ||
      message.includes("unique constraint")
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "An application for this role with this email already exists.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { ok: false, error: "Unable to submit application. Please try again." },
      { status: 500 },
    );
  }
}
