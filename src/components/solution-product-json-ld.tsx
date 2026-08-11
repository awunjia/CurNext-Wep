import { siteConfig } from "@/config/site";

import { JsonLd } from "@/components/json-ld";

export type FaqItem = {
  question: string;
  answer: string;
};

export type HowToStep = {
  name: string;
  text: string;
};

type SolutionProductJsonLdProps = {
  locale: string;
  path: string;
  name: string;
  sku: string;
  description: string;
  definition: string;
  imagePath: string;
  faq: FaqItem[];
  steps: HowToStep[];
  breadcrumbName: string;
  howToName: string;
};

/**
 * Product + FAQ + HowTo + Breadcrumb schema for solution pages (AEO/SEO).
 */
export function SolutionProductJsonLd({
  locale,
  path,
  name,
  sku,
  description,
  definition,
  imagePath,
  faq,
  steps,
  breadcrumbName,
  howToName,
}: SolutionProductJsonLdProps) {
  const pageUrl = `${siteConfig.url}/${locale}${path}`;
  const imageUrl = `${siteConfig.url}${imagePath}`;

  const product = {
    "@type": ["Product", "SoftwareApplication"],
    "@id": `${pageUrl}/#product`,
    name,
    sku,
    productID: sku,
    description,
    image: imageUrl,
    url: pageUrl,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: { "@id": `${siteConfig.url}/#organization` },
    category: "Construction monitoring software",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/${locale}/pricing`,
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      description: "Quoted by node count and project duration",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "General contractors, specialty trades, consultants",
    },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${pageUrl}/#product` },
    primaryImageOfPage: imageUrl,
    inLanguage: locale,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#aeo-definition", "#aeo-faq"],
    },
    mainEntity: { "@id": `${pageUrl}/#product` },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${siteConfig.url}/${locale}/solutions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: breadcrumbName,
        item: pageUrl,
      },
    ],
  };

  const howTo = {
    "@type": "HowTo",
    "@id": `${pageUrl}/#howto`,
    name: howToName,
    description: definition,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}/#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [webPage, product, breadcrumb, howTo, faqPage],
      }}
    />
  );
}
