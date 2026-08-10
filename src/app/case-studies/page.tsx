import type { Metadata } from "next";

import { CaseStudiesPage } from "@/components/case-studies-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Case Studies | CurNext",
  description:
    "Anonymous CurNext site patterns by solution - concrete curing, wall drying, indoor air, leak detection, structural health, and MEP.",
  openGraph: {
    title: `Case Studies | ${siteConfig.name}`,
    description:
      "How CurNext shows up on construction surfaces - readiness decisions and audit trails. Named references available via sales under NDA.",
    url: `${siteConfig.url}/case-studies`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <CaseStudiesPage />;
}
