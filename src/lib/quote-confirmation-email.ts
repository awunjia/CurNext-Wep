import { siteConfig, solutions } from "@/config/site";
import { locales, type AppLocale } from "@/i18n/routing";
import {
  curnextLogoImgHtml,
  emailSiteUrl,
  getCurnextLogoAttachment,
} from "@/lib/email-branding";

type QuoteConfirmationEmailInput = {
  firstName: string;
  email: string;
  company?: string;
  locale?: string;
  nodeCount: number;
  installBand: string;
  market: string;
  currency: string;
  setupFee: string;
  durationMonths: number;
  monthlyPrice: string;
  solutionHrefs: string[];
};

type ConfirmationCopy = {
  subject: string;
  eyebrow: string;
  greeting: string;
  intro: string;
  selectionsTitle: string;
  nodeCount: string;
  installBand: string;
  market: string;
  installFee: string;
  duration: string;
  subscription: string;
  solutionsTitle: string;
  solutionsNone: string;
  nextTitle: string;
  next1: string;
  next2: string;
  next3: string;
  questions: string;
  indicative: string;
  regards: string;
  team: string;
  securityTitle: string;
  securityBody: string;
  securityContact: string;
  privacy: string;
  terms: string;
  businessId: string;
  monthUnit: string;
  monthUnitOne: string;
  companyFallback: string;
  perMonth: string;
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
    pricing: { confirmationEmail: ConfirmationCopy };
  };
  return messages.pricing.confirmationEmail;
}

async function solutionTitlesForLocale(
  locale: AppLocale,
  hrefs: string[],
): Promise<string[]> {
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default as {
      solutions?: { catalog?: Record<string, { title?: string }> };
    };
    const catalog = messages.solutions?.catalog ?? {};
    return hrefs.map((href) => {
      const slug = href.replace(/^\/solutions\//, "");
      return (
        catalog[slug]?.title ??
        solutions.find((item) => item.href === href)?.title ??
        href
      );
    });
  } catch {
    return hrefs.map(
      (href) => solutions.find((item) => item.href === href)?.title ?? href,
    );
  }
}

const font =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export async function buildQuoteConfirmationEmail(
  input: QuoteConfirmationEmailInput,
) {
  const locale = resolveLocale(input.locale);
  const copy = await loadConfirmationCopy(locale);
  const solutionTitles = await solutionTitlesForLocale(
    locale,
    input.solutionHrefs,
  );

  const securityEmail = process.env.SECURITY_EMAIL ?? "security@curnext.app";
  const questionsEmail = process.env.SALES_EMAIL ?? "sales@curnext.app";
  const companyLabel =
    input.company?.trim() || copy.companyFallback || "your project";

  const subject = fill(copy.subject, { firstName: input.firstName });
  const greeting = fill(copy.greeting, { firstName: input.firstName });
  const intro = fill(copy.intro, { company: companyLabel });
  const securityContact = fill(copy.securityContact, { securityEmail });
  const businessIdLine = fill(copy.businessId, { id: siteConfig.businessId });
  const durationLabel =
    input.durationMonths === 1
      ? copy.monthUnitOne
      : fill(copy.monthUnit, { count: String(input.durationMonths) });
  const subscriptionLabel = `${input.monthlyPrice}${copy.perMonth}`;

  const year = new Date().getFullYear();
  const siteUrl = emailSiteUrl();
  const privacyUrl = `${siteUrl}/${locale}/data/privacy-policy`;
  const termsUrl = `${siteUrl}/${locale}/data/terms-of-service`;
  const securityEmailEsc = escapeHtml(securityEmail);
  const questionsEmailEsc = escapeHtml(questionsEmail);
  const securityContactHtml = escapeHtml(securityContact).replaceAll(
    securityEmailEsc,
    `<a href="mailto:${securityEmailEsc}" style="color:#94a3b8;">${securityEmailEsc}</a>`,
  );

  const solutionsText = solutionTitles.length
    ? solutionTitles.map((title) => `- ${title}`).join("\n")
    : `- ${copy.solutionsNone}`;

  const solutionsHtml = solutionTitles.length
    ? `<ul style="margin:8px 0 0;padding-left:18px;color:#f8fafc;">${solutionTitles
        .map((title) => `<li style="margin:0 0 4px;">${escapeHtml(title)}</li>`)
        .join("")}</ul>`
    : `<span style="color:#f8fafc;">${escapeHtml(copy.solutionsNone)}</span>`;

  const text = [
    greeting,
    "",
    intro,
    "",
    copy.selectionsTitle,
    `${copy.nodeCount}: ${input.nodeCount}`,
    `${copy.installBand}: ${input.installBand}`,
    `${copy.market}: ${input.market} (${input.currency})`,
    `${copy.installFee}: ${input.setupFee}`,
    `${copy.duration}: ${durationLabel}`,
    `${copy.subscription}: ${subscriptionLabel}`,
    "",
    copy.solutionsTitle,
    solutionsText,
    "",
    copy.nextTitle,
    `1. ${copy.next1}`,
    `2. ${copy.next2}`,
    `3. ${copy.next3}`,
    "",
    copy.indicative,
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
    `${copy.terms}: ${termsUrl}`,
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
              ${escapeHtml(intro)}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 0;font-size:13px;color:#94a3b8;">${escapeHtml(copy.selectionsTitle)}</td>
          </tr>
          <tr>
            <td style="padding:8px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;">
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#94a3b8;border-bottom:1px solid #1e293b;">${escapeHtml(copy.nodeCount)}</td>
                  <td style="padding:12px 16px;font-size:14px;color:#f8fafc;text-align:right;border-bottom:1px solid #1e293b;">${input.nodeCount}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#94a3b8;border-bottom:1px solid #1e293b;">${escapeHtml(copy.installBand)}</td>
                  <td style="padding:12px 16px;font-size:14px;color:#f8fafc;text-align:right;border-bottom:1px solid #1e293b;">${escapeHtml(input.installBand)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#94a3b8;border-bottom:1px solid #1e293b;">${escapeHtml(copy.market)}</td>
                  <td style="padding:12px 16px;font-size:14px;color:#f8fafc;text-align:right;border-bottom:1px solid #1e293b;">${escapeHtml(input.market)} (${escapeHtml(input.currency)})</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#94a3b8;border-bottom:1px solid #1e293b;">${escapeHtml(copy.installFee)}</td>
                  <td style="padding:12px 16px;font-size:14px;color:#f8fafc;text-align:right;border-bottom:1px solid #1e293b;">${escapeHtml(input.setupFee)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#94a3b8;border-bottom:1px solid #1e293b;">${escapeHtml(copy.duration)}</td>
                  <td style="padding:12px 16px;font-size:14px;color:#f8fafc;text-align:right;border-bottom:1px solid #1e293b;">${escapeHtml(durationLabel)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#94a3b8;">${escapeHtml(copy.subscription)}</td>
                  <td style="padding:12px 16px;font-size:14px;color:#f8fafc;text-align:right;">${escapeHtml(subscriptionLabel)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 0;font-size:13px;color:#94a3b8;">${escapeHtml(copy.solutionsTitle)}</td>
          </tr>
          <tr>
            <td style="padding:4px 28px 0;font-size:14px;">${solutionsHtml}</td>
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
            <td style="padding:20px 28px 28px;font-size:13px;line-height:1.6;color:#94a3b8;">
              ${escapeHtml(copy.indicative)}<br /><br />
              ${escapeHtml(copy.questions)}: <a href="mailto:${questionsEmailEsc}" style="color:#e2e8f0;text-decoration:none;">${questionsEmailEsc}</a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#64748b;max-width:560px;">
          ${escapeHtml(copy.securityBody)}
          <br />
          ${securityContactHtml}
          <br /><br />
          <a href="${privacyUrl}" style="color:#94a3b8;">${escapeHtml(copy.privacy)}</a>
          &nbsp;·&nbsp;
          <a href="${termsUrl}" style="color:#94a3b8;">${escapeHtml(copy.terms)}</a>
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
