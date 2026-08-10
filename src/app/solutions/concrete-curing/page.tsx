import type { Metadata } from "next";

import { ConcreteCuringPage } from "@/components/concrete-curing-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Concrete Curing Monitoring & Slab Readiness | CurNext CN-CC",
  description:
    "Monitor slab cure with air, surface, and core probes. CurNext CN-CC predicts build-ready timing with industrial LoRaWAN and cloud readiness reports.",
  openGraph: {
    title: "Concrete Curing Monitoring & Slab Readiness | CurNext CN-CC",
    description:
      "Monitor slab cure with air, surface, and core probes. CurNext CN-CC predicts build-ready timing with industrial LoRaWAN and cloud readiness reports.",
    url: `${siteConfig.url}/solutions/concrete-curing`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <ConcreteCuringPage />;
}
