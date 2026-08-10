"use client";

import Link from "next/link";
import { MailPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function HomeSubscribeSection() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const canSubmit = EMAIL_RE.test(email.trim()) && !pending;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim().toLowerCase();

    if (!value || !EMAIL_RE.test(value)) {
      toast.error("Enter a valid email address");
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
        toast.error(payload?.error ?? "Could not subscribe. Try again.");
        return;
      }

      toast.success(payload?.message ?? "You are subscribed.");
      setEmail("");
    } catch {
      toast.error("Could not subscribe. Try again.");
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
            <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">
              Newsletter
            </p>
            <h3
              id="subscribe-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Stay ahead of readiness
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              Product updates, site intelligence notes, and release highlights -
              occasional, no fluff.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="w-full max-w-md shrink-0 space-y-3"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="subscribe-email">Work email</Label>
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
                  {pending ? "Subscribing…" : "Subscribe"}
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              By subscribing you agree to our{" "}
              <Link
                href="/data/privacy-policy"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              . Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
