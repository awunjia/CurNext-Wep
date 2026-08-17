import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Translate = {
  (key: string): string;
};

const faqKeys = ["1", "2", "3", "4", "5"] as const;

/** Direct-answer block for search and answer engines. */
export function SolutionAeoDefinition({ t }: { t: Translate }) {
  return (
    <section
      aria-labelledby="aeo-definition-heading"
      className="relative w-full bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            {t("definitionEyebrow")}
          </p>
          <h2
            id="aeo-definition-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {t("definitionTitle")}
          </h2>
          <p
            id="aeo-definition"
            className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg"
          >
            {t("definition")}
          </p>
        </div>
      </div>
    </section>
  );
}

/** FAQ block with extractable Q&A for AEO and FAQPage schema. */
export function SolutionAeoFaq({ t }: { t: Translate }) {
  return (
    <section
      id="aeo-faq"
      aria-labelledby="aeo-faq-heading"
      className="border-border/60 relative w-full border-t bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
            {t("faqEyebrow")}
          </p>
          <h2
            id="aeo-faq-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {t("faqTitle")}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {t("faqLead")}
          </p>
        </div>
        <Accordion className="border-border/70 mt-10 max-w-3xl border-y sm:mt-12">
          {faqKeys.map((key) => (
            <AccordionItem key={key} value={`faq-${key}`}>
              <AccordionTrigger className="py-4 text-base font-semibold tracking-tight hover:no-underline sm:text-lg">
                {t(`faq.${key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed sm:text-[15px]">
                {t(`faq.${key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function buildSolutionFaq(t: Translate) {
  return faqKeys.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }));
}

export function buildSolutionSteps(
  t: Translate,
  stepKeys: readonly string[] = ["1", "2", "3", "4"],
) {
  return stepKeys.map((key) => ({
    name: t(`steps.${key}.title`),
    text: t(`steps.${key}.body`),
  }));
}
