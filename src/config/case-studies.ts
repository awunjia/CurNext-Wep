import { solutions } from "@/config/site";

export const caseStudiesPage = {
  title: "Case studies",
  description:
    "How CurNext shows up on real construction surfaces - readiness decisions, fewer guesswork walks, and an audit trail mapped to the building.",
  leadNote:
    "Named customer logos and project identifiers are shared under NDA through sales. The studies below are anonymous site patterns based on CurNext solution deployments - not invented company profiles or fake percentages.",
} as const;

export type CaseStudy = {
  id: string;
  title: string;
  sector: string;
  region: string;
  sku: (typeof solutions)[number]["code"];
  challenge: string;
  approach: string;
  outcome: string;
  href: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "slab-cure-tower",
    title: "Slab cure on a multi-storey pour cycle",
    sector: "Residential / commercial concrete",
    region: "EU site",
    sku: "CN-CC",
    challenge:
      "Pour teams were waiting on calendar rules and spot checks while formwork and follow-on trades pressed for earlier access.",
    approach:
      "CN-CC air, surface, and core probes on critical slabs; floor gateway and building edge uplink; readiness in the project view instead of raw temperature charts.",
    outcome:
      "Go / no-go decisions tied to measured maturity, fewer unnecessary inspections, and a documented cure trail for the pour package.",
    href: "/solutions/concrete-curing",
  },
  {
    id: "wet-room-drying",
    title: "Wet-room and gypsum drying before tiling",
    sector: "Interior fit-out",
    region: "EU site",
    sku: "CN-WD",
    challenge:
      "Finishing crews risked trapping moisture behind tile and paint when drying windows were judged by feel and schedule pressure.",
    approach:
      "CN-WD nodes on gypsum and wet-room assemblies; alerts when surfaces were still out of band; readiness shared with the trades package.",
    outcome:
      "Clearer dry / wait calls before covering work, fewer moisture-related callbacks, and a trail of conditions before handover of the wet zones.",
    href: "/solutions/wall-drying",
  },
  {
    id: "handover-iaq",
    title: "Indoor air through handover and early occupancy",
    sector: "Office / residential handover",
    region: "EU site",
    sku: "CN-IAQ",
    challenge:
      "After enclosure, teams needed CO₂, particulate, and VOC context without running a separate lab campaign for every complaint.",
    approach:
      "CN-IAQ nodes in representative zones; cloud thresholds and alerts for site and facilities roles after practical completion.",
    outcome:
      "Shared air-quality context for snagging and early occupancy, with measurements attached to spaces instead of one-off walkthrough notes.",
    href: "/solutions/indoor-air",
  },
  {
    id: "plant-room-leak",
    title: "Leak watch on plant rooms and risers",
    sector: "Building services",
    region: "EU site",
    sku: "CN-LEAK",
    challenge:
      "Hidden leaks in plant rooms and wet risers were found late - after damage to finishes and delayed commissioning.",
    approach:
      "CN-LEAK sensing on high-risk floors and plant areas; edge uplink with alerts to site and MEP leads.",
    outcome:
      "Earlier awareness of moisture events in critical zones and a clearer response path before finishes and equipment were at risk.",
    href: "/solutions/leak-detection",
  },
  {
    id: "structure-monitor",
    title: "Structural movement during critical works",
    sector: "Structural / temporary works",
    region: "EU site",
    sku: "CN-SHM",
    challenge:
      "Temporary works and adjacent structure needed continuous context for tilt, crack, and vibration beyond periodic survey visits.",
    approach:
      "CN-SHM nodes on agreed structural points; thresholds and audit history in the project surface for engineers and site managers.",
    outcome:
      "Continuous structural context between surveys, with events retained for review when works changed site conditions.",
    href: "/solutions/structural-health",
  },
  {
    id: "mep-commissioning",
    title: "MEP readiness during commissioning",
    sector: "MEP commissioning",
    region: "EU site",
    sku: "CN-MEP",
    challenge:
      "Commissioning teams lacked a shared view of flow, pressure, and energy behaviour while systems were still being balanced.",
    approach:
      "CN-MEP PoE panel sensing on agreed circuits; cloud readiness and history for MEP leads alongside the commissioning checklist.",
    outcome:
      "Fewer blind balancing loops and a shared record of system behaviour during the commissioning window.",
    href: "/solutions/mep",
  },
];

export const caseStudyFilters = [
  { id: "all", label: "All" },
  ...solutions.map((solution) => ({
    id: solution.code,
    label: solution.code,
  })),
] as const;
