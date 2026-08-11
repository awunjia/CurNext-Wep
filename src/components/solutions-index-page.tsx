import {
  Activity,
  ArrowRight,
  BrickWall,
  CircuitBoard,
  Droplets,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import {
  SolutionAeoDefinition,
  SolutionAeoFaq,
  buildSolutionFaq,
} from "@/components/solution-aeo-sections";
import { SolutionsCatalogJsonLd } from "@/components/solutions-catalog-json-ld";
import { buttonVariants } from "@/components/ui/button";
import { solutions } from "@/config/site";
import { Link } from "@/i18n/navigation";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const solutionIcons: Record<(typeof solutions)[number]["href"], LucideIcon> = {
  "/solutions/concrete-curing": BrickWall,
  "/solutions/wall-drying": Droplets,
  "/solutions/indoor-air": Wind,
  "/solutions/leak-detection": Waves,
  "/solutions/structural-health": Activity,
  "/solutions/mep": CircuitBoard,
};

const solutionMessageKeys = [
  "concrete-curing",
  "wall-drying",
  "indoor-air",
  "leak-detection",
  "structural-health",
  "mep",
] as const;

export async function SolutionsIndexPage() {
  const locale = await getLocale();
  const t = await getTranslations("solutions.index");
  const tShared = await getTranslations("solutions.shared");
  const faq = buildSolutionFaq(t);

  return (
    <main className="flex flex-1 flex-col">
      <SolutionsCatalogJsonLd
        locale={locale}
        title={t("metaTitle")}
        description={t("metaDescription")}
        faq={faq}
      />

      <section
        aria-labelledby="solutions-index-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("eyebrow")}
            </p>
            <h1 id="solutions-index-heading" className={sectionHeadingClassName}>
              {t("title")}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("lead")}
            </p>
          </div>
        </div>
      </section>

      <SolutionAeoDefinition t={t} />

      <section
        aria-labelledby="solutions-catalog-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("catalogEyebrow")}
            </p>
            <h2
              id="solutions-catalog-heading"
              className={sectionHeadingClassName}
            >
              {t("catalogTitle")}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("catalogLead")}
            </p>
          </div>

          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => {
              const key = solutionMessageKeys[index];
              const Icon = solutionIcons[solution.href];
              return (
                <li key={solution.href} className="min-w-0">
                  <Link
                    href={solution.href}
                    className="group border-border/70 hover:border-foreground/40 flex h-full flex-col rounded-lg border p-5 transition-colors outline-none"
                  >
                    <span className="bg-muted/60 text-foreground mb-4 flex size-10 items-center justify-center rounded-xl border border-border/60">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                      {solution.code}
                    </span>
                    <h3 className={cn(itemHeadingClassName, "mt-2")}>
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {t(`items.${key}.summary`)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                      {t("openSolution")}
                      <ArrowRight
                        className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <SolutionAeoFaq t={t} />

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {tShared("nextStep")}
            </p>
            <h2 className={sectionHeadingClassName}>{t("ctaTitle")}</h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("ctaLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pricing#request-quote"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 shrink-0 gap-2 px-5",
              )}
            >
              {tShared("requestQuote")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 shrink-0 px-5",
              )}
            >
              {tShared("contact")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
