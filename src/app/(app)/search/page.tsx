import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingState } from "@/components/feedback/loading-state";

import { SearchView } from "./_components/search-view";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search startups, investors and accelerators by industry, stage, region and more.",
};

export default function SearchPage() {
  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader
        title="Search"
        description="Find startups, investors and accelerators across the network."
      />
      <Suspense fallback={<LoadingState />}>
        <SearchView />
      </Suspense>
    </Container>
  );
}
