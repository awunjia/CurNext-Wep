export type CurNextEvent = {
  id: string;
  title: string;
  /** ISO date YYYY-MM-DD for sorting */
  date: string;
  displayDate: string;
  city: string;
  country: string;
  format: "Meetup" | "Briefing" | "Workshop" | "Webinar";
  summary: string;
};

export const eventsPage = {
  title: "Events",
  description:
    "Meet CurNext in our operating markets - Helsinki, Ottawa, and Yaoundé - for construction readiness briefings, product demos, and partner conversations.",
  leadNote:
    "Dates and venues can shift. Confirm attendance with sales before you travel. For a private site walkthrough, request a quote or email sales@curnext.app.",
  salesEmail: "sales@curnext.app",
} as const;

/** Upcoming and past events across Finland, Canada, and Cameroon capitals. */
export const curNextEvents: CurNextEvent[] = [
  {
    id: "helsinki-2026-09",
    title: "Build-ready slabs: curing intelligence briefing",
    date: "2026-09-17",
    displayDate: "17 September 2026",
    city: "Helsinki",
    country: "Finland",
    format: "Briefing",
    summary:
      "Morning session for contractors and consultants on CN-CC readiness predictions, probe placement, and handover evidence - followed by open Q&A.",
  },
  {
    id: "ottawa-2026-11",
    title: "Site intelligence meetup - Ottawa",
    date: "2026-11-05",
    displayDate: "5 November 2026",
    city: "Ottawa",
    country: "Canada",
    format: "Meetup",
    summary:
      "Evening meetup for Canadian GCs and specialty trades on drying, leak watch, and invite-only dashboard workflows for multi-site teams.",
  },
  {
    id: "yaounde-2027-02",
    title: "CurNext partner workshop - Yaoundé",
    date: "2027-02-12",
    displayDate: "12 February 2027",
    city: "Yaoundé",
    country: "Cameroon",
    format: "Workshop",
    summary:
      "Half-day workshop for installers and project owners: L1-L5 site path, commissioning basics, and commercial sizing by node count and duration.",
  },
  {
    id: "helsinki-2026-04",
    title: "EU residency & readiness demo day",
    date: "2026-04-22",
    displayDate: "22 April 2026",
    city: "Helsinki",
    country: "Finland",
    format: "Briefing",
    summary:
      "Product demo and hosting overview for Nordic buyers - Germany / Frankfurt residency, audit trail themes, and live dashboard walkthrough.",
  },
  {
    id: "ottawa-2025-10",
    title: "Construction intelligence roundtable",
    date: "2025-10-16",
    displayDate: "16 October 2025",
    city: "Ottawa",
    country: "Canada",
    format: "Meetup",
    summary:
      "Closed roundtable with Canadian partners on moisture risk, indoor air at handover, and how CurNext fits schedule-critical packages.",
  },
  {
    id: "yaounde-2025-06",
    title: "Market introduction - Yaoundé",
    date: "2025-06-19",
    displayDate: "19 June 2025",
    city: "Yaoundé",
    country: "Cameroon",
    format: "Briefing",
    summary:
      "Introductory briefing for Cameroon stakeholders on CurNext solutions, EU-hosted operations, and local commercial contact paths.",
  },
];

export function partitionEvents(referenceDate = new Date()) {
  const today = referenceDate.toISOString().slice(0, 10);
  const upcoming = curNextEvents
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = curNextEvents
    .filter((event) => event.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
