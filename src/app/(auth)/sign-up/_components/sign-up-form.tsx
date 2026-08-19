"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "@/components/forms/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { useZodForm } from "@/hooks/use-zod-form";
import { useDemoSession } from "@/providers/demo-session-provider";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { startSession } = useDemoSession();

  const form = useZodForm<SignUpValues, SignUpValues>(signUpSchema, {
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: SignUpValues) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    startSession({ fullName: values.fullName, email: values.email });
    router.push(ROUTES.onboarding);
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField control={form.control} name="fullName" label="Full name">
        {({ field, ...a11y }) => (
          <Input placeholder="Jordan Blake" {...field} {...a11y} />
        )}
      </FormField>

      <FormField control={form.control} name="email" label="Email">
        {({ field, ...a11y }) => (
          <Input type="email" placeholder="you@company.com" {...field} {...a11y} />
        )}
      </FormField>

      <FormField control={form.control} name="password" label="Password">
        {({ field, ...a11y }) => (
          <Input type="password" placeholder="••••••••" {...field} {...a11y} />
        )}
      </FormField>

      <FormField control={form.control} name="confirmPassword" label="Confirm password">
        {({ field, ...a11y }) => (
          <Input type="password" placeholder="••••••••" {...field} {...a11y} />
        )}
      </FormField>

      <SubmitButton
        size="lg"
        className="w-full"
        isSubmitting={form.formState.isSubmitting}
        loadingText="Creating account…"
      >
        Create account
      </SubmitButton>
    </Form>
  );
}
