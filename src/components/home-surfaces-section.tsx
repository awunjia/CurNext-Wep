"use client";

import {
  Activity,
  ArrowUpRight,
  BrickWall,
  CircuitBoard,
  Droplets,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { solutions } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { navItemKeyByHref } from "@/lib/nav-labels";

const solutionIcons: Record<(typeof solutions)[number]["href"], LucideIcon> = {
  "/solutions/concrete-curing": BrickWall,
  "/solutions/wall-drying": Droplets,
  "/solutions/indoor-air": Wind,
  "/solutions/leak-detection": Waves,
  "/solutions/structural-health": Activity,
  "/solutions/mep": CircuitBoard,
};

export function HomeSurfacesSection() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");

  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="flex flex-col gap-6 border-b border-border/70 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("surfacesEyebrow")}
            </p>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {t("surfacesTitle")}
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("surfacesLead")}
            </p>
          </div>
          <Link
            href="/solutions"
            className="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors"
          >
            {t("surfacesViewAll")}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
          {solutions.map((solution) => {
            const Icon = solutionIcons[solution.href];
            const key = navItemKeyByHref[solution.href];
            const title = key ? tNav(key as "concreteCuring") : solution.title;
            const description = key
              ? tNav(`${key}Desc` as "concreteCuringDesc")
              : solution.description;

            return (
              <li key={solution.href} className="min-w-0">
                <Link
                  href={solution.href}
                  className="group block outline-none"
                >
                  <span className="bg-muted/60 text-foreground mb-3 flex size-10 items-center justify-center rounded-xl border border-border/60 sm:size-11">
                    <Icon className="size-4 sm:size-5" aria-hidden />
                  </span>
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium tracking-tight sm:text-base">
                      {title}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="text-muted-foreground mt-0.5 size-3.5 shrink-0 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:size-4"
                    />
                  </span>
                  <span className="text-muted-foreground mt-1.5 block text-xs leading-relaxed sm:text-sm">
                    {description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
