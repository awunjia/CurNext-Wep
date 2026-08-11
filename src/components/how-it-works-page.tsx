import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { solutions } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const layerCodes = ["L1", "L2", "L3", "L4", "L5"] as const;

export async function HowItWorksPage() {
  const t = await getTranslations("howItWorks");
  const tCommon = await getTranslations("common");
  const layers = t.raw("layers") as Record<
    (typeof layerCodes)[number],
    { role: string; title: string; body: string }
  >;
  const outcomes = t.raw("outcomes") as Array<{ title: string; body: string }>;

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="how-hero-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("eyebrow")}
            </p>
            <h1 id="how-hero-heading" className={sectionHeadingClassName}>
              {t("title")}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("lead")}
            </p>
          </div>

          <ol className="border-border/70 mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border/70 sm:mt-14 sm:grid-cols-5">
            {layerCodes.map((code, index) => (
              <li
                key={code}
                className="bg-background flex flex-col gap-1 px-4 py-4 sm:px-5 sm:py-5"
              >
                <span className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">
                  {String(index + 1).padStart(2, "0")} · {layers[code].role}
                </span>
                <span className="text-sm font-semibold tracking-tight">
                  {code}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="how-stack-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("architectureEyebrow")}
            </p>
            <h3 id="how-stack-heading" className={sectionHeadingClassName}>
              {t("stackTitle")}
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("stackLead")}
            </p>
          </div>

          <ol className="relative mt-12 space-y-0 sm:mt-14">
            <div
              aria-hidden
              className="bg-border absolute top-3 bottom-3 left-[1.15rem] w-px sm:left-[1.35rem]"
            />
            {layerCodes.map((code) => {
              const layer = layers[code];
              const isProduct = code === "L5";
              return (
                <li
                  key={code}
                  className="relative grid gap-4 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-8 sm:py-10"
                >
                  <div className="relative z-10 flex items-start">
                    <span
                      className={cn(
                        "inline-flex size-9 items-center justify-center rounded-full border text-xs font-semibold tracking-tight sm:size-10 sm:text-sm",
                        isProduct
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground",
                      )}
                    >
                      {code.replace("L", "")}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "min-w-0 rounded-xl border px-5 py-5 sm:px-6 sm:py-6",
                      isProduct
                        ? "border-foreground/20 bg-muted/30"
                        : "border-border/70 bg-background",
                    )}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">
                        {code} · {layer.role}
                      </p>
                      {isProduct ? (
                        <p className="text-[11px] font-medium tracking-[0.14em] uppercase">
                          {t("productLayer")}
                        </p>
                      ) : null}
                    </div>
                    <h4 className={cn(itemHeadingClassName, "mt-2")}>
                      {layer.title}
                    </h4>
                    <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:text-[15px]">
                      {layer.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="how-outcomes-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("outcomesEyebrow")}
            </p>
            <h3 id="how-outcomes-heading" className={sectionHeadingClassName}>
              {t("outcomesTitle")}
            </h3>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {outcomes.map((item) => (
              <li key={item.title} className="min-w-0">
                <h4 className={itemHeadingClassName}>{item.title}</h4>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="how-surfaces-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("surfacesEyebrow")}
            </p>
            <h3 id="how-surfaces-heading" className={sectionHeadingClassName}>
              {t("surfacesTitle")}
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("surfacesLead")}
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <li key={solution.href}>
                <Link
                  href={solution.href}
                  className="border-border/70 hover:border-foreground/25 hover:bg-muted/30 group flex h-full flex-col gap-2 rounded-xl border p-5 transition-colors outline-none"
                >
                  <span className="text-muted-foreground text-[11px] font-medium tracking-[0.14em] uppercase">
                    {solution.code}
                  </span>
                  <span className="flex items-center justify-between gap-3">
                    <span className={itemHeadingClassName}>
                      {solution.title}
                    </span>
                    <ArrowRight
                      className="text-muted-foreground size-4 shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("ctaEyebrow")}
            </p>
            <h3 className={sectionHeadingClassName}>{t("ctaTitle")}</h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("ctaLead")}
            </p>
          </div>
          <Link
            href="/pricing#request-quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 shrink-0 gap-2 px-5",
            )}
          >
            {tCommon("requestQuote")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
