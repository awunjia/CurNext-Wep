import { NextResponse, after } from "next/server";

import {
  contactSubjects,
  type ContactSubjectId,
} from "@/config/contact";
import { buildContactConfirmationEmail } from "@/lib/contact-confirmation-email";
import {
  buildContactNotifyEmail,
  getContactInbox,
} from "@/lib/contact-notify-email";
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { verifyTurnstileToken } from "@/lib/turnstile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = {
  name: 80,
  email: 160,
  company: 160,
  phone: 40,
  message: 4000,
  subject: 40,
} as const;

const allowedSubjects = new Set<string>(
  contactSubjects.map((item) => item.id),
);

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

function subjectLabel(id: ContactSubjectId): string {
  return contactSubjects.find((item) => item.id === id)?.label ?? id;
}

function parsePayload(body: unknown): {
  data?: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    phone?: string;
    subjectId: ContactSubjectId;
    message: string;
    turnstileToken: string;
  };
  error?: string;
} {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const input = body as Record<string, unknown>;
  const firstName = clean(input.firstName, MAX_LEN.name);
  const lastName = clean(input.lastName, MAX_LEN.name);
  const email = clean(input.email, MAX_LEN.email).toLowerCase();
  const company = clean(input.company, MAX_LEN.company) || undefined;
  const phone = clean(input.phone, MAX_LEN.phone) || undefined;
  const subjectId = clean(input.subject, MAX_LEN.subject);
  const message = clean(input.message, MAX_LEN.message);
  const turnstileToken = clean(input.turnstileToken, 2048);

  if (!firstName || !lastName) {
    return { error: "First and last name are required" };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { error: "A valid email address is required" };
  }
  if (!allowedSubjects.has(subjectId)) {
    return { error: "Select a topic" };
  }
  if (!message || message.length < 10) {
    return { error: "Please include a short message (at least 10 characters)" };
  }
  if (!turnstileToken) {
    return { error: "Turnstile verification is required" };
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      company,
      phone,
      subjectId: subjectId as ContactSubjectId,
      message,
      turnstileToken,
    },
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = parsePayload(body);
  if (!parsed.data) {
    return NextResponse.json(
      { ok: false, error: parsed.error ?? "Invalid request" },
      { status: 400 },
    );
  }

  try {
    const turnstile = await verifyTurnstileToken(
      parsed.data.turnstileToken,
      clientIp(request),
    );
    if (!turnstile.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Turnstile verification failed",
        },
        { status: 400 },
      );
    }

    const label = subjectLabel(parsed.data.subjectId);

    await prisma.contact.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        company: parsed.data.company,
        phone: parsed.data.phone,
        subject: label,
        message: parsed.data.message,
        source: "contact",
        turnstileHostname: turnstile.hostname ?? undefined,
        userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? undefined,
        ipAddress: clientIp(request),
      },
    });

    const confirmation = buildContactConfirmationEmail({
      firstName: parsed.data.firstName,
      email: parsed.data.email,
      subjectLabel: label,
    });

    const notify = buildContactNotifyEmail({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      company: parsed.data.company,
      phone: parsed.data.phone,
      subjectLabel: label,
      message: parsed.data.message,
    });

    const recipientEmail = parsed.data.email;
    const inbox = getContactInbox(parsed.data.subjectId);

    after(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1_000));

      const customerResult = await sendMail({
        to: recipientEmail,
        subject: confirmation.subject,
        text: confirmation.text,
        html: confirmation.html,
      });
      if (!customerResult.sent) {
        console.error("contact confirmation email failed", customerResult.error);
      }

      const notifyResult = await sendMail({
        to: inbox,
        subject: notify.subject,
        text: notify.text,
        html: notify.html,
      });
      if (!notifyResult.sent) {
        console.error("contact notify email failed", notifyResult.error);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact request error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send your message" },
      { status: 500 },
    );
  }
}
