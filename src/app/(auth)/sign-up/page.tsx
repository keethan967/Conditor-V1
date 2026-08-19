import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/components/layout/auth-card";
import { ROUTES } from "@/constants/routes";

import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Join Conditor to start raising money or finding your next investment.",
};

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Takes about a minute. You'll pick your role next."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href={ROUTES.signIn}
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthCard>
  );
}
