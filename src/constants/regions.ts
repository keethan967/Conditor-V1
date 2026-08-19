/** World regions used by accelerator/programme onboarding and search filters. */
export const REGIONS = [
  "North America",
  "Europe",
  "Middle East",
  "Asia Pacific",
  "Africa",
  "Latin America",
] as const;

export type Region = (typeof REGIONS)[number];
