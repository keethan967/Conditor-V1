import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

import { SettingsNav } from "./_components/settings-nav";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Container width="content" className="flex flex-col gap-6 py-8">
      <PageHeader
        title="Settings"
        description="Manage your profile, account and preferences."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]">
        <SettingsNav />
        <div className="min-w-0">{children}</div>
      </div>
    </Container>
  );
}
