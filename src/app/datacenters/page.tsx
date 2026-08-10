import type { Metadata } from "next";

import { DatacentersPage } from "@/components/datacenters-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Datacenters | CurNext",
  description:
    "Where CurNext runs for EU users - Hetzner in Germany, Supabase in Frankfurt, Cloudflare edge, and load-balanced Docker replicas.",
  openGraph: {
    title: `Datacenters | ${siteConfig.name}`,
    description:
      "EU cloud residency for CurNext - application origins in Germany, database and auth in Frankfurt, edge protection via Cloudflare.",
    url: `${siteConfig.url}/datacenters`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <DatacentersPage />;
}
