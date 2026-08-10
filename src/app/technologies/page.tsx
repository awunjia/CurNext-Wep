import type { Metadata } from "next";

import { TechnologiesPage } from "@/components/technologies-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Technologies | CurNext",
  description:
    "CurNext technology stack from field nodes to cloud - LoRaWAN, MQTT/TLS, WireGuard, BIM readiness, REST API, SDKs, and Market Place integrations.",
  openGraph: {
    title: `Technologies | ${siteConfig.name}`,
    description:
      "Public overview of the CurNext platform stack - site hardware path, connectivity, software surfaces, and security themes.",
    url: `${siteConfig.url}/technologies`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <TechnologiesPage />;
}
