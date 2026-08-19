/**
 * The single source of truth for every URL in the product.
 *
 * Hard-coded path strings are the most common source of dead links in a large
 * Next.js app: a folder gets renamed and nothing fails until a user clicks.
 * Routing through this map means a rename is a compile error.
 */

export const ROUTES = {
  // Marketing
  home: "/",
  pricing: "/pricing",
  about: "/about",
  help: "/help",
  contact: "/contact",
  privacy: "/legal/privacy",
  terms: "/legal/terms",

  // Authentication
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  authCallback: "/auth/callback",
  onboarding: "/onboarding",

  // Application shell
  dashboard: "/dashboard",
  discover: "/discover",
  search: "/search",
  messages: "/messages",
  notifications: "/notifications",
  bookmarks: "/bookmarks",
  portfolio: "/portfolio",
  dealFlow: "/deal-flow",
  applications: "/applications",
  programs: "/programs",
  analytics: "/analytics",
  assistant: "/assistant",
  rooms: "/rooms",

  // Settings
  settings: "/settings",
  settingsProfile: "/settings/profile",
  settingsAccount: "/settings/account",
  settingsNotifications: "/settings/notifications",
  settingsBilling: "/settings/billing",
  settingsSecurity: "/settings/security",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

/** Dynamic routes are functions so the parameter can never be forgotten. */
export const dynamicRoutes = {
  startup: (slug: string) => `/startups/${slug}` as const,
  investor: (slug: string) => `/investors/${slug}` as const,
  accelerator: (slug: string) => `/accelerators/${slug}` as const,
  profile: (username: string) => `/@${username}` as const,
  conversation: (id: string) => `/messages/${id}` as const,
  program: (id: string) => `/programs/${id}` as const,
  room: (slug: string) => `/rooms/${slug}` as const,
} as const;

/**
 * Route classification consumed by `middleware.ts`.
 *
 * Prefix matching is deliberate: `/settings/*` and `/messages/*` should all
 * inherit their parent's protection without being enumerated. Adding a new
 * authenticated section means adding one prefix here — forgetting to protect
 * it is the failure mode this list exists to prevent.
 */
export const PROTECTED_PREFIXES = [
  ROUTES.dashboard,
  ROUTES.discover,
  ROUTES.messages,
  ROUTES.notifications,
  ROUTES.bookmarks,
  ROUTES.portfolio,
  ROUTES.dealFlow,
  ROUTES.applications,
  ROUTES.programs,
  ROUTES.analytics,
  ROUTES.assistant,
  ROUTES.rooms,
  ROUTES.settings,
  ROUTES.onboarding,
] as const;

/** Routes a signed-in user should be bounced away from. */
export const AUTH_ONLY_PREFIXES = [
  ROUTES.signIn,
  ROUTES.signUp,
  ROUTES.forgotPassword,
] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthOnlyPath(pathname: string): boolean {
  return AUTH_ONLY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
