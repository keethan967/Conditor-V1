import { seededInt } from "@/lib/session/demo-session";

import { APPLICATIONS } from "./programs";
import { DEAL_FLOW, PORTFOLIO } from "./portfolio";
import { STARTUPS } from "./startups";
import type { Industry } from "@/constants/taxonomy";

/**
 * Derived analytics series for charts.
 *
 * Where the fixtures already carry a real date (applications, deal flow),
 * these aggregate the actual records instead of fabricating a trend.
 * Numbers with no underlying history (profile views, readiness, funding)
 * are generated deterministically from a seed so they're stable across
 * reloads and always end at the entity's real current value — clearly
 * plausible demo data, not live history that doesn't exist yet.
 */

const WEEK_LABELS_8 = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

/** A rising trend of `points` values, seeded by `seed`, ending exactly at `current`. */
function risingTrendEndingAt(seed: string, current: number, points: number): number[] {
  const values: number[] = [];
  let value = Math.max(current * 0.35, 1);

  for (let i = 0; i < points - 1; i += 1) {
    const noise = seededInt(`${seed}:${i}`, -8, 14) / 100;
    value = value * (1 + 0.12 + noise);
    values.push(Math.round(value));
  }

  values.push(Math.round(current));
  // Keep it monotonic-ish and below the final value so the chart reads as growth.
  return values.map((v, i) =>
    i === values.length - 1
      ? Math.round(current)
      : Math.min(v, Math.round(current * 0.97)),
  );
}

export function getProfileViewsTrend(seed: string, currentViews: number) {
  return {
    labels: WEEK_LABELS_8,
    values: risingTrendEndingAt(`${seed}:views`, currentViews, 8),
  };
}

export function getReadinessTrend(seed: string, currentScore: number) {
  const start = Math.max(
    currentScore - seededInt(`${seed}:readiness-span`, 18, 32),
    20,
  );
  return {
    labels: WEEK_LABELS_8,
    values: risingTrendEndingAt(`${seed}:readiness`, currentScore, 8).map(
      (v, i, arr) =>
        i === arr.length - 1
          ? currentScore
          : Math.round(start + ((currentScore - start) * i) / (arr.length - 1)),
    ),
  };
}

export function getFundingTrend(seed: string, currentRaised: number) {
  return {
    labels: WEEK_LABELS_8,
    values: risingTrendEndingAt(`${seed}:funding`, currentRaised, 8),
  };
}

const TRAFFIC_SOURCE_LABELS = [
  "Investor search",
  "Direct",
  "Founder Rooms",
  "Referral",
  "Social",
] as const;

export function getTrafficSources(seed: string) {
  const weights = TRAFFIC_SOURCE_LABELS.map((label, i) =>
    seededInt(`${seed}:traffic:${label}`, 8 + i, 40 + i),
  );
  const total = weights.reduce((sum, w) => sum + w, 0);

  return TRAFFIC_SOURCE_LABELS.map((label, i) => ({
    label,
    value: Math.round((weights[i]! / total) * 100),
  }));
}

export function getPortfolioValueTrend() {
  const currentValue = PORTFOLIO.reduce(
    (sum, item) => sum + item.amountInvested * item.moic,
    0,
  );
  return {
    labels: WEEK_LABELS_8,
    values: risingTrendEndingAt("portfolio-value", currentValue, 8),
  };
}

/** Real weekly deal-sourcing activity, bucketed from `DEAL_FLOW.addedAt`. */
export function getDealActivityTrend() {
  const dates = DEAL_FLOW.map((d) => new Date(d.addedAt)).sort(
    (a, b) => a.getTime() - b.getTime(),
  );
  if (dates.length === 0) return { labels: [], values: [] };

  const start = dates[0]!;
  const buckets = new Map<number, number>();

  for (const date of dates) {
    const weekIndex = Math.floor(
      (date.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000),
    );
    buckets.set(weekIndex, (buckets.get(weekIndex) ?? 0) + 1);
  }

  const maxWeek = Math.max(...buckets.keys());
  const labels: string[] = [];
  const values: number[] = [];

  for (let i = 0; i <= maxWeek; i += 1) {
    labels.push(`Week ${i + 1}`);
    values.push(buckets.get(i) ?? 0);
  }

  return { labels, values };
}

/** Real portfolio allocation by industry, weighted by capital invested. */
export function getPortfolioAllocation() {
  const byIndustry = new Map<Industry, number>();

  for (const item of PORTFOLIO) {
    const startup = STARTUPS.find((s) => s.slug === item.startupSlug);
    if (!startup) continue;
    byIndustry.set(
      startup.industry,
      (byIndustry.get(startup.industry) ?? 0) + item.amountInvested,
    );
  }

  return Array.from(byIndustry.entries()).map(([industry, amount]) => ({
    industry,
    amount,
  }));
}

/** Real weekly application volume, bucketed from `APPLICATIONS.submittedAt`. */
export function getApplicationsTrend() {
  const dates = APPLICATIONS.map((a) => new Date(a.submittedAt)).sort(
    (a, b) => a.getTime() - b.getTime(),
  );
  if (dates.length === 0) return { labels: [], values: [] };

  const start = dates[0]!;
  const buckets = new Map<number, number>();

  for (const date of dates) {
    const dayIndex = Math.floor(
      (date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000),
    );
    buckets.set(dayIndex, (buckets.get(dayIndex) ?? 0) + 1);
  }

  const maxDay = Math.max(...buckets.keys());
  const labels: string[] = [];
  const values: number[] = [];

  for (let i = 0; i <= maxDay; i += 1) {
    const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    labels.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    values.push(buckets.get(i) ?? 0);
  }

  return { labels, values };
}

/** Real application volume by industry. */
export function getApplicationsByIndustry() {
  const byIndustry = new Map<Industry, number>();

  for (const application of APPLICATIONS) {
    byIndustry.set(
      application.industry,
      (byIndustry.get(application.industry) ?? 0) + 1,
    );
  }

  return Array.from(byIndustry.entries()).map(([industry, count]) => ({
    industry,
    count,
  }));
}
