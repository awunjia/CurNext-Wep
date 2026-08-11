import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { KnowledgeBasePage } from "@/components/knowledge-base-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "knowledgeBase" });
  return withLocaleMetadata({
    locale,
    path: "/knowledge-base",
    title: t("knowledgeBasePage.title"),
    description: t("knowledgeBasePage.description"),
  });
}

export default function Page() {
  return <KnowledgeBasePage />;
}
