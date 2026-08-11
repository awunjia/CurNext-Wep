import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { IntegrationsPage } from "@/components/integrations-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "integrations" });
  return withLocaleMetadata({
    locale,
    path: "/integrations",
    title: t("title"),
    description: t("description"),
  });
}

export default function Page() {
  return <IntegrationsPage />;
}
