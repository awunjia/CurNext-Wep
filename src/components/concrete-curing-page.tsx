import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import {
  BrickWall,
  ClipboardCheck,
  Gauge,
  Thermometer,
  Timer,
  Wind,
} from "lucide-react";

import {
  SolutionAeoDefinition,
  SolutionAeoFaq,
  buildSolutionFaq,
  buildSolutionSteps,
} from "@/components/solution-aeo-sections";
import { SolutionProductJsonLd } from "@/components/solution-product-json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const outcomeKeys = ["1", "2", "3", "4"] as const;
const problemKeys = ["1", "2", "3"] as const;
const stepKeys = ["1", "2", "3", "4"] as const;
const trustKeys = ["1", "2", "3", "4"] as const;
const problemIcons = [Timer, Gauge, ClipboardCheck] as const;
const probeIcons = [Wind, Thermometer, Gauge] as const;
const probeKeys = ["1", "2", "3"] as const;

export async function ConcreteCuringPage() {
  const locale = await getLocale();
  const t = await getTranslations("solutions.concrete-curing");
  const tShared = await getTranslations("solutions.shared");
  const tNav = await getTranslations("nav");

  const faq = buildSolutionFaq(t);
  const steps = buildSolutionSteps(t, stepKeys);

  return (
    <main className="flex flex-1 flex-col">
      <SolutionProductJsonLd
        locale={locale}
        path="/solutions/concrete-curing"
        name={t("productName")}
        sku="CN-CC"
        description={t("metaDescription")}
        definition={t("definition")}
        imagePath="/solutions/cn-cc-hero.jpg"
        faq={faq}
        steps={steps}
        homeLabel={tNav("home")}
        solutionsLabel={tNav("solutions")}
        breadcrumbName={t("breadcrumbName")}
        howToName={t("howToName")}
        category={t("schemaCategory")}
        audienceType={t("schemaAudienceType")}
        offerDescription={t("schemaOfferDescription")}
      />

      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/solutions/cn-cc-hero.jpg"
            alt={t("heroAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a_0%,rgba(11,61,92,0.88)_38%,rgba(11,61,92,0.45)_68%,rgba(11,61,92,0.28)_100%)]"
          />
        </div>
        <div className="relative mx-auto flex min-h-[78svh] w-full max-w-6xl items-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[85svh] md:pb-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
              CN-CC
            </p>
            <p className="mb-3 text-lg font-semibold tracking-tight !text-white sm:text-xl">
              {tShared("brand")}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight !text-white sm:text-3xl md:text-4xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t("heroLead")}
            </p>
          </div>
        </div>
      </section>

      <SolutionAeoDefinition t={t} />

      <section aria-labelledby="cn-cc-outcomes-heading" className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("outcomesEyebrow")}
            </p>
            <h3 id="cn-cc-outcomes-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
              {t("outcomesTitle")}
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">{t("outcomesLead")}</p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-2 sm:gap-x-12">
            {outcomeKeys.map((key) => (
              <li key={key} className="min-w-0">
                <h4 className="text-base font-semibold tracking-tight sm:text-lg">{t(`outcomes.${key}.title`)}</h4>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">{t(`outcomes.${key}.body`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cn-cc-challenge-heading" className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("challengeEyebrow")}
            </p>
            <h3 id="cn-cc-challenge-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
              {t("challengeTitle")}
            </h3>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-3 sm:gap-x-10">
            {problemKeys.map((key, index) => {
              const Icon = problemIcons[index];
              return (
                <li key={key} className="min-w-0">
                  <div className="mb-2 flex flex-row items-center gap-3 sm:mb-0 sm:flex-col sm:items-start sm:gap-0">
                    <div className="bg-muted/60 text-foreground flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 sm:mb-4 sm:size-11">
                      <Icon className="size-4 sm:size-5" aria-hidden />
                    </div>
                    <h4 className="text-base font-semibold tracking-tight sm:text-lg">{t(`problems.${key}.title`)}</h4>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">{t(`problems.${key}.body`)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cn-cc-what-heading" className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">CN-CC</p>
              <h3 id="cn-cc-what-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">{t("whatTitle")}</h3>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">{t("whatBody")}</p>
              <p className="border-border mt-6 border-l-2 pl-4 text-sm leading-relaxed sm:text-[15px]">
                <span className="font-medium">{t("noteLabel")}</span>{" "}
                <span className="text-muted-foreground">{t("noteBody")}</span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
              <Image
                src="/solutions/cn-cc-hero.jpg"
                alt={t("whatAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="border-border/60 mt-14 border-t pt-14 sm:mt-16 sm:pt-16 md:mt-20 md:pt-20">
            <div className="max-w-2xl">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
                {t("readinessEyebrow")}
              </p>
              <h4 id="cn-cc-readiness-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
                {t("readinessTitle")}
              </h4>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                {t("readinessLead")}
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
              <li className="min-w-0">
                <h5 className="text-base font-semibold tracking-tight sm:text-lg">
                  {t("readiness.physics.title")}
                </h5>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {t("readiness.physics.body")}
                </p>
              </li>
              <li className="min-w-0">
                <h5 className="text-base font-semibold tracking-tight sm:text-lg">
                  {t("readiness.xgboost.title")}
                </h5>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {t("readiness.xgboost.body")}
                </p>
              </li>
            </ul>
            <p className="border-border mt-8 border-l-2 pl-4 text-sm leading-relaxed sm:text-[15px]">
              <span className="font-medium">{t("readinessRailLabel")}</span>{" "}
              <span className="text-muted-foreground">{t("readinessRailBody")}</span>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="cn-cc-how-heading" className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">{tShared("howItWorks")}</p>
            <h3 id="cn-cc-how-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">{t("howTitle")}</h3>
          </div>
          <ol className="mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {stepKeys.map((key, index) => (
              <li key={key} className="min-w-0">
                <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.2em] uppercase">0{index + 1}</p>
                  <h4 className="text-base font-semibold tracking-tight sm:mt-2 sm:text-lg">{t(`steps.${key}.title`)}</h4>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-[15px]">{t(`steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="cn-cc-probes-heading" className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">{t("probesEyebrow")}</p>
            <h3 id="cn-cc-probes-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">{t("probesTitle")}</h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">{t("probesLead")}</p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {probeKeys.map((key, index) => {
              const Icon = probeIcons[index];
              return (
                <li key={key} className="min-w-0">
                  <div className="mb-2 flex flex-row items-center gap-3 sm:mb-0 sm:flex-col sm:items-start sm:gap-0">
                    <div className="bg-muted/60 text-foreground flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/60 sm:mb-4"><Icon className="size-5" aria-hidden /></div>
                    <h4 className="text-base font-semibold tracking-tight sm:text-lg">{t(`probes.${key}.name`)}</h4>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">{t(`probes.${key}.role`)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section aria-labelledby="cn-cc-trust-heading" className="border-border/60 relative w-full border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">{t("trustEyebrow")}</p>
            <h3 id="cn-cc-trust-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">{t("trustTitle")}</h3>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-12 sm:grid-cols-4">
            {trustKeys.map((key) => (
              <div key={key} className="min-w-0">
                <dt className="text-base font-semibold tracking-tight sm:text-lg">{t(`trust.${key}.label`)}</dt>
                <dd className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{t(`trust.${key}.detail`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <SolutionAeoFaq t={t} />
      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">{tShared("nextStep")}</p>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{t("ctaTitle")}</h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">{t("ctaLead")}</p>
          </div>
          <Link href="/pricing#request-quote" className={cn(buttonVariants({ size: "lg" }), "h-11 shrink-0 gap-2 px-5")}>
            <BrickWall className="size-4" aria-hidden />
            {tShared("requestQuote")}
          </Link>
        </div>
      </section>
    </main>
  );
}
