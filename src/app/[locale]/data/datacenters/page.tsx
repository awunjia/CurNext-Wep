import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { DatacentersPage } from "@/components/datacenters-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "datacenters" });
  return withLocaleMetadata({
    locale,
    path: "/data/datacenters",
    title: t("title"),
    description: t("description"),
  });
}

export default function Page() {
  return <DatacentersPage />;
}
