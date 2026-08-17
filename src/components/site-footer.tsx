import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Layers,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { FooterNavLink } from "@/components/footer-nav-link";
import { AppStoreBadge, GooglePlayBadge } from "@/components/store-badges";
import { Separator } from "@/components/ui/separator";
import { siteConfig, sitePages, solutions } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { footerGroupKey, footerItemKeyByHref } from "@/lib/nav-labels";

const footerGroups: {
  title: string;
  icon: LucideIcon;
  pages: { title: string; href: string }[];
}[] = [
  {
    title: "Solutions",
    icon: Layers,
    pages: solutions.map((s) => ({
      title: s.title,
      href: s.href,
    })),
  },
  {
    title: "Resources",
    icon: BookOpen,
    pages: sitePages.filter((p) => p.group === "resources"),
  },
  {
    title: "Company",
    icon: Building2,
    pages: sitePages.filter((p) => p.group === "company"),
  },
  {
    title: "Trust",
    icon: Shield,
    pages: sitePages.filter((p) => p.group === "trust"),
  },
];

const legalPages = sitePages.filter((p) => p.group === "legal");

export async function SiteFooter() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tLegal = await getTranslations("legal");

  const businessIdDisplay = /coming soon/i.test(siteConfig.businessId)
    ? tLegal("comingSoon")
    : siteConfig.businessId;

  function groupLabel(title: string) {
    const key = footerGroupKey[title];
    return key ? tFooter(key as "solutions") : title;
  }

  function itemLabel(href: string, fallback: string) {
    const key = footerItemKeyByHref[href];
    if (!key) return fallback;
    if (key in { ourBlog: 1, events: 1, support: 1, compliance: 1, dpa: 1, auditTrail: 1, securityPolicy: 1, privacyPolicy: 1, cookiePolicy: 1, termsConditions: 1, gdprPolicies: 1, solutions: 1, resources: 1, company: 1, trust: 1, legal: 1 }) {
      return tFooter(key as "ourBlog");
    }
    return tNav(key as "home");
  }

  return (
    <footer className="border-border mt-auto border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3.7fr)] lg:gap-12">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
            >
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
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              {tFooter("slogan")}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <AppStoreBadge href={siteConfig.links.appStore} />
              <GooglePlayBadge href={siteConfig.links.googlePlay} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {footerGroups.map((group) => {
              const Icon = group.icon;

              return (
                <div key={group.title} className="min-w-0 space-y-3">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Icon className="size-4 shrink-0" aria-hidden />
                    <span className="truncate">{groupLabel(group.title)}</span>
                  </p>
                  <ul className="space-y-2">
                    {group.pages.map((page) => {
                      const external = /^https?:\/\//.test(page.href);
                      const label = itemLabel(page.href, page.title);
                      return (
                        <li key={page.href}>
                          {external ? (
                            <a
                              href={page.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm break-words transition-colors"
                            >
                              {label}
                              <ArrowUpRight
                                className="size-3 shrink-0 opacity-70"
                                aria-hidden
                              />
                            </a>
                          ) : (
                            <FooterNavLink href={page.href}>
                              {label}
                            </FooterNavLink>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <Separator className="my-8" />

        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {legalPages.map((page) => (
            <li key={page.href}>
              <FooterNavLink href={page.href}>
                {itemLabel(page.href, page.title)}
              </FooterNavLink>
            </li>
          ))}
        </ul>

        <Separator className="my-8" />

        <div className="text-muted-foreground flex flex-row items-center justify-between gap-2 text-sm">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}, Inc.
          </p>
          <p>
            {tFooter("businessId", { id: businessIdDisplay })}
          </p>
        </div>
      </div>
    </footer>
  );
}
