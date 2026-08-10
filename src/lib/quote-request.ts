import {
  defaultPricingCurrency,
  type PricingCurrencyCode,
} from "@/config/currencies";
import {
  estimatorDefaultDuration,
  estimatorDefaultNodes,
  estimatorDurationMax,
  estimatorDurationMin,
  estimatorNodeMax,
  estimatorNodeMin,
  formatMarketMoney,
  formatMonths,
  installationFee,
  installBandForNodes,
  monthlySubscription,
  pricingForCurrency,
} from "@/config/pricing";

export type QuoteRequestPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  nodes: number;
  durationMonths: number;
  currency: PricingCurrencyCode;
  solutions: string[];
  message?: string;
  turnstileToken: string;
};

export function clampQuoteNodes(value: number): number {
  if (!Number.isFinite(value)) return estimatorDefaultNodes;
  return Math.min(
    estimatorNodeMax,
    Math.max(estimatorNodeMin, Math.round(value)),
  );
}

export function clampQuoteDuration(value: number): number {
  if (!Number.isFinite(value)) return estimatorDefaultDuration;
  return Math.min(
    estimatorDurationMax,
    Math.max(estimatorDurationMin, Math.round(value)),
  );
}

export function labelForNodes(
  nodes: number,
  currency: PricingCurrencyCode = defaultPricingCurrency,
): string {
  const band = installBandForNodes(nodes, currency);
  return `${nodes} nodes (${band.label})`;
}

export function labelForDuration(months: number): string {
  return formatMonths(months);
}

export function feeForNodes(
  nodes: number,
  currency: PricingCurrencyCode = defaultPricingCurrency,
): string {
  return formatMarketMoney(installationFee(nodes, currency), currency);
}

export function priceForScope(
  nodes: number,
  months: number,
  currency: PricingCurrencyCode = defaultPricingCurrency,
): string {
  return `${formatMarketMoney(monthlySubscription(nodes, currency), currency)}/mo · ${formatMonths(months)}`;
}

export function marketLabelForCurrency(
  currency: PricingCurrencyCode,
): string {
  return pricingForCurrency(currency).market;
}
