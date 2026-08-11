import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

import { JsonLd } from "@/components/json-ld";

type JsonLdProps = {
  locale: string;
};

/**
 * Organization + WebSite structured data for Google and answer engines.
 */
export function SiteJsonLd({ locale }: JsonLdProps) {
  const sameAs = [
    siteConfig.links.twitter,
    siteConfig.links.github,
    siteConfig.links.dashboard,
  ].filter(Boolean);

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    foundingLocation: {
      "@type": "Place",
      name: siteConfig.registeredIn,
    },
    ...(siteConfig.businessId &&
    !/coming soon/i.test(siteConfig.businessId)
      ? { identifier: siteConfig.businessId }
      : {}),
    sameAs,
    knowsAbout: [
      "concrete curing monitoring",
      "slab maturity",
      "wall drying monitoring",
      "mold risk monitoring",
      "mould risk",
      "indoor air quality construction",
      "IAQ monitoring",
      "construction leak detection",
      "structural health monitoring",
      "MEP monitoring",
      "flow pressure energy monitoring",
      "construction site intelligence",
      "build readiness",
    ],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: `${siteConfig.url}/${locale}`,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: [...routing.locales],
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organization, website],
      }}
    />
  );
}
