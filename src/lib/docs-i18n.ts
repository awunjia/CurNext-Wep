import { docsTabs, type DocsTab } from "@/config/docs";

type DocsMessages = {
  (key: string): string;
  raw: (key: string) => unknown;
};

type LocalizedSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: Array<{
    title: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
  links?: Array<{ label: string; href: string; external?: boolean }>;
};

/**
 * Resolve docs chrome + content from the `docs` message namespace while keeping
 * structural ids/hrefs/code from the TypeScript catalog.
 */
export function getLocalizedDocsTabs(t: DocsMessages): DocsTab[] {
  return docsTabs.map((tab) => {
    const tabMsg = t.raw(`tabs.${tab.id}`) as {
      label: string;
      description: string;
      sections: Record<string, LocalizedSection>;
    };

    return {
      ...tab,
      label: tabMsg?.label ?? tab.label,
      description: tabMsg?.description ?? tab.description,
      sections: tab.sections.map((section) => {
        const sectionMsg = tabMsg?.sections?.[section.id];
        return {
          ...section,
          title: sectionMsg?.title ?? section.title,
          paragraphs: sectionMsg?.paragraphs ?? section.paragraphs,
          bullets: sectionMsg?.bullets ?? section.bullets,
          subsections:
            sectionMsg?.subsections?.map((sub, index) => ({
              title: sub.title,
              paragraphs:
                sub.paragraphs ?? section.subsections?.[index]?.paragraphs,
              bullets: sub.bullets ?? section.subsections?.[index]?.bullets,
            })) ?? section.subsections,
          links:
            sectionMsg?.links?.map((link, index) => ({
              label: link.label,
              href: link.href ?? section.links?.[index]?.href ?? "#",
              external: link.external ?? section.links?.[index]?.external,
            })) ?? section.links,
        };
      }),
    };
  });
}
