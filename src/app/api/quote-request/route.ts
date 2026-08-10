import { NextResponse, after } from "next/server";

import {
  defaultPricingCurrency,
  type PricingCurrencyCode,
} from "@/config/currencies";
import { solutions } from "@/config/site";
import { buildQuoteConfirmationEmail } from "@/lib/quote-confirmation-email";
import {
  clampQuoteDuration,
  clampQuoteNodes,
  feeForNodes,
  labelForDuration,
  labelForNodes,
  marketLabelForCurrency,
  priceForScope,
  type QuoteRequestPayload,
} from "@/lib/quote-request";
import {
  buildQuoteSalesEmail,
  getSalesInbox,
} from "@/lib/quote-sales-email";
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { verifyTurnstileToken } from "@/lib/turnstile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = {
  name: 80,
  email: 160,
  company: 160,
  phone: 40,
  country: 80,
  message: 2000,
} as const;

const allowedSolutionHrefs = new Set<string>(solutions.map((s) => s.href));
const allowedCurrencies = new Set<PricingCurrencyCode>(["EUR", "CAD", "XAF"]);

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function parseCurrency(value: unknown): PricingCurrencyCode {
  if (
    typeof value === "string" &&
    allowedCurrencies.has(value as PricingCurrencyCode)
  ) {
    return value as PricingCurrencyCode;
  }
  return defaultPricingCurrency;
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
  data?: QuoteRequestPayload;
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
  const phone = clean(input.phone, MAX_LEN.phone) || undefined;
  const country = clean(input.country, MAX_LEN.country) || undefined;
  const message = clean(input.message, MAX_LEN.message) || undefined;
  const turnstileToken = clean(input.turnstileToken, 2048);
  const currency = parseCurrency(input.currency);

  const nodesRaw = parseNumber(input.nodes);
  const monthsRaw = parseNumber(input.durationMonths);

  const solutionsRaw = Array.isArray(input.solutions) ? input.solutions : [];
  const selectedSolutions = solutionsRaw
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => allowedSolutionHrefs.has(item));

  if (!firstName || !lastName) {
    return { error: "First and last name are required" };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { error: "A valid email address is required" };
  }
  if (nodesRaw === null) {
    return { error: "Select a node count" };
  }
  if (monthsRaw === null) {
    return { error: "Select a contract duration" };
  }
  if (!turnstileToken) {
    return { error: "Turnstile verification is required" };
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      company: company || undefined,
      phone,
      country,
      nodes: clampQuoteNodes(nodesRaw),
      durationMonths: clampQuoteDuration(monthsRaw),
      currency,
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

    const market = marketLabelForCurrency(parsed.data.currency);

    await prisma.quoteRequest.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        company: parsed.data.company ?? "",
        phone: parsed.data.phone,
        country: parsed.data.country,
        siteSize: String(parsed.data.nodes),
        subscriptionTier: `${parsed.data.durationMonths}|${parsed.data.currency}`,
        solutions: parsed.data.solutions,
        message: parsed.data.message
          ? `[Market: ${market} / ${parsed.data.currency}]\n\n${parsed.data.message}`
          : `[Market: ${market} / ${parsed.data.currency}]`,
        source: "pricing",
        turnstileHostname: turnstile.hostname,
        userAgent: request.headers.get("user-agent")?.slice(0, 400),
        ipAddress,
        readAt: null,
      },
    });

    const nodesLabel = labelForNodes(
      parsed.data.nodes,
      parsed.data.currency,
    );
    const durationLabel = labelForDuration(parsed.data.durationMonths);
    const setupFee = feeForNodes(parsed.data.nodes, parsed.data.currency);
    const subscriptionPrice = priceForScope(
      parsed.data.nodes,
      parsed.data.durationMonths,
      parsed.data.currency,
    );

    const confirmation = buildQuoteConfirmationEmail({
      firstName: parsed.data.firstName,
      email: parsed.data.email,
      company: parsed.data.company,
      nodesLabel: `${nodesLabel} · ${market}`,
      durationLabel,
      subscriptionPrice,
      setupFee,
    });

    const salesMail = buildQuoteSalesEmail({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      company: parsed.data.company,
      phone: parsed.data.phone,
      country: parsed.data.country,
      nodesLabel: `${nodesLabel} · ${market} (${parsed.data.currency})`,
      setupFee,
      durationLabel,
      subscriptionPrice,
      solutions: parsed.data.solutions,
      message: parsed.data.message,
    });

    const recipientEmail = parsed.data.email;
    const salesInbox = getSalesInbox();

    after(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2_000));

      const customerResult = await sendMail({
        to: recipientEmail,
        subject: confirmation.subject,
        text: confirmation.text,
        html: confirmation.html,
      });
      if (!customerResult.sent) {
        console.error("quote confirmation email failed", customerResult.error);
      }

      const salesResult = await sendMail({
        to: salesInbox,
        subject: salesMail.subject,
        text: salesMail.text,
        html: salesMail.html,
      });
      if (!salesResult.sent) {
        console.error("quote sales email failed", salesResult.error);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("quote request error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to process quote request" },
      { status: 500 },
    );
  }
}
