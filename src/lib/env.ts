import { z } from "zod";

/**
 * Validated, typed environment access.
 *
 * Why this file exists: `process.env.FOO` is `string | undefined` everywhere in
 * the codebase, which means every consumer either writes a non-null assertion
 * or silently ships `undefined` into a network call. Validating once at the
 * boundary turns a class of production incidents into a startup error.
 *
 * Two rules make this work with Next.js:
 *
 * 1. Client variables are read as full literal expressions
 *    (`process.env.NEXT_PUBLIC_X`, never `process.env[key]`). The bundler
 *    performs a static text replacement — a computed lookup inlines nothing
 *    and yields `undefined` in the browser.
 *
 * 2. Server variables live in a separate object that is never imported from a
 *    client component, so secrets cannot reach the browser bundle.
 */

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("must be a full URL, e.g. https://xxxx.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "is required — find it in Supabase → Project Settings → API"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("must be a full URL, e.g. http://localhost:3000"),
});

const serverSchema = z.object({
  /**
   * Bypasses Row Level Security. Only ever imported by `lib/supabase/admin.ts`,
   * which is marked `server-only`. Optional so local development and preview
   * builds work without it.
   */
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

/** Escape hatch for Docker/CI image builds that have no runtime secrets. */
const shouldSkip =
  process.env.SKIP_ENV_VALIDATION === "1" || process.env.SKIP_ENV_VALIDATION === "true";

function formatIssues(issues: z.ZodIssue[]): string {
  return issues
    .map((issue) => `  • ${issue.path.join(".")} ${issue.message}`)
    .join("\n");
}

function parseClientEnv(): z.infer<typeof clientSchema> {
  const raw = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  };

  if (shouldSkip) {
    return raw as z.infer<typeof clientSchema>;
  }

  const result = clientSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(
      `Invalid environment configuration:\n${formatIssues(result.error.issues)}\n\n` +
        `Copy .env.example to .env.local and fill in the values.\n` +
        `To build without them (CI image builds only), set SKIP_ENV_VALIDATION=1.`,
    );
  }

  return result.data;
}

function parseServerEnv(): z.infer<typeof serverSchema> {
  const raw = {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
  };

  if (shouldSkip) {
    return serverSchema.parse({ NODE_ENV: raw.NODE_ENV });
  }

  const result = serverSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(
      `Invalid server environment configuration:\n${formatIssues(result.error.issues)}`,
    );
  }

  return result.data;
}

/** Safe to import anywhere, including client components. */
export const env = parseClientEnv();

/**
 * Server-only configuration. Importing this from a client component will leak
 * secrets into the browser bundle — `lib/supabase/admin.ts` is the only
 * intended consumer.
 */
export const serverEnv = parseServerEnv();

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";
