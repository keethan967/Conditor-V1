"use client";

import { BarChart, DonutChart, LineChart } from "@/components/charts";
import { ReadinessRing } from "@/components/dashboard/readiness-ring";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  getFundingTrend,
  getProfileViewsTrend,
  getReadinessTrend,
  getTrafficSources,
} from "@/lib/mock-data";
import type { DemoSession } from "@/lib/session/demo-session";
import { resolveFounderStartup } from "@/lib/session/persona-data";
import { formatCurrency, formatDelta } from "@/utils/format";

export function FounderAnalytics({ session }: { session: DemoSession }) {
  const startup = resolveFounderStartup(session);
  const { analytics } = startup;
  const seed = startup.slug;

  const viewsTrend = getProfileViewsTrend(seed, analytics.profileViews);
  const readinessTrend = getReadinessTrend(seed, startup.investmentReadiness);
  const fundingTrend = getFundingTrend(seed, startup.amountRaised);
  const trafficSources = getTrafficSources(seed);

  const engagementByType = [
    { label: "Opened pitch", value: analytics.deckOpens },
    { label: "Downloaded", value: analytics.deckDownloads },
    { label: "Meetings", value: analytics.meetingRequests },
    { label: "Saved you", value: analytics.investorSaves },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Profile views"
          value={analytics.profileViews.toLocaleString()}
          description="How many people looked at your startup."
          delta={analytics.weeklyGrowth}
          trend={analytics.weeklyViews}
        />
        <StatCard
          label="Pitch opens"
          value={analytics.deckOpens.toLocaleString()}
          description="How many times investors opened your pitch."
        />
        <StatCard
          label="Pitch downloads"
          value={analytics.deckDownloads.toLocaleString()}
          description="How many investors saved your pitch to look at later."
        />
        <StatCard
          label="Meeting requests"
          value={analytics.meetingRequests.toLocaleString()}
          description="How many investors asked to meet with you."
        />
        <StatCard
          label="Messages"
          value={analytics.messagesReceived.toLocaleString()}
          description="People who sent you a message."
        />
        <StatCard
          label="Investor saves"
          value={analytics.investorSaves.toLocaleString()}
          description="How many investors added your startup to their list."
        />
        <StatCard
          label="This week's growth"
          value={formatDelta(analytics.weeklyGrowth)}
          description="How much more attention you got this week vs. last week."
        />
        <StatCard
          label="Ready for investors"
          value={`${startup.investmentReadiness} / 100`}
          description="How ready your startup looks to investors. Higher is better."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">Profile views over time</p>
            <p className="text-xs text-muted-foreground">
              How many people looked at your startup each week, over the last 8 weeks.
            </p>
          </div>
          <LineChart
            labels={viewsTrend.labels}
            series={[{ id: "views", label: "Profile views", values: viewsTrend.values, area: true }]}
          />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">Money raised over time</p>
            <p className="text-xs text-muted-foreground">
              How much money you&apos;ve raised so far, added up week by week.
            </p>
          </div>
          <LineChart
            labels={fundingTrend.labels}
            series={[{ id: "funding", label: "Raised", values: fundingTrend.values, area: true }]}
            valueFormatter={(v) => formatCurrency(v, { compact: true })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_auto]">
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5 lg:col-span-1">
          <div>
            <p className="text-sm font-semibold">Getting ready for investors</p>
            <p className="text-xs text-muted-foreground">
              Your &quot;Ready for investors&quot; score, out of 100, over the last 8 weeks.
            </p>
          </div>
          <LineChart
            labels={readinessTrend.labels}
            series={[{ id: "readiness", label: "Score", values: readinessTrend.values }]}
            valueFormatter={(v) => String(Math.round(v))}
          />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">What investors did</p>
            <p className="text-xs text-muted-foreground">This week, so far.</p>
          </div>
          <BarChart data={engagementByType} />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5 sm:min-w-72">
          <div>
            <p className="text-sm font-semibold">How people found you</p>
            <p className="text-xs text-muted-foreground">
              Where the people who viewed your startup came from.
            </p>
          </div>
          <DonutChart
            data={trafficSources}
            valueFormatter={(v) => `${v}%`}
            centerLabel="Sources"
            size={160}
          />
        </div>
      </div>

      <div className="flex items-center gap-6 rounded-xl border bg-card p-5">
        <ReadinessRing score={startup.investmentReadiness} size={104} />
        <div>
          <p className="text-sm font-semibold">Ready for investors</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on how complete your pitch, growth numbers and team sections are.
          </p>
        </div>
      </div>
    </div>
  );
}
