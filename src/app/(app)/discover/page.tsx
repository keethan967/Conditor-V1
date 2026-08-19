import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

import { DiscoverSidebar } from "./_components/discover-sidebar";
import { FeedContainer } from "./_components/feed-container";

export const metadata: Metadata = {
  title: "Discover",
  description:
    "Product launches, milestones and funding news from startups across Conditor.",
};

export default function DiscoverPage() {
  return (
    <Container width="content" className="flex flex-col gap-6 py-8">
      <PageHeader
        title="Discover"
        description="What's happening across the Conditor network."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <FeedContainer />
        <div className="hidden lg:block">
          <DiscoverSidebar />
        </div>
      </div>
    </Container>
  );
}
