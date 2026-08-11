"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Code2,
  Ellipsis,
  Home,
  Layers,
  Menu,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryNav, siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { navGroupKey, navItemKeyByHref } from "@/lib/nav-labels";
import { cn } from "@/lib/utils";

const navIcons: Record<string, LucideIcon> = {
  Home,
  Solutions: Layers,
  Company: Building2,
  Developer: Code2,
  More: Ellipsis,
};

export function MobileNav() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleSection(title: string) {
    setExpanded((current) => (current === title ? null : title));
  }

  function labelForGroup(title: string) {
    const key = navGroupKey[title];
    return key ? t(key as "home") : title;
  }

  function labelForItem(href: string, fallback: string) {
    const key = navItemKeyByHref[href];
    return key ? t(key as "home") : fallback;
  }

  function descForItem(href: string, fallback?: string) {
    const key = navItemKeyByHref[href];
    if (!key) return fallback;
    try {
      return t(`${key}Desc` as "howItWorksDesc");
    } catch {
      return fallback;
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="ml-1.5 lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex h-full max-h-dvh w-full max-w-none flex-col gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-border shrink-0 border-b px-4 py-4 text-left">
          <SheetTitle className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt=""
              width={28}
              height={32}
              className="h-7 w-auto dark:hidden"
            />
            <Image
              src="/logo-mark-light.png"
              alt=""
              width={28}
              height={32}
              className="hidden h-7 w-auto dark:block"
            />
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = navIcons[item.title];
              const groupLabel = labelForGroup(item.title);

              if (!item.items) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="hover:bg-muted flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium"
                  >
                    {Icon ? <Icon className="size-4" aria-hidden /> : null}
                    {groupLabel}
                  </Link>
                );
              }

              const isExpanded = expanded === item.title;

              return (
                <div key={item.title} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleSection(item.title)}
                    className="hover:bg-muted flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex items-center gap-2">
                      {Icon ? <Icon className="size-4" aria-hidden /> : null}
                      {groupLabel}
                    </span>
                    <ChevronDown
                      className={cn(
                        "text-muted-foreground size-4 transition-transform",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </button>

                  {isExpanded ? (
                    <ul className="border-border ml-3 space-y-0.5 border-l pl-3">
                      {item.items.map((subItem) => {
                        const title = labelForItem(subItem.href, subItem.title);
                        const description = descForItem(
                          subItem.href,
                          subItem.description,
                        );

                        return (
                          <li key={subItem.href}>
                            {subItem.external ? (
                              <a
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                className="hover:bg-muted block rounded-lg px-3 py-2"
                              >
                                <span className="flex items-center gap-1.5 text-sm font-medium">
                                  {title}
                                  <ArrowUpRight
                                    className="text-muted-foreground size-3.5 shrink-0"
                                    aria-hidden
                                  />
                                </span>
                                {description ? (
                                  <span className="text-muted-foreground mt-0.5 block text-xs">
                                    {description}
                                  </span>
                                ) : null}
                              </a>
                            ) : (
                              <Link
                                href={subItem.href}
                                onClick={() => setOpen(false)}
                                className="hover:bg-muted block rounded-lg px-3 py-2"
                              >
                                <span className="block text-sm font-medium">
                                  {title}
                                </span>
                                {description ? (
                                  <span className="text-muted-foreground mt-0.5 block text-xs">
                                    {description}
                                  </span>
                                ) : null}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="border-border mt-auto shrink-0 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link
            href="/pricing#request-quote"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 w-full gap-2",
            )}
          >
            <CalendarDays className="size-4" aria-hidden />
            {tCommon("requestQuote")}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
