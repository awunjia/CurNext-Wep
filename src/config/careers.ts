export const careersEmail = "careers@curnext.app";

export const CAREERS_ROLES_PAGE_SIZE = 6;

export type CareerRole = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  href: string;
};

export const careersBelonging = {
  eyebrow: "Careers",
  title: "An equal opportunity workplace",
  lead: "CurNext employs people of every race, religion, culture, and background. Hiring and day-to-day collaboration are free of discrimination and personal judgment.",
  goalLabel: "Our shared purpose",
  goal: "Deliver excellent products for monitoring.",
  closing:
    "We maintain healthy working habits so the team can focus on craft, customers, and sustained delivery.",
} as const;

export const careersHowWeWork = {
  eyebrow: "How we work",
  title: "Built for focus and balance",
  lead: "Employment terms that support sustained delivery: remote collaboration, a four-day week, generous leave, and health coverage.",
  items: [
    {
      icon: "remote",
      title: "Primarily remote",
      body: "Work from where you are most effective. We convene in person when the work requires it.",
    },
    {
      icon: "week",
      title: "Four-day week",
      body: "A standard four-day work week. The fifth day is reserved for rest, family, or personal focus.",
    },
    {
      icon: "holidays",
      title: "30+ holidays a year",
      body: "Thirty or more holiday days annually, built into how we plan capacity and delivery.",
    },
    {
      icon: "health",
      title: "Health insurance",
      body: "Health insurance included as part of the employment package for team members.",
    },
  ],
} as const;

export const careersOpenings = {
  eyebrow: "Open roles",
  title: "Current opportunities",
  lead: "Published openings across engineering, field applications, and commercial roles. Apply with a short note on how you want to contribute.",
  empty:
    "There are no published openings at this time. Check back soon, or send an open application to careers@curnext.app.",
} as const;

const employmentTypeLabels: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACTOR: "Contractor",
  INTERN: "Intern",
};

const workArrangementLabels: Record<string, string> = {
  REMOTE: "Remote",
  ONSITE: "On-site",
  HYBRID: "Hybrid",
  FREELANCE: "Freelance",
};

export function formatEmploymentType(value: string) {
  return employmentTypeLabels[value] ?? value;
}

export function formatWorkArrangement(value: string | null | undefined) {
  if (!value) return null;
  return workArrangementLabels[value] ?? value;
}

/** Strip simple HTML from HR rich-text fields for list summaries. */
export function htmlToPlainSummary(html: string | null | undefined, max = 180) {
  if (!html) return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}...`;
}

export function applyMailto(roleTitle?: string) {
  const subject = roleTitle
    ? `CurNext application - ${roleTitle}`
    : "CurNext open application";
  return `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}`;
}
