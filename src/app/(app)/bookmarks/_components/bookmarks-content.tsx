"use client";

import { useState } from "react";
import { BookmarkIcon, BookmarkXIcon } from "lucide-react";

import { CompanyMark } from "@/components/entity/company-mark";
import { IndustryBadge, StageBadge } from "@/components/entity/taxonomy-badges";
import { EmptyState } from "@/components/feedback/empty-state";
import { Button } from "@/components/ui/button";
import { ROUTES, dynamicRoutes } from "@/constants/routes";
import { FEED_POSTS, getStartupBySlug } from "@/lib/mock-data";
import Link from "next/link";

const initialSlugs = Array.from(
  new Set(FEED_POSTS.filter((post) => post.bookmarked).map((post) => post.startupSlug)),
);

export function BookmarksContent() {
  const [slugs, setSlugs] = useState(initialSlugs);

  if (slugs.length === 0) {
    return (
      <EmptyState
        icon={BookmarkIcon}
        title="No saved startups yet"
        description="Save a startup from Discover and it will show up here."
        action={
          <Button variant="outline" asChild>
            <Link href={ROUTES.discover}>Browse Discover</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {slugs.map((slug) => {
        const startup = getStartupBySlug(slug);
        if (!startup) return null;

        return (
          <div key={slug} className="flex flex-col gap-3 rounded-xl border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={dynamicRoutes.startup(slug)}
                className="flex min-w-0 items-center gap-3"
              >
                <CompanyMark name={startup.name} hue={startup.hue} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{startup.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {startup.tagline}
                  </p>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Remove from saved"
                onClick={() =>
                  setSlugs((current) => current.filter((item) => item !== slug))
                }
              >
                <BookmarkXIcon className="size-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <IndustryBadge industry={startup.industry} />
              <StageBadge stage={startup.stage} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
