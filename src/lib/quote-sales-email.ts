type QuoteSalesEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  nodesLabel: string;
  setupFee: string;
  durationLabel: string;
  subscriptionPrice: string;
  solutions: string[];
  message?: string;
};

export function buildQuoteSalesEmail(input: QuoteSalesEmailInput) {
  const companyLabel = input.company?.trim() || "Individual";
  const subject = `New quote request: ${companyLabel} (${input.nodesLabel}, ${input.durationLabel})`;

  const text = [
    "New CurNext quote request",
    "",
    `Name: ${input.firstName} ${input.lastName}`,
    `Email: ${input.email}`,
    `Company: ${companyLabel}`,
    `Phone: ${input.phone || "-"}`,
    `Country: ${input.country || "-"}`,
    "",
    `Nodes: ${input.nodesLabel} (${input.setupFee} installation)`,
    `Duration: ${input.durationLabel} (${input.subscriptionPrice})`,
    "",
    `Solutions: ${input.solutions.length ? input.solutions.join(", ") : "-"}`,
    "",
    "Message:",
    input.message || "-",
  ].join("\n");

  const html = `<pre style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.5;white-space:pre-wrap;">${text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")}</pre>`;

  return { subject, text, html };
}

export function getSalesInbox(): string {
  return process.env.SALES_EMAIL ?? "sales@curnext.app";
}
