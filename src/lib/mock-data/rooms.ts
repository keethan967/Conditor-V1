import type { Room } from "./types";

export const ROOMS: Room[] = [
  {
    slug: "ai",
    name: "AI",
    description:
      "Model choices, eval strategy, and building defensible products on top of foundation models.",
    memberCount: 4218,
    postsToday: 26,
    posts: [
      {
        id: "r_ai_1",
        authorName: "Jonas Kessler",
        authorRole: "Founder, Glasswing AI",
        authorHue: 168,
        content:
          "Switched our clause-extraction pipeline from a single large model to a router across three smaller fine-tunes. Latency down 60%, accuracy up slightly. Happy to share the eval harness if useful to anyone here.",
        createdAt: "2026-08-02T09:15:00Z",
        replies: 18,
        reactions: 64,
        pinned: true,
      },
      {
        id: "r_ai_2",
        authorName: "Mei Lin",
        authorRole: "CTO, Glasswing AI",
        authorHue: 168,
        content:
          "Anyone got a good pattern for versioning prompts alongside model weights? We keep losing track of which combination produced which eval score.",
        createdAt: "2026-08-01T18:40:00Z",
        replies: 11,
        reactions: 22,
        pinned: false,
      },
    ],
  },
  {
    slug: "robotics",
    name: "Robotics",
    description:
      "Hardware sourcing, certification pathways, and the unglamorous logistics of physical products.",
    memberCount: 1842,
    postsToday: 9,
    posts: [
      {
        id: "r_robo_1",
        authorName: "Callum Fraser",
        authorRole: "Founder, Meridian Robotics",
        authorHue: 205,
        content:
          "IP67 certification for the new enclosure took 11 weeks end to end, budget accordingly if you're targeting offshore or marine environments.",
        createdAt: "2026-07-30T14:00:00Z",
        replies: 7,
        reactions: 31,
        pinned: false,
      },
    ],
  },
  {
    slug: "healthtech",
    name: "HealthTech",
    description:
      "Clinical validation, regulatory pathways, and selling into hospital systems.",
    memberCount: 3106,
    postsToday: 14,
    posts: [
      {
        id: "r_health_1",
        authorName: "Priya Nandakumar",
        authorRole: "CEO, Orbital Health",
        authorHue: 210,
        content:
          "Our clinical advisory board turned out to be the single highest-leverage thing we set up in year one — not for credibility, for actual product feedback.",
        createdAt: "2026-08-01T12:00:00Z",
        replies: 15,
        reactions: 48,
        pinned: true,
      },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    description:
      "Threat models, compliance frameworks, and selling security to skeptical buyers.",
    memberCount: 2290,
    postsToday: 12,
    posts: [
      {
        id: "r_cyber_1",
        authorName: "Noa Rosen",
        authorRole: "CEO, Cipherline",
        authorHue: 12,
        content:
          "SOC 2 Type II took us 7 months from kickoff to report. Started too late relative to when enterprise deals started asking for it — start earlier than feels necessary.",
        createdAt: "2026-07-28T10:30:00Z",
        replies: 22,
        reactions: 57,
        pinned: false,
      },
    ],
  },
  {
    slug: "climatetech",
    name: "ClimateTech",
    description:
      "Carbon markets, hardware-software hybrids, and navigating grant funding.",
    memberCount: 1654,
    postsToday: 6,
    posts: [
      {
        id: "r_climate_1",
        authorName: "Elin Bjornsson",
        authorRole: "Founder, Verdant Carbon",
        authorHue: 145,
        content:
          "Publishing our methodology openly felt risky competitively, but it's been the single best trust signal with both registries and investors.",
        createdAt: "2026-07-16T09:00:00Z",
        replies: 9,
        reactions: 40,
        pinned: false,
      },
    ],
  },
  {
    slug: "fintech",
    name: "FinTech",
    description:
      "Licensing, banking partnerships, and underwriting models that actually work.",
    memberCount: 2871,
    postsToday: 17,
    posts: [
      {
        id: "r_fintech_1",
        authorName: "Camila Duarte",
        authorRole: "Founder, Harborline",
        authorHue: 178,
        content:
          "Our biggest unlock was moving from a single sponsor bank to two — negotiating leverage changed completely once we had an alternative.",
        createdAt: "2026-07-25T11:15:00Z",
        replies: 13,
        reactions: 35,
        pinned: false,
      },
    ],
  },
  {
    slug: "fundraising",
    name: "Fundraising",
    description:
      "How fundraising actually works, and what's really being said in investor meetings right now.",
    memberCount: 5432,
    postsToday: 41,
    posts: [
      {
        id: "r_fund_1",
        authorName: "Ananya Rao",
        authorRole: "CEO, Pathwise",
        authorHue: 42,
        content:
          "Ran our Series A process over 5 weeks with 22 first calls, 9 second meetings, 3 term sheets. The compression only happened because we set a deadline and told everyone.",
        createdAt: "2026-08-02T08:00:00Z",
        replies: 34,
        reactions: 88,
        pinned: true,
      },
      {
        id: "r_fund_2",
        authorName: "Derrick Owusu",
        authorRole: "CEO, Northtide",
        authorHue: 220,
        content:
          "Anyone have a good template for a data room index for logistics/marketplace businesses specifically? Happy to share ours in exchange.",
        createdAt: "2026-08-01T20:10:00Z",
        replies: 19,
        reactions: 26,
        pinned: false,
      },
    ],
  },
  {
    slug: "saas",
    name: "SaaS",
    description: "Pricing and the numbers investors actually look at first.",
    memberCount: 6108,
    postsToday: 38,
    posts: [
      {
        id: "r_saas_1",
        authorName: "Adaeze Okoro",
        authorRole: "CEO, Ledgerly",
        authorHue: 152,
        content:
          "Moved from seat-based to usage-based pricing for our enterprise tier. NRR went from 108% to 128% in two quarters. Painful migration, worth it.",
        createdAt: "2026-07-31T15:45:00Z",
        replies: 27,
        reactions: 71,
        pinned: false,
      },
    ],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((room) => room.slug === slug);
}
