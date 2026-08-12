import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ArchitecturePage } from "@/components/architecture-page";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "architecture" });
  const page = t.raw("page") as { title: string; description: string };
  return withLocaleMetadata({
    locale,
    path: "/architecture",
    title: page.title,
    description: page.description,
  });
}

export default function Page() {
  return <ArchitecturePage />;
}
