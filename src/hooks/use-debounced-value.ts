"use client";

import { useEffect, useState } from "react";

/**
 * Returns `value` after it has stopped changing for `delay` milliseconds.
 *
 * Used for search inputs: the field stays fully controlled and responsive
 * while only the debounced value reaches the network. Debouncing the input's
 * `onChange` instead would make typing feel laggy.
 *
 * @param delay milliseconds of quiet required before the value settles.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay);

    // Clearing on every change is what makes this a debounce rather than a
    // throttle — a keystroke within the window restarts the timer.
    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
