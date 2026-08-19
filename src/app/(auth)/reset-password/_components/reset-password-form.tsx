"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "@/components/forms/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { useZodForm } from "@/hooks/use-zod-form";

const schema = z
  .object({
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type Values = z.infer<typeof schema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const form = useZodForm<Values, Values>(schema, {
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Password updated");
    router.push(ROUTES.signIn);
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField control={form.control} name="password" label="New password">
        {({ field, ...a11y }) => (
          <Input type="password" placeholder="••••••••" {...field} {...a11y} />
        )}
      </FormField>

      <FormField
        control={form.control}
        name="confirmPassword"
        label="Confirm new password"
      >
        {({ field, ...a11y }) => (
          <Input type="password" placeholder="••••••••" {...field} {...a11y} />
        )}
      </FormField>

      <SubmitButton
        size="lg"
        className="w-full"
        isSubmitting={form.formState.isSubmitting}
        loadingText="Updating…"
      >
        Update password
      </SubmitButton>
    </Form>
  );
}
