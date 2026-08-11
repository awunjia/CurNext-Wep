import {
  cookieCategories,
  cookieConsentConfig,
  type CookieCategoryId,
} from "@/config/cookies";

export type CookieConsentPreferences = Record<CookieCategoryId, boolean>;

export type StoredCookieConsent = {
  version: string;
  updatedAt: string;
  preferences: CookieConsentPreferences;
};

export function defaultPreferences(): CookieConsentPreferences {
  return {
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  };
}

export function acceptAllPreferences(): CookieConsentPreferences {
  return {
    necessary: true,
    preferences: true,
    analytics: true,
    marketing: true,
  };
}

export function rejectOptionalPreferences(): CookieConsentPreferences {
  return defaultPreferences();
}

function normalizePreferences(
  input: Partial<CookieConsentPreferences> | undefined,
): CookieConsentPreferences {
  const base = defaultPreferences();
  if (!input) return base;
  return {
    necessary: true,
    preferences: Boolean(input.preferences),
    analytics: Boolean(input.analytics),
    marketing: Boolean(input.marketing),
  };
}

export function readConsent(): StoredCookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(cookieConsentConfig.storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredCookieConsent;
    if (parsed.version !== cookieConsentConfig.version) return null;
    if (!parsed.preferences || typeof parsed.preferences !== "object") {
      return null;
    }
    return {
      version: parsed.version,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      preferences: normalizePreferences(parsed.preferences),
    };
  } catch {
    return null;
  }
}

export function writeConsent(
  preferences: CookieConsentPreferences,
): StoredCookieConsent {
  const payload: StoredCookieConsent = {
    version: cookieConsentConfig.version,
    updatedAt: new Date().toISOString(),
    preferences: normalizePreferences(preferences),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(
      cookieConsentConfig.storageKey,
      JSON.stringify(payload),
    );
  }
  return payload;
}

export function clearConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(cookieConsentConfig.storageKey);
}

export function hasConsentChoice(): boolean {
  return readConsent() !== null;
}

export function canUseCategory(
  preferences: CookieConsentPreferences | null | undefined,
  category: CookieCategoryId,
): boolean {
  if (category === "necessary") return true;
  if (!preferences) return false;
  return Boolean(preferences[category]);
}

export function categoryMeta() {
  return cookieCategories;
}
