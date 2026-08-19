"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/feedback/error-state";
import { Container } from "@/components/layout/container";

/**
 * Route-level error boundary.
 *
 * Catches render and data-fetching errors below it and keeps the shell — nav,
 * theme, providers — mounted, so a failure in one section does not blank the
 * application.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with the error reporter (Sentry et al.) when observability lands.
    // `digest` is the server-side correlation ID: in production the message is
    // redacted, and this is the only handle back to the real stack trace.
    console.error("Route error", { digest: error.digest, message: error.message });
  }, [error]);

  return (
    <Container width="content" className="flex flex-1 items-center py-24">
      <ErrorState
        className="w-full"
        error={error}
        onRetry={reset}
        description="This section failed to load. Retrying usually resolves it — if not, our team has been notified."
      />
    </Container>
  );
}
