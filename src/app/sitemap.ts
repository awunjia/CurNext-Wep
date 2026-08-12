import { statSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

import { siteConfig, sitePages } from "@/config/site";
import { routing } from "@/i18n/routing";

const HIGH_PRIORITY = new Set([
  "/",
  "/solutions",
  "/how-it-works",
  "/pricing",
  "/contact",
]);

const PRODUCT_PRIORITY = new Set([
  "/solutions/concrete-curing",
  "/solutions/wall-drying",
  "/solutions/indoor-air",
  "/solutions/leak-detection",
  "/solutions/structural-health",
  "/solutions/mep",
  "/technologies",
  "/architecture",
  "/data/security",
  "/blog",
  "/how-it-works",
]);

function pagePriority(href: string): number {
  if (href === "/") return 1;
  if (href.startsWith("/solutions/") && href !== "/solutions") return 0.95;
  if (HIGH_PRIORITY.has(href)) return 0.9;
  if (PRODUCT_PRIORITY.has(href)) return 0.8;
  if (href.startsWith("/data/")) return 0.3;
  return 0.6;
}

const pageSourceFiles: Partial<Record<string, string[]>> = {
  "/solutions": [
    "src/app/[locale]/solutions/page.tsx",
    "src/components/solutions-index-page.tsx",
    "messages/en.json",
    "messages/fr.json",
    "messages/fi.json",
    "messages/sv.json",
    "messages/es.json",
  ],
  "/solutions/concrete-curing": [
    "src/app/[locale]/solutions/concrete-curing/page.tsx",
    "src/components/concrete-curing-page.tsx",
    "src/components/solution-product-json-ld.tsx",
    "messages/en.json",
    "messages/fr.json",
    "messages/fi.json",
    "messages/sv.json",
    "messages/es.json",
  ],
};

function pageLastModified(href: string): Date {
  const files = pageSourceFiles[href];
  if (!files || files.length === 0) {
    return statSync(path.join(process.cwd(), "src/config/site.ts")).mtime;
  }

  return files.reduce((latest, relativePath) => {
    const modifiedAt = statSync(path.join(process.cwd(), relativePath)).mtime;
    return modifiedAt > latest ? modifiedAt : latest;
  }, new Date(0));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages
    .filter((page) => page.href.startsWith("/"))
    .flatMap((page) => {
      const path = page.href === "/" ? "" : page.href;
      const priority = pagePriority(page.href);
      const lastModified = pageLastModified(page.href);
      return routing.locales.map((locale) => ({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified,
        changeFrequency:
          page.href === "/" || page.href === "/blog"
            ? ("weekly" as const)
            : ("monthly" as const),
        priority,
        alternates: {
          languages: Object.fromEntries([
            ...routing.locales.map((item) => [
              item,
              `${siteConfig.url}/${item}${path}`,
            ]),
            ["x-default", `${siteConfig.url}/${routing.defaultLocale}${path}`],
          ]),
        },
      }));
    });
}
