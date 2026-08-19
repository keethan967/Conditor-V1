/**
 * Display formatting.
 *
 * Every function here is pure and locale-aware via `Intl`, which handles
 * grouping separators, currency placement and pluralisation correctly for
 * every locale — hand-rolled string concatenation does not.
 *
 * Formatter construction is the expensive part of `Intl` (roughly 100× the
 * cost of `format()`), so instances are cached rather than created per call.
 * This matters in list rendering, where a feed of 50 cards would otherwise
 * build 50 identical formatters per paint.
 */

const DEFAULT_LOCALE = "en-US";

const formatterCache = new Map<string, Intl.NumberFormat>();

function getNumberFormatter(
  locale: string,
  options: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = formatterCache.get(key);

  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    formatterCache.set(key, formatter);
  }

  return formatter;
}

/* -------------------------------------------------------------------------- */
/* Currency                                                                   */
/* -------------------------------------------------------------------------- */

interface CurrencyOptions {
  currency?: string;
  locale?: string;
  /** `"$1.2M"` instead of `"$1,200,000"`. Default for funding figures. */
  compact?: boolean;
}

/**
 * Formats a monetary amount.
 *
 * Funding amounts are compact by default — "$1.2M" is what a founder writes on
 * a deck, and it keeps card layouts from reflowing as figures grow.
 */
export function formatCurrency(
  amount: number | null | undefined,
  { currency = "USD", locale = DEFAULT_LOCALE, compact = true }: CurrencyOptions = {},
): string {
  if (amount == null || !Number.isFinite(amount)) return "—";

  return getNumberFormatter(locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(amount);
}

/* -------------------------------------------------------------------------- */
/* Numbers                                                                    */
/* -------------------------------------------------------------------------- */

export function formatNumber(
  value: number | null | undefined,
  { locale = DEFAULT_LOCALE, compact = false } = {},
): string {
  if (value == null || !Number.isFinite(value)) return "—";

  return getNumberFormatter(locale, {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);
}

/**
 * Formats a ratio as a percentage.
 *
 * @param value a ratio in the 0–1 range, not an already-multiplied percentage.
 */
export function formatPercent(
  value: number | null | undefined,
  { locale = DEFAULT_LOCALE, fractionDigits = 0 } = {},
): string {
  if (value == null || !Number.isFinite(value)) return "—";

  return getNumberFormatter(locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/** Signed delta for metric deltas — always shows direction, including zero. */
export function formatDelta(
  value: number | null | undefined,
  { locale = DEFAULT_LOCALE, asPercent = true } = {},
): string {
  if (value == null || !Number.isFinite(value)) return "—";

  return getNumberFormatter(locale, {
    style: asPercent ? "percent" : "decimal",
    signDisplay: "exceptZero",
    maximumFractionDigits: 1,
  }).format(value);
}

/* -------------------------------------------------------------------------- */
/* Dates                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Coerces the several shapes a timestamp arrives in — Postgres strings, epoch
 * milliseconds, `Date` — into a valid `Date`, or `null`.
 *
 * Returning `null` instead of an `Invalid Date` matters: `Invalid Date` passes
 * every truthiness check and renders the literal string "Invalid Date" to the
 * user, which is how that bug reaches production.
 */
function toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null) return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(
  value: Date | string | number | null | undefined,
  { locale = DEFAULT_LOCALE, style = "medium" as const } = {},
): string {
  const date = toDate(value);
  if (!date) return "—";

  return new Intl.DateTimeFormat(locale, { dateStyle: style }).format(date);
}

export function formatDateTime(
  value: Date | string | number | null | undefined,
  { locale = DEFAULT_LOCALE } = {},
): string {
  const date = toDate(value);
  if (!date) return "—";

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["week", 7 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
];

/**
 * "3 hours ago", "in 2 days".
 *
 * Uses `Intl.RelativeTimeFormat` so the output is grammatical in every locale.
 * Anything under a minute collapses to "just now" — "43 seconds ago" is noise.
 *
 * Note for callers: this is time-dependent, so rendering it in a Server
 * Component bakes the value into the cached HTML. Render it client-side, or
 * pass the ISO string and format on the client.
 */
export function formatRelativeTime(
  value: Date | string | number | null | undefined,
  { locale = DEFAULT_LOCALE, now = new Date() } = {},
): string {
  const date = toDate(value);
  if (!date) return "—";

  const elapsed = date.getTime() - now.getTime();
  const absolute = Math.abs(elapsed);

  if (absolute < 60 * 1000) return "just now";

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  for (const [unit, milliseconds] of RELATIVE_UNITS) {
    if (absolute >= milliseconds) {
      return formatter.format(Math.round(elapsed / milliseconds), unit);
    }
  }

  return "just now";
}

/* -------------------------------------------------------------------------- */
/* Files                                                                      */
/* -------------------------------------------------------------------------- */

const FILE_UNITS = ["B", "KB", "MB", "GB"] as const;

export function formatFileSize(bytes: number | null | undefined): string {
  if (bytes == null || !Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes === 0) return "0 B";

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    FILE_UNITS.length - 1,
  );
  const size = bytes / 1024 ** exponent;

  return `${size.toFixed(exponent === 0 ? 0 : 1)} ${FILE_UNITS[exponent]}`;
}
