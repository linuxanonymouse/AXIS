export const SITE = {
  name: "AXIS",
  tagline: "The operating system for scalable organizations.",
  description:
    "Axis is an institutional operating system for scalable organizations not an agency, consultancy, or service provider.",
  email: "operations@axisoperations.ca",
  heroSupport:
    "Axis aligns infrastructure, intelligence, distribution, and monetization into a coordinated operating environment designed for scalable growth.",
} as const;

export const ROUTES = {
  home: "/",
  overview: "/overview",
  divisions: "/divisions",
  operations: "/operations",
  studio: "/studio",
  intelligence: "/intelligence",
  media: "/media",
  ventures: "/ventures",
  diagnostic: "/diagnostic",
  alignment: "/alignment",
  insights: "/insights",
  contact: "/contact",
} as const;

export const NAV_DESKTOP = [
  { href: ROUTES.overview, label: "Overview" },
  { href: ROUTES.divisions, label: "Divisions" },
  { href: ROUTES.diagnostic, label: "Diagnostic" },
] as const;

export const NAV_MOBILE = [
  { href: ROUTES.overview, label: "Overview" },
  { href: ROUTES.divisions, label: "Divisions" },
  { href: ROUTES.operations, label: "Operations" },
  { href: ROUTES.studio, label: "Studio" },
  { href: ROUTES.intelligence, label: "Intelligence" },
  { href: ROUTES.media, label: "Media" },
  { href: ROUTES.ventures, label: "Ventures" },
  { href: ROUTES.diagnostic, label: "Diagnostic" },
  { href: ROUTES.insights, label: "Insights" },
  { href: ROUTES.contact, label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  { href: ROUTES.overview, label: "Overview" },
  { href: ROUTES.divisions, label: "Divisions" },
  { href: ROUTES.diagnostic, label: "Diagnostic" },
  { href: ROUTES.insights, label: "Insights" },
  { href: ROUTES.contact, label: "Contact" },
] as const;

export const FOOTER_DIVISIONS = [
  { href: ROUTES.operations, label: "Operations" },
  { href: ROUTES.studio, label: "Studio" },
  { href: ROUTES.intelligence, label: "Intelligence" },
  { href: ROUTES.media, label: "Media" },
  { href: ROUTES.ventures, label: "Ventures" },
] as const;

export const PHILOSOPHY = [
  {
    num: "01",
    title: "Clarity",
    copy: "Understanding what is actually happening versus what is assumed.",
    mood: "clarity",
  },
  {
    num: "02",
    title: "Structure",
    copy: "Designing systems where execution becomes predictable and scalable.",
    mood: "structure",
  },
  {
    num: "03",
    title: "Monetization",
    copy: "Capturing and compounding value once structure is aligned.",
    mood: "monetization",
  },
] as const;

export const ECOSYSTEM = [
  {
    name: "Axis Operations",
    role: "Strategy · Structure · Decision Architecture",
    href: ROUTES.operations,
    color: "#c9a227",
    tags: ["Command Layer"],
  },
  {
    name: "Axis Studio",
    role: "Infrastructure · Systems · Automation",
    href: ROUTES.studio,
    color: "#4a8fe8",
    tags: ["Deployment Layer"],
  },
  {
    name: "Axis Intelligence",
    role: "Optimization · Data Systems · Decision Control",
    href: ROUTES.intelligence,
    color: "#9b5de5",
    tags: ["Control Layer"],
  },
  {
    name: "Axis Media",
    role: "Distribution · Audience Systems · Perception Control",
    href: ROUTES.media,
    color: "#d4a84b",
    tags: ["Distribution Layer"],
  },
  {
    name: "Axis Ventures",
    role: "Partnerships · Expansion · Monetization",
    href: ROUTES.ventures,
    color: "#3d9a6a",
    tags: ["Expansion Layer"],
  },
] as const;
