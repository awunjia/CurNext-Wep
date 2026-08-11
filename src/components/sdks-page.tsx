"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  SDK_API_DOCS_URL,
  sdkPackages as sdkPackagesConfig,
  withLiveSdkVersion,
  type SdkLanguageId,
  type SdkPackage,
  type SdkRegistry,
  type SdkStatus,
} from "@/config/sdk-packages";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const codeBlockClass =
  "border-border/70 bg-muted/40 overflow-x-auto rounded-lg border p-4 font-mono text-[12px] leading-relaxed whitespace-pre text-foreground sm:text-[13px]";

const languageLogos: Record<
  SdkLanguageId,
  { src: string; alt: string; width: number; height: number }
> = {
  javascript: {
    src: "/sdks/javascript.svg",
    alt: "JavaScript",
    width: 28,
    height: 28,
  },
  php: {
    src: "/sdks/php.svg",
    alt: "PHP",
    width: 40,
    height: 22,
  },
  go: {
    src: "/sdks/go.svg",
    alt: "Go",
    width: 48,
    height: 18,
  },
  python: {
    src: "/sdks/python.svg",
    alt: "Python",
    width: 28,
    height: 28,
  },
  java: {
    src: "/sdks/java.svg",
    alt: "Java",
    width: 22,
    height: 32,
  },
  flutter: {
    src: "/sdks/flutter.svg",
    alt: "Flutter",
    width: 28,
    height: 28,
  },
};

function statusBadgeClass(status: SdkStatus): string {
  switch (status) {
    case "live":
      return "border-emerald-600/50 text-emerald-700 dark:text-emerald-400";
    case "beta":
      return "border-amber-500/60 text-amber-700 dark:text-amber-400";
    case "coming_soon":
      return "border-border text-muted-foreground";
  }
}

function BrandIcon({
  id,
  className,
}: {
  id: SdkLanguageId;
  className?: string;
}) {
  const logo = languageLogos[id];
  return (
    <span
      className={cn(
        "relative flex h-8 w-10 shrink-0 items-center justify-start",
        className,
      )}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="h-7 w-auto max-w-10 object-contain object-left"
        unoptimized
      />
    </span>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label} copied`);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        buttonVariants({ size: "sm", variant: "outline" }),
        "h-8 gap-1.5 px-2.5",
      )}
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodePanel({
  title,
  code,
  copyLabel,
}: {
  title: string;
  code: string;
  copyLabel: string;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h4 className="text-sm font-medium tracking-tight">{title}</h4>
        <CopyButton text={code} label={copyLabel} />
      </div>
      <pre className={codeBlockClass}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function SdksPage() {
  const t = useTranslations("sdks");
  const sdkHero = t.raw("hero") as {
    eyebrow: string;
    title: string;
    lead: string;
  };
  const sdkPageHeader = t.raw("header") as {
    title: string;
    description: string;
  };
  const sdkIntroRaw = t.raw("intro") as {
    heading: string;
    paragraph: string;
    docsLabel: string;
    useCases: Array<{ title: string; body: string }>;
  };
  const sdkIntro = {
    ...sdkIntroRaw,
    docsHref: SDK_API_DOCS_URL,
  };
  const packageCopy = t.raw("packages") as Record<
    string,
    {
      name: string;
      short: string;
      stack: string;
      summary: string;
      highlights: string[];
      quickStart: string;
      errorHandling: string;
    }
  >;

  function statusBadgeLabel(status: SdkStatus): string {
    return t(`status.${status}`);
  }

  function registryButtonLabel(registry: SdkRegistry): string {
    // next-intl forbids "." in keys (nesting); map registry ids to safe keys
    const key = registry.replaceAll(".", "_");
    return t(`registry.${key}`);
  }

  function cardVersionLine(
    status: SdkStatus,
    version: string | undefined,
  ): string {
    if (status === "coming_soon" || !version) {
      return t("notPublished");
    }
    const display = version.startsWith("v") ? version : `v${version}`;
    if (status === "beta") {
      return t("betaVersionLine", { version: display });
    }
    return t("versionLine", { version: display });
  }

  const localizedPackages: SdkPackage[] = sdkPackagesConfig.map((pkg) => {
    const copy = packageCopy[pkg.id];
    if (!copy) return pkg;
    return {
      ...pkg,
      name: copy.name,
      short: copy.short,
      stack: copy.stack,
      summary: copy.summary,
      highlights: copy.highlights,
      quickStart: copy.quickStart || pkg.quickStart,
      errorHandling: copy.errorHandling || pkg.errorHandling,
    };
  });

  const [selectedId, setSelectedId] =
    useState<SdkLanguageId>("javascript");
  const [packages, setPackages] = useState<SdkPackage[]>(() =>
    sdkPackagesConfig.map((pkg) => {
      const copy = packageCopy[pkg.id];
      if (!copy) return pkg;
      return {
        ...pkg,
        name: copy.name,
        short: copy.short,
        stack: copy.stack,
        summary: copy.summary,
        highlights: copy.highlights,
        quickStart: copy.quickStart || pkg.quickStart,
        errorHandling: copy.errorHandling || pkg.errorHandling,
      };
    }),
  );

  useEffect(() => {
    let cancelled = false;
    const base = sdkPackagesConfig.map((pkg) => {
      const copy = packageCopy[pkg.id];
      if (!copy) return pkg;
      return {
        ...pkg,
        name: copy.name,
        short: copy.short,
        stack: copy.stack,
        summary: copy.summary,
        highlights: copy.highlights,
        quickStart: copy.quickStart || pkg.quickStart,
        errorHandling: copy.errorHandling || pkg.errorHandling,
      };
    });
    setPackages(base);

    async function loadVersions() {
      try {
        const res = await fetch("/api/sdk/versions");
        if (!res.ok) return;
        const data = (await res.json()) as {
          versions?: Partial<Record<SdkLanguageId, string>>;
        };
        if (cancelled || !data.versions) return;
        setPackages(
          base.map((pkg) =>
            withLiveSdkVersion(pkg, data.versions?.[pkg.id]),
          ),
        );
      } catch {
        // Keep fallback versions from catalog.
      }
    }

    void loadVersions();
    return () => {
      cancelled = true;
    };
  }, [t]);

  const selected =
    packages.find((pkg) => pkg.id === selectedId) ?? packages[0];

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="sdks-hero-heading"
        className="relative w-full bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {sdkHero.eyebrow}
            </p>
            <h1 id="sdks-hero-heading" className={sectionHeadingClassName}>
              {sdkHero.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {sdkHero.lead}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sdks-intro-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 id="sdks-intro-heading" className={sectionHeadingClassName}>
              {sdkIntro.heading}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {sdkIntro.paragraph}{" "}
              <a
                href={sdkIntro.docsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-4 hover:underline"
              >
                {sdkIntro.docsLabel}
              </a>
            </p>
          </div>

          <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {sdkIntro.useCases.map((item) => (
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
        aria-labelledby="sdks-languages-heading"
        className="border-border/60 relative w-full border-t bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              {sdkPageHeader.title}
            </p>
            <h2
              id="sdks-languages-heading"
              className={sectionHeadingClassName}
            >
              Official CurNext SDKs
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {sdkPageHeader.description}
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {packages.map((pkg) => {
              const selectedCard = pkg.id === selected.id;
              return (
                <li key={pkg.id} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => setSelectedId(pkg.id)}
                    aria-pressed={selectedCard}
                    className={cn(
                      "hover:border-foreground/40 flex h-full w-full flex-col items-start gap-3 rounded-lg border-2 border-border/70 bg-background p-4 text-left transition-colors",
                      selectedCard && "border-foreground bg-muted/30",
                    )}
                  >
                    <BrandIcon id={pkg.id} />
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
                        {pkg.short}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs leading-snug">
                        {pkg.stack}
                      </p>
                    </div>
                    <p className="text-muted-foreground mt-auto font-mono text-[11px]">
                      {cardVersionLine(pkg.status, pkg.version)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          {selected ? (
            <div className="border-border/70 mt-10 rounded-lg border p-5 sm:mt-12 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <BrandIcon id={selected.id} />
                    <h3 className={itemHeadingClassName}>{selected.name}</h3>
                    <span
                      className={cn(
                        "rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase",
                        statusBadgeClass(selected.status),
                      )}
                    >
                      {statusBadgeLabel(selected.status)}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:text-[15px]">
                    {selected.summary}
                  </p>
                  <p className="text-muted-foreground mt-2 font-mono text-xs">
                    {selected.packageName}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.registryUrl && selected.status !== "coming_soon" ? (
                    <a
                      href={selected.registryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ size: "sm", variant: "outline" }),
                        "h-9 gap-1.5",
                      )}
                    >
                      {registryButtonLabel(selected.registry)}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  ) : null}
                  <a
                    href={SDK_API_DOCS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "h-9 gap-1.5",
                    )}
                  >
                    API docs
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {selected.highlights.map((chip) => (
                  <li
                    key={chip}
                    className="border-border/70 bg-muted/40 rounded-md border px-2.5 py-1 text-xs font-medium"
                  >
                    {chip}
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-8">
                <CodePanel
                  title="Install"
                  code={selected.install}
                  copyLabel="Install command"
                />
                <CodePanel
                  title="Quick start"
                  code={selected.quickStart}
                  copyLabel="Quick start"
                />
                <CodePanel
                  title="Error handling"
                  code={selected.errorHandling}
                  copyLabel="Error handling"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="dark relative w-full bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Get started
            </p>
            <h2 className={sectionHeadingClassName}>
              API keys live in the product
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Create a project API key (cn_live_...) under Integration, then
              authenticate with Bearer tokens. API access is available with your
              site subscription.
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
              Talk to sales
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href={SDK_API_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 gap-2 px-5",
              )}
            >
              Open playground
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
