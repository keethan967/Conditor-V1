"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookmarkIcon, MessageCircleIcon, ShareIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function ProfileActionBar() {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Button
        variant="outline"
        onClick={() => {
          setBookmarked((current) => !current);
          toast.success(bookmarked ? "Removed from bookmarks" : "Saved to bookmarks");
        }}
        aria-pressed={bookmarked}
      >
        <BookmarkIcon className={cn(bookmarked && "fill-current text-primary")} />
        {bookmarked ? "Saved" : "Save"}
      </Button>

      <Button
        variant="outline"
        size="icon"
        aria-label="Share"
        onClick={() => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
          }
          toast.success("Link copied");
        }}
      >
        <ShareIcon />
      </Button>

      <Button onClick={() => router.push(ROUTES.messages)}>
        <MessageCircleIcon />
        Message
      </Button>
    </div>
  );
}
