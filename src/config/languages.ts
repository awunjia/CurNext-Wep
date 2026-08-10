export const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "fi", label: "Suomi" },
  { code: "sv", label: "Svenska" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

export const LANGUAGE_STORAGE_KEY = "curnext.language";
