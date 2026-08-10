import type { Metadata } from "next";

import { LeakDetectionPage } from "@/components/leak-detection-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Construction Leak Detection & Alerts | CurNext CN-LEAK",
  description:
    "Leak detection for plant rooms, wet zones, and risers. CurNext CN-LEAK delivers event-driven LoRaWAN alerts on the same stack as site readiness.",
  openGraph: {
    title: "Construction Leak Detection & Alerts | CurNext CN-LEAK",
    description:
      "Leak detection for plant rooms, wet zones, and risers. CurNext CN-LEAK delivers event-driven LoRaWAN alerts on the same stack as site readiness.",
    url: `${siteConfig.url}/solutions/leak-detection`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <LeakDetectionPage />;
}
