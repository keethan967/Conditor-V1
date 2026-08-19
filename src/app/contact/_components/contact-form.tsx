"use client";

import { toast } from "sonner";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "@/components/forms/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useZodForm } from "@/hooks/use-zod-form";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(10, "Give us a bit more detail — at least 10 characters."),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const form = useZodForm<ContactValues, ContactValues>(contactSchema, {
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Message sent", {
      description: "We'll get back to you within one business day.",
    });
    form.reset();
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="max-w-lg">
      <FormField control={form.control} name="name" label="Name">
        {({ field, ...a11y }) => (
          <Input placeholder="Jordan Blake" {...field} {...a11y} />
        )}
      </FormField>

      <FormField control={form.control} name="email" label="Email">
        {({ field, ...a11y }) => (
          <Input type="email" placeholder="you@company.com" {...field} {...a11y} />
        )}
      </FormField>

      <FormField control={form.control} name="message" label="Message">
        {({ field, ...a11y }) => (
          <Textarea rows={5} placeholder="How can we help?" {...field} {...a11y} />
        )}
      </FormField>

      <SubmitButton
        size="lg"
        className="w-fit"
        isSubmitting={form.formState.isSubmitting}
        loadingText="Sending…"
      >
        Send message
      </SubmitButton>
    </Form>
  );
}
