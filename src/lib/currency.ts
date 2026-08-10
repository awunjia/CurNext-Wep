import {
  defaultPricingCurrency,
  type PricingCurrencyCode,
} from "@/config/currencies";
import { formatMarketMoney } from "@/config/pricing";

/** Format a native market amount (no FX conversion). */
export function formatPricingMoney(
  amount: number,
  currency: PricingCurrencyCode = defaultPricingCurrency,
): string {
  return formatMarketMoney(amount, currency);
}
