import { siteConfig } from "@/config/site";

import { JsonLd } from "@/components/json-ld";

type NavItem = {
  name: string;
  description: string;
  href: string;
};

type HomePageJsonLdProps = {
  locale: string;
  title: string;
  description: string;
  keywords: string[];
  heroImageAlt: string;
  dashboardImageAlt: string;
  navItems: NavItem[];
};

export function HomePageJsonLd({
  locale,
  title,
  description,
  keywords,
  heroImageAlt,
  dashboardImageAlt,
  navItems,
}: HomePageJsonLdProps) {
  const pageUrl = `${siteConfig.url}/${locale}`;
  const heroImageUrl = `${siteConfig.url}/hero/site-atmosphere.png`;
  const dashboardImageUrl = `${siteConfig.url}/hero/product-dashboard.png`;

  const heroImage = {
    "@type": "ImageObject",
    "@id": `${pageUrl}/#hero-image`,
    url: heroImageUrl,
    contentUrl: heroImageUrl,
    caption: heroImageAlt,
  };

  const dashboardImage = {
    "@type": "ImageObject",
    "@id": `${pageUrl}/#dashboard-image`,
    url: dashboardImageUrl,
    contentUrl: dashboardImageUrl,
    caption: dashboardImageAlt,
  };

  const navigationItemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}/#main-links`,
    name: title,
    itemListElement: navItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: `${siteConfig.url}/${locale}${item.href}`,
    })),
  };

  const navigationElements = navItems.map((item) => ({
    "@type": "SiteNavigationElement",
    name: item.name,
    description: item.description,
    url: `${siteConfig.url}/${locale}${item.href}`,
  }));

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name: title,
    description,
    keywords: keywords.join(", "),
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    primaryImageOfPage: { "@id": `${pageUrl}/#hero-image` },
    image: [{ "@id": `${pageUrl}/#hero-image` }, { "@id": `${pageUrl}/#dashboard-image` }],
    inLanguage: locale,
    significantLink: navItems.map((item) => `${siteConfig.url}/${locale}${item.href}`),
    mainEntity: { "@id": `${pageUrl}/#main-links` },
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [heroImage, dashboardImage, navigationItemList, webPage, ...navigationElements],
      }}
    />
  );
}
