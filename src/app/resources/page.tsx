import type { Metadata } from "next";

import { ResourcesPage } from "@/components/resources-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Resources | CurNext",
  description:
    "CurNext resources - documentation, knowledge base, solutions, API, SDKs, firmware, technologies, pricing, and contact.",
  openGraph: {
    title: `Resources | ${siteConfig.name}`,
    description:
      "Browse CurNext guides, product references, and developer material in one place.",
    url: `${siteConfig.url}/resources`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <ResourcesPage />;
}
