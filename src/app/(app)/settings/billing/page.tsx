import type { Metadata } from "next";

import { BillingContent } from "./_components/billing-content";

export const metadata: Metadata = {
  title: "Billing settings",
};

export default function SettingsBillingPage() {
  return <BillingContent />;
}
