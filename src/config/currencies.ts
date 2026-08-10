import type { CountryCode } from "libphonenumber-js";

export const pricingCurrencies = [
  {
    code: "EUR",
    label: "Euro",
    market: "Finland",
    symbol: "€",
    countryCode: "FI" as CountryCode,
  },
  {
    code: "CAD",
    label: "CAD",
    market: "Canada",
    symbol: "CA$",
    countryCode: "CA" as CountryCode,
  },
  {
    code: "XAF",
    label: "XAF",
    market: "Cameroon",
    symbol: "FCFA",
    countryCode: "CM" as CountryCode,
  },
] as const;

export type PricingCurrencyCode = (typeof pricingCurrencies)[number]["code"];

export const defaultPricingCurrency: PricingCurrencyCode = "EUR";

/** ISO country codes for markets CurNext operates in. */
export const operatingCountryCodes = pricingCurrencies.map(
  (row) => row.countryCode,
) as CountryCode[];
