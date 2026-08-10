import {
  defaultPricingCurrency,
  pricingCurrencies,
  type PricingCurrencyCode,
} from "@/config/currencies";
import {
  estimatorDefaultDuration,
  estimatorDefaultNodes,
  estimatorDurationMax,
  estimatorDurationMin,
  estimatorNodeMax,
  estimatorNodeMin,
} from "@/config/pricing";

export const pricingEstimatorStorageKey = "curnext.pricing-estimator";

export type PricingEstimatorState = {
  nodes: number;
  months: number;
  currency: PricingCurrencyCode;
};

const allowedCurrencies = new Set<string>(
  pricingCurrencies.map((row) => row.code),
);

function clampNodes(value: number): number {
  if (!Number.isFinite(value)) return estimatorDefaultNodes;
  return Math.min(
    estimatorNodeMax,
    Math.max(estimatorNodeMin, Math.round(value)),
  );
}

function clampMonths(value: number): number {
  if (!Number.isFinite(value)) return estimatorDefaultDuration;
  return Math.min(
    estimatorDurationMax,
    Math.max(estimatorDurationMin, Math.round(value)),
  );
}

function parseCurrency(value: unknown): PricingCurrencyCode | null {
  if (typeof value !== "string") return null;
  // Legacy estimator stored USD before CAD replaced it.
  if (value === "USD") return "CAD";
  if (!allowedCurrencies.has(value)) return null;
  return value as PricingCurrencyCode;
}

export const defaultPricingEstimatorState: PricingEstimatorState = {
  nodes: estimatorDefaultNodes,
  months: estimatorDefaultDuration,
  currency: defaultPricingCurrency,
};

export function normalizePricingEstimatorState(
  partial: Partial<PricingEstimatorState> | null | undefined,
): PricingEstimatorState {
  return {
    nodes:
      typeof partial?.nodes === "number"
        ? clampNodes(partial.nodes)
        : defaultPricingEstimatorState.nodes,
    months:
      typeof partial?.months === "number"
        ? clampMonths(partial.months)
        : defaultPricingEstimatorState.months,
    currency:
      parseCurrency(partial?.currency) ?? defaultPricingEstimatorState.currency,
  };
}

export function readPricingEstimatorState(): PricingEstimatorState {
  if (typeof window === "undefined") return defaultPricingEstimatorState;

  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Partial<PricingEstimatorState> = {};
    const nodesParam = params.get("nodes");
    const monthsParam = params.get("months");
    const currencyParam = params.get("currency");

    if (nodesParam && !Number.isNaN(Number(nodesParam))) {
      fromUrl.nodes = Number(nodesParam);
    }
    if (monthsParam && !Number.isNaN(Number(monthsParam))) {
      fromUrl.months = Number(monthsParam);
    }
    const currency = parseCurrency(currencyParam);
    if (currency) fromUrl.currency = currency;

    if (
      fromUrl.nodes !== undefined ||
      fromUrl.months !== undefined ||
      fromUrl.currency !== undefined
    ) {
      return normalizePricingEstimatorState({
        ...readStoredPricingEstimatorState(),
        ...fromUrl,
      });
    }

    return readStoredPricingEstimatorState();
  } catch {
    return defaultPricingEstimatorState;
  }
}

function readStoredPricingEstimatorState(): PricingEstimatorState {
  try {
    const raw = window.localStorage.getItem(pricingEstimatorStorageKey);
    if (!raw) return defaultPricingEstimatorState;
    const parsed = JSON.parse(raw) as Partial<PricingEstimatorState>;
    return normalizePricingEstimatorState(parsed);
  } catch {
    return defaultPricingEstimatorState;
  }
}

export function writePricingEstimatorState(state: PricingEstimatorState) {
  if (typeof window === "undefined") return;

  const next = normalizePricingEstimatorState(state);

  try {
    window.localStorage.setItem(
      pricingEstimatorStorageKey,
      JSON.stringify(next),
    );
  } catch {
    // Ignore quota / private-mode failures.
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.set("nodes", String(next.nodes));
    url.searchParams.set("months", String(next.months));
    url.searchParams.set("currency", next.currency);
    window.history.replaceState(window.history.state, "", url);
  } catch {
    // Ignore URL sync failures.
  }

  try {
    window.dispatchEvent(
      new CustomEvent("curnext:pricing-estimator", { detail: next }),
    );
  } catch {
    // Ignore event dispatch failures.
  }
}
