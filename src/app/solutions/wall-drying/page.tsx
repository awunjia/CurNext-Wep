import type { Metadata } from "next";

import { WallDryingPage } from "@/components/wall-drying-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Wall & Wet-Room Drying Monitoring | CurNext CN-WD",
  description:
    "Know when gypsum, wet rooms, and tile backing are dry enough to finish. CurNext CN-WD delivers finish readiness with industrial LoRaWAN and cloud evidence.",
  openGraph: {
    title: "Wall & Wet-Room Drying Monitoring | CurNext CN-WD",
    description:
      "Know when gypsum, wet rooms, and tile backing are dry enough to finish. CurNext CN-WD delivers finish readiness with industrial LoRaWAN and cloud evidence.",
    url: `${siteConfig.url}/solutions/wall-drying`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <WallDryingPage />;
}
