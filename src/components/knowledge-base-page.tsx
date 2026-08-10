"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useEffectEvent, type ReactNode } from "react";
import { LoaderCircle, Mail, Send } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  knowledgeBaseConsentCopy,
  knowledgeBasePage,
  knowledgeBaseStarterPrompts,
} from "@/config/knowledge-base";
import {
  itemHeadingClassName,
  sectionHeadingClassName,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  sources?: { title: string; href?: string; source: string }[];
};

type StoredConsent = {
  version: string;
  acceptedAt: string;
};

const MIN_THINK_MS = 1100;

const LINK_PATTERN =
  /(https?:\/\/[^\s<>"']+|mailto:[^\s<>"']+|\/(?:pricing|contact|docs|sdks|firmware|datacenters|security|api|careers|resources|how-it-works|integrations|solutions(?:\/[a-z0-9\-]+)?|data\/[a-z0-9\-]+|knowledge-base|case-studies)(?:#[\w\-]+)?)/gi;

function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(knowledgeBasePage.consentStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== knowledgeBasePage.consentVersion) return null;
    if (!parsed.acceptedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent() {
  const payload: StoredConsent = {
    version: knowledgeBasePage.consentVersion,
    acceptedAt: new Date().toISOString(),
  };
  localStorage.setItem(
    knowledgeBasePage.consentStorageKey,
    JSON.stringify(payload),
  );
}

function clearConsent() {
  localStorage.removeItem(knowledgeBasePage.consentStorageKey);
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function LinkedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  const matcher = new RegExp(LINK_PATTERN.source, LINK_PATTERN.flags);
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(text)) !== null) {
    const value = match[0];
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <ExternalLink
        key={`${match.index}-${value}`}
        href={value}
        className="font-medium underline underline-offset-2"
      >
        {value}
      </ExternalLink>,
    );
    lastIndex = match.index + value.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <p className={className}>{parts.length > 0 ? parts : text}</p>;
}

function AccuracyAside() {
  const notice = knowledgeBasePage.accuracyNotice;
  return (
    <aside className="border-border/70 h-fit rounded-lg border p-5 sm:p-6 lg:sticky lg:top-28">
      <p className="text-muted-foreground mb-2 text-xs font-medium tracking-[0.18em] uppercase">
        Important
      </p>
      <h2 className={itemHeadingClassName}>{notice.title}</h2>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {notice.body}
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <ExternalLink
          href={`mailto:${notice.salesEmail}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
          {notice.salesEmail}
        </ExternalLink>
        <ExternalLink
          href={notice.contactHref}
          className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
        >
          Contact a representative
        </ExternalLink>
      </div>
    </aside>
  );
}

export function KnowledgeBasePage() {
  const [ready, setReady] = useState(false);
  const [consented, setConsented] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [thinkPhase, setThinkPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: knowledgeBasePage.welcome,
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hydrateConsent = useEffectEvent(() => {
    setConsented(Boolean(readConsent()));
    setReady(true);
  });

  useEffect(() => {
    hydrateConsent();
  }, [hydrateConsent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending, thinkPhase]);

  useEffect(() => {
    if (!pending) {
      setThinkPhase(0);
      return;
    }
    setThinkPhase(0);
    const t1 = window.setTimeout(() => setThinkPhase(1), 450);
    const t2 = window.setTimeout(() => setThinkPhase(2), 900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pending]);

  function acceptConsent() {
    if (!checked) return;
    writeConsent();
    setConsented(true);
    setError(null);
  }

  function revokeConsent() {
    clearConsent();
    setConsented(false);
    setChecked(false);
    setMessages([
      {
        id: "welcome-revoked",
        role: "assistant",
        content:
          "Consent withdrawn for this browser. Chat stays locked until you agree again.",
      },
    ]);
  }

  async function sendMessage(raw: string) {
    const message = raw.trim();
    if (!message || pending) return;
    if (!consented) {
      setError("Consent is required before chatting.");
      return;
    }

    setError(null);
    setInput("");
    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: message,
    };
    setMessages((prev) => [...prev, userMessage]);
    setPending(true);
    const startedAt = Date.now();

    try {
      const history = [...messages, userMessage]
        .filter((item) => item.id !== "welcome" && item.id !== "welcome-revoked")
        .slice(-8)
        .map((item) => ({ role: item.role, content: item.content }));

      const response = await fetch("/api/knowledge-base/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history,
          consent: true,
          consentVersion: knowledgeBasePage.consentVersion,
        }),
      });

      const data = (await response.json()) as {
        answer?: string;
        error?: string;
        sources?: ChatMessage["sources"];
      };

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_THINK_MS) {
        await wait(MIN_THINK_MS - elapsed);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.answer || "No answer returned.",
          sources: data.sources,
        },
      ]);
    } catch (err) {
      const text =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(text);
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_THINK_MS) {
        await wait(MIN_THINK_MS - elapsed);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content:
            "I could not finish that just now. Try again in a moment, or reach us through Contact.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  const thinkCopy =
    thinkPhase === 0
      ? `${knowledgeBasePage.thinkingLabel}...`
      : thinkPhase === 1
        ? "Checking the details..."
        : "Putting an answer together...";

  return (
    <main className="flex flex-1 flex-col">
      <section className="border-border/60 border-b bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Support
            </p>
            <h1 className={sectionHeadingClassName}>
              {knowledgeBasePage.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {knowledgeBasePage.description}
            </p>
          </div>
        </div>
      </section>

      <section className="relative flex flex-1 flex-col bg-background">
        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {!ready ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : !consented ? (
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start">
              <AccuracyAside />
              <div className="border-border/70 rounded-lg border p-5 sm:p-6">
                <h2 className={itemHeadingClassName}>
                  {knowledgeBaseConsentCopy.title}
                </h2>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-[15px]">
                  {knowledgeBaseConsentCopy.lead}
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm leading-relaxed">
                  {knowledgeBaseConsentCopy.bullets.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
                <label className="border-border/70 mt-6 flex cursor-pointer gap-3 rounded-lg border p-4 text-sm leading-relaxed">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 shrink-0"
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                  />
                  <span>
                    {knowledgeBaseConsentCopy.checkboxLabelBefore}
                    <ExternalLink
                      href="/data/privacy-policy"
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      {knowledgeBaseConsentCopy.checkboxLabelLink}
                    </ExternalLink>
                    {knowledgeBaseConsentCopy.checkboxLabelAfter}
                  </span>
                </label>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled={!checked}
                    onClick={acceptConsent}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-11 px-5 disabled:opacity-50",
                    )}
                  >
                    {knowledgeBaseConsentCopy.acceptLabel}
                  </button>
                  <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                    {knowledgeBaseConsentCopy.declineHint}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start">
              <AccuracyAside />

              <div className="border-border/70 flex h-[min(36rem,calc(100dvh-12rem))] flex-col overflow-hidden rounded-lg border sm:h-[min(44rem,calc(100dvh-12rem))] lg:h-[min(52rem,calc(100dvh-11rem))]">
                <div className="border-border/60 flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Image
                      src="/logo-mark.png"
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium tracking-tight">
                        {knowledgeBasePage.assistantLabel}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        Here to help with CurNext
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={revokeConsent}
                    className="text-muted-foreground hover:text-foreground shrink-0 text-xs underline-offset-4 hover:underline"
                  >
                    Withdraw consent
                  </button>
                </div>

                <div
                  ref={scrollRef}
                  className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-5"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col gap-1",
                        message.role === "user" ? "items-end" : "items-start",
                      )}
                    >
                      <p className="text-muted-foreground px-1 text-[11px] font-medium tracking-[0.08em] uppercase">
                        {message.role === "user"
                          ? "You"
                          : knowledgeBasePage.assistantName}
                      </p>
                      <div
                        className={cn(
                          "max-w-[92%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                          message.role === "user"
                            ? "bg-foreground text-background"
                            : "bg-muted text-foreground",
                        )}
                      >
                        {message.role === "assistant" ? (
                          <LinkedText text={message.content} />
                        ) : (
                          <p>{message.content}</p>
                        )}
                        {message.sources && message.sources.length > 0 ? (
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {message.sources.map((source) =>
                              source.href ? (
                                <li key={`${source.title}-${source.href}`}>
                                  <ExternalLink
                                    href={source.href}
                                    className="bg-background/80 inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium"
                                  >
                                    {source.title}
                                  </ExternalLink>
                                </li>
                              ) : (
                                <li key={source.title}>
                                  <span className="bg-background/80 inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium">
                                    {source.title}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  {pending ? (
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-muted-foreground px-1 text-[11px] font-medium tracking-[0.08em] uppercase">
                        {knowledgeBasePage.assistantName}
                      </p>
                      <div className="bg-muted text-muted-foreground inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm">
                        <LoaderCircle
                          className="size-4 animate-spin"
                          aria-hidden
                        />
                        <span key={thinkPhase}>{thinkCopy}</span>
                      </div>
                    </div>
                  ) : null}
                  <div ref={bottomRef} />
                </div>

                <div className="border-border/60 shrink-0 border-t p-3 sm:p-4">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {knowledgeBaseStarterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        disabled={pending}
                        onClick={() => sendMessage(prompt)}
                        className="border-border/70 hover:border-foreground/40 rounded-md border px-2.5 py-1 text-left text-xs transition-colors disabled:opacity-50"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                  <form
                    className="flex items-end gap-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      void sendMessage(input);
                    }}
                  >
                    <Textarea
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ask CurNext a question..."
                      rows={2}
                      disabled={pending}
                      className="min-h-[2.75rem] max-h-28 flex-1 resize-none"
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          void sendMessage(input);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      disabled={pending || input.trim().length < 3}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "h-11 shrink-0 gap-2 px-4 disabled:opacity-50",
                      )}
                      aria-label="Send message"
                    >
                      <Send className="size-4" aria-hidden />
                      Send
                    </button>
                  </form>
                  {error ? (
                    <p className="text-destructive mt-2 text-xs">{error}</p>
                  ) : (
                    <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                      Do not paste secrets or third-party personal data.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
