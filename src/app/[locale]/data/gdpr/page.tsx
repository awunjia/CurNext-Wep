import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { GdprPage } from "@/components/gdpr-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gdpr" });
  return withLocaleMetadata({
    locale,
    path: "/data/gdpr",
    title: t("page.title"),
    description: t("page.metaDescription"),
  });
}

export default function Page() {
  return <GdprPage />;
}
