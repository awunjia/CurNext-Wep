"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Settings2, X } from "lucide-react";

import { useCookieConsent } from "@/components/cookie-consent-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cookieCategories, type CookieCategoryId } from "@/config/cookies";
import { Link } from "@/i18n/navigation";
import {
  defaultPreferences,
  type CookieConsentPreferences,
} from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

const optionalCategories = cookieCategories.filter((c) => !c.locked);

export function CookieConsentBanner() {
  const t = useTranslations("cookies.banner");
  const {
    ready,
    hasChoice,
    preferencesOpen,
    preferences,
    acceptAll,
    rejectOptional,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useCookieConsent();

  const [draft, setDraft] = useState<CookieConsentPreferences>(preferences);
  const showBanner = ready && (!hasChoice || preferencesOpen);
  const showCategories = preferencesOpen;

  useEffect(() => {
    if (!preferencesOpen) return;
    setDraft({ ...preferences, necessary: true });
    // Only re-sync when the panel opens, not on every preferences identity change.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [preferencesOpen]);

  function startCustomize() {
    setDraft({ ...preferences, necessary: true });
    openPreferences();
  }

  function toggleCategory(id: CookieCategoryId, checked: boolean) {
    if (id === "necessary") return;
    setDraft((prev) => ({ ...prev, [id]: checked, necessary: true }));
  }

  function onSave() {
    savePreferences({ ...draft, necessary: true });
  }

  if (!ready) return null;

  return (
    <>
      {hasChoice && !preferencesOpen ? (
        <button
          type="button"
          onClick={startCustomize}
          className="border-border/80 bg-background/95 text-muted-foreground hover:text-foreground hover:border-foreground/30 fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs shadow-sm backdrop-blur-sm transition-colors sm:right-6 sm:bottom-6"
          aria-label={t("settingsAria")}
        >
          <Settings2 className="size-3.5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">{t("settings")}</span>
        </button>
      ) : null}

      {showBanner ? (
        <div
          role="dialog"
          aria-modal={!hasChoice}
          aria-labelledby="cookie-consent-title"
          className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md dark:shadow-[0_-8px_30px_rgba(0,0,0,0.35)]"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 max-w-3xl">
                <p
                  id="cookie-consent-title"
                  className="text-sm font-medium tracking-tight sm:text-base"
                >
                  {t("title")}
                </p>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {t("lead")}{" "}
                  <Link
                    href="/data/cookie-policy"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {t("policyLink")}
                  </Link>
                  .
                </p>
              </div>
              {hasChoice ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={closePreferences}
                  aria-label={t("closeAria")}
                >
                  <X className="size-4" aria-hidden />
                </Button>
              ) : null}
            </div>

            {showCategories ? (
              <div className="border-border/70 grid gap-3 border-t pt-3 sm:grid-cols-2 lg:grid-cols-4">
                <CategoryRow
                  id="necessary"
                  title={t("categories.necessary.title")}
                  description={t("categories.necessary.description")}
                  checked
                  locked
                  lockedLabel={t("alwaysOn")}
                />
                {optionalCategories.map((category) => (
                  <CategoryRow
                    key={category.id}
                    id={category.id}
                    title={t(`categories.${category.id}.title`)}
                    description={t(`categories.${category.id}.description`)}
                    checked={draft[category.id]}
                    onCheckedChange={(checked) =>
                      toggleCategory(category.id, checked)
                    }
                  />
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              {!showCategories ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-10"
                    onClick={startCustomize}
                  >
                    {t("customize")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-10"
                    onClick={rejectOptional}
                  >
                    {t("rejectOptional")}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className="h-10"
                    onClick={acceptAll}
                  >
                    {t("acceptAll")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-10"
                    onClick={() => {
                      setDraft(defaultPreferences());
                      rejectOptional();
                    }}
                  >
                    {t("rejectOptional")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-10"
                    onClick={acceptAll}
                  >
                    {t("acceptAll")}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className="h-10"
                    onClick={onSave}
                  >
                    {t("save")}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CategoryRow({
  id,
  title,
  description,
  checked,
  locked,
  lockedLabel,
  onCheckedChange,
}: {
  id: CookieCategoryId;
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  lockedLabel?: string;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const inputId = `cookie-cat-${id}`;
  return (
    <label
      htmlFor={locked ? undefined : inputId}
      className={cn(
        "border-border/70 flex gap-3 rounded-lg border p-3",
        locked ? "bg-muted/40" : "bg-background hover:border-foreground/25",
      )}
    >
      <div className="pt-0.5">
        {locked ? (
          <Checkbox checked disabled aria-label={title} />
        ) : (
          <Checkbox
            id={inputId}
            checked={checked}
            onCheckedChange={(value) => onCheckedChange?.(value === true)}
          />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">
          {title}
          {locked && lockedLabel ? (
            <span className="text-muted-foreground ml-2 text-xs font-normal">
              {lockedLabel}
            </span>
          ) : null}
        </p>
        <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </label>
  );
}

export function CookiePreferencesButton({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  const t = useTranslations("cookies.banner");
  const { openPreferences, ready } = useCookieConsent();
  if (!ready) return null;
  return (
    <button
      type="button"
      onClick={openPreferences}
      className={cn(
        "text-muted-foreground hover:text-foreground text-sm underline-offset-4 transition-colors hover:underline",
        className,
      )}
    >
      {label ?? t("settings")}
    </button>
  );
}
