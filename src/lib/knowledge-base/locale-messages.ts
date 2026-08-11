import type { KnowledgeChunk } from "@/config/knowledge-base";
import { type AppLocale } from "@/i18n/routing";

export type KnowledgeBaseApiErrors = {
  rateLimit: string;
  invalidJson: string;
  invalidBody: string;
  consentRequired: string;
  shortQuestion: string;
  finishError: string;
};

export type KnowledgeBaseLocalePack = {
  knowledgeChunks: KnowledgeChunk[];
  replyLanguage: string;
  apiErrors: KnowledgeBaseApiErrors;
};

export async function loadKnowledgeBaseLocale(
  locale: AppLocale,
): Promise<KnowledgeBaseLocalePack> {
  const messages = (await import(`../../../messages/${locale}.json`))
    .default as {
    knowledgeBase: KnowledgeBaseLocalePack;
  };
  return messages.knowledgeBase;
}
