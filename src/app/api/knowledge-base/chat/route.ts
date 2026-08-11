import { NextResponse } from "next/server";

import { knowledgeBasePage } from "@/config/knowledge-base";
import { locales, type AppLocale } from "@/i18n/routing";
import { completeWithGroq } from "@/lib/knowledge-base/groq";
import { loadKnowledgeBaseLocale } from "@/lib/knowledge-base/locale-messages";
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

function resolveLocale(value: string): AppLocale {
  return (locales as readonly string[]).includes(value)
    ? (value as AppLocale)
    : "en";
}

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
    const role =
      row.role === "assistant"
        ? "assistant"
        : row.role === "user"
          ? "user"
          : null;
    const content = clean(row.content, MAX_MESSAGE);
    if (!role || !content) continue;
    items.push({ role, content });
  }
  return items;
}

function buildFallbackAnswer(
  context: string,
  question: string,
  locale: AppLocale,
): string {
  const lower = question.toLowerCase();
  const asksPrice =
    /cost|price|pricing|quote|install|fee|how much|prix|devis|tarification|hinta|kustannus|pris|kostnad|precio|cotizaci[oó]n/.test(
      lower,
    );

  if (asksPrice) {
    const byLocale: Record<AppLocale, string> = {
      en: "CurNext is priced by how many nodes you need and how long you need them (for example 5 months). Open Pricing to pick your market, set nodes and duration, see install bands and subscription, then request a quote. If that is not enough, email sales@curnext.app and a sales rep will help.",
      fr: "CurNext est tarifé selon le nombre de nœuds dont vous avez besoin et la durée (par exemple 5 mois). Ouvrez Tarification pour choisir votre marché, définir nœuds et durée, voir les bandes d'installation et l'abonnement, puis demander un devis. Si ce n'est pas suffisant, écrivez à sales@curnext.app et un commercial vous aidera.",
      fi: "CurNext hinnoitellaan tarvittavien solmujen määrän ja keston mukaan (esimerkiksi 5 kuukautta). Avaa Hinnoittelu, valitse markkina, aseta solmut ja kesto, näe asennuskaistat ja tilaus, ja pyydä sitten tarjous. Jos se ei riitä, lähetä sähköpostia osoitteeseen sales@curnext.app - myynti auttaa.",
      sv: "CurNext prissätts efter hur många noder du behöver och hur länge (till exempel 5 månader). Öppna Priser för att välja marknad, ange noder och längd, se installationsband och prenumeration, och begär sedan en offert. Om det inte räcker, mejla sales@curnext.app så hjälper en säljare dig.",
      es: "CurNext se tarifica según cuántos nodos necesita y durante cuánto tiempo (por ejemplo 5 meses). Abra Precios para elegir su mercado, definir nodos y duración, ver bandas de instalación y suscripción, y solicite un presupuesto. Si no basta, escriba a sales@curnext.app y un comercial le ayudará.",
    };
    return byLocale[locale];
  }

  const lines = context
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("[") && !line.includes(" - /"));
  const summary = lines.slice(0, 4).join(" ");

  if (!summary) {
    const empty: Record<AppLocale, string> = {
      en: "I can help with CurNext products, platform, API, SDKs, firmware, hosting, and pricing. For anything else, email sales@curnext.app or use Contact.",
      fr: "Je peux aider sur les produits CurNext, la plateforme, l'API, les SDK, le firmware, l'hébergement et la tarification. Pour le reste, écrivez à sales@curnext.app ou utilisez Contact.",
      fi: "Voin auttaa CurNext-tuotteissa, alustassa, API:ssa, SDK:issa, firmwaressa, hostingissa ja hinnoittelussa. Muissa asioissa lähetä sähköpostia osoitteeseen sales@curnext.app tai käytä Contact-sivua.",
      sv: "Jag kan hjälpa med CurNext-produkter, plattform, API, SDK:er, firmware, hosting och prissättning. För allt annat, mejla sales@curnext.app eller använd Contact.",
      es: "Puedo ayudar con productos CurNext, plataforma, API, SDK, firmware, hosting y precios. Para cualquier otra cosa, escriba a sales@curnext.app o use Contacto.",
    };
    return empty[locale];
  }

  const closer: Record<AppLocale, string> = {
    en: "If you want a human from CurNext on this, email sales@curnext.app or use Contact.",
    fr: "Si vous souhaitez un humain CurNext sur ce sujet, écrivez à sales@curnext.app ou utilisez Contact.",
    fi: "Jos haluat CurNext-ihmisen mukaan, lähetä sähköpostia osoitteeseen sales@curnext.app tai käytä Contact-sivua.",
    sv: "Om du vill ha en människa från CurNext på detta, mejla sales@curnext.app eller använd Contact.",
    es: "Si quiere una persona de CurNext en esto, escriba a sales@curnext.app o use Contacto.",
  };

  return `${summary}\n\n${closer[locale]}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const input = body as Record<string, unknown>;
  const locale = resolveLocale(clean(input.locale, 8));
  const kb = await loadKnowledgeBaseLocale(locale);
  const errors = kb.apiErrors;

  if (!allowRequest(clientIp(request))) {
    return NextResponse.json({ error: errors.rateLimit }, { status: 429 });
  }

  const message = clean(input.message, MAX_MESSAGE);
  const consent = input.consent === true;
  const consentVersion = clean(input.consentVersion, 40);
  const history = parseHistory(input.history);

  if (!consent || consentVersion !== knowledgeBasePage.consentVersion) {
    return NextResponse.json(
      { error: errors.consentRequired },
      { status: 403 },
    );
  }

  if (message.length < 3) {
    return NextResponse.json(
      { error: errors.shortQuestion },
      { status: 400 },
    );
  }

  const corpus = Array.isArray(kb.knowledgeChunks)
    ? kb.knowledgeChunks
    : undefined;
  const chunks = retrieveKnowledge(message, 4, corpus);
  const context = formatKnowledgeContext(chunks);
  const sources = chunks.map((chunk) => ({
    title: chunk.title,
    href: chunk.href,
    source: chunk.source,
  }));

  const replyLanguage = kb.replyLanguage || "English";
  const system = [
    "You are CurNext Assistant - a helpful CurNext colleague on curnext.app.",
    `Always reply in ${replyLanguage}. Match the user's language when it is clearly ${replyLanguage}; otherwise still write the full answer in ${replyLanguage}.`,
    "Sound natural and human: warm, clear, conversational B2B tone. Short paragraphs.",
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
      answer = buildFallbackAnswer(context, message, locale);
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
    return NextResponse.json({ error: errors.finishError }, { status: 502 });
  }
}
