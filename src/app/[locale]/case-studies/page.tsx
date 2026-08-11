import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CaseStudiesPage } from "@/components/case-studies-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  return withLocaleMetadata({
    locale,
    path: "/case-studies",
    title: t("title"),
    description: t("description"),
  });
}

export default function Page() {
  return <CaseStudiesPage />;
}
