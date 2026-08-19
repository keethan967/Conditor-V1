import type { Accelerator } from "./types";

export const ACCELERATORS: Accelerator[] = [
  {
    id: "acc_ignition",
    slug: "ignition-labs",
    name: "Ignition Labs",
    description:
      "A 14-week, sector-agnostic accelerator for pre-seed technical founders, with a concentration in AI and infrastructure companies.",
    industries: ["ai", "saas", "cybersecurity"],
    regions: ["North America", "Europe"],
    hue: 210,
    founded: 2018,
    companiesGraduated: 212,
    totalFundingRaised: 480_000_000,
    programs: [
      {
        id: "prog_ignition_core",
        name: "Core Cohort",
        duration: "14 weeks",
        cohortSize: 18,
        equity: "6% for $150K",
        applicationDeadline: "2026-09-15",
        status: "open",
      },
      {
        id: "prog_ignition_ai",
        name: "AI Track",
        duration: "10 weeks",
        cohortSize: 12,
        equity: "5% for $125K",
        applicationDeadline: "2026-08-01",
        status: "upcoming",
      },
    ],
  },
  {
    id: "acc_terraform",
    slug: "terraform-ventures-studio",
    name: "Terraform Ventures Studio",
    description:
      "A climate-focused incubator that pairs technical founders with in-house scientists and a shared hardware lab from day one.",
    industries: ["climatetech", "deeptech", "energy"],
    regions: ["Europe", "North America"],
    hue: 145,
    founded: 2020,
    companiesGraduated: 64,
    totalFundingRaised: 210_000_000,
    programs: [
      {
        id: "prog_terraform_incubate",
        name: "Incubation Track",
        duration: "6 months",
        cohortSize: 8,
        equity: "8% for $200K",
        applicationDeadline: "2026-10-01",
        status: "open",
      },
    ],
  },
  {
    id: "acc_harborline",
    slug: "harbor-fintech-accelerator",
    name: "Harbor Fintech Accelerator",
    description:
      "A regulator-friendly accelerator for fintech and insurtech founders, run in partnership with three national banking regulators.",
    industries: ["fintech", "saas"],
    regions: ["North America", "Middle East"],
    hue: 152,
    founded: 2019,
    companiesGraduated: 98,
    totalFundingRaised: 340_000_000,
    programs: [
      {
        id: "prog_harbor_core",
        name: "Flagship Cohort",
        duration: "12 weeks",
        cohortSize: 15,
        equity: "7% for $175K",
        applicationDeadline: "2026-08-20",
        status: "open",
      },
    ],
  },
  {
    id: "acc_beacon",
    slug: "beacon-health-incubator",
    name: "Beacon Health Incubator",
    description:
      "A clinical-first incubator that embeds founders inside partner hospital systems for the length of the programme.",
    industries: ["healthtech", "ai"],
    regions: ["North America"],
    hue: 330,
    founded: 2021,
    companiesGraduated: 41,
    totalFundingRaised: 156_000_000,
    programs: [
      {
        id: "prog_beacon_clinical",
        name: "Clinical Residency",
        duration: "16 weeks",
        cohortSize: 10,
        equity: "6% for $180K",
        applicationDeadline: "2026-09-30",
        status: "open",
      },
    ],
  },
];

export function getAcceleratorBySlug(slug: string): Accelerator | undefined {
  return ACCELERATORS.find((accelerator) => accelerator.slug === slug);
}
