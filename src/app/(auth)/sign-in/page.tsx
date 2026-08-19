import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/components/layout/auth-card";
import { FieldSeparator } from "@/components/ui/field";
import { ROUTES } from "@/constants/routes";

import { DemoPersonaCards } from "./_components/demo-persona-cards";
import { SignInForm } from "./_components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Conditor to manage your fundraising or investments.",
};

export default function SignInPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Jump straight into a fully-populated account, or sign in with email."
      className="max-w-md"
      footer={
        <>
          New to Conditor?{" "}
          <Link
            href={ROUTES.signUp}
            className="font-medium text-primary hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <DemoPersonaCards />
      <FieldSeparator>or</FieldSeparator>
      <SignInForm />
    </AuthCard>
  );
}
