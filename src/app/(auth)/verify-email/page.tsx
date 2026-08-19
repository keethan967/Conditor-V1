import type { Metadata } from "next";

import { AuthCard } from "@/components/layout/auth-card";

import { VerifyEmailContent } from "./_components/verify-email-content";

export const metadata: Metadata = {
  title: "Verify your email",
  description: "Confirm your email address to activate your Conditor account.",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard title="Check your inbox">
      <VerifyEmailContent />
    </AuthCard>
  );
}
