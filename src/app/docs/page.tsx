import type { Metadata } from "next";

import { DocsPage } from "@/components/docs-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Docs | CurNext",
  description:
    "Long-form CurNext product documentation - site path, solutions, API, SDKs, firmware, integrations, security, hosting, and commercial scope.",
  openGraph: {
    title: `Docs | ${siteConfig.name}`,
    description:
      "Product documentation for CurNext - from field nodes to API, SDKs, firmware, security, and hosting.",
    url: `${siteConfig.url}/docs`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <DocsPage />;
}
