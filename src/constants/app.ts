/**
 * Product-level constants. Anything a marketer or lawyer might want changed
 * lives here, not inlined in a component.
 */

export const APP = {
  name: "Conditor",
  legalName: "Aurellus Industries",
  tagline: "Where founders and investors find each other.",
  description:
    "Conditor connects founders with investors, accelerators and government programs — all in one place, to help you raise money and build real relationships.",
  domain: "conditor.com",
  supportEmail: "support@conditor.com",
} as const;

export const SOCIAL = {
  x: "https://x.com/conditor",
  linkedin: "https://linkedin.com/company/conditor",
  github: "https://github.com/aurellus",
} as const;

/**
 * Cookie and storage keys. Centralised so a rename is a one-line change and
 * collisions are impossible to introduce accidentally.
 */
export const STORAGE_KEYS = {
  theme: "conditor-theme",
  sidebarCollapsed: "conditor-sidebar-collapsed",
  recentSearches: "conditor-recent-searches",
} as const;

/** Shared pagination defaults, so every list in the product feels the same. */
export const PAGINATION = {
  defaultPageSize: 20,
  feedPageSize: 12,
  maxPageSize: 100,
} as const;

/**
 * Upload limits, enforced client-side for feedback and server-side for safety.
 * Client-side validation alone is a UX affordance, never a security control.
 */
export const UPLOAD_LIMITS = {
  avatarBytes: 2 * 1024 * 1024, // 2 MB
  logoBytes: 2 * 1024 * 1024, // 2 MB
  pitchDeckBytes: 25 * 1024 * 1024, // 25 MB
  imageBytes: 8 * 1024 * 1024, // 8 MB
  acceptedImageTypes: ["image/png", "image/jpeg", "image/webp"],
  acceptedDocumentTypes: ["application/pdf"],
} as const;
