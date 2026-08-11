import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CompliancePage } from "@/components/compliance-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "compliance" });
  return withLocaleMetadata({
    locale,
    path: "/data/compliance",
    title: t("title"),
    description: t("description"),
  });
}

export default function Page() {
  return <CompliancePage />;
}
