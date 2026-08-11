import { siteConfig } from "@/config/site";

type ContactConfirmationEmailInput = {
  firstName: string;
  email: string;
  subjectLabel: string;
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

export function buildContactConfirmationEmail(
  input: ContactConfirmationEmailInput,
) {
  const name = escapeHtml(input.firstName);
  const email = escapeHtml(input.email);
  const subjectLabel = escapeHtml(input.subjectLabel);
  const year = new Date().getFullYear();
  const siteUrl = emailSiteUrl();
  const privacyUrl = `${siteUrl}/data/privacy-policy`;
  const supportEmail = escapeHtml(
    process.env.SMTP_FROM_NOREPLY ?? "info@curnext.app",
  );

  const subject = `We received your message, ${input.firstName}`;

  const text = [
    `Hi ${input.firstName},`,
    "",
    "Thank you for contacting CurNext. Your message has been received.",
    "",
    `Topic: ${input.subjectLabel}`,
    "",
    "What happens next",
    "1. The right team reviews your note.",
    "2. We reply from a CurNext address with next steps.",
    "3. For a scoped proposal, use Request Quote on Pricing. For open roles, use Careers.",
    "",
    `Questions: ${process.env.SMTP_FROM_NOREPLY ?? "info@curnext.app"}`,
    `Visit CurNext: ${siteUrl}`,
    "",
    "Best regards,",
    "The CurNext team",
    "",
    "---",
    "Security notice",
    "This message was sent because a contact form was submitted with this email on curnext.app. CurNext will never ask you for passwords or payment details by email.",
    `If you did not submit this message, contact ${process.env.SMTP_FROM_NOREPLY ?? "info@curnext.app"}.`,
    "",
    `Privacy: ${privacyUrl}`,
    "",
    `© ${year} CurNext`,
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
            <td style="padding:28px 28px 8px;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;">CurNext contact</td>
          </tr>
          <tr>
            <td style="padding:8px 28px 0;font-size:24px;font-weight:600;line-height:1.3;color:#f8fafc;">Hi ${name},</td>
          </tr>
          <tr>
            <td style="padding:16px 28px 0;font-size:15px;line-height:1.6;color:#cbd5e1;">
              Thank you for contacting CurNext. Your message has been received and our team will follow up.
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;">
                <tr>
                  <td style="padding:16px 18px;font-size:13px;color:#94a3b8;">Topic</td>
                  <td style="padding:16px 18px;font-size:14px;color:#f8fafc;text-align:right;">${subjectLabel}</td>
                </tr>
                <tr>
                  <td style="padding:0 18px 16px;font-size:13px;color:#94a3b8;">Email</td>
                  <td style="padding:0 18px 16px;font-size:14px;color:#f8fafc;text-align:right;">${email}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 0;font-size:14px;line-height:1.6;color:#cbd5e1;">
              <strong style="color:#f8fafc;">What happens next</strong><br />
              1. The right team reviews your note.<br />
              2. We reply from a CurNext address with next steps.<br />
              3. For a scoped proposal, use Request Quote on Pricing. For open roles, use Careers.
            </td>
          </tr>
          <tr>
            <td style="padding:28px;font-size:13px;line-height:1.6;color:#94a3b8;">
              Questions: <a href="mailto:${supportEmail}" style="color:#e2e8f0;text-decoration:none;">${supportEmail}</a><br />
              <a href="${siteUrl}" style="color:#e2e8f0;text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#64748b;max-width:560px;">
          This message was sent because a contact form was submitted with this email on curnext.app.
          If you did not submit this, contact ${supportEmail}.
          <br /><br />
          <a href="${privacyUrl}" style="color:#94a3b8;">Privacy</a>
          &nbsp;·&nbsp; © ${year} CurNext · Business ID ${escapeHtml(siteConfig.businessId)}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
