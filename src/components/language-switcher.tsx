"use client";

import { CheckIcon, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, type LanguageCode } from "@/config/languages";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale() as LanguageCode;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function selectLanguage(code: LanguageCode) {
    if (code === locale) return;
    document.documentElement.lang = code;
    document.documentElement.dir = "ltr";
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  }

  const current = languages.find((item) => item.code === locale) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 px-2"
            aria-label={t("chooseLanguage")}
            disabled={pending}
          />
        }
      >
        <Languages className="size-4" aria-hidden />
        <span className="hidden sm:inline">{current.label}</span>
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
                locale === item.code ? "opacity-100" : "opacity-0",
              )}
              aria-hidden
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
