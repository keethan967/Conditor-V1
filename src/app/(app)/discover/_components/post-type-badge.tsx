import {
  AwardIcon,
  BriefcaseIcon,
  MegaphoneIcon,
  RocketIcon,
  TrendingUpIcon,
  UserPlusIcon,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { PostType } from "@/lib/mock-data";

const META: Record<PostType, { label: string; icon: LucideIcon }> = {
  launch: { label: "Launch", icon: RocketIcon },
  milestone: { label: "Milestone", icon: TrendingUpIcon },
  hiring: { label: "Hiring", icon: UserPlusIcon },
  funding: { label: "Funding", icon: BriefcaseIcon },
  award: { label: "Award", icon: AwardIcon },
  update: { label: "Update", icon: MegaphoneIcon },
};

export function PostTypeBadge({ type }: { type: PostType }) {
  const { label, icon: Icon } = META[type];

  return (
    <Badge variant="secondary" className="gap-1">
      <Icon className="size-3" aria-hidden="true" />
      {label}
    </Badge>
  );
}
