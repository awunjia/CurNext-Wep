import type { Metadata } from "next";

import { SecurityPage } from "@/components/security-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Security | CurNext",
  description:
    "CurNext security architecture - zone model, layer controls, WireGuard and mTLS, signed OTA, and GDPR-oriented cloud controls.",
  openGraph: {
    title: `Security | ${siteConfig.name}`,
    description:
      "How CurNext designs security across field sensors, building edge, and cloud - standards alignment without inventing certificates.",
    url: `${siteConfig.url}/security`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <SecurityPage />;
}
