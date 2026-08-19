import type { Metadata } from "next";

import { AuthCard } from "@/components/layout/auth-card";

import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata: Metadata = {
  title: "Set a new password",
  description: "Choose a new password for your Conditor account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Set a new password"
      description="Make it something you haven't used before."
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
