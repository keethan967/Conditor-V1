import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

import { NotificationsContent } from "./_components/notifications-content";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Messages, matches, meeting requests and profile activity.",
};

export default function NotificationsPage() {
  return (
    <Container width="narrow" className="flex flex-col gap-6 py-8">
      <PageHeader title="Notifications" />
      <NotificationsContent />
    </Container>
  );
}
