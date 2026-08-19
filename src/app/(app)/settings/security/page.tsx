import type { Metadata } from "next";

import { SecurityContent } from "./_components/security-content";

export const metadata: Metadata = {
  title: "Security settings",
};

export default function SettingsSecurityPage() {
  return <SecurityContent />;
}
