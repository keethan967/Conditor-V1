"use client";

import { toast } from "sonner";
import { z } from "zod";
import Link from "next/link";

import { Form, FormField, SubmitButton } from "@/components/forms/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { useZodForm } from "@/hooks/use-zod-form";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const form = useZodForm<SignInValues, SignInValues>(signInSchema, {
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.info("No live accounts yet", {
      description:
        "This preview doesn't persist real accounts — use a demo account above instead.",
    });
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField control={form.control} name="email" label="Email">
        {({ field, ...a11y }) => (
          <Input type="email" placeholder="you@company.com" {...field} {...a11y} />
        )}
      </FormField>

      <FormField control={form.control} name="password" label="Password">
        {({ field, ...a11y }) => (
          <div className="flex flex-col gap-1.5">
            <Input type="password" placeholder="••••••••" {...field} {...a11y} />
            <Link
              href={ROUTES.forgotPassword}
              className="self-end text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}
      </FormField>

      <SubmitButton
        variant="outline"
        size="lg"
        className="w-full"
        isSubmitting={form.formState.isSubmitting}
        loadingText="Signing in…"
      >
        Sign in with email
      </SubmitButton>
    </Form>
  );
}
