"use client";

import {
  FileUp,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  User,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { FieldLabel } from "@/components/field-label";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/components/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RESUME_ACCEPT, RESUME_MAX_BYTES } from "@/lib/resume";
import { cn } from "@/lib/utils";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  privacyConsent: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  coverLetter: "",
  privacyConsent: false,
};

const fieldClass =
  "h-11 w-full min-w-0 bg-background/60 px-3 text-base dark:bg-background/40 sm:h-10 sm:text-sm";

type JobApplicationFormProps = {
  jobOpeningId: string;
  roleTitle: string;
};

export function JobApplicationForm({
  jobOpeningId,
  roleTitle,
}: JobApplicationFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [resume, setResume] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onResumeChange(fileList: FileList | null) {
    const file = fileList?.[0] ?? null;
    if (!file) {
      setResume(null);
      return;
    }
    if (file.size > RESUME_MAX_BYTES) {
      setResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
      setError("Resume must be 5 MB or smaller.");
      return;
    }
    setError(null);
    setResume(file);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!resume) {
      setError("Please attach your resume (PDF or Word).");
      return;
    }

    if (!form.privacyConsent) {
      setError(
        "Please consent to processing of your application data to continue.",
      );
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the security check before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const body = new FormData();
      body.set("jobOpeningId", jobOpeningId);
      body.set("firstName", form.firstName);
      body.set("lastName", form.lastName);
      body.set("email", form.email);
      if (form.phone) body.set("phone", form.phone);
      if (form.coverLetter) body.set("coverLetter", form.coverLetter);
      body.set("privacyConsent", form.privacyConsent ? "true" : "false");
      body.set("turnstileToken", turnstileToken);
      body.set("resume", resume);

      const response = await fetch("/api/job-application", {
        method: "POST",
        body,
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Unable to submit application");
      }

      toast.success("Application submitted", {
        description:
          result.message ??
          "Thanks - we received your application and will review it.",
      });
      setForm(initialState);
      setResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit application",
      );
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-border bg-background space-y-5 rounded-2xl border p-5 sm:p-6"
      noValidate
      aria-labelledby="job-application-heading"
    >
      <div>
        <p className="text-muted-foreground mb-1 text-xs font-medium tracking-[0.14em] uppercase">
          Apply
        </p>
        <h2
          id="job-application-heading"
          className="text-base font-semibold tracking-tight sm:text-lg"
        >
          Submit your application
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          For {roleTitle}. We only collect what we need to review your
          application.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="min-w-0 space-y-2">
          <FieldLabel htmlFor="job-firstName" icon={User} required>
            First name
          </FieldLabel>
          <Input
            id="job-firstName"
            name="firstName"
            autoComplete="given-name"
            required
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel htmlFor="job-lastName" icon={User} required>
            Last name
          </FieldLabel>
          <Input
            id="job-lastName"
            name="lastName"
            autoComplete="family-name"
            required
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="job-email" icon={Mail} required>
          Email
        </FieldLabel>
        <Input
          id="job-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="job-phone" icon={Phone}>
          Phone{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </FieldLabel>
        <Input
          id="job-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="job-resume" icon={FileUp} required>
          Resume
        </FieldLabel>
        <input
          ref={resumeInputRef}
          id="job-resume"
          name="resume"
          type="file"
          accept={RESUME_ACCEPT}
          required
          onChange={(event) => onResumeChange(event.target.files)}
          className={cn(
            fieldClass,
            "border-input flex cursor-pointer rounded-lg border file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-2.5 file:py-1 file:text-xs file:font-medium",
          )}
        />
        <p className="text-muted-foreground text-xs leading-relaxed">
          PDF or Word (.pdf, .doc, .docx), max 5 MB.
          {resume ? ` Selected: ${resume.name}` : null}
        </p>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="job-coverLetter" icon={MessageSquareText}>
          Cover note{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </FieldLabel>
        <Textarea
          id="job-coverLetter"
          name="coverLetter"
          rows={5}
          value={form.coverLetter}
          onChange={(event) => updateField("coverLetter", event.target.value)}
          placeholder="A short note on why you are a fit for this role."
          className="min-h-28 w-full resize-y bg-background/60 px-3 py-2.5 text-base dark:bg-background/40 sm:text-sm"
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="job-privacy"
          checked={form.privacyConsent}
          onCheckedChange={(checked) =>
            updateField("privacyConsent", checked === true)
          }
          className="mt-0.5"
        />
        <label
          htmlFor="job-privacy"
          className="text-muted-foreground text-sm leading-relaxed"
        >
          I consent to CurNext processing my personal data for recruitment for
          this role, as described in the{" "}
          <Link
            href="/data/privacy-policy"
            className="text-foreground underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/data/gdpr"
            className="text-foreground underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GDPR notice
          </Link>
          .
        </label>
      </div>

      <TurnstileWidget
        ref={turnstileRef}
        onSuccess={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
        onError={() => setTurnstileToken("")}
      />

      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className={cn("h-11 w-full gap-2")}
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Submitting
          </>
        ) : (
          <>
            Submit application
            <Send className="size-4" aria-hidden />
          </>
        )}
      </Button>

      <p className="text-muted-foreground text-xs leading-relaxed">
        We do not ask for national ID, address, or other sensitive data at this
        stage. You can request access or deletion of your application data at
        any time.
      </p>
    </form>
  );
}
