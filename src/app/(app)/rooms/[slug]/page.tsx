import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UsersRoundIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getRoomBySlug } from "@/lib/mock-data";
import { formatNumber } from "@/utils/format";

import { RoomFeed } from "./_components/room-feed";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) return { title: "Room not found" };

  return { title: `${room.name} · Founder Rooms`, description: room.description };
}

export default async function RoomPage({ params }: PageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return (
    <Container width="narrow" className="flex flex-col gap-6 py-8">
      <PageHeader
        title={room.name}
        description={room.description}
        breadcrumb={
          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <UsersRoundIcon className="size-4" aria-hidden="true" />
            {formatNumber(room.memberCount, { compact: true })} members
          </p>
        }
      />

      <RoomFeed room={room} />
    </Container>
  );
}
