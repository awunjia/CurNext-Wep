import type { Metadata } from "next";

import { StructuralHealthPage } from "@/components/structural-health-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Structural Health Monitoring for Construction Sites | CurNext CN-SHM",
  description:
    "Strain, crack, tilt, and vibration monitoring on the CurNext stack. Threshold bursts, heartbeats, and cloud evidence for critical structures.",
  openGraph: {
    title:
      "Structural Health Monitoring for Construction Sites | CurNext CN-SHM",
    description:
      "Strain, crack, tilt, and vibration monitoring on the CurNext stack. Threshold bursts, heartbeats, and cloud evidence for critical structures.",
    url: `${siteConfig.url}/solutions/structural-health`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <StructuralHealthPage />;
}
