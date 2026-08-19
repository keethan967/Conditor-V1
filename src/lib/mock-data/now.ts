/**
 * Fixed "current time" for relative-time formatting against fixture data.
 *
 * Fixture timestamps (posts, messages, notifications) are hand-dated around
 * this instant. Using `new Date()` instead would make "3 hours ago" drift
 * further from true as real time passes, since the fixture dates themselves
 * never move.
 */
export const MOCK_NOW = new Date("2026-08-03T09:00:00Z");
