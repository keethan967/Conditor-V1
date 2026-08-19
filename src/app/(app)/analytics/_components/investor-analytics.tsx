"use client";

import { BarChart, DonutChart, LineChart } from "@/components/charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { INDUSTRIES, labelFor } from "@/constants/taxonomy";
import {
  DEAL_FLOW,
  PORTFOLIO,
  getDealActivityTrend,
  getPortfolioAllocation,
  getPortfolioValueTrend,
} from "@/lib/mock-data";
import type { DealStage } from "@/lib/mock-data";
import { formatCurrency } from "@/utils/format";

const STAGE_LABELS: Record<DealStage, string> = {
  sourced: "New",
  screening: "First Look",
  meeting: "Meeting",
  diligence: "Startup Review",
  term_sheet: "Offer Sent",
  closed: "Invested",
};

export function InvestorAnalytics() {
  const totalInvested = PORTFOLIO.reduce((sum, item) => sum + item.amountInvested, 0);
  const totalValue = PORTFOLIO.reduce((sum, item) => sum + item.amountInvested * item.moic, 0);
  const avgMoic = PORTFOLIO.length
    ? PORTFOLIO.reduce((sum, item) => sum + item.moic, 0) / PORTFOLIO.length
    : 0;

  const stageCounts = DEAL_FLOW.reduce<Partial<Record<DealStage, number>>>((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] ?? 0) + 1;
    return acc;
  }, {});

  const dealFlowData = (Object.keys(STAGE_LABELS) as DealStage[]).map((stage) => ({
    label: STAGE_LABELS[stage],
    value: stageCounts[stage] ?? 0,
  }));

  const portfolioValueTrend = getPortfolioValueTrend();
  const dealActivity = getDealActivityTrend();
  const allocation = getPortfolioAllocation().map((item) => ({
    label: labelFor(INDUSTRIES, item.industry),
    value: item.amount,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Startups you've invested in"
          value={String(PORTFOLIO.length)}
          description="How many startups you've put money into."
        />
        <StatCard
          label="Money invested"
          value={formatCurrency(totalInvested)}
          description="The total amount you've invested."
        />
        <StatCard
          label="Worth now"
          value={formatCurrency(totalValue)}
          description="What your investments are worth today."
        />
        <StatCard
          label="Average return"
          value={`${avgMoic.toFixed(1)}x`}
          description="How much your money has grown, on average. 2x means it doubled."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">Your investments&apos; worth over time</p>
            <p className="text-xs text-muted-foreground">
              What all your investments together are worth, week by week.
            </p>
          </div>
          <LineChart
            labels={portfolioValueTrend.labels}
            series={[
              { id: "value", label: "Worth", values: portfolioValueTrend.values, area: true },
            ]}
            valueFormatter={(v) => formatCurrency(v, { compact: true })}
          />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">New startups you found</p>
            <p className="text-xs text-muted-foreground">
              How many new startups you added to your list each week.
            </p>
          </div>
          <LineChart
            labels={dealActivity.labels}
            series={[{ id: "deals", label: "Startups found", values: dealActivity.values }]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">Investment opportunities by stage</p>
            <p className="text-xs text-muted-foreground">
              How many startups are at each step, from first look to investing.
            </p>
          </div>
          <BarChart data={dealFlowData} ordinal />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">Your investments by industry</p>
            <p className="text-xs text-muted-foreground">
              How your money is spread across different industries.
            </p>
          </div>
          <DonutChart
            data={allocation}
            valueFormatter={(v) => formatCurrency(v, { compact: true })}
            centerLabel="Invested"
            size={160}
          />
        </div>
      </div>
    </div>
  );
}
