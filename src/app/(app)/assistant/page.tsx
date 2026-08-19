import type { Metadata } from "next";

import { CopilotPanel } from "@/components/copilot/copilot-panel";

export const metadata: Metadata = {
  title: "Conditor Copilot",
  description:
    "Your AI assistant for investors, profile improvements, pitch review and strategy.",
};

export default function AssistantPage() {
  return (
    <div className="h-[calc(100svh-var(--spacing-header)-4rem)] md:h-[calc(100svh-var(--spacing-header))]">
      <CopilotPanel variant="page" />
    </div>
  );
}
