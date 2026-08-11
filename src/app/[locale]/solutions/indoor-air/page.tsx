import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { IndoorAirPage } from "@/components/indoor-air-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.indoor-air" });
  return withLocaleMetadata({
    locale,
    path: "/solutions/indoor-air",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function Page() {
  return <IndoorAirPage />;
}
