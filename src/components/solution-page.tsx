import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SolutionPageProps = {
  code: string;
  title: string;
  description: string;
};

export async function SolutionPage({
  code,
  title,
  description,
}: SolutionPageProps) {
  const t = await getTranslations("solutions.solutionPage");

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative w-full bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            {code}
          </p>
          <h1 className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <Link
              href="/pricing#request-quote"
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
            >
              {t("requestQuote")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/solutions"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 px-5",
              )}
            >
              {t("allSolutions")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
