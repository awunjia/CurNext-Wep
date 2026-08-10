import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { resourceGroups, resourcesPage } from "@/config/resources";
import { siteConfig } from "@/config/site";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

export function ResourcesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="resources-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 id="resources-heading" className={sectionHeadingClassName}>
              {resourcesPage.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {resourcesPage.description}
            </p>
          </div>
        </div>
      </section>

      {resourceGroups.map((group) => {
        const headingId = `resources-${group.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`;
        return (
        <section
          key={group.title}
          aria-labelledby={headingId}
          className="border-border/60 relative w-full border-t bg-background"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
            <div className="max-w-2xl">
              <h2 id={headingId} className={sectionHeadingClassName}>
                {group.title}
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                {group.lead}
              </p>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => {
                const className =
                  "border-border/70 hover:border-foreground/40 flex h-full flex-col rounded-lg border p-5 transition-colors";
                const content = (
                  <>
                    <h3 className={itemHeadingClassName}>{item.title}</h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {item.description}
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

                return (
                  <li key={item.href + item.title} className="min-w-0">
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link href={item.href} className={className}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        );
      })}

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Need something else
            </p>
            <h2 className={sectionHeadingClassName}>Ask the CurNext team</h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              If a guide is not listed yet, send a message and we will point you
              to the right material.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 px-5",
              )}
            >
              Contact
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={siteConfig.links.docs}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
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
