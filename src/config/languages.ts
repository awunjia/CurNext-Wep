import { locales } from "@/i18n/routing";

export const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "fi", label: "Suomi" },
  { code: "sv", label: "Svenska" },
  { code: "es", label: "Español" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

export const LANGUAGE_STORAGE_KEY = "curnext.language";

/** Keep switcher list aligned with next-intl routing locales. */
export const routingLocales = locales;
