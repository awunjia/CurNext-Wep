"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CookieCategoryId } from "@/config/cookies";
import {
  acceptAllPreferences,
  canUseCategory,
  defaultPreferences,
  hasConsentChoice,
  readConsent,
  rejectOptionalPreferences,
  writeConsent,
  type CookieConsentPreferences,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  ready: boolean;
  hasChoice: boolean;
  preferencesOpen: boolean;
  preferences: CookieConsentPreferences;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (next: CookieConsentPreferences) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  canUse: (category: CookieCategoryId) => boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] =
    useState<CookieConsentPreferences>(defaultPreferences);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setPreferences(stored.preferences);
      setHasChoice(true);
      setPreferencesOpen(false);
    } else {
      setHasChoice(false);
    }
    setReady(true);
  }, []);

  const acceptAll = useCallback(() => {
    const next = acceptAllPreferences();
    writeConsent(next);
    setPreferences(next);
    setHasChoice(true);
    setPreferencesOpen(false);
  }, []);

  const rejectOptional = useCallback(() => {
    const next = rejectOptionalPreferences();
    writeConsent(next);
    setPreferences(next);
    setHasChoice(true);
    setPreferencesOpen(false);
  }, []);

  const savePreferences = useCallback((next: CookieConsentPreferences) => {
    const payload = writeConsent({ ...next, necessary: true });
    setPreferences(payload.preferences);
    setHasChoice(true);
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    if (hasConsentChoice()) {
      setPreferencesOpen(false);
    }
  }, []);

  const canUse = useCallback(
    (category: CookieCategoryId) => canUseCategory(preferences, category),
    [preferences],
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      ready,
      hasChoice,
      preferencesOpen,
      preferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      openPreferences,
      closePreferences,
      canUse,
    }),
    [
      ready,
      hasChoice,
      preferencesOpen,
      preferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      openPreferences,
      closePreferences,
      canUse,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
