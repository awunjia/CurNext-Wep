import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { TechnologiesPage } from "@/components/technologies-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "technologies" });
  return withLocaleMetadata({
    locale,
    path: "/technologies",
    title: t("technologiesPage.title"),
    description: t("technologiesPage.description"),
  });
}

export default function Page() {
  return <TechnologiesPage />;
}
