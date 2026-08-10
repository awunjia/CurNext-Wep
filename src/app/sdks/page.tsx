import type { Metadata } from "next";

import { SdksPage } from "@/components/sdks-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "SDK | CurNext",
  description:
    "Official CurNext client libraries for JavaScript/TypeScript, PHP, Go, Python, Java, and Flutter - install, authenticate, and call the REST API.",
  openGraph: {
    title: `SDK | ${siteConfig.name}`,
    description:
      "Pick an official CurNext SDK, install from the registry, and call readiness, devices, alerts, measurements, and webhooks.",
    url: `${siteConfig.url}/sdks`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <SdksPage />;
}
