import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

import { ApplicationsTable } from "./_components/applications-table";

export const metadata: Metadata = {
  title: "Applications",
  description: "See who applied to your program.",
};

export default function ApplicationsPage() {
  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader
        title="Applications"
        description="See who applied to your program, and choose who moves forward."
      />
      <ApplicationsTable />
    </Container>
  );
}
