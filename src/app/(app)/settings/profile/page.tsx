import type { Metadata } from "next";

import { ProfileForm } from "./_components/profile-form";

export const metadata: Metadata = {
  title: "Profile settings",
};

export default function SettingsProfilePage() {
  return <ProfileForm />;
}
