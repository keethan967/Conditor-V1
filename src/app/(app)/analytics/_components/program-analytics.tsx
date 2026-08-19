"use client";

import { BarChart, DonutChart, LineChart } from "@/components/charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { INDUSTRIES, labelFor } from "@/constants/taxonomy";
import {
  APPLICATIONS,
  COHORTS,
  MENTORS,
  getApplicationsByIndustry,
  getApplicationsTrend,
  type Application,
} from "@/lib/mock-data";

const STATUSES: Application["status"][] = ["pending", "reviewing", "interview", "accepted", "rejected"];

const STATUS_LABELS: Record<Application["status"], string> = {
  pending: "New",
  reviewing: "Reviewing",
  interview: "Interview",
  accepted: "Accepted",
  rejected: "Not a fit",
};

export function ProgramAnalytics() {
  const statusData = STATUSES.map((status) => ({
    label: STATUS_LABELS[status],
    value: APPLICATIONS.filter((app) => app.status === status).length,
  }));

  const totalMentorSessions = MENTORS.reduce((sum, mentor) => sum + mentor.sessionsThisMonth, 0);
  const avgCohortProgress = COHORTS.flatMap((c) => c.companies).reduce(
    (sum, company, _index, array) => sum + company.progress / array.length,
    0,
  );

  const applicationsTrend = getApplicationsTrend();
  const byIndustry = getApplicationsByIndustry().map((item) => ({
    label: labelFor(INDUSTRIES, item.industry),
    value: item.count,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Startups that applied"
          value={String(APPLICATIONS.length)}
          description="How many startups have applied to your program."
        />
        <StatCard
          label="Average match score"
          value={`${Math.round(APPLICATIONS.reduce((sum, a) => sum + a.fitScore, 0) / APPLICATIONS.length)}%`}
          description="How well applicants match what you're looking for, on average."
        />
        <StatCard
          label="Mentor meetings this month"
          value={String(totalMentorSessions)}
          description="How many times mentors met with startups this month."
        />
        <StatCard
          label="Average progress"
          value={`${Math.round(avgCohortProgress)}%`}
          description="How far along the startups in your program are, on average."
        />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <div className="mb-4">
          <p className="text-sm font-semibold">Startups applying over time</p>
          <p className="text-xs text-muted-foreground">
            How many startups applied to your program each day.
          </p>
        </div>
        <LineChart
          labels={applicationsTrend.labels}
          series={[
            { id: "applications", label: "Applications", values: applicationsTrend.values, area: true },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">Applications by stage</p>
            <p className="text-xs text-muted-foreground">
              How many applicants are at each step of your review.
            </p>
          </div>
          <BarChart data={statusData} ordinal />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div>
            <p className="text-sm font-semibold">Applications by industry</p>
            <p className="text-xs text-muted-foreground">What kind of startups are applying.</p>
          </div>
          <DonutChart data={byIndustry} centerLabel="Applicants" size={160} />
        </div>
      </div>
    </div>
  );
}
