import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { DocsPage } from "@/components/docs-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });
  return withLocaleMetadata({
    locale,
    path: "/docs",
    title: t("title"),
    description: t("description"),
  });
}

export default function Page() {
  return <DocsPage />;
}
