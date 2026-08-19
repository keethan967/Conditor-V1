"use client";

import { toast } from "sonner";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "@/components/forms/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useZodForm } from "@/hooks/use-zod-form";

/**
 * The schema is the whole form: field names, types, rules and error copy all
 * come from here. Error messages are written as user-facing sentences, because
 * they are exactly what the user reads — "Invalid input" is a developer's note,
 * not an instruction.
 */
const demoSchema = z.object({
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters.")
    .max(64, "Company name must be 64 characters or fewer."),
  email: z.string().email("Enter a valid work email address."),
  pitch: z
    .string()
    .min(20, "Give us at least 20 characters — one clear sentence is plenty.")
    .max(280, "Keep it under 280 characters."),
});

type DemoValues = z.infer<typeof demoSchema>;

export function FormDemo() {
  const form = useZodForm<DemoValues, DemoValues>(demoSchema, {
    defaultValues: { company: "", email: "", pitch: "" },
  });

  async function onSubmit(values: DemoValues) {
    // Stands in for a Server Action; the delay makes the pending state visible.
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast.success("Validated", { description: `Received "${values.company}".` });
    form.reset();
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="max-w-lg">
      <FormField
        control={form.control}
        name="company"
        label="Company name"
        description="This is how your startup appears across Conditor."
      >
        {({ field, ...a11y }) => (
          <Input placeholder="Aurellus Industries" {...field} {...a11y} />
        )}
      </FormField>

      <FormField control={form.control} name="email" label="Work email">
        {({ field, ...a11y }) => (
          <Input type="email" placeholder="you@company.com" {...field} {...a11y} />
        )}
      </FormField>

      <FormField
        control={form.control}
        name="pitch"
        label="One-line pitch"
        description="What you do, in a sentence an investor could repeat."
      >
        {({ field, ...a11y }) => (
          <Textarea rows={3} placeholder="We help…" {...field} {...a11y} />
        )}
      </FormField>

      <SubmitButton
        size="lg"
        className="w-fit"
        isSubmitting={form.formState.isSubmitting}
        loadingText="Validating…"
      >
        Submit
      </SubmitButton>
    </Form>
  );
}
