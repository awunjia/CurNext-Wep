import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { HowItWorksPage } from "@/components/how-it-works-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howItWorks" });
  return withLocaleMetadata({
    locale,
    path: "/how-it-works",
    title: t("title"),
    description: t("lead"),
  });
}

export default function Page() {
  return <HowItWorksPage />;
}
