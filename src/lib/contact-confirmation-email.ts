import { siteConfig } from "@/config/site";
import { locales, type AppLocale } from "@/i18n/routing";
import {
  curnextLogoImgHtml,
  emailSiteUrl,
  getCurnextLogoAttachment,
} from "@/lib/email-branding";

type ContactConfirmationEmailInput = {
  firstName: string;
  email: string;
  subjectLabel: string;
  locale?: string;
};

type ConfirmationCopy = {
  subject: string;
  eyebrow: string;
  greeting: string;
  intro: string;
  topic: string;
  email: string;
  nextTitle: string;
  next1: string;
  next2: string;
  next3: string;
  questions: string;
  regards: string;
  team: string;
  securityTitle: string;
  securityBody: string;
  securityContact: string;
  privacy: string;
  businessId: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function resolveLocale(value?: string): AppLocale {
  if (value && (locales as readonly string[]).includes(value)) {
    return value as AppLocale;
  }
  return "en";
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

async function loadConfirmationCopy(
  locale: AppLocale,
): Promise<ConfirmationCopy> {
  const messages = (await import(`../../messages/${locale}.json`)).default as {
    contact: { confirmationEmail: ConfirmationCopy };
  };
  return messages.contact.confirmationEmail;
}

const font =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export async function buildContactConfirmationEmail(
  input: ContactConfirmationEmailInput,
) {
  const locale = resolveLocale(input.locale);
  const copy = await loadConfirmationCopy(locale);

  const securityEmail =
    process.env.SECURITY_EMAIL ?? "security@curnext.app";
  const questionsEmail =
    process.env.SMTP_FROM_NOREPLY ?? "info@curnext.app";

  const subject = fill(copy.subject, { firstName: input.firstName });
  const greeting = fill(copy.greeting, { firstName: input.firstName });
  const securityContact = fill(copy.securityContact, { securityEmail });
  const businessIdLine = fill(copy.businessId, { id: siteConfig.businessId });

  const email = escapeHtml(input.email);
  const subjectLabel = escapeHtml(input.subjectLabel);
  const year = new Date().getFullYear();
  const siteUrl = emailSiteUrl();
  const privacyUrl = `${siteUrl}/${locale}/data/privacy-policy`;
  const securityEmailEsc = escapeHtml(securityEmail);
  const questionsEmailEsc = escapeHtml(questionsEmail);
  const securityContactHtml = escapeHtml(securityContact).replaceAll(
    securityEmailEsc,
    `<a href="mailto:${securityEmailEsc}" style="color:#94a3b8;">${securityEmailEsc}</a>`,
  );

  const text = [
    greeting,
    "",
    copy.intro,
    "",
    `${copy.topic}: ${input.subjectLabel}`,
    "",
    copy.nextTitle,
    `1. ${copy.next1}`,
    `2. ${copy.next2}`,
    `3. ${copy.next3}`,
    "",
    `${copy.questions}: ${questionsEmail}`,
    `CurNext: ${siteUrl}`,
    "",
    copy.regards,
    copy.team,
    "",
    "---",
    copy.securityTitle,
    copy.securityBody,
    securityContact,
    "",
    `${copy.privacy}: ${privacyUrl}`,
    "",
    `© ${year} CurNext`,
    businessIdLine,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="${locale}">
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
            <td style="padding:28px 28px 12px;">${curnextLogoImgHtml()}</td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;">${escapeHtml(copy.eyebrow)}</td>
          </tr>
          <tr>
            <td style="padding:8px 28px 0;font-size:24px;font-weight:600;line-height:1.3;color:#f8fafc;">${escapeHtml(greeting)}</td>
          </tr>
          <tr>
            <td style="padding:16px 28px 0;font-size:15px;line-height:1.6;color:#cbd5e1;">
              ${escapeHtml(copy.intro)}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;">
                <tr>
                  <td style="padding:16px 18px;font-size:13px;color:#94a3b8;">${escapeHtml(copy.topic)}</td>
                  <td style="padding:16px 18px;font-size:14px;color:#f8fafc;text-align:right;">${subjectLabel}</td>
                </tr>
                <tr>
                  <td style="padding:0 18px 16px;font-size:13px;color:#94a3b8;">${escapeHtml(copy.email)}</td>
                  <td style="padding:0 18px 16px;font-size:14px;color:#f8fafc;text-align:right;">${email}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 0;font-size:14px;line-height:1.6;color:#cbd5e1;">
              <strong style="color:#f8fafc;">${escapeHtml(copy.nextTitle)}</strong><br />
              1. ${escapeHtml(copy.next1)}<br />
              2. ${escapeHtml(copy.next2)}<br />
              3. ${escapeHtml(copy.next3)}
            </td>
          </tr>
          <tr>
            <td style="padding:28px;font-size:13px;line-height:1.6;color:#94a3b8;">
              ${escapeHtml(copy.questions)}: <a href="mailto:${questionsEmailEsc}" style="color:#e2e8f0;text-decoration:none;">${questionsEmailEsc}</a><br />
              <a href="${siteUrl}" style="color:#e2e8f0;text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#64748b;max-width:560px;">
          ${escapeHtml(copy.securityBody)}
          <br />
          ${securityContactHtml}
          <br /><br />
          <a href="${privacyUrl}" style="color:#94a3b8;">${escapeHtml(copy.privacy)}</a>
          &nbsp;·&nbsp; © ${year} CurNext · ${escapeHtml(businessIdLine)}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject,
    text,
    html,
    attachments: [getCurnextLogoAttachment()],
  };
}
