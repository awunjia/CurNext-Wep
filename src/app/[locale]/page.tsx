import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HomeHero, HomeProductPlane } from "@/components/home-hero";
import { HomeIntelligenceSection } from "@/components/home-intelligence-section";
import { HomePartnersCarousel } from "@/components/home-partners-carousel";
import { HomeSubscribeSection } from "@/components/home-subscribe-section";
import { HomeSurfacesSection } from "@/components/home-surfaces-section";
import { HomeWhyChooseUs } from "@/components/home-why-choose-us";
import { withLocaleMetadata } from "@/lib/i18n-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return withLocaleMetadata({
    locale,
    path: "",
    title: t("metaTitle"),
    description: t("metaDescription"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <HomeHero />
      <HomeSurfacesSection />
      <HomeProductPlane />
      <HomeIntelligenceSection />
      <HomePartnersCarousel />
      <HomeWhyChooseUs />
      <HomeSubscribeSection />
    </main>
  );
}
