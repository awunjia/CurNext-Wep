/**
 * Market pricing by country currency. Amounts are native list prices
 * (not FX conversions). Tax handled at checkout - not shown on the site.
 *
 * Finland (EUR) · Canada (CAD) · Cameroon (XAF)
 */

import type { PricingCurrencyCode } from "@/config/currencies";

export const estimatorNodeMin = 1;
export const estimatorNodeMax = 200;
export const estimatorNodeStep = 1;
export const estimatorDefaultNodes = 25;

export const estimatorDurationMin = 1;
export const estimatorDurationMax = 36;
export const estimatorDurationStep = 1;
export const estimatorDefaultDuration = 12;

export type InstallBand = {
  value: string;
  label: string;
  nodesLabel: string;
  fee: number;
  feeLabel: string;
  min: number;
  max: number;
};

export type MarketPriceList = {
  market: string;
  currency: PricingCurrencyCode;
  /** Monthly platform fee per node in native currency. */
  monthlyRatePerNode: number;
  installBands: readonly InstallBand[];
};

/**
 * Finland (EUR) - under BuildStat ambient rental (9 €/kk) and Vertia labour
 * packs at 85 €/h for commissioning days.
 */
const finlandPricing: MarketPriceList = {
  market: "Finland",
  currency: "EUR",
  monthlyRatePerNode: 8,
  installBands: [
    {
      value: "under-10",
      label: "1-9 nodes",
      nodesLabel: "< 10",
      fee: 699,
      feeLabel: "€699",
      min: 1,
      max: 9,
    },
    {
      value: "10-24",
      label: "10-24 nodes",
      nodesLabel: "10-24",
      fee: 999,
      feeLabel: "€999",
      min: 10,
      max: 24,
    },
    {
      value: "25-49",
      label: "25-49 nodes",
      nodesLabel: "25-49",
      fee: 1299,
      feeLabel: "€1,299",
      min: 25,
      max: 49,
    },
    {
      value: "50-plus",
      label: "50+ nodes",
      nodesLabel: "50+",
      fee: 1999,
      feeLabel: "€1,999",
      min: 50,
      max: estimatorNodeMax,
    },
  ],
};

/**
 * Canada (CAD) - under ConX (~CAD 200/mo system) at typical node counts and
 * under eGate kit CapEx (~USD 1,907). COMMAND Center sensors from CAD 74.99.
 * Labour proxy ~CAD 100/h for commissioning days.
 */
const canadaPricing: MarketPriceList = {
  market: "Canada",
  currency: "CAD",
  monthlyRatePerNode: 10,
  installBands: [
    {
      value: "under-10",
      label: "1-9 nodes",
      nodesLabel: "< 10",
      fee: 799,
      feeLabel: "CA$799",
      min: 1,
      max: 9,
    },
    {
      value: "10-24",
      label: "10-24 nodes",
      nodesLabel: "10-24",
      fee: 1199,
      feeLabel: "CA$1,199",
      min: 10,
      max: 24,
    },
    {
      value: "25-49",
      label: "25-49 nodes",
      nodesLabel: "25-49",
      fee: 1499,
      feeLabel: "CA$1,499",
      min: 25,
      max: 49,
    },
    {
      value: "50-plus",
      label: "50+ nodes",
      nodesLabel: "50+",
      fee: 2299,
      feeLabel: "CA$2,299",
      min: 50,
      max: estimatorNodeMax,
    },
  ],
};

/**
 * Cameroon (XAF) - local purchasing power: CCTV/IoT install labour often
 * 35,000-195,000 FCFA; skilled day rates far below EU. Platform fee set in
 * native FCFA (not EUR×655). Low vs imported EU gear, still a serious
 * commissioning package.
 */
const cameroonPricing: MarketPriceList = {
  market: "Cameroon",
  currency: "XAF",
  monthlyRatePerNode: 2500,
  installBands: [
    {
      value: "under-10",
      label: "1-9 nodes",
      nodesLabel: "< 10",
      fee: 399000,
      feeLabel: "FCFA 399,000",
      min: 1,
      max: 9,
    },
    {
      value: "10-24",
      label: "10-24 nodes",
      nodesLabel: "10-24",
      fee: 599000,
      feeLabel: "FCFA 599,000",
      min: 10,
      max: 24,
    },
    {
      value: "25-49",
      label: "25-49 nodes",
      nodesLabel: "25-49",
      fee: 899000,
      feeLabel: "FCFA 899,000",
      min: 25,
      max: 49,
    },
    {
      value: "50-plus",
      label: "50+ nodes",
      nodesLabel: "50+",
      fee: 1299000,
      feeLabel: "FCFA 1,299,000",
      min: 50,
      max: estimatorNodeMax,
    },
  ],
};

export const marketPricingByCurrency: Record<
  PricingCurrencyCode,
  MarketPriceList
> = {
  EUR: finlandPricing,
  CAD: canadaPricing,
  XAF: cameroonPricing,
};

/** @deprecated Prefer marketPricingByCurrency[currency].installBands */
export const pricingInstallBands = finlandPricing.installBands;

/** @deprecated Prefer marketPricingByCurrency.EUR.monthlyRatePerNode */
export const monthlyRatePerNode = finlandPricing.monthlyRatePerNode;

export const pricingSetupIncludes = [
  "Hardware deployment",
  "Probe / node installation",
  "Gateway installation",
  "Calibration",
  "Site commissioning",
  "BIM mapping",
  "Initial readiness model setup",
  "Training",
  "OTA",
  "OTAA",
] as const;

export const pricingPlatformIncludes = [
  "AI readiness engine",
  "Cloud dashboard",
  "BIM integration",
  "Data storage",
  "Unlimited users",
  "Automated alerts",
  "Weekly compliance reports",
  "Predictive delay risk",
  "Optimization recommendations",
  "Multi-building analytics",
  "API access",
] as const;

export const nodeSliderMarks = [1, 10, 25, 50, 100, 150, 200] as const;
export const durationSliderMarks = [1, 6, 12, 18, 24, 36] as const;

export type PricingInstallBandValue = string;

export function pricingForCurrency(currency: PricingCurrencyCode): MarketPriceList {
  return marketPricingByCurrency[currency];
}

export function installBandForNodes(
  nodes: number,
  currency: PricingCurrencyCode = "EUR",
) {
  const bands = pricingForCurrency(currency).installBands;
  if (nodes < 10) return bands[0];
  if (nodes < 25) return bands[1];
  if (nodes < 50) return bands[2];
  return bands[3];
}

export function installationFee(
  nodes: number,
  currency: PricingCurrencyCode = "EUR",
): number {
  return installBandForNodes(nodes, currency).fee;
}

export function monthlySubscription(
  nodes: number,
  currency: PricingCurrencyCode = "EUR",
): number {
  return nodes * pricingForCurrency(currency).monthlyRatePerNode;
}

export function subscriptionTotal(
  nodes: number,
  months: number,
  currency: PricingCurrencyCode = "EUR",
): number {
  return monthlySubscription(nodes, currency) * months;
}

export function contractTotal(
  nodes: number,
  months: number,
  currency: PricingCurrencyCode = "EUR",
): number {
  return (
    installationFee(nodes, currency) +
    subscriptionTotal(nodes, months, currency)
  );
}

export function formatMarketMoney(
  amount: number,
  currency: PricingCurrencyCode,
): string {
  const locale =
    currency === "EUR" ? "de-DE" : currency === "CAD" ? "en-CA" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Finland / Euro formatting helper for static marketing copy. */
export function formatEuro(amount: number): string {
  return formatMarketMoney(amount, "EUR");
}

export function formatMonths(months: number): string {
  return months === 1 ? "1 month" : `${months} months`;
}
