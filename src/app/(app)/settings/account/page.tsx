import type { Metadata } from "next";

import { AccountContent } from "./_components/account-content";

export const metadata: Metadata = {
  title: "Account settings",
};

export default function SettingsAccountPage() {
  return <AccountContent />;
}
