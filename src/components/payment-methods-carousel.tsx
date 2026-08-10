import { paymentMethods } from "@/config/payments";
import { sectionHeadingClassName } from "@/lib/typography";

/**
 * Static horizontal row of payment marks (not a carousel). Logos are
 * unmodified brand assets shown at equal prominence.
 */
export function PaymentMethodsCarousel() {
  return (
    <section
      aria-labelledby="payment-methods-heading"
      className="border-border/60 relative w-full border-t bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            Payments
          </p>
          <h3 id="payment-methods-heading" className={sectionHeadingClassName}>
            Payment methods we accept
          </h3>
        </div>

        <div className="mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:mt-12 sm:overflow-visible sm:px-0">
          <ul className="flex w-max min-w-full flex-nowrap items-center justify-between gap-2 sm:gap-3 md:gap-2">
            {paymentMethods.map((method) => (
              <li key={method.name} className="shrink-0 md:min-w-0 md:shrink md:flex-1">
                <figure
                  title={method.name}
                  className="border-border/60 group relative flex h-12 w-[3.75rem] items-center justify-center rounded-lg border bg-white px-1.5 py-1 sm:h-14 sm:w-[4.75rem] sm:px-2 sm:py-1.5 md:h-16 md:w-full md:max-w-[6.25rem] md:mx-auto dark:bg-muted"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${method.src}?v=3`}
                    alt={`${method.name} logo`}
                    width={100}
                    height={64}
                    className="payment-logo h-full max-h-8 w-full object-contain sm:max-h-10 md:max-h-11"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-[11px] font-medium whitespace-nowrap text-background opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                    {method.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
