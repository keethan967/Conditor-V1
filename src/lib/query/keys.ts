/**
 * Query key factory.
 *
 * Cache invalidation is the hardest part of client-side data fetching, and
 * ad-hoc key arrays (`["startups", id]` typed by hand in twelve files) make it
 * unsolvable — one typo and the invalidation silently no-ops.
 *
 * The hierarchy below makes scope explicit. Invalidating `startups.all`
 * invalidates every startup query; invalidating `startups.detail(id)` touches
 * exactly one. Each feature extends this file with its own namespace rather
 * than inventing keys locally.
 */

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
    profile: () => [...queryKeys.auth.all, "profile"] as const,
  },

  startups: {
    all: ["startups"] as const,
    lists: () => [...queryKeys.startups.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.startups.lists(), filters] as const,
    details: () => [...queryKeys.startups.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.startups.details(), id] as const,
  },

  investors: {
    all: ["investors"] as const,
    lists: () => [...queryKeys.investors.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.investors.lists(), filters] as const,
    details: () => [...queryKeys.investors.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.investors.details(), id] as const,
  },

  conversations: {
    all: ["conversations"] as const,
    list: () => [...queryKeys.conversations.all, "list"] as const,
    detail: (id: string) => [...queryKeys.conversations.all, id] as const,
    messages: (conversationId: string) =>
      [...queryKeys.conversations.detail(conversationId), "messages"] as const,
  },

  notifications: {
    all: ["notifications"] as const,
    list: () => [...queryKeys.notifications.all, "list"] as const,
    unreadCount: () => [...queryKeys.notifications.all, "unread-count"] as const,
  },

  bookmarks: {
    all: ["bookmarks"] as const,
    list: () => [...queryKeys.bookmarks.all, "list"] as const,
  },
} as const;
