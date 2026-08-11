import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SdksPage } from "@/components/sdks-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sdks" });
  return withLocaleMetadata({
    locale,
    path: "/sdks",
    title: t("header.title"),
    description: t("header.description"),
  });
}

export default function Page() {
  return <SdksPage />;
}
