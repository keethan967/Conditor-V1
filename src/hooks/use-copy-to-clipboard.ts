"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCopyToClipboardOptions {
  /** How long `copied` stays true before resetting. */
  resetDelay?: number;
}

/**
 * Copies text to the clipboard and reports transient success, for the standard
 * "copy → checkmark → back to copy" affordance.
 *
 * The timeout is cleared on unmount so copying and immediately navigating away
 * does not set state on an unmounted component.
 */
export function useCopyToClipboard({
  resetDelay = 2000,
}: UseCopyToClipboardOptions = {}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      // Unavailable on insecure origins and in some embedded webviews.
      if (!navigator?.clipboard) return false;

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => setCopied(false), resetDelay);

        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetDelay],
  );

  return { copied, copy };
}
