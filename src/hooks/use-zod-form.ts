"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

/**
 * `useForm` with the Zod resolver pre-wired and field names inferred from the
 * schema.
 *
 * The payoff is that the schema becomes the single definition of a form: field
 * names, types, validation rules and error messages all derive from it. A
 * mistyped `name="emial"` becomes a compile error instead of a field that
 * silently never validates.
 *
 * `mode: "onTouched"` is deliberate. Validating on every keystroke shows an
 * "invalid email" error while the user is still typing the first character;
 * validating only on submit hides problems until the end. Validating once a
 * field is left, then live afterwards, is the behaviour users expect.
 */
export function useZodForm<TInput extends FieldValues, TOutput>(
  schema: z.ZodType<TOutput, z.ZodTypeDef, TInput>,
  options?: Omit<UseFormProps<TInput, unknown, TOutput>, "resolver">,
): UseFormReturn<TInput, unknown, TOutput> {
  return useForm<TInput, unknown, TOutput>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    ...options,
  });
}
