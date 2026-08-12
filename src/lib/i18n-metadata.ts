import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { routing, type AppLocale } from "@/i18n/routing";

const ogLocaleByAppLocale: Record<AppLocale, string> = {
  en: "en_US",
  fr: "fr_FR",
  fi: "fi_FI",
  sv: "sv_SE",
  es: "es_ES",
};

/** Build `alternates.languages` for a locale-prefixed path (no locale in `path`). */
export function localeLanguageAlternates(path: string = "") {
  const normalized = path === "/" ? "" : path.replace(/\/$/, "");
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${siteConfig.url}/${locale}${normalized}`;
  }
  languages["x-default"] =
    `${siteConfig.url}/${routing.defaultLocale}${normalized}`;
  return languages;
}

function resolveOgImage(image?: string) {
  const url = image ?? siteConfig.ogImage;
  return {
    url,
    width: 1200,
    height: 630,
    alt: siteConfig.name,
  };
}

export function withLocaleMetadata(options: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  /** Absolute URL or site-relative path for social preview image */
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const path = options.path ?? "";
  const normalized = path === "/" ? "" : path.replace(/\/$/, "");
  const url = `${siteConfig.url}/${options.locale}${normalized}`;
  const languages = localeLanguageAlternates(path);
  const ogLocale =
    ogLocaleByAppLocale[options.locale as AppLocale] ?? options.locale;
  const alternateLocale = routing.locales
    .filter((item) => item !== options.locale)
    .map((item) => ogLocaleByAppLocale[item]);
  const ogImage = resolveOgImage(options.image);
  const titleValue = options.absoluteTitle
    ? { absolute: options.title }
    : options.title;

  return {
    title: titleValue,
    description: options.description,
    keywords: options.keywords,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: siteConfig.name,
      type: options.type ?? "website",
      locale: ogLocale,
      alternateLocale,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [ogImage.url],
      ...(siteConfig.twitterHandle
        ? { creator: siteConfig.twitterHandle, site: siteConfig.twitterHandle }
        : {}),
    },
  };
}
