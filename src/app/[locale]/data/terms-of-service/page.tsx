import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LegalDocumentPage } from "@/components/legal-document-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const title = t("termsOfServiceTitle");
  return withLocaleMetadata({
    locale,
    path: "/data/terms-of-service",
    title,
    description: title,
  });
}

export default function Page() {
  return <LegalDocumentPage titleKey="termsOfServiceTitle" />;
}
