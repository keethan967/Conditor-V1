/**
 * String helpers. Pure, dependency-free, and safe on `null`/`undefined` —
 * these run against user-supplied data that is frequently incomplete.
 */

/**
 * Combining diacritical marks. The Unicode property escape keeps this source
 * ASCII-only — a literal `U+0300–U+036F` range renders as invisible combining
 * characters that any re-encoding of the file can silently corrupt.
 */
const DIACRITICS = /\p{Diacritic}/gu;

/**
 * Up to two initials for avatar fallbacks.
 *
 * Uses the first and LAST word rather than the first two, so "Maria del
 * Carmen Ortiz" yields "MO" rather than "MD". Falls back to "?" so an avatar
 * is never blank.
 */
export function getInitials(name: string | null | undefined): string {
  if (!name?.trim()) return "?";

  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";

  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";

  return `${first}${last}`.toUpperCase();
}

/**
 * URL-safe slug.
 *
 * Normalises to NFD first so accented characters decompose into a base letter
 * plus a combining mark, which the diacritic strip then removes — "Cafe Movil"
 * with accents becomes "cafe-movil" rather than "caf-mvil".
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncates at a word boundary and appends an ellipsis.
 *
 * Cutting mid-word ("innova...") reads as a rendering bug; cutting at a space
 * reads as an intentional summary.
 */
export function truncate(value: string | null | undefined, maxLength: number): string {
  if (!value) return "";
  if (value.length <= maxLength) return value;

  const clipped = value.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");

  // Only honour the word boundary if it is reasonably close to the limit,
  // otherwise a single long token would collapse the string to nothing.
  const cut = lastSpace > maxLength * 0.6 ? lastSpace : maxLength;

  return `${clipped.slice(0, cut).trimEnd()}…`;
}

/** Strips protocol and trailing slash for display: "conditor.com" from a URL. */
export function formatUrlForDisplay(url: string | null | undefined): string {
  if (!url) return "";

  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

/**
 * Prefixes a bare domain with `https://` so it is usable in an `href`.
 * Users type "conditor.com"; browsers treat that as a relative path.
 */
export function ensureProtocol(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;

  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
): string {
  return count === 1 ? singular : plural;
}
