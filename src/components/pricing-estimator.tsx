"use client";

import {
  Building2,
  Globe2,
  Layers,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import type { CountryCode } from "libphonenumber-js";
import { isValidPhoneNumber } from "libphonenumber-js";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { FieldLabel } from "@/components/field-label";
import { PhoneNumberInput } from "@/components/phone-number-input";
import { PricingSteppedSlider } from "@/components/pricing-stepped-slider";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/components/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  pricingCurrencies,
  type PricingCurrencyCode,
} from "@/config/currencies";
import {
  contractTotal,
  durationSliderMarks,
  estimatorDurationMax,
  estimatorDurationMin,
  estimatorDurationStep,
  estimatorNodeMax,
  estimatorNodeMin,
  estimatorNodeStep,
  formatMonths,
  installationFee,
  installBandForNodes,
  monthlySubscription,
  nodeSliderMarks,
  pricingForCurrency,
  subscriptionTotal,
} from "@/config/pricing";
import { solutions } from "@/config/site";
import { getCountryName, operatingCountries } from "@/lib/countries";
import { formatPricingMoney } from "@/lib/currency";
import {
  defaultPricingEstimatorState,
  readPricingEstimatorState,
  writePricingEstimatorState,
  type PricingEstimatorState,
} from "@/lib/pricing-estimator-state";
import { itemHeadingClassName, sectionHeadingClassName } from "@/lib/typography";
import { cn } from "@/lib/utils";

type ContactState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  countryCode: CountryCode;
  solutions: string[];
  message: string;
};

const initialContact: ContactState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  countryCode: "FI",
  solutions: [],
  message: "",
};

const fieldClass =
  "h-11 w-full min-w-0 bg-background/60 px-3 text-base dark:bg-background/40 sm:h-10 sm:text-sm";

export function PricingEstimator() {
  const [state, setState] = useState<PricingEstimatorState>(
    defaultPricingEstimatorState,
  );
  const [contact, setContact] = useState<ContactState>(initialContact);
  const [hydrated, setHydrated] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const { nodes, months, currency } = state;
  const market = pricingForCurrency(currency);

  useEffect(() => {
    setState(readPricingEstimatorState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writePricingEstimatorState(state);
  }, [hydrated, state]);

  function updateState(patch: Partial<PricingEstimatorState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function updateContact<K extends keyof ContactState>(
    key: K,
    value: ContactState[K],
  ) {
    setContact((current) => ({ ...current, [key]: value }));
  }

  function toggleSolution(href: string, checked: boolean) {
    setContact((current) => {
      const next = checked
        ? [...current.solutions, href]
        : current.solutions.filter((item) => item !== href);
      return { ...current, solutions: next };
    });
  }

  const band = useMemo(
    () => installBandForNodes(nodes, currency),
    [nodes, currency],
  );
  const setup = useMemo(
    () => installationFee(nodes, currency),
    [nodes, currency],
  );
  const monthly = useMemo(
    () => monthlySubscription(nodes, currency),
    [nodes, currency],
  );
  const subTotal = useMemo(
    () => subscriptionTotal(nodes, months, currency),
    [nodes, months, currency],
  );
  const total = useMemo(
    () => contractTotal(nodes, months, currency),
    [nodes, months, currency],
  );

  const money = (amount: number) => formatPricingMoney(amount, currency);

  function validatePhone(value: string): boolean {
    if (!value) {
      setPhoneError(null);
      return true;
    }
    if (!isValidPhoneNumber(value)) {
      setPhoneError("Enter a valid phone number for the selected country.");
      return false;
    }
    setPhoneError(null);
    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!validatePhone(contact.phone)) {
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the security check before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          company: contact.company,
          phone: contact.phone || undefined,
          country: getCountryName(contact.countryCode),
          nodes,
          durationMonths: months,
          currency,
          solutions: contact.solutions,
          message: contact.message,
          turnstileToken,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Unable to submit quote request");
      }

      toast.success("Quote request submitted", {
        description:
          "Thanks - we received your request and will send a scoped quote soon.",
      });
      setContact(initialContact);
      setPhoneError(null);
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit quote request",
      );
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      id="request-quote"
      onSubmit={onSubmit}
      className="border-border/70 bg-muted/20 scroll-mt-24 overflow-hidden rounded-2xl border"
      noValidate
    >
      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-10 p-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
                Estimate · {market.market}
              </p>
              <div
                role="radiogroup"
                aria-label="Market currency"
                className="border-border/70 grid grid-cols-3 gap-1 rounded-xl border p-1"
              >
                {pricingCurrencies.map((option) => {
                  const selected = currency === option.code;
                  return (
                    <button
                      key={option.code}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      title={option.market}
                      onClick={() =>
                        updateState({
                          currency: option.code as PricingCurrencyCode,
                        })
                      }
                      className={cn(
                        "rounded-lg px-2.5 py-1.5 text-xs font-medium tracking-tight transition-colors sm:px-3 sm:text-sm",
                        selected
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <h3 className={sectionHeadingClassName}>
              Nodes and duration set the price
            </h3>
            <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed sm:text-[15px]">
              {market.market} list prices. Installation is banded by node count.
              Subscription is {money(market.monthlyRatePerNode)} per node per
              month for the contract length you choose.
            </p>
          </div>

          <PricingSteppedSlider
            label="Number of nodes"
            hint="L1 devices across your surfaces"
            value={nodes}
            min={estimatorNodeMin}
            max={estimatorNodeMax}
            step={estimatorNodeStep}
            marks={nodeSliderMarks}
            display={String(nodes)}
            onChange={(value) => updateState({ nodes: value })}
            ariaLabel="number of nodes"
          />

          <PricingSteppedSlider
            label="Contract duration"
            hint="Billing months for the subscription"
            value={months}
            min={estimatorDurationMin}
            max={estimatorDurationMax}
            step={estimatorDurationStep}
            marks={durationSliderMarks}
            display={String(months)}
            onChange={(value) => updateState({ months: value })}
            ariaLabel="contract duration in months"
          />
        </div>

        <div className="border-border/70 flex flex-col gap-8 border-t bg-background p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                Install band
              </p>
              <p className={cn(itemHeadingClassName, "mt-1")}>{band.label}</p>
              <p className="text-muted-foreground mt-1 text-sm">
                {formatMonths(months)} · {nodes} nodes · {market.market}
              </p>
            </div>

            <div className="border-border/70 space-y-4 border-y py-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm">Installation</span>
                <span className="text-lg font-semibold tracking-tight tabular-nums">
                  {money(setup)}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm">Monthly</span>
                <span className="text-lg font-semibold tracking-tight tabular-nums">
                  {money(monthly)}
                  <span className="text-muted-foreground text-sm font-normal">
                    /mo
                  </span>
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm">
                  Subscription ({formatMonths(months)})
                </span>
                <span className="text-base font-medium tracking-tight tabular-nums">
                  {money(subTotal)}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium">Indicative total</span>
                <span className="text-xl font-semibold tracking-tight tabular-nums">
                  {money(total)}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed">
              {money(market.monthlyRatePerNode)}/node/mo × {nodes} nodes. Final
              quote depends on surfaces and commissioning scope.
            </p>
          </div>
        </div>
      </div>

      <div className="border-border/70 space-y-6 border-t bg-background p-6 sm:space-y-8 sm:p-8 lg:p-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="quote-firstName" icon={User} required>
              First name
            </FieldLabel>
            <Input
              id="quote-firstName"
              name="firstName"
              autoComplete="given-name"
              required
              value={contact.firstName}
              onChange={(event) =>
                updateContact("firstName", event.target.value)
              }
              className={fieldClass}
              placeholder="Anna"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="quote-lastName" icon={User} required>
              Last name
            </FieldLabel>
            <Input
              id="quote-lastName"
              name="lastName"
              autoComplete="family-name"
              required
              value={contact.lastName}
              onChange={(event) =>
                updateContact("lastName", event.target.value)
              }
              className={fieldClass}
              placeholder="Virtanen"
            />
          </div>
          <div className="col-span-2 min-w-0 space-y-2 sm:col-span-1">
            <FieldLabel htmlFor="quote-email" icon={Mail} required>
              Email address
            </FieldLabel>
            <Input
              id="quote-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={contact.email}
              onChange={(event) => updateContact("email", event.target.value)}
              className={fieldClass}
              placeholder="anna.virtanen@company.com"
            />
          </div>
          <div className="col-span-2 min-w-0 space-y-2 sm:col-span-1 lg:col-span-1">
            <FieldLabel htmlFor="quote-phone" icon={Phone}>
              Phone
            </FieldLabel>
            <PhoneNumberInput
              id="quote-phone"
              value={contact.phone || undefined}
              country={contact.countryCode}
              defaultCountry={contact.countryCode}
              onChange={(value) => {
                updateContact("phone", value ?? "");
                validatePhone(value ?? "");
              }}
              onCountryChange={(nextCountry) => {
                if (
                  nextCountry &&
                  operatingCountries.some((row) => row.code === nextCountry)
                ) {
                  updateContact("countryCode", nextCountry);
                }
              }}
            />
            {phoneError ? (
              <p className="text-destructive text-xs">{phoneError}</p>
            ) : null}
          </div>
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="quote-company" icon={Building2}>
              Company
            </FieldLabel>
            <Input
              id="quote-company"
              name="company"
              autoComplete="organization"
              value={contact.company}
              onChange={(event) =>
                updateContact("company", event.target.value)
              }
              className={fieldClass}
              placeholder="Nordic Construction Oy"
            />          </div>
          <div className="min-w-0 space-y-2">
            <FieldLabel htmlFor="quote-country" icon={Globe2}>
              Country
            </FieldLabel>
            <Select
              value={contact.countryCode}
              onValueChange={(value) => {
                if (!value) return;
                updateContact("countryCode", value as CountryCode);
              }}
            >
              <SelectTrigger
                id="quote-country"
                className={cn(
                  fieldClass,
                  "w-full min-w-0 data-[size=default]:h-11 sm:data-[size=default]:h-10",
                )}
              >
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent
                alignItemWithTrigger={false}
                align="start"
                className="max-h-[min(18rem,50dvh)] w-[var(--anchor-width)] max-w-[calc(100vw-2rem)]"
              >
                {operatingCountries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name} ({country.dialCode})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <fieldset className="min-w-0 space-y-3">
          <legend className="flex items-center gap-1.5 text-sm font-medium">
            <Layers className="text-muted-foreground size-3.5" aria-hidden />
            Surfaces in scope
          </legend>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {solutions.map((solution) => {
              const checked = contact.solutions.includes(solution.href);
              return (
                <label
                  key={solution.href}
                  className={cn(
                    "border-border hover:bg-muted/40 flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors",
                    checked && "border-foreground/30 bg-muted/30",
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(value) =>
                      toggleSolution(solution.href, value === true)
                    }
                    className="mt-0.5"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">
                      {solution.title}
                    </span>
                    <span className="text-muted-foreground mt-0.5 block text-xs leading-relaxed">
                      {solution.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="min-w-0 space-y-2">
          <FieldLabel htmlFor="quote-message" icon={MessageSquareText}>
            Project notes
          </FieldLabel>
          <Textarea
            id="quote-message"
            name="message"
            value={contact.message}
            onChange={(event) => updateContact("message", event.target.value)}
            placeholder="Floors, timeline, handover date, or anything sales should know."
            className="min-h-28 bg-background/60 text-base dark:bg-background/40 sm:text-sm"
          />
        </div>

        <div className="min-w-0 space-y-3 overflow-x-auto">
          <FieldLabel icon={ShieldCheck} required>
            Security check
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
            By submitting, you agree to be contacted about your CurNext quote.
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="h-11 w-full gap-2 sm:w-auto sm:min-w-[16rem]"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting
              </>
            ) : (
              <>
                <Send className="size-4" />
                Request Quote With Estimate
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
