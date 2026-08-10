import type { Metadata } from "next";

import { MepPage } from "@/components/mep-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "MEP Flow, Pressure & Energy Monitoring | CurNext CN-MEP",
  description:
    "Plant-room flow, pressure, and energy on the CurNext stack. PoE from CN-UPS, Ethernet uplink, and cloud evidence next to surface readiness.",
  openGraph: {
    title: "MEP Flow, Pressure & Energy Monitoring | CurNext CN-MEP",
    description:
      "Plant-room flow, pressure, and energy on the CurNext stack. PoE from CN-UPS, Ethernet uplink, and cloud evidence next to surface readiness.",
    url: `${siteConfig.url}/solutions/mep`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <MepPage />;
}
