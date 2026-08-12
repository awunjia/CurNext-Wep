import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import {
  architectureDeployAnywhere,
  architecturePrinciples,
} from "@/config/architecture";
import { Link } from "@/i18n/navigation";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type Layer = {
  id: string;
  role: string;
  product: string;
  title: string;
  body: string;
  bullets: string[];
};

type FlowStep = { from: string; to: string; path: string };

type Principle = { title: string; body: string };

export async function ArchitecturePage() {
  const t = await getTranslations("architecture");
  const page = t.raw("page") as {
    title: string;
    description: string;
    leadNote: string;
  };
  const layers = t.raw("layers") as Layer[];
  const flow = t.raw("flow") as {
    title: string;
    lead: string;
    steps: FlowStep[];
  };
  const principles = (t.has("principles")
    ? t.raw("principles")
    : architecturePrinciples) as {
    title: string;
    items: Principle[];
  };
  const deployAnywhere = (t.has("deployAnywhere")
    ? t.raw("deployAnywhere")
    : architectureDeployAnywhere) as {
    title: string;
    body: string;
  };

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="architecture-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("eyebrow")}
            </p>
            <h1 id="architecture-heading" className={sectionHeadingClassName}>
              {page.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {page.description}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {page.leadNote}
            </p>
          </div>

          <ol className="border-border/70 mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border/70 sm:mt-14 sm:grid-cols-5">
            {layers.map((layer, index) => (
              <li
                key={layer.id}
                className="bg-background flex flex-col gap-1 px-4 py-4 sm:px-5 sm:py-5"
              >
                <span className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">
                  {String(index + 1).padStart(2, "0")} · {layer.role}
                </span>
                <span className="text-sm font-semibold tracking-tight">
                  {layer.id}
                </span>
                <span className="text-muted-foreground text-xs">
                  {layer.product}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="architecture-layers-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="architecture-layers-heading"
              className={sectionHeadingClassName}
            >
              {t("layersTitle")}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("layersLead")}
            </p>
          </div>

          <ol className="relative mt-12 space-y-0 sm:mt-14">
            <div
              aria-hidden
              className="bg-border absolute top-3 bottom-3 left-[1.15rem] w-px sm:left-[1.35rem]"
            />
            {layers.map((layer) => {
              const isProduct = layer.id === "L5";
              return (
                <li
                  key={layer.id}
                  id={layer.id.toLowerCase()}
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
                      {layer.id.replace("L", "")}
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
                        {layer.id} · {layer.role}
                      </p>
                      <p className="text-[11px] font-medium tracking-[0.14em] uppercase">
                        {layer.product}
                      </p>
                    </div>
                    <h3 className={cn(itemHeadingClassName, "mt-2")}>
                      {layer.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-[15px]">
                      {layer.body}
                    </p>
                    {layer.bullets.length > 0 ? (
                      <ul className="text-muted-foreground mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                        {layer.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="architecture-flow-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="architecture-flow-heading"
              className={sectionHeadingClassName}
            >
              {flow.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {flow.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {flow.steps.map((step) => (
              <li
                key={`${step.from}-${step.to}-${step.path}`}
                className="border-border/70 rounded-lg border px-5 py-4"
              >
                <p className="text-sm font-semibold tracking-tight">
                  {step.from} → {step.to}
                </p>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {step.path}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="architecture-deploy-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="border-border/70 max-w-3xl rounded-xl border px-5 py-6 sm:px-8 sm:py-8">
            <h2
              id="architecture-deploy-heading"
              className={sectionHeadingClassName}
            >
              {deployAnywhere.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {deployAnywhere.body}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="architecture-principles-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="architecture-principles-heading"
              className={sectionHeadingClassName}
            >
              {principles.title}
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-10">
            {principles.items.map((item) => (
              <li key={item.title} className="min-w-0">
                <h3 className={itemHeadingClassName}>{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/how-it-works"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t("ctaHowItWorks")}
            </Link>
            <Link
              href="/data/security"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t("ctaSecurity")}
            </Link>
            <Link href="/docs" className={cn(buttonVariants())}>
              {t("ctaDocs")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
