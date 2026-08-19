"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookmarkIcon, HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react";
import { toast } from "sonner";

import { CompanyMark } from "@/components/entity/company-mark";
import { Button } from "@/components/ui/button";
import { dynamicRoutes } from "@/constants/routes";
import type { FeedPost, Startup } from "@/lib/mock-data";
import { MOCK_NOW } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/format";

import { PostTypeBadge } from "./post-type-badge";

interface PostCardProps {
  post: FeedPost;
  startup: Startup;
  onToggleLike: () => void;
  onToggleBookmark: () => void;
  onOpenComments: () => void;
}

/**
 * The whole body of the card (banner, header, copy, metric) is one `<Link>`
 * to the startup's profile — clicking anywhere on it navigates immediately,
 * with normal history and prefetching. The action row is a sibling, not a
 * descendant, of that link: nesting `<button>`s inside an `<a>` is invalid
 * HTML and unreliable across browsers, so like/comment/share/bookmark live
 * outside it instead of behind `stopPropagation` hacks.
 */
export function PostCard({
  post,
  startup,
  onToggleLike,
  onToggleBookmark,
  onOpenComments,
}: PostCardProps) {
  return (
    <article className="group flex lift flex-col overflow-hidden rounded-2xl border bg-card">
      <Link
        href={dynamicRoutes.startup(startup.slug)}
        className="flex flex-col outline-none"
      >
        <div
          className="h-24 w-full transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(135deg, oklch(0.62 0.16 ${startup.hue}) 0%, oklch(0.48 0.18 ${startup.hue + 40}) 100%)`,
          }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-3 p-4 pb-3">
          <div className="-mt-10 flex items-end gap-3">
            <CompanyMark
              name={startup.name}
              hue={startup.hue}
              size="lg"
              className="ring-4 ring-card"
            />
            <div className="min-w-0 flex-1 pb-0.5">
              <p className="truncate text-sm font-semibold group-hover:underline">
                {startup.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {formatRelativeTime(post.createdAt, { now: MOCK_NOW })}
              </p>
            </div>
            <PostTypeBadge type={post.type} />
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-semibold text-balance">{post.headline}</p>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {post.content}
            </p>
          </div>

          {post.metric && (
            <div className="flex w-fit items-baseline gap-1.5 rounded-lg bg-muted px-3 py-1.5">
              <span className="text-xs text-muted-foreground">{post.metric.label}</span>
              <span className="tabular text-sm font-semibold">{post.metric.value}</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-center gap-1 border-t px-4 py-2.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleLike}
          aria-pressed={post.liked}
          className={cn("gap-1.5", post.liked && "text-destructive")}
        >
          <motion.span
            key={post.liked ? "liked" : "unliked"}
            initial={{ scale: post.liked ? 0.6 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="inline-flex"
          >
            <HeartIcon
              className={cn("size-4", post.liked && "fill-current")}
              aria-hidden="true"
            />
          </motion.span>
          {post.likes}
        </Button>

        <Button variant="ghost" size="sm" onClick={onOpenComments} className="gap-1.5">
          <MessageCircleIcon className="size-4" aria-hidden="true" />
          {post.comments.length}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              navigator.clipboard.writeText(
                `${window.location.origin}${dynamicRoutes.startup(startup.slug)}`,
              );
            }
            toast.success("Link copied");
          }}
        >
          <ShareIcon className="size-4" aria-hidden="true" />
          Share
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleBookmark}
          aria-pressed={post.bookmarked}
          className={cn("ml-auto", post.bookmarked && "text-primary")}
          aria-label={post.bookmarked ? "Remove bookmark" : "Save"}
        >
          <BookmarkIcon
            className={cn("size-4", post.bookmarked && "fill-current")}
            aria-hidden="true"
          />
        </Button>
      </div>
    </article>
  );
}
