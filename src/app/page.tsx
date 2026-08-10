import type { Metadata } from "next";

import { HomeHero, HomeProductPlane } from "@/components/home-hero";
import { HomeIntelligenceSection } from "@/components/home-intelligence-section";
import { HomePartnersCarousel } from "@/components/home-partners-carousel";
import { HomeSubscribeSection } from "@/components/home-subscribe-section";
import { HomeSurfacesSection } from "@/components/home-surfaces-section";
import { HomeWhyChooseUs } from "@/components/home-why-choose-us";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function HomePage() {
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
