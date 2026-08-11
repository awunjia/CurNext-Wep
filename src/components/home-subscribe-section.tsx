"use client";

import { MailPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function HomeSubscribeSection() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const canSubmit = EMAIL_RE.test(email.trim()) && !pending;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim().toLowerCase();

    if (!value || !EMAIL_RE.test(value)) {
      toast.error(t("subscribeInvalid"));
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        message?: string;
      } | null;

      if (!response.ok) {
        toast.error(payload?.error ?? t("subscribeError"));
        return;
      }

      toast.success(payload?.message ?? t("subscribeSuccess"));
      setEmail("");
    } catch {
      toast.error(t("subscribeError"));
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      aria-labelledby="subscribe-heading"
      className="dark relative w-full bg-background text-foreground"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div className="max-w-xl">
            <h3
              id="subscribe-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              {t("subscribeTitle")}
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {t("subscribeLead")}
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="w-full max-w-md shrink-0 space-y-3"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="subscribe-email">{t("subscribePlaceholder")}</Label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  id="subscribe-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={pending}
                  className="h-10 flex-1 md:text-sm"
                  aria-required
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={!canSubmit}
                  className="h-10 w-full gap-2 sm:w-auto sm:px-5"
                >
                  <MailPlus className="size-4" aria-hidden />
                  {pending ? t("subscribePending") : t("subscribeCta")}
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t.rich("subscribeLegal", {
                privacy: (chunks) => (
                  <Link
                    href="/data/privacy-policy"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
