import {
  BarChart3Icon,
  BookmarkIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  CompassIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  SearchIcon,
  TrendingUpIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import {
  INVESTOR_ACCOUNT_TYPES,
  PROGRAM_ACCOUNT_TYPES,
  type AccountType,
} from "@/constants/taxonomy";

export type NavGroup = "founder" | "investor" | "program";

export function navGroupFor(accountType: AccountType): NavGroup {
  if (accountType === "founder") return "founder";
  if ((INVESTOR_ACCOUNT_TYPES as readonly AccountType[]).includes(accountType))
    return "investor";
  if ((PROGRAM_ACCOUNT_TYPES as readonly AccountType[]).includes(accountType))
    return "program";
  return "founder";
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Key into the counts map passed at render time — kept out of this static config. */
  countKey?: "messages" | "notifications";
}

const FOUNDER_NAV: NavItem[] = [
  { label: "Home", href: ROUTES.dashboard, icon: LayoutDashboardIcon },
  { label: "Discover", href: ROUTES.discover, icon: CompassIcon },
  { label: "Search", href: ROUTES.search, icon: SearchIcon },
  { label: "Founder Rooms", href: ROUTES.rooms, icon: UsersRoundIcon },
  { label: "Your Progress", href: ROUTES.analytics, icon: BarChart3Icon },
  {
    label: "Messages",
    href: ROUTES.messages,
    icon: MessageCircleIcon,
    countKey: "messages",
  },
  { label: "Saved Startups", href: ROUTES.bookmarks, icon: BookmarkIcon },
];

const INVESTOR_NAV: NavItem[] = [
  { label: "Home", href: ROUTES.dashboard, icon: LayoutDashboardIcon },
  { label: "Discover", href: ROUTES.discover, icon: CompassIcon },
  { label: "Search", href: ROUTES.search, icon: SearchIcon },
  { label: "Investment Opportunities", href: ROUTES.dealFlow, icon: TrendingUpIcon },
  { label: "Your Investments", href: ROUTES.portfolio, icon: BriefcaseIcon },
  { label: "Your Progress", href: ROUTES.analytics, icon: BarChart3Icon },
  {
    label: "Messages",
    href: ROUTES.messages,
    icon: MessageCircleIcon,
    countKey: "messages",
  },
  { label: "Saved Startups", href: ROUTES.bookmarks, icon: BookmarkIcon },
];

const PROGRAM_NAV: NavItem[] = [
  { label: "Home", href: ROUTES.dashboard, icon: LayoutDashboardIcon },
  { label: "Applications", href: ROUTES.applications, icon: ClipboardListIcon },
  { label: "Programs", href: ROUTES.programs, icon: GraduationCapIcon },
  { label: "Discover", href: ROUTES.discover, icon: CompassIcon },
  { label: "Founder Rooms", href: ROUTES.rooms, icon: UsersRoundIcon },
  {
    label: "Messages",
    href: ROUTES.messages,
    icon: MessageCircleIcon,
    countKey: "messages",
  },
  { label: "Saved Startups", href: ROUTES.bookmarks, icon: BookmarkIcon },
];

export function getNavItems(group: NavGroup): NavItem[] {
  switch (group) {
    case "founder":
      return FOUNDER_NAV;
    case "investor":
      return INVESTOR_NAV;
    case "program":
      return PROGRAM_NAV;
  }
}
