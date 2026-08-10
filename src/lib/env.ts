function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export { required };

export const env = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://curnext.app"
      : "http://localhost:3003"),
  turnstile: {
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
    secretKey: process.env.TURNSTILE_SECRET_KEY ?? "",
  },
  isProduction: process.env.NODE_ENV === "production",
} as const;

export function getTurnstileSecretKey(): string {
  return required("TURNSTILE_SECRET_KEY", process.env.TURNSTILE_SECRET_KEY);
}
