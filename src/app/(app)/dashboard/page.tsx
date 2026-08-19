import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { navGroupFor } from "@/components/shell/nav-items";
import { ROUTES } from "@/constants/routes";
import { getDemoSession } from "@/lib/session/server";

import { FounderDashboard } from "./_components/founder-dashboard";
import { InvestorDashboard } from "./_components/investor-dashboard";
import { ProgramDashboard } from "./_components/program-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your Conditor home — matches, funding progress and activity in one place.",
};

export default async function DashboardPage() {
  const session = await getDemoSession();

  if (!session) {
    redirect(ROUTES.signIn);
  }

  const group = navGroupFor(session.accountType);

  if (group === "investor") return <InvestorDashboard session={session} />;
  if (group === "program") return <ProgramDashboard session={session} />;
  return <FounderDashboard session={session} />;
}
