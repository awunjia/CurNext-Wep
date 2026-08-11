type ContactSalesEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  subjectLabel: string;
  message: string;
};

export function buildContactNotifyEmail(input: ContactSalesEmailInput) {
  const companyLabel = input.company?.trim() || "Individual";
  const subject = `New contact: ${input.subjectLabel} - ${companyLabel}`;

  const text = [
    "New CurNext contact form submission",
    "",
    `Name: ${input.firstName} ${input.lastName}`,
    `Email: ${input.email}`,
    `Company: ${companyLabel}`,
    `Phone: ${input.phone || "-"}`,
    `Topic: ${input.subjectLabel}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  const html = `<pre style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.5;white-space:pre-wrap;">${text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")}</pre>`;

  return { subject, text, html };
}

export function getContactInbox(subjectId: string): string {
  if (subjectId === "api" || subjectId === "integrations") {
    return process.env.DEV_EMAIL ?? "dev@curnext.app";
  }
  if (subjectId === "security") {
    return process.env.SECURITY_EMAIL ?? "security@curnext.app";
  }
  if (subjectId === "gdpr") {
    return process.env.GDPR_EMAIL ?? "gdpr@curnext.app";
  }
  if (subjectId === "support") {
    return process.env.SUPPORT_EMAIL ?? "support@curnext.app";
  }
  if (subjectId === "partnership" || subjectId === "product") {
    return process.env.SALES_EMAIL ?? "sales@curnext.app";
  }
  return (
    process.env.CONTACT_EMAIL ??
    process.env.SMTP_FROM_NOREPLY ??
    "info@curnext.app"
  );
}
