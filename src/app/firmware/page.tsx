import type { Metadata } from "next";

import { FirmwarePage } from "@/components/firmware-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Firmware | CurNext",
  description:
    "CurNext firmware catalog, edge OTA on CN-BC, and install history. Field updates are signed and orchestrated at the edge - not a public flasher.",
  openGraph: {
    title: `Firmware | ${siteConfig.name}`,
    description:
      "Catalog versions, fleet-reported firmware, and edge OTA via CN-BC for CurNext devices.",
    url: `${siteConfig.url}/firmware`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <FirmwarePage />;
}
