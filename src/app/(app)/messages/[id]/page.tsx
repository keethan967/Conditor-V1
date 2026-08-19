import type { Metadata } from "next";

import { MessagesView } from "@/features/messaging/components/messages-view";

export const metadata: Metadata = {
  title: "Messages",
  description: "Secure conversations with founders and investors.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConversationPage({ params }: PageProps) {
  const { id } = await params;
  return <MessagesView activeId={id} />;
}
