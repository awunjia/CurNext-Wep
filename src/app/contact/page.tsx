import type { Metadata } from "next";

import { ContactPage } from "@/components/contact-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us | CurNext",
  description:
    "Contact CurNext sales, partnerships, and support. Email sales@curnext.app or info@curnext.app, or send a message from the form.",
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description:
      "Talk with CurNext about demos, pricing, partnerships, and product questions.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}
