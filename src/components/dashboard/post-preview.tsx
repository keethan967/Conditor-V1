import Link from "next/link";
import { HeartIcon, MessageCircleIcon } from "lucide-react";

import { CompanyMark } from "@/components/entity/company-mark";
import { ROUTES, dynamicRoutes } from "@/constants/routes";
import type { FeedPost } from "@/lib/mock-data";
import { getStartupBySlug } from "@/lib/mock-data";
import { formatRelativeTime } from "@/utils/format";

export function PostPreview({ post, now }: { post: FeedPost; now: Date }) {
  const startup = getStartupBySlug(post.startupSlug);
  if (!startup) return null;

  return (
    <Link
      href={ROUTES.discover}
      className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
    >
      <CompanyMark name={startup.name} hue={startup.hue} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">
          <span className="font-medium">{startup.name}</span>{" "}
          <span className="text-muted-foreground">{post.headline}</span>
        </p>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatRelativeTime(post.createdAt, { now })}</span>
          <span className="inline-flex items-center gap-1">
            <HeartIcon className="size-3" aria-hidden="true" /> {post.likes}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircleIcon className="size-3" aria-hidden="true" />{" "}
            {post.comments.length}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function StartupLinkMark({ slug }: { slug: string }) {
  const startup = getStartupBySlug(slug);
  if (!startup) return null;

  return (
    <Link href={dynamicRoutes.startup(slug)}>
      <CompanyMark name={startup.name} hue={startup.hue} size="sm" />
    </Link>
  );
}
