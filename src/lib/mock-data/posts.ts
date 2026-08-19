import type { FeedPost } from "./types";

export const FEED_POSTS: FeedPost[] = [
  {
    id: "post_1",
    startupSlug: "glasswing-ai",
    type: "funding",
    headline: "Glasswing AI closes $8.1M Series A",
    content:
      "We're thrilled to announce our Series A, led by Kestrel Ventures with participation from Harborcrest Partners. This brings total funding to $10.6M. The round will fund our expansion into procurement and HR contract review.",
    createdAt: "2026-08-01T09:12:00Z",
    likes: 284,
    liked: false,
    bookmarked: true,
    metric: { label: "Round size", value: "$8.1M" },
    comments: [
      {
        id: "c1",
        authorName: "Amara Chen",
        authorHue: 210,
        content:
          "Proud to have led this one. The playbook-matching accuracy is genuinely best-in-class.",
        createdAt: "2026-08-01T10:03:00Z",
      },
      {
        id: "c2",
        authorName: "Noa Rosen",
        authorHue: 12,
        content:
          "Congrats team — watched this grow from the first design partner call.",
        createdAt: "2026-08-01T11:20:00Z",
      },
    ],
  },
  {
    id: "post_2",
    startupSlug: "orbital-health",
    type: "milestone",
    headline: "Orbital Health crosses 60 live clinics",
    content:
      "This week we onboarded our 60th clinic, six months ahead of our internal roadmap. Documentation time is down 52% across the network and clinician retention sits at 96%. Huge thanks to every early clinic that took a bet on us.",
    createdAt: "2026-07-29T14:45:00Z",
    likes: 197,
    liked: true,
    bookmarked: false,
    metric: { label: "Clinics live", value: "60" },
    comments: [
      {
        id: "c3",
        authorName: "David Okafor",
        authorHue: 205,
        content:
          "The retention number is what gets my attention here. Rare at this stage.",
        createdAt: "2026-07-29T16:00:00Z",
      },
    ],
  },
  {
    id: "post_3",
    startupSlug: "meridian-robotics",
    type: "launch",
    headline: "Meridian Robotics ships the M2 inspection drone",
    content:
      "Our second-generation platform is live: 40% longer flight time, hardened for North Sea weather, and now with onboard defect classification. First commercial deployment goes out to our lead operator partner next week.",
    createdAt: "2026-07-27T08:30:00Z",
    likes: 132,
    liked: false,
    bookmarked: false,
    comments: [],
  },
  {
    id: "post_4",
    startupSlug: "pathwise",
    type: "milestone",
    headline: "Pathwise passes 220K monthly active students",
    content:
      "A year ago we had 12K students. Today we crossed 220K monthly actives across 400 partner schools, with an average 1.4 grade-level improvement per term. Onward.",
    createdAt: "2026-07-24T12:00:00Z",
    likes: 156,
    liked: false,
    bookmarked: true,
    metric: { label: "MAU", value: "220K" },
    comments: [
      {
        id: "c4",
        authorName: "Priya Varma",
        authorHue: 42,
        content: "Watched this from 12K. The compounding is real.",
        createdAt: "2026-07-24T13:10:00Z",
      },
    ],
  },
  {
    id: "post_5",
    startupSlug: "cipherline",
    type: "award",
    headline: "Cipherline named to the Gartner Cool Vendor list",
    content:
      "Recognized in Gartner's OT Security Cool Vendors report for 2026. Validation for a category most people still think doesn't need defending — until it does.",
    createdAt: "2026-07-21T10:00:00Z",
    likes: 209,
    liked: false,
    bookmarked: false,
    comments: [],
  },
  {
    id: "post_6",
    startupSlug: "northtide",
    type: "hiring",
    headline: "Northtide is hiring a Head of Fleet Success",
    content:
      "We're looking for someone who's spent time on a dispatch floor to lead fleet success as we scale past 1,000 fleets. If you know trucking operations from the inside, we want to talk.",
    createdAt: "2026-07-18T15:20:00Z",
    likes: 64,
    liked: false,
    bookmarked: false,
    comments: [],
  },
  {
    id: "post_7",
    startupSlug: "verdant-carbon",
    type: "update",
    headline: "Verdant Carbon publishes its first verification methodology paper",
    content:
      "We've open-sourced the measurement methodology behind our 3-week verification process, co-authored with two soil scientists. Trust in carbon markets starts with transparency.",
    createdAt: "2026-07-15T09:00:00Z",
    likes: 118,
    liked: true,
    bookmarked: true,
    comments: [
      {
        id: "c5",
        authorName: "Layla Haddad",
        authorHue: 178,
        content: "This is the kind of rigor our co-investment fund likes to see.",
        createdAt: "2026-07-15T09:40:00Z",
      },
    ],
  },
  {
    id: "post_8",
    startupSlug: "quivera-space",
    type: "milestone",
    headline: "Quivera Space completes third orbital manufacturing mission",
    content:
      "Mission three is back on Earth and the fiber quality data confirms what we saw in mission two: a 10x reduction in signal loss versus ground-manufactured fiber. Offtake conversations are moving fast.",
    createdAt: "2026-07-11T11:00:00Z",
    likes: 241,
    liked: false,
    bookmarked: false,
    metric: { label: "Signal loss reduction", value: "10x" },
    comments: [],
  },
  {
    id: "post_9",
    startupSlug: "harborline",
    type: "funding",
    headline: "Harborline crosses $2M in cumulative underwritten premium",
    content:
      "A quiet but meaningful milestone: $2M in cumulative premium underwritten through our earnings-based model, with a default rate 40% below industry benchmark.",
    createdAt: "2026-07-08T13:30:00Z",
    likes: 87,
    liked: false,
    bookmarked: false,
    comments: [],
  },
  {
    id: "post_10",
    startupSlug: "ledgerly",
    type: "update",
    headline: "Ledgerly reaches 340 customers, including two public fintechs",
    content:
      "Net revenue retention now sits at 128%. Compliance infrastructure is boring until the day it isn't — grateful to the teams trusting us with it.",
    createdAt: "2026-07-04T10:00:00Z",
    likes: 173,
    liked: false,
    bookmarked: true,
    comments: [],
  },
];

export function getPostsByStartup(slug: string): FeedPost[] {
  return FEED_POSTS.filter((post) => post.startupSlug === slug);
}
