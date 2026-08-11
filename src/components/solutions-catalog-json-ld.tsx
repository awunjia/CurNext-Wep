import { siteConfig, solutions } from "@/config/site";

import { JsonLd } from "@/components/json-ld";
import type { FaqItem } from "@/components/solution-product-json-ld";

type Props = {
  locale: string;
  title: string;
  description: string;
  faq?: FaqItem[];
};

/** CollectionPage + ItemList (+ optional FAQ) for the solutions index. */
export function SolutionsCatalogJsonLd({
  locale,
  title,
  description,
  faq = [],
}: Props) {
  const pageUrl = `${siteConfig.url}/${locale}/solutions`;

  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}/#itemlist`,
    name: title,
    description,
    numberOfItems: solutions.length,
    itemListElement: solutions.map((solution, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: solution.title,
      description: solution.description,
      url: `${siteConfig.url}/${locale}${solution.href}`,
    })),
  };

  const webPage = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: locale,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#aeo-definition", "#aeo-faq"],
    },
    mainEntity: { "@id": `${pageUrl}/#itemlist` },
  };

  const graph: Record<string, unknown>[] = [webPage, itemList];

  if (faq.length > 0) {
    graph.push({
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
    });
  }

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": graph,
      }}
    />
  );
}
