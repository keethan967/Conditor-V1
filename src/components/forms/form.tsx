"use client";

import { useId } from "react";
import {
  FormProvider,
  useController,
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Form                                                                       */
/* -------------------------------------------------------------------------- */

interface FormProps<TInput extends FieldValues, TOutput> {
  form: UseFormReturn<TInput, unknown, TOutput>;
  /** Receives the PARSED output of the Zod schema, not the raw input. */
  onSubmit: (values: TOutput) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

/**
 * Form root: provides context and wires submission.
 *
 * `noValidate` disables native browser validation so Zod is the only source of
 * truth. Without it, the browser's own tooltip fires first and blocks
 * submission before the resolver ever runs — leaving two competing, differently
 * styled sets of error messages.
 */
export function Form<TInput extends FieldValues, TOutput>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<TInput, TOutput>) {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full", className)}
      >
        <FieldGroup>{children}</FieldGroup>
      </form>
    </FormProvider>
  );
}

/* -------------------------------------------------------------------------- */
/* FormField                                                                  */
/* -------------------------------------------------------------------------- */

interface FormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  className?: string;
  /**
   * Render prop receiving the controlled field plus the accessibility props
   * the input must spread. Kept as a render prop rather than a fixed `<Input>`
   * so any control — select, combobox, file picker, rich editor — participates
   * in the same label/description/error contract.
   */
  children: (props: {
    field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}

/**
 * A labelled, validated, accessible field.
 *
 * This component exists to make the accessible wiring unforgettable. Doing it
 * by hand means remembering `htmlFor`/`id`, `aria-invalid`, and an
 * `aria-describedby` that points at both the description AND the error — and
 * that last one is missed almost every time, which leaves screen-reader users
 * with a field that is visibly red and silently fine.
 */
export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  children,
}: FormFieldProps<TFieldValues>) {
  const generatedId = useId();
  const { field, fieldState } = useController({ control, name });

  const id = `${generatedId}-${name}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = fieldState.error ? `${id}-error` : undefined;

  // Both IDs, in reading order: describe the field, then state what is wrong.
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <Field data-invalid={!!fieldState.error} className={className}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      {children({
        field,
        id,
        "aria-invalid": !!fieldState.error,
        "aria-describedby": describedBy,
      })}

      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}

      {fieldState.error && (
        <FieldError id={errorId}>{fieldState.error.message}</FieldError>
      )}
    </Field>
  );
}

/* -------------------------------------------------------------------------- */
/* SubmitButton                                                               */
/* -------------------------------------------------------------------------- */

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  /** Read from `form.formState.isSubmitting`. */
  isSubmitting?: boolean;
  loadingText?: string;
}

/**
 * Submit button with a built-in pending state.
 *
 * Disabling during submission is not merely cosmetic — it is what prevents the
 * double-submit that creates duplicate records.
 */
export function SubmitButton({
  isSubmitting = false,
  loadingText,
  children,
  disabled,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      aria-busy={isSubmitting}
      className={cn(className)}
      {...props}
    >
      {isSubmitting && <Spinner className="size-4 text-current" label={null} />}
      {isSubmitting && loadingText ? loadingText : children}
    </Button>
  );
}
