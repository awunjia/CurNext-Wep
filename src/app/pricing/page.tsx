import type { Metadata } from "next";

import { PricingPage } from "@/components/pricing-page";
import { siteConfig } from "@/config/site";

const description =
  "Price CurNext by nodes and duration for Finland, Canada, and Cameroon. Live estimator for installation and subscription.";

export const metadata: Metadata = {
  title: "Pricing - Construction Readiness Intelligence | CurNext",
  description,
  openGraph: {
    title: "Pricing - Construction Readiness Intelligence | CurNext",
    description,
    url: `${siteConfig.url}/pricing`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <PricingPage />;
}
