import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SecurityPolicyPage } from "@/components/security-policy-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "securityPolicy" });
  return withLocaleMetadata({
    locale,
    path: "/data/security-policy",
    title: t("page.title"),
    description: t("page.metaDescription"),
  });
}

export default function Page() {
  return <SecurityPolicyPage />;
}
