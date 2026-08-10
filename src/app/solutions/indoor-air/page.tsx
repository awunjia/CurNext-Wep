import type { Metadata } from "next";

import { IndoorAirPage } from "@/components/indoor-air-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title:
    "Indoor Air Quality Monitoring for Construction & Handover | CurNext CN-IAQ",
  description:
    "Indoor air you can prove during build and after handover. CurNext CN-IAQ monitors CO₂, PM, VOC, and climate on the same industrial building stack.",
  openGraph: {
    title:
      "Indoor Air Quality Monitoring for Construction & Handover | CurNext CN-IAQ",
    description:
      "Indoor air you can prove during build and after handover. CurNext CN-IAQ monitors CO₂, PM, VOC, and climate on the same industrial building stack.",
    url: `${siteConfig.url}/solutions/indoor-air`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <IndoorAirPage />;
}
