import { siteConfig } from "@/config/site";

type DemoConfirmationEmailInput = {
  firstName: string;
  email: string;
  company: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Prefer production host for email links so clients resolve correctly. */
function emailSiteUrl(): string {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (configured && !configured.includes("localhost")) {
    return configured;
  }
  return `https://${siteConfig.domain}`;
}

const font =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function buildDemoConfirmationEmail(input: DemoConfirmationEmailInput) {
  const name = escapeHtml(input.firstName);
  const company = escapeHtml(input.company);
  const email = escapeHtml(input.email);
  const year = new Date().getFullYear();
  const siteUrl = emailSiteUrl();
  const privacyUrl = `${siteUrl}/data/privacy-policy`;
  const termsUrl = `${siteUrl}/data/terms-of-service`;
  const securityUrl = `${siteUrl}/data/security-policy`;
  const supportEmail = escapeHtml(
    process.env.SMTP_FROM_NOREPLY ?? "info@curnext.app",
  );

  const subject = `We received your CurNext demo request, ${input.firstName}`;
  const preview = `Thanks ${input.firstName} - we received your CurNext demo request and will contact you as soon as possible.`;

  const text = [
    `Hi ${input.firstName},`,
    "",
    `Thank you for requesting a CurNext demo for ${input.company}. Your request has been received, and our team will contact you as soon as possible.`,
    "",
    "What happens next",
    "1. Our team reviews your request and use case.",
    "2. We prepare a walkthrough matched to your sites and project phase.",
    "3. We contact you to schedule the demo.",
    "",
    `Visit CurNext: ${siteUrl}`,
    "",
    "Best regards,",
    "The CurNext team",
    "",
    "---",
    "Security notice",
    "This message was sent because a demo request was submitted with this email address on curnext.app. CurNext will never ask you for passwords or payment details by email.",
    `If you did not submit this request, contact ${process.env.SMTP_FROM_NOREPLY ?? "info@curnext.app"} or ignore this message.`,
    "",
    `Privacy: ${privacyUrl}`,
    `Terms: ${termsUrl}`,
    `Security: ${securityUrl}`,
    "",
    `© ${year} CurNext, Inc.`,
    `Business ID ${siteConfig.businessId}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(subject)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
  <style>
    @media (prefers-color-scheme: dark) {
      body, .email-body { background-color: #09090b !important; color: #e4e4e7 !important; }
    }
  </style>
</head>
<body class="email-body" style="margin:0;padding:0;background-color:#09090b;color:#e4e4e7;font-family:${font};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#09090b;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
          <tr>
            <td style="padding:0 4px 18px;">
              <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#71717a;font-family:${font};">CurNext</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#18181b;border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden;box-shadow:0 24px 48px rgba(0,0,0,0.35);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:34px 32px 28px;">
                    <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#71717a;font-family:${font};">Demo request</p>
                    <h1 style="margin:0 0 14px;font-size:24px;line-height:1.25;font-weight:600;color:#fafafa;font-family:${font};">Demo request received</h1>
                    <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#a1a1aa;font-family:${font};">
                      Hi ${name}, thank you for requesting a CurNext demo for <strong style="color:#fafafa;font-weight:600;">${company}</strong>.
                      Your request has been sent successfully, and our team will contact you as soon as possible.
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 22px;background-color:#111113;border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:#fafafa;font-family:${font};">What happens next</p>
                          <ol style="margin:0;padding-left:18px;font-size:13px;line-height:1.8;color:#a1a1aa;font-family:${font};">
                            <li>Our team reviews your request and use case.</li>
                            <li>We prepare a walkthrough matched to your sites and project phase.</li>
                            <li>We contact you to schedule the demo.</li>
                          </ol>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 22px;">
                      <tr>
                        <td style="border-radius:12px;background-color:#fafafa;">
                          <a href="${siteUrl}" style="display:inline-block;padding:14px 26px;font-size:14px;font-weight:600;color:#18181b;text-decoration:none;font-family:${font};">Visit CurNext</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0 0 18px;font-size:12px;line-height:1.6;color:#71717a;font-family:${font};">
                      Best regards,<br />
                      The CurNext team
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 18px;background-color:#111113;border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;font-family:${font};">Security notice</p>
                          <p style="margin:0 0 10px;font-size:12px;line-height:1.6;color:#a1a1aa;font-family:${font};">
                            This email was sent because a demo request was submitted with this address on curnext.app.
                            CurNext will never ask for passwords, one-time codes, or payment details by email.
                          </p>
                          <p style="margin:0;font-size:12px;line-height:1.6;color:#a1a1aa;font-family:${font};">
                            If you did not make this request, you can safely ignore this message or contact
                            <a href="mailto:${supportEmail}" style="color:#a1a1aa;text-decoration:underline;">${supportEmail}</a>.
                          </p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0;font-size:12px;line-height:1.6;color:#52525b;font-family:${font};">
                      Sent to ${email}.
                      &nbsp;·&nbsp;
                      <a href="${privacyUrl}" style="color:#71717a;text-decoration:underline;">Privacy</a>
                      &nbsp;·&nbsp;
                      <a href="${termsUrl}" style="color:#71717a;text-decoration:underline;">Terms</a>
                      &nbsp;·&nbsp;
                      <a href="${securityUrl}" style="color:#71717a;text-decoration:underline;">Security</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 8px 0;">
              <p style="margin:0 0 6px;font-size:11px;line-height:1.6;color:#52525b;text-align:center;font-family:${font};">
                &copy; ${year} CurNext, Inc.
              </p>
              <p style="margin:0;font-size:11px;line-height:1.6;color:#3f3f46;text-align:center;font-family:${font};">
                Business ID ${siteConfig.businessId}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
