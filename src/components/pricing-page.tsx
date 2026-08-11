import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { PaymentMethodsCarousel } from "@/components/payment-methods-carousel";
import { PricingEstimator } from "@/components/pricing-estimator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";

const faqKeys = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;
const setupKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;
const platformKeys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
] as const;

export async function PricingPage() {
  const t = await getTranslations("pricing");
  const faqs = faqKeys.map((key) => ({
    key,
    q: t(`faq.${key}.q`),
    a: t(`faq.${key}.a`),
  }));
  const mid = Math.ceil(faqs.length / 2);

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="pricing-estimator-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("eyebrow")}
            </p>
            <h1
              id="pricing-estimator-heading"
              className={sectionHeadingClassName}
            >
              {t("title")}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("lead")}
            </p>
          </div>

          <div className="mt-10 sm:mt-12">
            <PricingEstimator />
          </div>
        </div>
      </section>

      <PaymentMethodsCarousel />

      <section
        aria-labelledby="pricing-faq-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("faqEyebrow")}
            </p>
            <h3 id="pricing-faq-heading" className={sectionHeadingClassName}>
              {t("faqTitle")}
            </h3>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 lg:mt-12 lg:grid-cols-2 lg:gap-x-12">
            <Accordion className="border-border/70 h-fit border-y">
              {faqs.slice(0, mid).map((item, index) => (
                <AccordionItem key={item.key} value={`faq-a-${index}`}>
                  <AccordionTrigger className="py-4 text-base font-semibold tracking-tight hover:no-underline sm:text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed sm:text-[15px]">
                    <p>{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Accordion className="border-border/70 h-fit border-b max-lg:border-t-0 lg:border-y">
              {faqs.slice(mid).map((item, index) => (
                <AccordionItem key={item.key} value={`faq-b-${index}`}>
                  <AccordionTrigger className="py-4 text-base font-semibold tracking-tight hover:no-underline sm:text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed sm:text-[15px]">
                    <p>{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="pricing-includes-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {t("includesEyebrow")}
            </p>
            <h3
              id="pricing-includes-heading"
              className={sectionHeadingClassName}
            >
              {t("includesTitle")}
            </h3>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0">
            <div>
              <h4 className={itemHeadingClassName}>{t("installation")}</h4>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-6">
                {setupKeys.map((key) => (
                  <li
                    key={key}
                    className="text-muted-foreground flex items-start gap-2 text-sm leading-relaxed sm:text-[15px]"
                  >
                    <Check
                      className="text-foreground mt-0.5 size-3.5 shrink-0"
                      aria-hidden
                    />
                    {t(`setupIncludes.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={itemHeadingClassName}>
                {t("platformSubscription")}
              </h4>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-6">
                {platformKeys.map((key) => (
                  <li
                    key={key}
                    className="text-muted-foreground flex items-start gap-2 text-sm leading-relaxed sm:text-[15px]"
                  >
                    <Check
                      className="text-foreground mt-0.5 size-3.5 shrink-0"
                      aria-hidden
                    />
                    {t(`platformIncludes.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
