"use client";

import { useRef, useState, type FormEvent } from "react";
import type { CountryCode } from "libphonenumber-js";
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
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import { FieldLabel } from "@/components/field-label";
import { PhoneNumberInput } from "@/components/phone-number-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  countryCode: CountryCode;
  subject: ContactSubjectId | "";
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  countryCode: "FI",
  subject: "",
  message: "",
};

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
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
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          company: form.company,
          phone: form.phone || undefined,
          subject: form.subject,
          message: form.message,
          turnstileToken,
          locale,
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
            <PhoneNumberInput
              id="contact-phone"
              value={form.phone || undefined}
              country={form.countryCode}
              defaultCountry={form.countryCode}
              onChange={(value) => update("phone", value ?? "")}
              onCountryChange={(nextCountry) => {
                if (nextCountry) {
                  update("countryCode", nextCountry);
                }
              }}
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
            <Select
              value={form.subject || undefined}
              onValueChange={(value) => {
                if (!value) return;
                update("subject", value as ContactSubjectId);
              }}
            >
              <SelectTrigger
                id="contact-subject"
                className={cn(
                  "w-full min-w-0 bg-background/60 dark:bg-background/40",
                )}
              >
                <SelectValue placeholder={t("selectTopic")} />
              </SelectTrigger>
              <SelectContent
                alignItemWithTrigger={false}
                align="start"
                className="max-h-[min(18rem,50dvh)] w-[var(--anchor-width)] max-w-[calc(100vw-2rem)]"
              >
                {contactSubjects.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {t(`subjects.${item.id}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
