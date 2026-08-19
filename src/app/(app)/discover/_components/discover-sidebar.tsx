import Link from "next/link";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { RoomPreview } from "@/components/dashboard/room-preview";
import { SectionCard } from "@/components/dashboard/section-card";
import { ROUTES, dynamicRoutes } from "@/constants/routes";
import { INVESTORS, ROOMS } from "@/lib/mock-data";

export function DiscoverSidebar() {
  const suggested = INVESTORS.slice(0, 4);
  const trendingRooms = [...ROOMS]
    .sort((a, b) => b.postsToday - a.postsToday)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      <SectionCard
        title="Investors to connect with"
        action={{ label: "Search all", href: ROUTES.search }}
      >
        <div className="flex flex-col gap-3">
          {suggested.map((investor) => (
            <Link
              key={investor.slug}
              href={dynamicRoutes.investor(investor.slug)}
              className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-muted"
            >
              <PersonaAvatar name={investor.name} hue={investor.hue} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{investor.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {investor.firm}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Trending rooms"
        action={{ label: "Browse", href: ROUTES.rooms }}
      >
        <div className="flex flex-col gap-2.5">
          {trendingRooms.map((room) => (
            <RoomPreview key={room.slug} room={room} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
