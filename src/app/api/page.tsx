import type { Metadata } from "next";

import { ApiPage } from "@/components/api-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "API - Construction Readiness Intelligence | CurNext",
  description:
    "CurNext REST API at api.curnext.app - surface readiness, BIM context, devices, telemetry, and webhooks. Included with Professional.",
  openGraph: {
    title: `API | ${siteConfig.name}`,
    description:
      "CurNext REST API at api.curnext.app - surface readiness, BIM context, devices, telemetry, and webhooks. Included with Professional.",
    url: `${siteConfig.url}/api`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <ApiPage />;
}
