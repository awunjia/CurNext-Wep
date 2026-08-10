import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import type { CountryCode } from "libphonenumber-js";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

import { operatingCountryCodes } from "@/config/currencies";

countries.registerLocale(enLocale);

export type WorldCountry = {
  code: CountryCode;
  name: string;
  dialCode: string;
};

const phoneCountries = new Set(getCountries());

export const worldCountries: WorldCountry[] = Object.entries(
  countries.getNames("en", { select: "official" }),
)
  .filter(([code]) => phoneCountries.has(code as CountryCode))
  .map(([code, name]) => ({
    code: code as CountryCode,
    name,
    dialCode: `+${getCountryCallingCode(code as CountryCode)}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

/** Finland, Canada, Cameroon - markets CurNext operates in. */
export const operatingCountries: WorldCountry[] = operatingCountryCodes
  .map((code) => worldCountries.find((country) => country.code === code))
  .filter((country): country is WorldCountry => Boolean(country));

export function getCountryName(code?: string): string | undefined {
  if (!code) return undefined;
  return (
    operatingCountries.find((country) => country.code === code)?.name ??
    worldCountries.find((country) => country.code === code)?.name
  );
}

export function isOperatingCountry(code?: string): code is CountryCode {
  return Boolean(code && operatingCountryCodes.includes(code as CountryCode));
}
