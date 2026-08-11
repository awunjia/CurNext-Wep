import { solutions } from "@/config/site";

type QuoteSalesEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  nodeCount: number;
  installBand: string;
  market: string;
  currency: string;
  setupFee: string;
  durationMonths: number;
  monthlyPrice: string;
  solutionHrefs: string[];
  message?: string;
};

function solutionTitle(href: string): string {
  return solutions.find((item) => item.href === href)?.title ?? href;
}

function plainHtml(text: string): string {
  return `<pre style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.5;white-space:pre-wrap;">${text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")}</pre>`;
}

export function buildQuoteSalesEmail(input: QuoteSalesEmailInput) {
  const companyLabel = input.company?.trim() || "Individual";
  const solutionTitles = input.solutionHrefs.map(solutionTitle);
  const subject = `New quote request: ${companyLabel} (${input.nodeCount} nodes, ${input.durationMonths} months)`;

  const text = [
    "New CurNext quote request",
    "",
    "Contact",
    `Name: ${input.firstName} ${input.lastName}`,
    `Email: ${input.email}`,
    `Company: ${companyLabel}`,
    `Phone: ${input.phone || "-"}`,
    `Country: ${input.country || "-"}`,
    "",
    "Quote scope",
    `Node count: ${input.nodeCount}`,
    `Install band: ${input.installBand}`,
    `Market: ${input.market} (${input.currency})`,
    `Installation fee: ${input.setupFee}`,
    `Contract duration: ${input.durationMonths} months`,
    `Subscription: ${input.monthlyPrice}/mo`,
    "",
    "Solutions required:",
    ...(solutionTitles.length
      ? solutionTitles.map((title) => `- ${title}`)
      : ["- Not specified"]),
    "",
    "Message:",
    input.message || "-",
  ].join("\n");

  return {
    subject,
    text,
    html: plainHtml(text),
  };
}

export function getSalesInbox(): string {
  return process.env.SALES_EMAIL ?? "sales@curnext.app";
}
