import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/constants/routes";
import { APPLICATIONS, COHORTS, MENTORS } from "@/lib/mock-data";
import { getDemoSession } from "@/lib/session/server";
import { resolveProgramProfile } from "@/lib/session/persona-data";
import { formatDate } from "@/utils/format";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Program",
};

export default async function ProgramDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getDemoSession();
  if (!session) redirect(ROUTES.signIn);

  const profile = resolveProgramProfile(session);
  const program = profile.programs.find((item) => item.id === id);
  if (!program) notFound();

  const cohort = COHORTS[0];
  const accepted = APPLICATIONS.filter((app) => app.status === "accepted").length;

  return (
    <Container className="flex flex-col gap-8 py-8">
      <PageHeader
        title={program.name}
        description={`${program.duration} · ${program.cohortSize} startups · ${program.equity}`}
        action={
          <Badge variant={program.status === "open" ? "default" : "secondary"} className="capitalize">
            {program.status}
          </Badge>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Applications"
          value={String(APPLICATIONS.length)}
          description="How many startups applied."
        />
        <StatCard
          label="Accepted"
          value={String(accepted)}
          description="How many startups got in."
        />
        <StatCard
          label="Group size"
          value={String(program.cohortSize)}
          description="How many startups join at once."
        />
        <StatCard label="Applications close" value={formatDate(program.applicationDeadline)} />
      </div>

      {cohort && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">How this group is doing</h2>
          <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
            {cohort.companies.map((company) => (
              <div key={company.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{company.name}</span>
                  <span className="tabular text-muted-foreground">{company.progress}%</span>
                </div>
                <Progress value={company.progress} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Mentors</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MENTORS.map((mentor) => (
            <div key={mentor.id} className="flex items-center gap-3 rounded-xl border bg-card p-4">
              <PersonaAvatar name={mentor.name} hue={mentor.hue} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{mentor.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {mentor.expertise.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
