import type { Metadata } from "next";

import { HowItWorksPage } from "@/components/how-it-works-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "How CurNext Works | L1 to L5 Site Intelligence",
  description:
    "CurNext's five-layer architecture: surface devices, floor collection, site power, building uplink, and cloud decisions for build-ready site intelligence.",
  openGraph: {
    title: "How CurNext Works | L1 to L5 Site Intelligence",
    description:
      "CurNext's five-layer architecture: surface devices, floor collection, site power, building uplink, and cloud decisions for build-ready site intelligence.",
    url: `${siteConfig.url}/how-it-works`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <HowItWorksPage />;
}
