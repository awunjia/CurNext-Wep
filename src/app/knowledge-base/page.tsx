import type { Metadata } from "next";

import { KnowledgeBasePage } from "@/components/knowledge-base-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Knowledge Base | CurNext",
  description:
    "Chat with CurNext about products, the site path, API, SDKs, firmware, hosting, and pricing.",
  openGraph: {
    title: `Knowledge Base | ${siteConfig.name}`,
    description:
      "Ask CurNext about products, platform, API, SDKs, firmware, hosting, and pricing.",
    url: `${siteConfig.url}/knowledge-base`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <KnowledgeBasePage />;
}
