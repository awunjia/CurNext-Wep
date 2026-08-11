"use client";

import type { CountryCode } from "libphonenumber-js";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { cn } from "@/lib/utils";

import "react-phone-number-input/style.css";

type PhoneNumberInputProps = {
  id?: string;
  value?: string;
  country?: CountryCode;
  defaultCountry?: CountryCode;
  /** Limit the country list. Omit for all countries. */
  countries?: CountryCode[];
  onChange: (value?: string) => void;
  onCountryChange?: (country?: CountryCode) => void;
  className?: string;
  disabled?: boolean;
};

export function PhoneNumberInput({
  id,
  value,
  country,
  defaultCountry = "FI",
  countries,
  onChange,
  onCountryChange,
  className,
  disabled,
}: PhoneNumberInputProps) {
  return (
    <PhoneInput
      id={id}
      international
      countryCallingCodeEditable={false}
      country={country}
      defaultCountry={defaultCountry}
      {...(countries ? { countries } : {})}
      flags={flags}
      value={value}
      disabled={disabled}
      onChange={(next) => onChange(next || undefined)}
      onCountryChange={onCountryChange}
      className={cn("PhoneInput curnext-phone-input", className)}
      numberInputProps={{
        className:
          "PhoneInputInput h-11 w-full min-w-0 bg-transparent px-2 text-base outline-none placeholder:text-muted-foreground sm:h-10 sm:px-3 sm:text-sm",
        placeholder: "40 123 4567",
      }}
    />
  );
}
