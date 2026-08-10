import type { Metadata } from "next";

import { IntegrationsPage } from "@/components/integrations-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Market Place | CurNext",
  description:
    "Connect CurNext to Slack, Teams, Datadog, Procore, Salesforce, and more - marketplace integrations for alerts, schedules, maps, CRM, and accounting.",
  openGraph: {
    title: `Market Place | ${siteConfig.name}`,
    description:
      "Browse CurNext Market Place integrations and connect third-party tools from the dashboard.",
    url: `${siteConfig.url}/integrations`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <IntegrationsPage />;
}
