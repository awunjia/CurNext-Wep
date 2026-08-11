"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Code2,
  Ellipsis,
  Home,
  Layers,
  LogIn,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { MobilePreferences } from "@/components/mobile-preferences";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { primaryNav, siteConfig } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { isActivePath, isGroupActive } from "@/lib/nav-active";
import { navGroupKey, navItemKeyByHref } from "@/lib/nav-labels";
import { cn } from "@/lib/utils";

const navIcons: Record<string, LucideIcon> = {
  Home,
  Solutions: Layers,
  Company: Building2,
  Developer: Code2,
  More: Ellipsis,
};

export function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

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
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="text-foreground flex min-w-0 items-center gap-2 text-base font-semibold tracking-tight sm:gap-2.5 sm:text-lg"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={32}
            height={36}
            className="h-7 w-auto shrink-0 dark:hidden sm:h-8"
            priority
          />
          <Image
            src="/logo-mark-light.png"
            alt=""
            width={32}
            height={36}
            className="hidden h-7 w-auto shrink-0 dark:block sm:h-8"
            priority
          />
          <span className="truncate">{siteConfig.name}</span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {primaryNav.map((item) => {
              const Icon = navIcons[item.title];
              const groupLabel = labelForGroup(item.title);

              if (item.items) {
                const groupActive = isGroupActive(pathname, item.items);

                return (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger
                      className={cn(
                        "gap-2 bg-transparent hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent",
                        groupActive
                          ? "text-foreground underline decoration-foreground/35 underline-offset-[10px] data-open:text-foreground data-popup-open:text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      data-active={groupActive ? "" : undefined}
                    >
                      {Icon ? <Icon className="size-4" aria-hidden /> : null}
                      {groupLabel}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[min(22rem,calc(100vw-2rem))] gap-0.5 p-1">
                        {item.items.map((subItem) => {
                          const linkActive =
                            !subItem.external &&
                            isActivePath(pathname, subItem.href);
                          const title = labelForItem(
                            subItem.href,
                            subItem.title,
                          );
                          const description = descForItem(
                            subItem.href,
                            subItem.description,
                          );

                          const linkClassName = "flex flex-col items-start gap-0.5";

                          return (
                            <li key={subItem.href}>
                              <NavigationMenuLink
                                closeOnClick
                                active={linkActive}
                                render={
                                  subItem.external ? (
                                    <a
                                      href={subItem.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={linkClassName}
                                    />
                                  ) : (
                                    <Link
                                      href={subItem.href}
                                      className={linkClassName}
                                      aria-current={
                                        linkActive ? "page" : undefined
                                      }
                                    />
                                  )
                                }
                              >
                                <span className="flex w-full items-center gap-1.5 font-medium">
                                  {title}
                                  {subItem.external ? (
                                    <ArrowUpRight
                                      className="text-muted-foreground size-3.5 shrink-0"
                                      aria-hidden
                                    />
                                  ) : null}
                                </span>
                                {description ? (
                                  <span className="text-muted-foreground line-clamp-2 text-xs sm:line-clamp-1">
                                    {description}
                                  </span>
                                ) : null}
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              const linkActive = isActivePath(pathname, item.href);

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    active={linkActive}
                    render={
                      <Link
                        href={item.href}
                        aria-current={linkActive ? "page" : undefined}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "gap-2 bg-transparent hover:bg-transparent focus:bg-transparent",
                          linkActive
                            ? "text-foreground underline decoration-foreground/35 underline-offset-[10px] data-active:bg-transparent"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      />
                    }
                  >
                    {Icon ? <Icon className="size-4" aria-hidden /> : null}
                    {groupLabel}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden shrink-0 items-center gap-1 xl:gap-2 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={siteConfig.links.dashboard}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1.5",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LogIn className="size-3.5" aria-hidden />
            <span className="hidden xl:inline">{tCommon("signIn")}</span>
          </a>
          <Link
            href="/pricing#request-quote"
            className={buttonVariants({ size: "sm" })}
          >
            <span className="hidden xl:inline">{tCommon("requestQuote")}</span>
            <span className="xl:hidden">Quote</span>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 lg:hidden">
          <MobilePreferences />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
