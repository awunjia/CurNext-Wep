import { siteConfig } from "@/config/site";

type QuoteConfirmationEmailInput = {
  firstName: string;
  email: string;
  company?: string;
  nodesLabel: string;
  durationLabel: string;
  subscriptionPrice: string;
  setupFee: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function emailSiteUrl(): string {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (configured && !configured.includes("localhost")) {
    return configured;
  }
  return `https://${siteConfig.domain}`;
}

const font =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function buildQuoteConfirmationEmail(
  input: QuoteConfirmationEmailInput,
) {
  const name = escapeHtml(input.firstName);
  const companyLabel = input.company?.trim() || "your project";
  const company = escapeHtml(companyLabel);
  const email = escapeHtml(input.email);
  const nodes = escapeHtml(input.nodesLabel);
  const duration = escapeHtml(input.durationLabel);
  const price = escapeHtml(input.subscriptionPrice);
  const setup = escapeHtml(input.setupFee);
  const year = new Date().getFullYear();
  const siteUrl = emailSiteUrl();
  const privacyUrl = `${siteUrl}/data/privacy-policy`;
  const termsUrl = `${siteUrl}/data/terms-of-service`;
  const supportEmail = escapeHtml(
    process.env.SMTP_FROM_NOREPLY ?? "info@curnext.app",
  );

  const subject = `We received your CurNext quote request, ${input.firstName}`;

  const text = [
    `Hi ${input.firstName},`,
    "",
    `Thank you for requesting a CurNext quote for ${companyLabel}. Your request has been received, and our team will prepare a proposal.`,
    "",
    "Your selections (indicative)",
    `Nodes: ${input.nodesLabel} (${input.setupFee} installation)`,
    `Duration: ${input.durationLabel} (${input.subscriptionPrice})`,
    "",
    "What happens next",
    "1. Sales reviews your node count, surfaces, and timeline.",
    "2. We send a scoped quote - not a binding cart total until confirmed.",
    "3. We schedule a short call if anything needs clarifying.",
    "",
    `Questions: sales@curnext.app`,
    `Visit CurNext: ${siteUrl}`,
    "",
    "Best regards,",
    "The CurNext team",
    "",
    "---",
    "Security notice",
    "This message was sent because a quote request was submitted with this email on curnext.app. CurNext will never ask you for passwords or payment details by email.",
    `If you did not submit this request, contact ${process.env.SMTP_FROM_NOREPLY ?? "info@curnext.app"}.`,
    "",
    `Privacy: ${privacyUrl}`,
    `Terms: ${termsUrl}`,
    "",
    `© ${year} CurNext, Inc.`,
    `Business ID ${siteConfig.businessId}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;color:#e2e8f0;font-family:${font};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111827;border:1px solid #1e293b;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 8px;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;">CurNext quote</td>
          </tr>
          <tr>
            <td style="padding:8px 28px 0;font-size:24px;font-weight:600;color:#f8fafc;line-height:1.3;">Hi ${name},</td>
          </tr>
          <tr>
            <td style="padding:16px 28px 0;font-size:15px;line-height:1.6;color:#cbd5e1;">
              We received your quote request for <strong style="color:#f8fafc;">${company}</strong> (${email}). Our team will prepare a scoped proposal.
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #334155;border-radius:12px;">
                <tr>
                  <td style="padding:14px 16px;border-bottom:1px solid #334155;font-size:13px;color:#94a3b8;">Nodes</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #334155;font-size:13px;color:#f8fafc;text-align:right;">${nodes}<br/><span style="color:#94a3b8;">${setup} installation</span></td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;font-size:13px;color:#94a3b8;">Duration</td>
                  <td style="padding:14px 16px;font-size:13px;color:#f8fafc;text-align:right;">${duration}<br/><span style="color:#94a3b8;">${price}</span></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;font-size:14px;line-height:1.6;color:#cbd5e1;">
              Indicative only - final quote depends on surfaces, floors, and commissioning scope.<br/><br/>
              Questions? <a href="mailto:sales@curnext.app" style="color:#7dd3fc;">sales@curnext.app</a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:11px;color:#64748b;max-width:560px;line-height:1.5;">
          © ${year} CurNext · Business ID ${escapeHtml(siteConfig.businessId)} ·
          <a href="${privacyUrl}" style="color:#94a3b8;">Privacy</a> ·
          Contact ${supportEmail}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
