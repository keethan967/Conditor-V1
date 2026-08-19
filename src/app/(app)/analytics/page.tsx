import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { navGroupFor } from "@/components/shell/nav-items";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ROUTES } from "@/constants/routes";
import { getDemoSession } from "@/lib/session/server";

import { FounderAnalytics } from "./_components/founder-analytics";
import { InvestorAnalytics } from "./_components/investor-analytics";
import { ProgramAnalytics } from "./_components/program-analytics";

export const metadata: Metadata = {
  title: "Your Progress",
  description: "How you're doing, in simple charts.",
};

export default async function AnalyticsPage() {
  const session = await getDemoSession();
  if (!session) redirect(ROUTES.signIn);

  const group = navGroupFor(session.accountType);

  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader title="Your Progress" description="How you're doing, in simple charts." />

      {group === "founder" && <FounderAnalytics session={session} />}
      {group === "investor" && <InvestorAnalytics />}
      {group === "program" && <ProgramAnalytics />}
    </Container>
  );
}
