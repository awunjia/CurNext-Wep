"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import * as simpleIcons from "simple-icons";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  marketplaceCategories,
  marketplaceIntegrations,
  type MarketplaceCategory,
  type MarketplaceIntegration,
} from "@/config/marketplace";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type SimpleIcon = {
  title: string;
  hex: string;
  path: string;
  slug: string;
};

function resolveSimpleIcon(slug: string): SimpleIcon | null {
  for (const entry of Object.values(simpleIcons)) {
    if (
      entry &&
      typeof entry === "object" &&
      "slug" in entry &&
      "path" in entry &&
      "hex" in entry &&
      (entry as SimpleIcon).slug === slug
    ) {
      return entry as SimpleIcon;
    }
  }
  return null;
}

function IntegrationIcon({
  integration,
}: {
  integration: MarketplaceIntegration;
}) {
  if (integration.icon.kind === "file") {
    return (
      <span className="bg-background ring-border/70 flex size-10 shrink-0 items-center justify-center rounded-lg ring-1">
        <Image
          src={integration.icon.src}
          alt=""
          width={22}
          height={22}
          className="size-5 object-contain"
          unoptimized
        />
      </span>
    );
  }

  const icon = resolveSimpleIcon(integration.icon.slug);
  if (!icon) {
    return (
      <span className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg text-xs font-semibold">
        {integration.name.slice(0, 1)}
      </span>
    );
  }

  const monochrome =
    icon.hex.toLowerCase() === "000000" ||
    icon.hex.toLowerCase() === "ffffff";

  return (
    <span className="bg-background ring-border/70 flex size-10 shrink-0 items-center justify-center rounded-lg ring-1">
      <svg
        role="img"
        viewBox="0 0 24 24"
        aria-hidden
        className={cn("size-5", monochrome && "text-foreground")}
        fill={monochrome ? "currentColor" : `#${icon.hex}`}
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    </span>
  );
}

export function IntegrationsPage() {
  const t = useTranslations("integrations");
  const marketplacePage = {
    title: t("title"),
    description: t("description"),
    widgetTitle: t("widgetTitle"),
    widgetDescription: t("widgetDescription"),
    dashboardHref: t("dashboardHref"),
  };
  const categoryLabels = t.raw("categories") as Record<string, string>;
  const itemCopy = t.raw("items") as Record<
    string,
    { description: string; category: string }
  >;
  const [category, setCategory] = useState<"all" | MarketplaceCategory>("all");

  const availableCategories = useMemo(() => {
    const present = new Set(
      marketplaceIntegrations.map((item) => item.category),
    );
    return marketplaceCategories.filter((item) => present.has(item));
  }, []);

  const filtered = useMemo(() => {
    if (category === "all") return marketplaceIntegrations;
    return marketplaceIntegrations.filter((item) => item.category === category);
  }, [category]);

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="integrations-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1 id="integrations-heading" className={sectionHeadingClassName}>
                {marketplacePage.widgetTitle}
              </h1>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                {marketplacePage.widgetDescription}
              </p>
            </div>
            <div className="min-w-0 sm:w-56">
              <label htmlFor="integration-category" className="sr-only">
                {t("categoriesTitle")}
              </label>
              <select
                id="integration-category"
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value as "all" | MarketplaceCategory,
                  )
                }
                className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-9 w-full rounded-lg border px-2.5 text-sm outline-none focus-visible:ring-3"
              >
                <option value="all">{t("allFilter")}</option>
                {availableCategories.map((item) => (
                  <option key={item} value={item}>
                    {categoryLabels[item] ?? item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ul className="mt-10 grid gap-3 lg:grid-cols-2">
            {filtered.map((integration) => (
              <li
                key={integration.id}
                className="border-border/70 flex h-full flex-col gap-4 rounded-lg border bg-background p-5"
              >
                <div className="flex items-start gap-3">
                  <IntegrationIcon integration={integration} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className={itemHeadingClassName}>
                        {integration.name}
                      </h2>
                      <span className="border-border/70 text-muted-foreground rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase">
                        {integration.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {itemCopy[integration.id]?.description ??
                        integration.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-border/60 border-t pt-4">
                  <p className="text-muted-foreground min-w-0 flex-1 truncate text-xs">
                    <a
                      href={integration.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {integration.website.replace(/^https?:\/\//, "")}
                    </a>
                  </p>
                  <a
                    href={integration.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "h-8 gap-1.5",
                    )}
                  >
                    Website
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Workspace
            </p>
            <h2 className={sectionHeadingClassName}>
              Manage connections in Market Place
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Sign in to CurNext to connect, disconnect, and sync integrations
              for your sites. Project owners manage Market Place access.
            </p>
          </div>
          <div className="flex flex-nowrap gap-2 sm:gap-3">
            <a
              href={marketplacePage.dashboardHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 flex-1 gap-2 px-3 sm:flex-none sm:px-5",
              )}
            >
              Open Market Place
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 flex-1 gap-2 px-3 sm:flex-none sm:px-5",
              )}
            >
              Contact sales
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
