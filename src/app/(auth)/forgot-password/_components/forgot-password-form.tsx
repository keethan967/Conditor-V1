"use client";

import { useState } from "react";
import { MailCheckIcon } from "lucide-react";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "@/components/forms/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/use-zod-form";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
});

type Values = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useZodForm<Values, Values>(schema, { defaultValues: { email: "" } });

  async function onSubmit(values: Values) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSentTo(values.email);
  }

  if (sentTo) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-success-subtle text-success-subtle-foreground">
          <MailCheckIcon className="size-5" aria-hidden="true" />
        </div>
        <p className="text-sm text-pretty text-muted-foreground">
          If an account exists for{" "}
          <span className="font-medium text-foreground">{sentTo}</span>, a reset link is
          on its way.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSentTo(null)}>
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField control={form.control} name="email" label="Email">
        {({ field, ...a11y }) => (
          <Input type="email" placeholder="you@company.com" {...field} {...a11y} />
        )}
      </FormField>

      <SubmitButton
        size="lg"
        className="w-full"
        isSubmitting={form.formState.isSubmitting}
        loadingText="Sending…"
      >
        Send reset link
      </SubmitButton>
    </Form>
  );
}
