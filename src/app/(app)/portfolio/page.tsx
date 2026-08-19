import type { Metadata } from "next";
import Link from "next/link";

import { CompanyMark } from "@/components/entity/company-mark";
import { IndustryBadge, StageBadge } from "@/components/entity/taxonomy-badges";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dynamicRoutes } from "@/constants/routes";
import { PORTFOLIO, getStartupBySlug } from "@/lib/mock-data";
import { formatCurrency, formatDate, formatPercent } from "@/utils/format";

export const metadata: Metadata = {
  title: "Your Investments",
  description: "Every startup you've put money into, and how it's doing.",
};

const STATUS_TONE: Record<string, "default" | "secondary" | "destructive"> = {
  active: "default",
  exited: "secondary",
  written_off: "destructive",
};

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  exited: "Exited",
  written_off: "Lost",
};

export default function PortfolioPage() {
  const totalInvested = PORTFOLIO.reduce((sum, item) => sum + item.amountInvested, 0);
  const totalValue = PORTFOLIO.reduce((sum, item) => sum + item.amountInvested * item.moic, 0);
  const avgMoic = PORTFOLIO.length
    ? PORTFOLIO.reduce((sum, item) => sum + item.moic, 0) / PORTFOLIO.length
    : 0;

  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader
        title="Your Investments"
        description="Every startup you've put money into, tracked in one place."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Startups"
          value={String(PORTFOLIO.length)}
          description="How many startups you've invested in."
        />
        <StatCard
          label="Money invested"
          value={formatCurrency(totalInvested)}
          description="The total amount you've put into these startups."
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

      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Startup</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Your share</TableHead>
              <TableHead>Worth now</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PORTFOLIO.map((item) => {
              const startup = getStartupBySlug(item.startupSlug);
              if (!startup) return null;

              return (
                <TableRow key={item.startupSlug}>
                  <TableCell>
                    <Link
                      href={dynamicRoutes.startup(startup.slug)}
                      className="flex items-center gap-2.5"
                    >
                      <CompanyMark name={startup.name} hue={startup.hue} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{startup.name}</p>
                        <div className="mt-0.5 flex gap-1">
                          <IndustryBadge industry={startup.industry} />
                          <StageBadge stage={startup.stage} />
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="tabular">{formatDate(item.investedAt)}</TableCell>
                  <TableCell className="tabular">{formatCurrency(item.amountInvested)}</TableCell>
                  <TableCell className="tabular">
                    {formatPercent(item.ownershipPercent / 100)}
                  </TableCell>
                  <TableCell className="tabular">
                    {formatCurrency(item.currentValuation)}
                  </TableCell>
                  <TableCell className="tabular font-medium">{item.moic.toFixed(1)}x</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_TONE[item.status]}>{STATUS_LABEL[item.status]}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
