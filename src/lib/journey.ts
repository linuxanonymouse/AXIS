import { ROUTES } from "./constants";

export type PanelAlign = "left" | "right" | "center";

export type JourneyStage = {
  id: string;
  planet: string;
  label: string;
  align: PanelAlign;
  eyebrow?: string;
  title: string;
  body: string | string[];
  cta?: { label: string; href: string; primary?: boolean }[];
  list?: string[];
};

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "intro",
    planet: "Sun",
    label: "Sun",
    align: "center",
    eyebrow: "Operating System",
    title: "AXIS",
    body: "The operating system for scalable organizations.",
    cta: [
      { label: "Start Strategic Diagnostic", href: ROUTES.diagnostic, primary: true },
      { label: "Explore Axis", href: ROUTES.overview },
    ],
  },
  {
    id: "hero",
    planet: "Earth",
    label: "Earth",
    align: "left",
    eyebrow: "Institutional Overview",
    title: "Operating System for Scalable Organizations",
    body: "Axis aligns infrastructure, intelligence, distribution, and monetization into a coordinated operating environment designed for scalable growth.",
    cta: [
      { label: "Explore the Ecosystem", href: "#stage-ecosystem" },
      { label: "Begin Alignment", href: ROUTES.alignment, primary: true },
    ],
  },
  {
    id: "is-isnot",
    planet: "Venus",
    label: "Venus",
    align: "right",
    eyebrow: "Definition",
    title: "What Axis Is | What Axis Is Not",
    body: [
      "Axis is an operating system designed to identify unrealized revenue, remove structural friction, and install scalable systems. Axis does not add complexity. Axis removes friction.",
      "Not an agency. Not advisory theater. Not growth tactics. Not static strategy.",
    ],
    list: [
      "Not an agency",
      "Not advisory theater",
      "Not growth tactics",
      "Not static strategy",
    ],
  },
  {
    id: "philosophy",
    planet: "Mars",
    label: "Mars",
    align: "left",
    eyebrow: "Core Philosophy",
    title: "Clarity → Structure → Monetization",
    body: "The sequence cannot be skipped or reordered. Understanding what is actually happening. Systems where execution becomes predictable. Value captured once structure is aligned.",
    list: ["01 Clarity", "02 Structure", "03 Monetization"],
  },
  {
    id: "ecosystem",
    planet: "Jupiter",
    label: "Jupiter",
    align: "right",
    eyebrow: "The Axis Ecosystem",
    title: "Five interconnected layers. One system.",
    body: "Operations · Studio · Intelligence · Media · Ventures each layer performs a distinct function. Together, a complete system built for scalable growth.",
    cta: [{ label: "Explore Divisions", href: ROUTES.divisions, primary: true }],
  },
  {
    id: "closing",
    planet: "Saturn",
    label: "Saturn",
    align: "center",
    eyebrow: "Final Statement",
    title: "AXIS makes existing value unavoidable.",
    body: "Applied where revenue exists, growth is constrained, and structure is required.",
    cta: [
      { label: "Start Diagnostic", href: ROUTES.diagnostic, primary: true },
      { label: "Explore Divisions", href: ROUTES.divisions },
    ],
  },
];

export const STAGE_COUNT = JOURNEY_STAGES.length;
/** Each stage = one viewport; compact total scroll */
export const STAGE_VH = 100;
