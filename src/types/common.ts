/**
 * Shared type vocabulary. Domain types belong to their feature slice — only
 * genuinely cross-cutting shapes live here.
 */

/**
 * Explicit success/failure without exceptions.
 *
 * Server Actions and services return this instead of throwing, so the caller
 * is forced by the type system to handle the failure branch. Discriminating on
 * `ok` narrows `data` and `error` correctly in both directions.
 */
export type Result<T, E = AppError> = { ok: true; data: T } | { ok: false; error: E };

export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

/**
 * A failure that is safe to show a user.
 *
 * `code` drives behaviour (retry, redirect, upsell); `message` is the copy.
 * Raw provider errors are never passed through — they leak schema details and
 * read like a stack trace.
 */
export interface AppError {
  code: AppErrorCode;
  message: string;
  /** Field-level messages, keyed by form field name. */
  fieldErrors?: Record<string, string[]>;
}

export type AppErrorCode =
  | "unauthenticated"
  | "forbidden"
  | "not_found"
  | "validation"
  | "conflict"
  | "rate_limited"
  | "upstream"
  | "unknown";

/** Cursor pagination — stable under inserts, unlike offset pagination. */
export interface Page<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PageParams {
  cursor?: string | null;
  limit?: number;
}

/** Sort direction shared by every table and list in the product. */
export type SortDirection = "asc" | "desc";

export interface SortState<TField extends string = string> {
  field: TField;
  direction: SortDirection;
}

/* -------------------------------------------------------------------------- */
/* Utility types                                                              */
/* -------------------------------------------------------------------------- */

export type Nullable<T> = T | null;

/** Makes selected keys optional — useful for draft/partial entity forms. */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Makes selected keys required — the inverse, for validated payloads. */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Widens a literal union to allow arbitrary strings while keeping autocomplete. */
export type LooseAutocomplete<T extends string> = T | (string & {});

/** Every property, recursively optional. For deep-merged config objects. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
