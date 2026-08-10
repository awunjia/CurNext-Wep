import type { Metadata } from "next";

import { DpaPage } from "@/components/dpa-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Data Processing Agreement | CurNext",
  description:
    "CurNext Oy DPA summary for processor terms across Finland, Canada, and Cameroon - roles, EU hosting, subprocessors (including AI and SMTP2GO), TOMs, and how to request the executable agreement.",
  openGraph: {
    title: `Data Processing Agreement | ${siteConfig.name}`,
    description:
      "How CurNext Oy processes Client personal data as a processor for customers in Finland, Canada, and Cameroon. Public subprocessor list included.",
    url: `${siteConfig.url}/data/data-processing-agreement`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <DpaPage />;
}
