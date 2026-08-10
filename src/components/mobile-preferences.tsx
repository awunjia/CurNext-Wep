"use client";

import {
  CheckIcon,
  ChevronDown,
  Languages,
  LogIn,
  Monitor,
  Moon,
  Settings2,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LANGUAGE_STORAGE_KEY,
  languages,
  type LanguageCode,
} from "@/config/languages";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const appearanceOptions = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

export function MobilePreferences() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const stored = window.localStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    ) as LanguageCode | null;
    if (stored && languages.some((item) => item.code === stored)) {
      setLanguage(stored);
      document.documentElement.lang = stored;
      document.documentElement.dir = "ltr";
    }
    setMounted(true);
  }, []);

  function selectLanguage(code: LanguageCode) {
    setLanguage(code);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    document.documentElement.lang = code;
    document.documentElement.dir = "ltr";
    setLanguageOpen(false);
  }

  const currentLanguage =
    languages.find((item) => item.code === language) ?? languages[0];
  const currentAppearance =
    appearanceOptions.find((item) => item.value === theme) ??
    appearanceOptions[0];
  const AppearanceIcon = currentAppearance.icon;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label="Open preferences"
          />
        }
      >
        <Settings2 className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex h-full max-h-dvh w-full max-w-none flex-col gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-border shrink-0 border-b px-4 py-4 text-left">
          <SheetTitle>Preferences</SheetTitle>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
          <div className="space-y-1">
            <div>
              <button
                type="button"
                onClick={() => setLanguageOpen((value) => !value)}
                className="hover:bg-muted flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium"
                aria-expanded={languageOpen}
              >
                <span className="flex items-center gap-2">
                  <Languages className="size-4" aria-hidden />
                  Language
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5 text-sm font-normal">
                  {mounted ? currentLanguage.label : "English"}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      languageOpen && "rotate-180",
                    )}
                  />
                </span>
              </button>

              {languageOpen ? (
                <ul className="border-border ml-3 mt-1 space-y-0.5 border-l pl-3">
                  {languages.map((item) => (
                    <li key={item.code}>
                      <button
                        type="button"
                        onClick={() => selectLanguage(item.code)}
                        className="hover:bg-muted flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm"
                      >
                        <span>{item.label}</span>
                        <CheckIcon
                          className={cn(
                            "size-4",
                            language === item.code
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                          aria-hidden
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setAppearanceOpen((value) => !value)}
                className="hover:bg-muted flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium"
                aria-expanded={appearanceOpen}
              >
                <span className="flex items-center gap-2">
                  <AppearanceIcon className="size-4" aria-hidden />
                  Appearance
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5 text-sm font-normal">
                  {mounted ? currentAppearance.label : "System"}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      appearanceOpen && "rotate-180",
                    )}
                  />
                </span>
              </button>

              {appearanceOpen ? (
                <ul className="border-border ml-3 mt-1 space-y-0.5 border-l pl-3">
                  {appearanceOptions.map((item) => {
                    const Icon = item.icon;
                    const selected = mounted && theme === item.value;

                    return (
                      <li key={item.value}>
                        <button
                          type="button"
                          onClick={() => {
                            setTheme(item.value);
                            setAppearanceOpen(false);
                          }}
                          className="hover:bg-muted flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm"
                        >
                          <span className="flex items-center gap-2">
                            <Icon className="size-4" aria-hidden />
                            {item.label}
                          </span>
                          <CheckIcon
                            className={cn(
                              "size-4",
                              selected ? "opacity-100" : "opacity-0",
                            )}
                            aria-hidden
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>

            <div className="border-border mt-4 border-t pt-4">
              <Button
                render={
                  <a
                    href={siteConfig.links.dashboard}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  />
                }
                variant="outline"
                size="lg"
                className="h-11 w-full gap-2"
              >
                <LogIn className="size-4" aria-hidden />
                Login
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
