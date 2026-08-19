import Link from "next/link";
import { UsersRoundIcon } from "lucide-react";

import { dynamicRoutes } from "@/constants/routes";
import type { Room } from "@/lib/mock-data";
import { formatNumber } from "@/utils/format";

export function RoomPreview({ room }: { room: Room }) {
  return (
    <Link
      href={dynamicRoutes.room(room.slug)}
      className="flex lift flex-col gap-2 rounded-xl border bg-card p-4"
    >
      <p className="text-sm font-medium">{room.name}</p>
      <p className="line-clamp-2-safe text-xs text-muted-foreground">
        {room.description}
      </p>
      <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <UsersRoundIcon className="size-3.5" aria-hidden="true" />
        {formatNumber(room.memberCount, { compact: true })} members · {room.postsToday}{" "}
        today
      </p>
    </Link>
  );
}
