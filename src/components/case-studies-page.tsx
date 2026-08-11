"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { caseStudies, caseStudyFilters } from "@/config/case-studies";
import { solutions } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type StudyCopy = {
  title: string;
  sector: string;
  region: string;
  challenge: string;
  approach: string;
  outcome: string;
};

export function CaseStudiesPage() {
  const t = useTranslations("caseStudies");
  const [filter, setFilter] = useState<string>("all");
  const studies = t.raw("studies") as Record<string, StudyCopy>;

  const filtered = useMemo(() => {
    if (filter === "all") return caseStudies;
    return caseStudies.filter((study) => study.sku === filter);
  }, [filter]);

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="case-studies-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 id="case-studies-heading" className={sectionHeadingClassName}>
              {t("title")}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("description")}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {t("leadNote")}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="case-studies-list-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2
                id="case-studies-list-heading"
                className={sectionHeadingClassName}
              >
                {t("listTitle")}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                {t("listLead")}
              </p>
            </div>
            <div
              role="tablist"
              aria-label={t("filterAria")}
              className="flex flex-wrap gap-1"
            >
              {caseStudyFilters.map((item) => {
                const selected = item.id === filter;
                const label =
                  item.id === "all" ? t("allFilter") : item.label;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setFilter(item.id)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      selected
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="mt-10 space-y-6 sm:mt-12">
            {filtered.map((study) => {
              const solution = solutions.find((s) => s.code === study.sku);
              const copy = studies[study.id] ?? {
                title: study.title,
                sector: study.sector,
                region: study.region,
                challenge: study.challenge,
                approach: study.approach,
                outcome: study.outcome,
              };
              return (
                <li
                  key={study.id}
                  id={study.id}
                  className="border-border/70 scroll-mt-24 rounded-lg border p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
                      {study.sku}
                    </p>
                    <span className="text-muted-foreground text-sm">
                      {copy.sector}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      · {copy.region}
                    </span>
                  </div>
                  <h3 className={cn(itemHeadingClassName, "mt-2")}>
                    {copy.title}
                  </h3>

                  <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                    <div>
                      <dt className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                        {t("challenge")}
                      </dt>
                      <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {copy.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                        {t("approach")}
                      </dt>
                      <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {copy.approach}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                        {t("outcome")}
                      </dt>
                      <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {copy.outcome}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <Link
                      href={study.href}
                      className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {solution
                        ? t("viewSku", {
                            code: solution.code,
                            title: solution.title,
                          })
                        : t("viewSolution")}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>

          {filtered.length === 0 ? (
            <p className="text-muted-foreground mt-10 text-sm">{t("empty")}</p>
          ) : null}
        </div>
      </section>

      <section className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("refsEyebrow")}
            </p>
            <h2 className={sectionHeadingClassName}>{t("refsTitle")}</h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("refsLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
            >
              {t("contactSales")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
