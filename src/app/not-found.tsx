import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container
      width="content"
      className="flex flex-1 flex-col items-center justify-center gap-6 py-32 text-center"
    >
      <p className="font-mono text-sm font-medium tracking-widest text-muted-foreground uppercase">
        404
      </p>

      <div className="flex flex-col gap-3">
        <h1 className="text-display-sm font-bold text-balance">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
          The link may be out of date, or the page may have moved. Everything else is
          still where you left it.
        </p>
      </div>

      <Button asChild size="lg" className="mt-2">
        <Link href={ROUTES.home}>Back to home</Link>
      </Button>
    </Container>
  );
}
