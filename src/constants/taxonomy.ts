/**
 * The product's shared vocabulary.
 *
 * Account types, funding stages and industries appear in onboarding, search
 * filters, profile forms, matching logic and analytics. Defining them once —
 * as `as const` arrays that derive their own union types — means the compiler
 * rejects a typo in any of those places, and adding a value updates every
 * dropdown in the product at once.
 *
 * These mirror Postgres enums. When the schema lands, the generated
 * `Enums<"account_type">` type should be asserted against `AccountType` so
 * the two can never drift apart silently.
 */

/* -------------------------------------------------------------------------- */
/* Account types                                                              */
/* -------------------------------------------------------------------------- */

export const ACCOUNT_TYPES = [
  {
    value: "founder",
    label: "Founder",
    description: "I'm building a startup and looking for money and support.",
  },
  {
    value: "angel",
    label: "Angel Investor",
    description: "I invest my own money in new startups.",
  },
  {
    value: "vc",
    label: "Venture Capital",
    description: "I invest other people's money in promising startups.",
  },
  {
    value: "accelerator",
    label: "Accelerator",
    description: "I run short programs that help startups grow fast.",
  },
  {
    value: "incubator",
    label: "Incubator",
    description: "I help people build a startup from the very beginning.",
  },
  {
    value: "family_office",
    label: "Family Office",
    description: "I invest a wealthy family's money in startups.",
  },
  {
    value: "government",
    label: "Government Program",
    description: "I give out public funding to help startups grow.",
  },
] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number]["value"];

/** The two sides of the marketplace — drives navigation and permissions. */
export const INVESTOR_ACCOUNT_TYPES: readonly AccountType[] = [
  "angel",
  "vc",
  "family_office",
  "government",
];

export const PROGRAM_ACCOUNT_TYPES: readonly AccountType[] = [
  "accelerator",
  "incubator",
];

/* -------------------------------------------------------------------------- */
/* Funding                                                                    */
/* -------------------------------------------------------------------------- */

export const FUNDING_STAGES = [
  { value: "idea", label: "Idea" },
  { value: "pre_seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series_a", label: "Series A" },
  { value: "series_b", label: "Series B" },
  { value: "series_c", label: "Series C" },
  { value: "growth", label: "Growth" },
  { value: "public", label: "Public" },
] as const;

export type FundingStage = (typeof FUNDING_STAGES)[number]["value"];

/* -------------------------------------------------------------------------- */
/* Industries                                                                 */
/* -------------------------------------------------------------------------- */

export const INDUSTRIES = [
  { value: "ai", label: "Artificial Intelligence" },
  { value: "fintech", label: "FinTech" },
  { value: "healthtech", label: "HealthTech" },
  { value: "climatetech", label: "ClimateTech" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "robotics", label: "Robotics" },
  { value: "space", label: "Space" },
  { value: "biotech", label: "BioTech" },
  { value: "saas", label: "SaaS" },
  { value: "marketplace", label: "Marketplace" },
  { value: "consumer", label: "Consumer" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "edtech", label: "EdTech" },
  { value: "proptech", label: "PropTech" },
  { value: "logistics", label: "Logistics" },
  { value: "energy", label: "Energy" },
  { value: "agritech", label: "AgriTech" },
  { value: "deeptech", label: "DeepTech" },
  { value: "gaming", label: "Gaming" },
  { value: "media", label: "Media" },
] as const;

export type Industry = (typeof INDUSTRIES)[number]["value"];

/* -------------------------------------------------------------------------- */
/* Company shape                                                              */
/* -------------------------------------------------------------------------- */

export const TEAM_SIZES = [
  { value: "1-5", label: "1–5" },
  { value: "6-20", label: "6–20" },
  { value: "21-50", label: "21–50" },
  { value: "51-200", label: "51–200" },
  { value: "201-500", label: "201–500" },
  { value: "500+", label: "500+" },
] as const;

export type TeamSize = (typeof TEAM_SIZES)[number]["value"];

export const REVENUE_BANDS = [
  { value: "pre_revenue", label: "No sales yet" },
  { value: "under_100k", label: "Under $100K a year" },
  { value: "100k_1m", label: "$100K – $1M a year" },
  { value: "1m_10m", label: "$1M – $10M a year" },
  { value: "10m_50m", label: "$10M – $50M a year" },
  { value: "50m_plus", label: "$50M+ a year" },
] as const;

export type RevenueBand = (typeof REVENUE_BANDS)[number]["value"];

/* -------------------------------------------------------------------------- */
/* Lookup helpers                                                             */
/* -------------------------------------------------------------------------- */

type Option<T extends string> = { readonly value: T; readonly label: string };

/**
 * Resolves a stored value to its display label.
 *
 * Falls back to the raw value rather than throwing: a row written before an
 * option was renamed should render imperfectly, not crash the page.
 */
export function labelFor<T extends string>(
  options: readonly Option<T>[],
  value: T | null | undefined,
): string {
  if (!value) return "—";
  return options.find((option) => option.value === value)?.label ?? value;
}
