import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

import { BookmarksContent } from "./_components/bookmarks-content";

export const metadata: Metadata = {
  title: "Saved Startups",
  description: "Startups you've saved to look at again later.",
};

export default function BookmarksPage() {
  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader
        title="Saved Startups"
        description="Startups you've saved to look at again later."
      />
      <BookmarksContent />
    </Container>
  );
}
