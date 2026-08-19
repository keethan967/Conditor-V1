import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/components/layout/auth-card";
import { ROUTES } from "@/constants/routes";

import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Get a link to reset your Conditor password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter the email on your account and we'll send a reset link."
      footer={
        <Link href={ROUTES.signIn} className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
