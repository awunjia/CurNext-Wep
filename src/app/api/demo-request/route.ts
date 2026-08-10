import { NextResponse, after } from "next/server";

import { solutions } from "@/config/site";
import { buildDemoConfirmationEmail } from "@/lib/demo-confirmation-email";
import { companySizes, type DemoRequestPayload } from "@/lib/demo-request";
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { verifyTurnstileToken } from "@/lib/turnstile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = {
  name: 80,
  email: 160,
  company: 160,
  jobTitle: 120,
  phone: 40,
  country: 80,
  message: 2000,
} as const;

const allowedSolutionHrefs = new Set<string>(solutions.map((s) => s.href));
const allowedCompanySizes = new Set<string>(companySizes.map((s) => s.value));

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
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

function parsePayload(body: unknown): {
  data?: DemoRequestPayload;
  error?: string;
} {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const input = body as Record<string, unknown>;
  const firstName = clean(input.firstName, MAX_LEN.name);
  const lastName = clean(input.lastName, MAX_LEN.name);
  const email = clean(input.email, MAX_LEN.email).toLowerCase();
  const company = clean(input.company, MAX_LEN.company);
  const jobTitle = clean(input.jobTitle, MAX_LEN.jobTitle) || undefined;
  const phone = clean(input.phone, MAX_LEN.phone) || undefined;
  const country = clean(input.country, MAX_LEN.country) || undefined;
  const companySize = clean(input.companySize, 32) || undefined;
  const message = clean(input.message, MAX_LEN.message) || undefined;
  const turnstileToken = clean(input.turnstileToken, 2048);

  const solutionsRaw = Array.isArray(input.solutions) ? input.solutions : [];
  const selectedSolutions = solutionsRaw
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => allowedSolutionHrefs.has(item));

  if (!firstName || !lastName) {
    return { error: "First and last name are required" };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { error: "A valid work email is required" };
  }
  if (!company) {
    return { error: "Company is required" };
  }
  if (!turnstileToken) {
    return { error: "Turnstile verification is required" };
  }
  if (companySize && !allowedCompanySizes.has(companySize)) {
    return { error: "Invalid company size" };
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      company,
      jobTitle,
      phone,
      country,
      companySize,
      solutions: selectedSolutions,
      message,
      turnstileToken,
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parsePayload(body);

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
          error: "Turnstile verification failed",
          codes: turnstile["error-codes"],
        },
        { status: 403 },
      );
    }

    await prisma.demoRequest.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        company: parsed.data.company,
        jobTitle: parsed.data.jobTitle,
        phone: parsed.data.phone,
        country: parsed.data.country,
        companySize: parsed.data.companySize,
        solutions: parsed.data.solutions,
        message: parsed.data.message,
        source: "request-demo",
        turnstileHostname: turnstile.hostname,
        userAgent: request.headers.get("user-agent")?.slice(0, 400),
        ipAddress,
        readAt: null,
      },
    });

    const emailContent = buildDemoConfirmationEmail({
      firstName: parsed.data.firstName,
      email: parsed.data.email,
      company: parsed.data.company,
    });
    const recipientEmail = parsed.data.email;

    after(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5_000));
      const mailResult = await sendMail({
        to: recipientEmail,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      });

      if (!mailResult.sent) {
        console.error("demo confirmation email failed", mailResult.error);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("demo request error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to process demo request" },
      { status: 500 },
    );
  }
}
