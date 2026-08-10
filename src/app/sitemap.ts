import type { MetadataRoute } from "next";

import { siteConfig, sitePages } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitePages
    .filter((page) => page.href.startsWith("/"))
    .map((page) => ({
      url: `${siteConfig.url}${page.href === "/" ? "" : page.href}`,
      lastModified,
      changeFrequency: page.href === "/" ? "weekly" : "monthly",
      priority: page.href === "/" ? 1 : 0.6,
    }));
}
