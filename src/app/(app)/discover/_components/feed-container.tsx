"use client";

import { useState } from "react";

import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FEED_POSTS,
  getStartupBySlug,
  type FeedPost,
  type PostType,
} from "@/lib/mock-data";

import { CommentsDialog } from "./comments-dialog";
import { PostCard } from "./post-card";

const FILTERS: { value: PostType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "funding", label: "Funding" },
  { value: "milestone", label: "Milestones" },
  { value: "launch", label: "Launches" },
  { value: "hiring", label: "Hiring" },
];

export function FeedContainer() {
  const [posts, setPosts] = useState<FeedPost[]>(FEED_POSTS);
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);

  const activePost = posts.find((post) => post.id === activeCommentPostId) ?? null;
  const visiblePosts =
    filter === "all" ? posts : posts.filter((post) => post.type === filter);

  function toggleLike(postId: string) {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  }

  function toggleBookmark(postId: string) {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post,
      ),
    );
  }

  function addComment(postId: string, content: string) {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: crypto.randomUUID(),
                  authorName: "You",
                  authorHue: 220,
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as PostType | "all")}
      >
        <TabsList>
          {FILTERS.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Stagger className="flex flex-col gap-5">
        {visiblePosts.map((post) => {
          const startup = getStartupBySlug(post.startupSlug);
          if (!startup) return null;

          return (
            <StaggerItem key={post.id}>
              <PostCard
                post={post}
                startup={startup}
                onToggleLike={() => toggleLike(post.id)}
                onToggleBookmark={() => toggleBookmark(post.id)}
                onOpenComments={() => setActiveCommentPostId(post.id)}
              />
            </StaggerItem>
          );
        })}
      </Stagger>

      <CommentsDialog
        post={activePost}
        onOpenChange={(open) => !open && setActiveCommentPostId(null)}
        onAddComment={addComment}
      />
    </div>
  );
}
