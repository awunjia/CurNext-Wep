"use client";

import { CheckIcon, Languages } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LANGUAGE_STORAGE_KEY,
  languages,
  type LanguageCode,
} from "@/config/languages";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [mounted, setMounted] = useState(false);

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
  }

  const current = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 px-2"
            aria-label="Choose language"
          />
        }
      >
        <Languages className="size-4" aria-hidden />
        <span className="hidden sm:inline">{mounted ? current.label : "English"}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {languages.map((item) => (
          <DropdownMenuItem
            key={item.code}
            onClick={() => selectLanguage(item.code)}
            className="justify-between gap-3"
          >
            <span>{item.label}</span>
            <CheckIcon
              className={cn(
                "size-4",
                language === item.code ? "opacity-100" : "opacity-0",
              )}
              aria-hidden
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
