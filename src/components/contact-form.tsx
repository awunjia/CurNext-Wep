"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  Building2,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  Tag,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { FieldLabel } from "@/components/field-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/components/turnstile-widget";
import {
  contactSubjects,
  type ContactSubjectId,
} from "@/config/contact";
import { cn } from "@/lib/utils";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  subject: ContactSubjectId | "";
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  subject: "",
  message: "",
};

const selectClassName =
  "border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-8 w-full min-w-0 rounded-lg border px-2.5 py-1 text-base outline-none transition-colors focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [form, setForm] = useState<FormState>(initialState);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.subject) {
      setError(t("selectTopicError"));
      return;
    }
    if (!turnstileToken) {
      setError(t("turnstileRequired"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          turnstileToken,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || t("sendError"));
      }

      toast.success(t("toastSuccess"));
      setForm(initialState);
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("sendError");
      setError(message);
      toast.error(message);
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="min-w-0" noValidate>
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="contact-firstName" icon={User} required>
              {t("firstName")}
            </FieldLabel>
            <Input
              id="contact-firstName"
              name="firstName"
              autoComplete="given-name"
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="bg-background/60 dark:bg-background/40"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="contact-lastName" icon={User} required>
              {t("lastName")}
            </FieldLabel>
            <Input
              id="contact-lastName"
              name="lastName"
              autoComplete="family-name"
              required
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="bg-background/60 dark:bg-background/40"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="contact-email" icon={Mail} required>
              {t("workEmail")}
            </FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="bg-background/60 dark:bg-background/40"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="contact-phone" icon={Phone}>
              {t("phone")}
            </FieldLabel>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="bg-background/60 dark:bg-background/40"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="contact-company" icon={Building2}>
              {t("company")}
            </FieldLabel>
            <Input
              id="contact-company"
              name="company"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="bg-background/60 dark:bg-background/40"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="contact-subject" icon={Tag} required>
              {t("topic")}
            </FieldLabel>
            <select
              id="contact-subject"
              name="subject"
              required
              value={form.subject}
              onChange={(e) =>
                update("subject", e.target.value as ContactSubjectId | "")
              }
              className={cn(selectClassName, "bg-background/60 dark:bg-background/40")}
            >
              <option value="" disabled>
                {t("selectTopic")}
              </option>
              {contactSubjects.map((item) => (
                <option key={item.id} value={item.id}>
                  {t(`subjects.${item.id}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="min-w-0 space-y-2">
          <FieldLabel htmlFor="contact-message" icon={MessageSquareText} required>
            {t("message")}
          </FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            required
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={t("messagePlaceholder")}
            className="min-h-32 bg-background/60 text-base dark:bg-background/40 sm:text-sm"
          />
        </div>

        <div className="min-w-0 space-y-3 overflow-x-auto">
          <FieldLabel icon={ShieldCheck} required>
            {t("securityCheck")}
          </FieldLabel>
          <TurnstileWidget
            ref={turnstileRef}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
            className="w-full max-w-full [&_iframe]:max-w-full"
          />
        </div>

        {error ? (
          <p
            role="alert"
            className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm"
          >
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 border-border/70 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-center text-xs leading-relaxed sm:max-w-sm sm:text-left">
            {t("consent")}
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="h-11 w-full gap-2 sm:w-auto sm:min-w-[12rem]"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("sending")}
              </>
            ) : (
              <>
                <Send className="size-4" />
                {t("send")}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
