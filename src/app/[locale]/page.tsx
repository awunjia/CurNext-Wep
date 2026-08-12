import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HomeHero, HomeProductPlane } from "@/components/home-hero";
import { HomeIntelligenceSection } from "@/components/home-intelligence-section";
import { HomePageJsonLd } from "@/components/home-page-json-ld";
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
    keywords: t.raw("metaKeywords") as string[],
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const navItems = [
    {
      name: tNav("solutions"),
      description: tNav("concreteCuringDesc"),
      href: "/solutions",
    },
    {
      name: tNav("pricing"),
      description: tNav("pricingDesc"),
      href: "/pricing",
    },
    {
      name: tNav("howItWorks"),
      description: tNav("howItWorksDesc"),
      href: "/how-it-works",
    },
    {
      name: tNav("contactUs"),
      description: tNav("contactUsDesc"),
      href: "/contact",
    },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <HomePageJsonLd
        locale={locale}
        title={tHome("metaTitle")}
        description={tHome("metaDescription")}
        keywords={tHome.raw("metaKeywords") as string[]}
        heroImageAlt={tHome("heroImageAlt")}
        dashboardImageAlt={tHome("dashboardImageAlt")}
        navItems={navItems}
      />
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
