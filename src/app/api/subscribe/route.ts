import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email =
    body &&
    typeof body === "object" &&
    "email" in body &&
    typeof body.email === "string"
      ? body.email.trim().toLowerCase().slice(0, 160)
      : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required" },
      { status: 400 },
    );
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: {
        email,
        source: "homepage",
        userAgent: request.headers.get("user-agent")?.slice(0, 400) ?? null,
        ipAddress: clientIp(request) ?? null,
      },
      update: {
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "You are subscribed.",
    });
  } catch (error) {
    console.error("newsletter subscribe failed", error);
    return NextResponse.json(
      { error: "Could not subscribe. Try again." },
      { status: 500 },
    );
  }
}
