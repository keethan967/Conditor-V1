import type { Metadata } from "next";

import { MessagesView } from "@/features/messaging/components/messages-view";

export const metadata: Metadata = {
  title: "Messages",
  description: "Secure conversations with founders and investors.",
};

export default function MessagesPage() {
  return <MessagesView />;
}
