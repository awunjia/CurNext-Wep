import { NextResponse } from "next/server";

import { verifyTurnstileToken } from "@/lib/turnstile";

/**
 * Example endpoint for verifying Cloudflare Turnstile tokens.
 * Wire form submissions (contact, quote request) to this pattern.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string };
    const token = body.token?.trim();

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Missing Turnstile token" },
        { status: 400 },
      );
    }

    const forwardedFor = request.headers.get("cf-connecting-ip")
      ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

    const result = await verifyTurnstileToken(token, forwardedFor);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "Turnstile verification failed", codes: result["error-codes"] },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to verify Turnstile token" },
      { status: 500 },
    );
  }
}
