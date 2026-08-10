import { Check } from "lucide-react";

import { PaymentMethodsCarousel } from "@/components/payment-methods-carousel";
import { PricingEstimator } from "@/components/pricing-estimator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  pricingPlatformIncludes,
  pricingSetupIncludes,
} from "@/config/pricing";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";

const faqs = [
  {
    q: "Is hardware sold separately?",
    a: "No. Hardware is leased, not sold, and remains CurNext property. At the end of the engagement CurNext dismantles and collects it. You are responsible for keeping the hardware safe and intact while it is on site.",
  },
  {
    q: "How is the price calculated?",
    a: "Use the estimator: pick Finland, Canada, or Cameroon, set nodes and duration. Installation follows node bands; subscription is per node per month for that market.",
  },
  {
    q: "What's included in installation?",
    a: "Deployment, nodes and gateways as scoped, calibration, commissioning, BIM mapping, initial readiness model, training, OTA, and OTAA. When readiness is reached for concrete curing, a certificate is provided.",
  },
  {
    q: "Where do you operate?",
    a: "We currently operate in Cameroon, Canada, and Finland. Expansion to additional markets is underway.",
  },
  {
    q: "How do payments work?",
    a: "Installation is paid once - no installments. Monthly subscription can be deferred for a small added fee when you need to push a payment.",
  },
  {
    q: "Is there a free trial?",
    a: "No free trial. We run campaigns and coupons from time to time - ask sales what is available for your project.",
  },
  {
    q: "What if CurNext cannot fulfill its promises?",
    a: "If CurNext is unable to fulfill its commitments, we offer refund and damages according to the agreement scoped for your project.",
  },
  {
    q: "Can we get a fixed quote?",
    a: "Yes - request a quote with the estimate from the calculator. Surfaces and timeline refine the final scope.",
  },
] as const;

export function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="pricing-estimator-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Pricing
            </p>
            <h1
              id="pricing-estimator-heading"
              className={sectionHeadingClassName}
            >
              Price your site by nodes and duration
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Independent list prices for Finland, Canada, and Cameroon. Set
              nodes and months - installation and subscription update live.
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
              FAQ
            </p>
            <h3 id="pricing-faq-heading" className={sectionHeadingClassName}>
              Common questions
            </h3>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 lg:mt-12 lg:grid-cols-2 lg:gap-x-12">
            <Accordion className="border-border/70 h-fit border-y">
              {faqs.slice(0, Math.ceil(faqs.length / 2)).map((item, index) => (
                <AccordionItem key={item.q} value={`faq-a-${index}`}>
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
              {faqs.slice(Math.ceil(faqs.length / 2)).map((item, index) => (
                <AccordionItem key={item.q} value={`faq-b-${index}`}>
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
              Included
            </p>
            <h3
              id="pricing-includes-heading"
              className={sectionHeadingClassName}
            >
              What you get
            </h3>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0">
            <div>
              <h4 className={itemHeadingClassName}>Installation</h4>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-6">
                {pricingSetupIncludes.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-start gap-2 text-sm leading-relaxed sm:text-[15px]"
                  >
                    <Check
                      className="text-foreground mt-0.5 size-3.5 shrink-0"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={itemHeadingClassName}>Platform subscription</h4>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-6">
                {pricingPlatformIncludes.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-start gap-2 text-sm leading-relaxed sm:text-[15px]"
                  >
                    <Check
                      className="text-foreground mt-0.5 size-3.5 shrink-0"
                      aria-hidden
                    />
                    {item}
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
