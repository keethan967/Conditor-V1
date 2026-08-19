import type { DealFlowItem, PortfolioItem } from "./types";

export const DEAL_FLOW: DealFlowItem[] = [
  {
    startupSlug: "glasswing-ai",
    stage: "term_sheet",
    addedAt: "2026-06-12",
    nextStep: "Finish the last edits to the offer",
  },
  {
    startupSlug: "orbital-health",
    stage: "diligence",
    addedAt: "2026-06-28",
    nextStep: "Clinical reference calls",
  },
  {
    startupSlug: "quivera-space",
    stage: "diligence",
    addedAt: "2026-07-02",
    nextStep: "Technical deep-dive with hardware lead",
  },
  {
    startupSlug: "cipherline",
    stage: "meeting",
    addedAt: "2026-07-10",
    nextStep: "Partner meeting scheduled Thursday",
  },
  {
    startupSlug: "northtide",
    stage: "meeting",
    addedAt: "2026-07-15",
    nextStep: "Second call with co-founders",
  },
  {
    startupSlug: "pathwise",
    stage: "screening",
    addedAt: "2026-07-20",
    nextStep: "Review their updated documents",
  },
  {
    startupSlug: "harborline",
    stage: "screening",
    addedAt: "2026-07-22",
    nextStep: "Waiting on their latest numbers",
  },
  {
    startupSlug: "verdant-carbon",
    stage: "sourced",
    addedAt: "2026-07-26",
    nextStep: "Intro call not yet scheduled",
  },
  {
    startupSlug: "meridian-robotics",
    stage: "sourced",
    addedAt: "2026-07-29",
    nextStep: "Waiting for someone to introduce us",
  },
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    startupSlug: "ledgerly",
    investedAt: "2022-11-04",
    amountInvested: 2_000_000,
    ownershipPercent: 4.2,
    currentValuation: 180_000_000,
    status: "active",
    moic: 3.8,
  },
  {
    startupSlug: "realmark",
    investedAt: "2021-05-18",
    amountInvested: 3_500_000,
    ownershipPercent: 3.1,
    currentValuation: 240_000_000,
    status: "active",
    moic: 4.6,
  },
  {
    startupSlug: "kindlecare",
    investedAt: "2023-02-09",
    amountInvested: 750_000,
    ownershipPercent: 5.8,
    currentValuation: 22_000_000,
    status: "active",
    moic: 1.9,
  },
  {
    startupSlug: "fablume",
    investedAt: "2024-06-21",
    amountInvested: 120_000,
    ownershipPercent: 2.4,
    currentValuation: 6_500_000,
    status: "active",
    moic: 1.1,
  },
];
