import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/config/site";
import { sectionHeadingClassName } from "@/lib/typography";

type LegalDocumentPageProps = {
  titleKey:
    | "privacyTitle"
    | "cookiesTitle"
    | "termsTitle"
    | "gdprTitle"
    | "securityPolicyTitle"
    | "termsOfServiceTitle";
  descriptionKey?: string;
};

export async function LegalDocumentPage({
  titleKey,
}: LegalDocumentPageProps) {
  const tPages = await getTranslations("pages");
  const tLegal = await getTranslations("legal");
  const tCommon = await getTranslations("common");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 md:py-24">
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase sm:text-sm">
        {tLegal("comingSoon")}
      </p>
      <h1 className={sectionHeadingClassName}>{tPages(titleKey)}</h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
        {tLegal("reserved")}
      </p>
      <p className="text-muted-foreground mt-6 text-sm leading-relaxed sm:mt-8">
        {tCommon("legalTranslationNote")}
      </p>
      <p className="text-muted-foreground mt-4 text-sm">
        {siteConfig.name}
      </p>
    </main>
  );
}
