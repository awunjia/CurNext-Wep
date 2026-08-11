import {
  knowledgeChunks,
  type KnowledgeChunk,
} from "@/config/knowledge-base";

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#./\s-]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

const SYNONYMS: Record<string, string[]> = {
  cost: ["pricing", "price", "quote", "install", "fee"],
  costs: ["pricing", "price", "quote", "install", "fee"],
  price: ["pricing", "cost", "quote", "fee"],
  pricing: ["cost", "price", "quote", "install", "fee"],
  expensive: ["pricing", "cost", "quote"],
  cheap: ["pricing", "cost", "quote"],
  install: ["pricing", "installation", "quote", "nodes"],
  installation: ["pricing", "install", "quote", "nodes"],
  quote: ["pricing", "sales", "cost"],
  month: ["duration", "pricing", "months"],
  months: ["duration", "pricing", "month"],
  mold: ["mould", "moisture", "humidity", "cn-wd", "cn-iaq", "cn-leak"],
  mould: ["mold", "moisture", "humidity", "cn-wd", "cn-iaq", "cn-leak"],
  moisture: ["mold", "mould", "humidity", "drying", "cn-wd", "cn-leak"],
  humidity: ["moisture", "indoor", "cn-iaq", "cn-wd"],
  building: ["nodes", "install", "pricing", "solutions"],
  monitor: ["solutions", "nodes", "cn-iaq", "cn-wd", "cn-leak"],
  monitoring: ["solutions", "nodes", "cn-iaq", "cn-wd", "cn-leak"],
};

function expandTokens(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    const extras = SYNONYMS[token];
    if (!extras) continue;
    for (const extra of extras) expanded.add(extra);
  }
  return Array.from(expanded);
}

/** Simple keyword retrieval over the curated website corpus. */
export function retrieveKnowledge(
  query: string,
  limit = 4,
  corpus: KnowledgeChunk[] = knowledgeChunks,
): KnowledgeChunk[] {
  const tokens = expandTokens(tokenize(query));
  if (tokens.length === 0) {
    return corpus
      .filter((chunk) => chunk.id !== "knowledge-base-assistant")
      .slice(0, Math.min(3, limit));
  }

  const commercialIntent = tokens.some((token) =>
    [
      "cost",
      "costs",
      "price",
      "pricing",
      "quote",
      "install",
      "installation",
      "fee",
      "expensive",
      "cheap",
      "months",
      "month",
      "prix",
      "devis",
      "tarification",
      "hinta",
      "kustannus",
      "pris",
      "kostnad",
      "precio",
      "cotización",
    ].includes(token),
  );

  const scored = corpus
    .filter((chunk) => chunk.id !== "knowledge-base-assistant")
    .map((chunk) => {
      const haystack = tokenize(
        `${chunk.title} ${chunk.text} ${chunk.tags.join(" ")} ${chunk.source}`,
      );
      let score = 0;
      for (const token of tokens) {
        if (haystack.includes(token)) score += 2;
        if (
          chunk.tags.some((tag) => tag.includes(token) || token.includes(tag))
        ) {
          score += 3;
        }
        if (chunk.title.toLowerCase().includes(token)) score += 2;
      }
      if (commercialIntent && chunk.id === "pricing") score += 12;
      if (commercialIntent && chunk.id === "contact") score += 6;
      if (
        tokens.some((token) =>
          ["mold", "mould", "moisture", "humidity"].includes(token),
        ) &&
        chunk.id === "solutions"
      ) {
        score += 8;
      }
      return { chunk, score };
    });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);
}

export function formatKnowledgeContext(chunks: KnowledgeChunk[]): string {
  if (chunks.length === 0) {
    return "No matching CurNext notes were found.";
  }

  return chunks
    .map(
      (chunk, index) =>
        `[${index + 1}] ${chunk.title} (${chunk.source}${chunk.href ? ` - ${chunk.href}` : ""})\n${chunk.text}`,
    )
    .join("\n\n");
}
