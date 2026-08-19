import type { Metadata } from "next";
import Link from "next/link";
import { UsersRoundIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { dynamicRoutes } from "@/constants/routes";
import { ROOMS } from "@/lib/mock-data";
import { formatNumber } from "@/utils/format";

export const metadata: Metadata = {
  title: "Founder Rooms",
  description:
    "Community spaces by industry — fundraising, AI, SaaS, HealthTech and more.",
};

export default function RoomsPage() {
  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader
        title="Founder Rooms"
        description="Communities where founders share what's actually working."
      />

      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ROOMS.map((room) => (
          <StaggerItem key={room.slug}>
            <Link
              href={dynamicRoutes.room(room.slug)}
              className="flex h-full lift flex-col gap-3 rounded-xl border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold">{room.name}</p>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <UsersRoundIcon className="size-3.5" aria-hidden="true" />
                  {formatNumber(room.memberCount, { compact: true })}
                </span>
              </div>
              <p className="line-clamp-2-safe text-sm text-muted-foreground">
                {room.description}
              </p>
              <p className="mt-auto text-xs font-medium text-primary">
                {room.postsToday} posts today
              </p>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
