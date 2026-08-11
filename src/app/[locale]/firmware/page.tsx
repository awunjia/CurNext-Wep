import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { FirmwarePage } from "@/components/firmware-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "firmware" });
  return withLocaleMetadata({
    locale,
    path: "/firmware",
    title: t("firmwarePage.title"),
    description: t("firmwarePage.description"),
  });
}

export default function Page() {
  return <FirmwarePage />;
}
