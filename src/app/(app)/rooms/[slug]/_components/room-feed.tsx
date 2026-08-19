"use client";

import { useState } from "react";
import { HeartIcon, MessageSquareIcon, PinIcon, SendIcon } from "lucide-react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_NOW } from "@/lib/mock-data";
import type { Room, RoomPost } from "@/lib/mock-data";
import { useDemoSession } from "@/providers/demo-session-provider";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/format";

export function RoomFeed({ room }: { room: Room }) {
  const { session } = useDemoSession();
  const [posts, setPosts] = useState<RoomPost[]>(room.posts);
  const [draft, setDraft] = useState("");

  const pinned = posts.filter((post) => post.pinned);
  const rest = posts.filter((post) => !post.pinned);

  function submitPost() {
    const content = draft.trim();
    if (!content || !session) return;

    setPosts((current) => [
      {
        id: crypto.randomUUID(),
        authorName: session.fullName,
        authorRole:
          session.accountType === "founder"
            ? "Founder"
            : session.accountType === "accelerator" ||
                session.accountType === "incubator"
              ? "Programme lead"
              : "Investor",
        authorHue: 220,
        content,
        createdAt: new Date().toISOString(),
        replies: 0,
        reactions: 0,
        pinned: false,
      },
      ...current,
    ]);
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitPost();
        }}
        className="flex flex-col gap-3 rounded-xl border bg-card p-4"
      >
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={`Share something with ${room.name}…`}
          rows={2}
        />
        <Button type="submit" size="sm" className="self-end" disabled={!draft.trim()}>
          <SendIcon />
          Post
        </Button>
      </form>

      {pinned.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Pinned discussions
          </p>
          {pinned.map((post) => (
            <RoomPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {rest.map((post) => (
          <RoomPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function RoomPostCard({ post }: { post: RoomPost }) {
  const [reactions, setReactions] = useState(post.reactions);
  const [reacted, setReacted] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex items-start gap-3">
        <PersonaAvatar name={post.authorName} hue={post.authorHue} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{post.authorName}</p>
            <span className="text-xs text-muted-foreground">{post.authorRole}</span>
            {post.pinned && (
              <PinIcon className="size-3 text-primary" aria-hidden="true" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatRelativeTime(post.createdAt, { now: MOCK_NOW })}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-pretty">{post.content}</p>

      <div className="flex items-center gap-1 border-t pt-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-1.5", reacted && "text-destructive")}
          onClick={() => {
            setReacted((current) => !current);
            setReactions((current) => (reacted ? current - 1 : current + 1));
          }}
        >
          <HeartIcon
            className={cn("size-4", reacted && "fill-current")}
            aria-hidden="true"
          />
          {reactions}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <MessageSquareIcon className="size-4" aria-hidden="true" />
          {post.replies}
        </Button>
      </div>
    </div>
  );
}
