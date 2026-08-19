import Link from "next/link";
import { ClipboardListIcon, GraduationCapIcon, SparklesIcon } from "lucide-react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { SectionCard } from "@/components/dashboard/section-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/constants/routes";
import { APPLICATIONS, COHORTS, MENTORS, type Application } from "@/lib/mock-data";
import type { DemoSession } from "@/lib/session/demo-session";
import { resolveProgramProfile } from "@/lib/session/persona-data";
import { formatDate } from "@/utils/format";

const STATUS_TONE: Record<string, "secondary" | "outline" | "destructive" | "default"> = {
  pending: "outline",
  reviewing: "secondary",
  interview: "default",
  accepted: "default",
  rejected: "destructive",
};

const STATUS_LABELS: Record<Application["status"], string> = {
  pending: "New",
  reviewing: "Reviewing",
  interview: "Interview",
  accepted: "Accepted",
  rejected: "Not a fit",
};

export function ProgramDashboard({ session }: { session: DemoSession }) {
  const program = resolveProgramProfile(session);
  const pendingCount = APPLICATIONS.filter(
    (app) => app.status === "pending" || app.status === "reviewing",
  ).length;
  const acceptedCount = APPLICATIONS.filter((app) => app.status === "accepted").length;
  const acceptanceRate = APPLICATIONS.length ? acceptedCount / APPLICATIONS.length : 0;
  const cohort = COHORTS[0];

  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader
        title={`Welcome back, ${session.fullName.split(" ")[0]}`}
        description={`Here's what's happening at ${program.name}.`}
        action={
          <Button asChild>
            <Link href={ROUTES.applications}>Review applications</Link>
          </Button>
        }
      />

      <FadeIn className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Startups that applied"
          value={String(APPLICATIONS.length)}
          description="How many startups have applied to your program."
          icon={ClipboardListIcon}
        />
        <StatCard
          label="Waiting for you"
          value={String(pendingCount)}
          description="Applications you haven't reviewed yet."
        />
        <StatCard
          label="How many get in"
          value={`${Math.round(acceptanceRate * 100)}%`}
          description="The share of applicants you accept."
        />
        <StatCard
          label="Startups graduated"
          value={String(program.companiesGraduated)}
          description="Startups that finished your program."
          icon={GraduationCapIcon}
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard
          title="New applications"
          description="The newest startups that applied, best matches first."
          action={{ label: "View all", href: ROUTES.applications }}
          className="lg:col-span-2"
        >
          <div className="flex flex-col divide-y">
            {APPLICATIONS.slice(0, 5).map((application) => (
              <div key={application.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  <PersonaAvatar name={application.founderName} hue={200} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{application.startupName}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {application.founderName}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="tabular text-xs text-muted-foreground">
                    {application.fitScore}%
                  </span>
                  <Badge variant={STATUS_TONE[application.status]}>
                    {STATUS_LABELS[application.status]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Mentors" description="People who help startups. Most active this month.">
          <div className="flex flex-col gap-3">
            {MENTORS.slice(0, 4).map((mentor) => (
              <div key={mentor.id} className="flex items-center gap-3">
                <PersonaAvatar name={mentor.name} hue={mentor.hue} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{mentor.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {mentor.expertise.join(", ")}
                  </p>
                </div>
                <span className="tabular text-xs text-muted-foreground">
                  {mentor.sessionsThisMonth}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard
          title="Programs"
          description="Open and upcoming programs."
          action={{ label: "Manage programs", href: ROUTES.programs }}
        >
          <div className="flex flex-col divide-y">
            {program.programs.map((prog) => (
              <div key={prog.id} className="flex items-center justify-between gap-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">{prog.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {prog.duration} · {prog.cohortSize} startups · {prog.equity}
                  </p>
                </div>
                <Badge variant={prog.status === "open" ? "default" : "secondary"} className="capitalize">
                  {prog.status}
                </Badge>
              </div>
            ))}
          </div>
        </SectionCard>

        {cohort && (
          <SectionCard
            title={cohort.name}
            description={`A group of startups that started together on ${formatDate(cohort.startDate)}.`}
            action={{ label: "View group", href: ROUTES.programs }}
          >
            <div className="flex flex-col gap-3">
              {cohort.companies.slice(0, 5).map((company) => (
                <div key={company.name} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{company.name}</span>
                      <span className="tabular text-muted-foreground">{company.progress}%</span>
                    </div>
                    <Progress value={company.progress} className="mt-1 h-1" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>

      <Link
        href={ROUTES.assistant}
        className="lift flex items-center gap-3 rounded-xl border bg-primary-subtle p-4 text-primary-subtle-foreground"
      >
        <SparklesIcon className="size-5 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Ask Conditor Copilot to review applications</p>
          <p className="text-xs opacity-80">
            See how well an applicant matches what you&apos;re looking for, in seconds.
          </p>
        </div>
      </Link>
    </Container>
  );
}
