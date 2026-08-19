"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MailIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useDemoSession } from "@/providers/demo-session-provider";

export function VerifyEmailContent() {
  const router = useRouter();
  const { session } = useDemoSession();
  const [resending, setResending] = useState(false);

  async function resend() {
    setResending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setResending(false);
    toast.success("Verification email sent again");
  }

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary-subtle text-primary-subtle-foreground">
        <MailIcon className="size-5" aria-hidden="true" />
      </div>

      <p className="text-sm text-pretty text-muted-foreground">
        We sent a verification link to{" "}
        <span className="font-medium text-foreground">
          {session?.email ?? "your email"}
        </span>
        . Click it to activate your account.
      </p>

      <div className="flex w-full flex-col gap-2">
        <Button
          size="lg"
          onClick={() =>
            router.push(
              session?.onboardingComplete ? ROUTES.dashboard : ROUTES.onboarding,
            )
          }
        >
          I&apos;ve verified — continue
        </Button>
        <Button variant="outline" size="lg" onClick={resend} disabled={resending}>
          {resending ? "Sending…" : "Resend email"}
        </Button>
      </div>
    </div>
  );
}
