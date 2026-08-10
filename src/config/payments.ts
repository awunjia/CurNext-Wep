export type PaymentMethod = {
  name: string;
  src: string;
};

/**
 * Accepted payment methods. Assets are unmodified originals from public
 * brand/payment sources (datatrans/payment-logos, aaronfagan Amex badge,
 * MTN MoMo API portal logo). Do not redraw or recolor these marks.
 */
export const paymentMethods: PaymentMethod[] = [
  { name: "Visa", src: "/payments/visa.svg" },
  { name: "Mastercard", src: "/payments/mastercard.svg" },
  { name: "American Express", src: "/payments/amex.svg" },
  { name: "PayPal", src: "/payments/paypal.svg" },
  { name: "Apple Pay", src: "/payments/apple-pay.svg" },
  { name: "Google Pay", src: "/payments/google-pay.svg" },
  { name: "Klarna", src: "/payments/klarna.svg" },
  { name: "MobilePay", src: "/payments/mobilepay.svg" },
  { name: "MTN MoMo", src: "/payments/mtn-momo.svg" },
];
