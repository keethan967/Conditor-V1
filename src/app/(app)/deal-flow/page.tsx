import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

import { DealFlowBoard } from "./_components/deal-flow-board";

export const metadata: Metadata = {
  title: "Investment Opportunities",
  description: "Startups you're considering investing in.",
};

export default function DealFlowPage() {
  return (
    <Container width="full" className="flex flex-col gap-6 py-8">
      <PageHeader
        title="Investment Opportunities"
        description="Every startup you're considering, from first look to final decision."
      />
      <DealFlowBoard />
    </Container>
  );
}
