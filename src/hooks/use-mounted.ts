"use client";

import { useSyncExternalStore } from "react";

/**
 * The value never changes after hydration, so there is nothing to subscribe to.
 * React requires an unsubscribe function to be returned regardless.
 */
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` during SSR and the first client render, `true` afterwards.
 *
 * The narrow, correct use is deferring UI whose value is unknowable on the
 * server — the resolved theme being the canonical example, since the server
 * cannot know the user's OS preference and rendering a guess causes a
 * hydration mismatch.
 *
 * Implemented with `useSyncExternalStore` rather than the more familiar
 * `useState(false)` + `useEffect(() => setMounted(true))`. That pattern commits
 * a render, then immediately schedules a second one — a cascading render React
 * now warns about. Here the server and client snapshots are declared up front,
 * so React resolves the value during hydration in a single pass.
 *
 * It is not a general-purpose hydration-warning silencer. Gating large regions
 * behind it delays paint and hurts SEO; fix the mismatch at its source instead.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
