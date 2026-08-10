import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function buildPlaceholderMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 md:py-24">
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase sm:text-sm">
        Coming soon
      </p>
      <h1 className="text-3xl font-semibold tracking-tight break-words sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
        {description}
      </p>
      <p className="text-muted-foreground mt-6 text-sm sm:mt-8">
        This page is reserved in the CurNext marketing site and will be
        implemented next.
      </p>
    </main>
  );
}
