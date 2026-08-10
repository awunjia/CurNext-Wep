"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { docsPage, docsTabs } from "@/config/docs";
import { cn } from "@/lib/utils";

export function DocsPage() {
  const [tabId, setTabId] = useState(docsTabs[0]?.id ?? "overview");
  const [activeSection, setActiveSection] = useState<string>("");

  const tab = docsTabs.find((item) => item.id === tabId) ?? docsTabs[0];

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const byTab = docsTabs.find((item) => item.id === hash);
    if (byTab) {
      setTabId(byTab.id);
      return;
    }
    for (const item of docsTabs) {
      if (item.sections.some((section) => section.id === hash)) {
        setTabId(item.id);
        return;
      }
    }
  }, []);

  useEffect(() => {
    const first = tab?.sections[0]?.id;
    if (first) setActiveSection(first);
  }, [tabId, tab]);

  function selectTab(id: string) {
    setTabId(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  useEffect(() => {
    if (!tab) return;

    const nodes = tab.sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.4, 0.7] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [tab]);

  if (!tab) return null;

  return (
    <main className="flex flex-1 flex-col">
      <div className="border-border/60 border-b bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-muted-foreground mb-2 text-xs font-medium tracking-[0.18em] uppercase">
            Documentation
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {docsPage.title}
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
            {docsPage.description}
          </p>
        </div>
      </div>

      <div className="border-border/60 sticky top-14 z-40 border-b bg-background/95 backdrop-blur-md sm:top-16">
        <div className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {docsTabs.map((item) => {
            const selected = item.id === tab.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectTab(item.id)}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  selected
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10 lg:py-12">
        <aside className="hidden lg:block">
          <div className="sticky top-36 space-y-4">
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                On this page
              </p>
              <p className="mt-2 text-sm font-medium tracking-tight">
                {tab.label}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {tab.description}
              </p>
            </div>
            <nav aria-label="Section headers" className="space-y-1">
              {tab.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm transition-colors",
                    activeSection === section.id
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          <header className="border-border/60 mb-8 border-b pb-6 lg:hidden">
            <h2 className="text-xl font-semibold tracking-tight">{tab.label}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {tab.description}
            </p>
            <nav
              aria-label="Section headers"
              className="mt-4 flex flex-wrap gap-2"
            >
              {tab.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="border-border/70 text-muted-foreground hover:text-foreground rounded-md border px-2.5 py-1 text-xs"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </header>

          <div className="space-y-12">
            {tab.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-36"
              >
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-muted-foreground text-sm leading-relaxed sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.subsections && section.subsections.length > 0 ? (
                  <div className="mt-6 space-y-6">
                    {section.subsections.map((sub) => (
                      <div key={sub.title}>
                        <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                          {sub.title}
                        </h3>
                        {sub.paragraphs && sub.paragraphs.length > 0 ? (
                          <div className="mt-2 space-y-2">
                            {sub.paragraphs.map((paragraph) => (
                              <p
                                key={paragraph}
                                className="text-muted-foreground text-sm leading-relaxed sm:text-[15px]"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        ) : null}
                        {sub.bullets && sub.bullets.length > 0 ? (
                          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-[15px]">
                            {sub.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-[15px]">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}

                {section.code ? (
                  <pre className="border-border/70 bg-muted/40 mt-5 overflow-x-auto rounded-lg border p-4 font-mono text-[12px] leading-relaxed whitespace-pre sm:text-[13px]">
                    <code>{section.code}</code>
                  </pre>
                ) : null}

                {section.links && section.links.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {section.links.map((link) =>
                      link.external ? (
                        <li key={link.href + link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-border/70 hover:border-foreground/40 inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium"
                          >
                            {link.label}
                            <ArrowUpRight className="size-3" aria-hidden />
                          </a>
                        </li>
                      ) : (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            className="border-border/70 hover:border-foreground/40 inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
