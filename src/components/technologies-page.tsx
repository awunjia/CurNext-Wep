import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { partners } from "@/config/partners";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

function partnerByName(name: string) {
  return partners.find((partner) => partner.name === name);
}
export async function TechnologiesPage() {
  const t = await getTranslations("technologies");
  const technologiesConnectivity = t.raw("technologiesConnectivity") as typeof import("@/config/technologies").technologiesConnectivity;
  const technologiesData = t.raw("technologiesData") as typeof import("@/config/technologies").technologiesData;
  const technologiesEcosystem = t.raw("technologiesEcosystem") as typeof import("@/config/technologies").technologiesEcosystem;
  const technologiesPage = t.raw("technologiesPage") as typeof import("@/config/technologies").technologiesPage;
  const technologiesProducts = t.raw("technologiesProducts") as typeof import("@/config/technologies").technologiesProducts;
  const technologiesSecurity = t.raw("technologiesSecurity") as typeof import("@/config/technologies").technologiesSecurity;
  const technologiesSoftware = t.raw("technologiesSoftware") as typeof import("@/config/technologies").technologiesSoftware;

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="technologies-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 id="technologies-heading" className={sectionHeadingClassName}>
              {technologiesPage.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {technologiesPage.description}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {technologiesPage.leadNote}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="technologies-connectivity-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="technologies-connectivity-heading"
              className={sectionHeadingClassName}
            >
              {technologiesConnectivity.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {technologiesConnectivity.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {technologiesConnectivity.items.map((item) => (
              <li key={item.title} className="min-w-0">
                <h3 className={itemHeadingClassName}>{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="technologies-products-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="technologies-products-heading"
              className={sectionHeadingClassName}
            >
              Field product lines
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              SKUs you already see across Solutions - same stack, different site
              jobs.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technologiesProducts.map((product) => (
              <li key={product.sku} className="min-w-0">
                <Link
                  href={product.href}
                  className="border-border/70 hover:border-foreground/40 flex h-full flex-col rounded-lg border p-5 transition-colors"
                >
                  <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
                    {product.sku}
                  </p>
                  <h3 className={cn(itemHeadingClassName, "mt-1")}>
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                    {product.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    View solution
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="technologies-data-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="technologies-data-heading"
              className={sectionHeadingClassName}
            >
              {technologiesData.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {technologiesData.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {technologiesData.items.map((item) => (
              <li key={item.title} className="min-w-0">
                <h3 className={itemHeadingClassName}>{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="technologies-software-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="technologies-software-heading"
              className={sectionHeadingClassName}
            >
              {technologiesSoftware.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {technologiesSoftware.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technologiesSoftware.items.map((item) => {
              const className =
                "border-border/70 hover:border-foreground/40 flex h-full flex-col rounded-lg border p-5 transition-colors";
              const content = (
                <>
                  <h3 className={itemHeadingClassName}>{item.title}</h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                    {item.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    Open
                    {item.external ? (
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    ) : (
                      <ArrowRight className="size-3.5" aria-hidden />
                    )}
                  </span>
                </>
              );

              if (item.external) {
                return (
                  <li key={item.title} className="min-w-0">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {content}
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.title} className="min-w-0">
                  <Link href={item.href} className={className}>
                    {content}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="technologies-security-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="technologies-security-heading"
              className={sectionHeadingClassName}
            >
              {technologiesSecurity.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {technologiesSecurity.lead}
            </p>
          </div>
          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {technologiesSecurity.items.map((item) => (
              <li key={item.title} className="min-w-0">
                <h3 className={itemHeadingClassName}>{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="technologies-ecosystem-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="technologies-ecosystem-heading"
              className={sectionHeadingClassName}
            >
              Ecosystem
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              The same technology partners shown on the home page, grouped by
              role in the stack.
            </p>
          </div>

          <div className="mt-10 space-y-10 sm:mt-12">
            {technologiesEcosystem.map((group) => (
              <div key={group.title}>
                <h3 className={itemHeadingClassName}>{group.title}</h3>
                <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
                  {group.names.map((name) => {
                    const partner = partnerByName(name);
                    if (!partner) return null;
                    return (
                      <li key={name} className="min-w-0">
                        <a
                          href={partner.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={partner.name}
                          className="partner-link group border-border/70 hover:border-foreground/40 flex h-full flex-col items-center justify-center gap-1.5 rounded-lg border p-3 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-4"
                        >
                          <Image
                            src={partner.src}
                            alt={partner.name}
                            width={96}
                            height={32}
                            className="partner-logo h-7 w-auto max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                            unoptimized
                          />
                          <span className="pointer-events-none max-w-full truncate px-0.5 text-center text-[11px] font-medium text-foreground/0 transition-colors duration-200 group-hover:text-foreground group-focus-visible:text-foreground sm:text-xs">
                            {partner.name}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Next step
            </p>
            <h2 className={sectionHeadingClassName}>
              Dig into APIs, SDKs, or firmware
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Public developer and operations overviews stay high level. For
              site rollout detail, talk to sales.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/api"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 px-5",
              )}
            >
              API overview
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 gap-2 px-5",
              )}
            >
              Contact
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={siteConfig.links.docs}
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "h-11 gap-2 px-5",
              )}
            >
              Docs
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
