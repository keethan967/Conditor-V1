import type { Metadata } from "next";

import { NotificationsContent } from "./_components/notifications-content";

export const metadata: Metadata = {
  title: "Notification settings",
};

export default function SettingsNotificationsPage() {
  return <NotificationsContent />;
}
