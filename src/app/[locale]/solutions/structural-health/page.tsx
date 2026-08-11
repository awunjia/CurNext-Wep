import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { StructuralHealthPage } from "@/components/structural-health-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.structural-health" });
  return withLocaleMetadata({
    locale,
    path: "/solutions/structural-health",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function Page() {
  return <StructuralHealthPage />;
}
