import { NextResponse } from "next/server";

import { knowledgeBasePage } from "@/config/knowledge-base";
import { completeWithGroq } from "@/lib/knowledge-base/groq";
import {
  formatKnowledgeContext,
  retrieveKnowledge,
} from "@/lib/knowledge-base/retrieve";

export const runtime = "nodejs";

const MAX_MESSAGE = 1200;
const MAX_HISTORY = 8;
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  const candidates = [
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];
  for (const value of candidates) {
    if (value) return value.slice(0, 80);
  }
  return "unknown";
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const current = rateBuckets.get(ip);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_LIMIT) return false;
  current.count += 1;
  return true;
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

type HistoryItem = { role: "user" | "assistant"; content: string };

function parseHistory(value: unknown): HistoryItem[] {
  if (!Array.isArray(value)) return [];
  const items: HistoryItem[] = [];
  for (const entry of value.slice(-MAX_HISTORY)) {
    if (!entry || typeof entry !== "object") continue;
    const row = entry as Record<string, unknown>;
    const role = row.role === "assistant" ? "assistant" : row.role === "user" ? "user" : null;
    const content = clean(row.content, MAX_MESSAGE);
    if (!role || !content) continue;
    items.push({ role, content });
  }
  return items;
}

function buildFallbackAnswer(context: string, question: string): string {
  const lower = question.toLowerCase();
  const asksPrice =
    /cost|price|pricing|quote|install|fee|how much/.test(lower);
  if (asksPrice) {
    return "CurNext is priced by how many nodes you need and how long you need them (for example 5 months). Open Pricing to pick your market, set nodes and duration, see install bands and subscription, then request a quote. If that is not enough, email sales@curnext.app and a sales rep will help.";
  }
  const lines = context
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("[") && !line.includes(" - /"));
  const summary = lines.slice(0, 4).join(" ");
  if (!summary) {
    return "I can help with CurNext products, platform, API, SDKs, firmware, hosting, and pricing. For anything else, email sales@curnext.app or use Contact.";
  }
  return `${summary}\n\nIf you want a human from CurNext on this, email sales@curnext.app or use Contact.`;
}

export async function POST(request: Request) {
  if (!allowRequest(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const message = clean(input.message, MAX_MESSAGE);
  const consent = input.consent === true;
  const consentVersion = clean(input.consentVersion, 40);
  const history = parseHistory(input.history);

  if (!consent || consentVersion !== knowledgeBasePage.consentVersion) {
    return NextResponse.json(
      {
        error:
          "GDPR consent is required before the Knowledge Base can process your question.",
      },
      { status: 403 },
    );
  }

  if (message.length < 3) {
    return NextResponse.json(
      { error: "Enter a slightly longer question." },
      { status: 400 },
    );
  }

  const chunks = retrieveKnowledge(message, 4);
  const context = formatKnowledgeContext(chunks);
  const sources = chunks.map((chunk) => ({
    title: chunk.title,
    href: chunk.href,
    source: chunk.source,
  }));

  const system = [
    "You are CurNext Assistant - a helpful CurNext Oy colleague on curnext.app.",
    "Sound natural and human: warm, clear, conversational B2B English. Short paragraphs.",
    "Never say you are Grok, Groq, Llama, ChatGPT, Gemini, OpenAI, Google, or any third-party model.",
    "For cost, install, quote, or how-much questions: explain that CurNext prices by node count and duration, tell them to open /pricing to estimate install + subscription for their market and duration (for example 5 months), request a quote there, and if that is not enough email sales@curnext.app. Always write site links as plain paths like /pricing or mailto:sales@curnext.app so they stay clickable.",
    "For mold, mould, moisture, or humidity in a building: mention the relevant CurNext options (wall drying CN-WD, indoor air CN-IAQ, leak detection CN-LEAK as fits), then still steer sizing and cost to /pricing and sales@curnext.app when they ask about install cost.",
    "You only help with CurNext topics. If the question is outside CurNext, politely redirect to /contact or sales@curnext.app.",
    "Do not invent a exact total price for a building when nodes and market are unknown. Do not invent certifications, SLAs, or credentials.",
    "Prefer \"we\" for CurNext when it feels natural. Use ASCII hyphen - only.",
    "",
    "Internal reference notes:",
    context,
  ].join("\n");

  const apiKey = process.env.GROQ_API_KEY?.trim();

  try {
    let answer: string;
    if (!apiKey) {
      answer = buildFallbackAnswer(context, message);
    } else {
      answer = await completeWithGroq({
        apiKey,
        messages: [
          { role: "system", content: system },
          ...history.map((item) => ({
            role: item.role,
            content: item.content,
          })),
          { role: "user", content: message },
        ],
      });
    }

    return NextResponse.json({
      answer,
      sources,
      consentVersion: knowledgeBasePage.consentVersion,
    });
  } catch (error) {
    console.error("[knowledge-base]", error);
    return NextResponse.json(
      {
        error:
          "I could not finish that just now. Try again in a moment, or reach us through Contact.",
      },
      { status: 502 },
    );
  }
}
