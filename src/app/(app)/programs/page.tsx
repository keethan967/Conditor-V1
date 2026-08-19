import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Progress } from "@/components/ui/progress";
import { ROUTES, dynamicRoutes } from "@/constants/routes";
import { COHORTS } from "@/lib/mock-data";
import { getDemoSession } from "@/lib/session/server";
import { resolveProgramProfile } from "@/lib/session/persona-data";
import { formatDate } from "@/utils/format";

export const metadata: Metadata = {
  title: "Programs",
  description: "Manage your programs and the startups in them.",
};

export default async function ProgramsPage() {
  const session = await getDemoSession();
  if (!session) redirect(ROUTES.signIn);

  const program = resolveProgramProfile(session);

  return (
    <Container className="flex flex-col gap-8 py-8">
      <PageHeader
        title="Programs"
        description={`Manage what ${program.name} runs and who's in it.`}
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Your programs</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {program.programs.map((prog) => (
            <Link
              key={prog.id}
              href={dynamicRoutes.program(prog.id)}
              className="lift flex flex-col gap-3 rounded-xl border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-base font-semibold">{prog.name}</p>
                <Badge variant={prog.status === "open" ? "default" : "secondary"} className="capitalize">
                  {prog.status}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <p>How long: {prog.duration}</p>
                <p>Group size: {prog.cohortSize} startups</p>
                <p>The deal: {prog.equity}</p>
                <p>Applications close: {formatDate(prog.applicationDeadline)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Groups happening now</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {COHORTS.map((cohort) => (
            <div key={cohort.id} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
              <div>
                <p className="text-sm font-semibold">{cohort.name}</p>
                <p className="text-xs text-muted-foreground">
                  {cohort.programName} · Started {formatDate(cohort.startDate)}
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                {cohort.companies.map((company) => (
                  <div key={company.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{company.name}</span>
                      <span className="tabular text-muted-foreground">{company.progress}%</span>
                    </div>
                    <Progress value={company.progress} className="mt-1 h-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
