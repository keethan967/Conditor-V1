import type { Conversation } from "./types";

export const CONVERSATIONS: Conversation[] = [
  {
    id: "conv_1",
    participantName: "Amara Chen",
    participantRole: "GP, Kestrel Ventures",
    participantHue: 210,
    online: true,
    typing: false,
    lastMessageAt: "2026-08-03T08:12:00Z",
    unreadCount: 2,
    pinned: true,
    messages: [
      {
        id: "m1",
        senderId: "them",
        content: "Loved the deck — the clinician retention number really stands out.",
        createdAt: "2026-08-02T18:00:00Z",
        read: true,
      },
      {
        id: "m2",
        senderId: "me",
        content:
          "Thank you! Happy to walk through the cohort retention curves in more detail if useful.",
        createdAt: "2026-08-02T18:14:00Z",
        read: true,
      },
      {
        id: "m3",
        senderId: "them",
        content:
          "Yes please. Are you free Thursday for a 30-minute call with our health lead?",
        createdAt: "2026-08-03T08:10:00Z",
        read: false,
      },
      {
        id: "m4",
        senderId: "them",
        content: "Also — could you send the data room link ahead of that?",
        createdAt: "2026-08-03T08:12:00Z",
        read: false,
      },
    ],
  },
  {
    id: "conv_2",
    participantName: "David Okafor",
    participantRole: "Partner, Northbridge Capital",
    participantHue: 205,
    online: false,
    typing: false,
    lastMessageAt: "2026-08-02T14:20:00Z",
    unreadCount: 0,
    pinned: false,
    messages: [
      {
        id: "m5",
        senderId: "me",
        content: "Sending over the updated cap table as discussed.",
        createdAt: "2026-08-02T14:00:00Z",
        read: true,
        attachment: { name: "cap-table-2026-08.pdf", size: "412 KB" },
      },
      {
        id: "m6",
        senderId: "them",
        content: "Got it, will review before our Friday call.",
        createdAt: "2026-08-02T14:20:00Z",
        read: true,
      },
    ],
  },
  {
    id: "conv_3",
    participantName: "Sarah Lindqvist",
    participantRole: "Angel Investor",
    participantHue: 145,
    online: true,
    typing: true,
    lastMessageAt: "2026-08-03T07:55:00Z",
    unreadCount: 1,
    pinned: false,
    messages: [
      {
        id: "m7",
        senderId: "them",
        content:
          "Quick one — what's your current burn multiple looking like post the hardware cost reduction?",
        createdAt: "2026-08-03T07:55:00Z",
        read: false,
      },
    ],
  },
  {
    id: "conv_4",
    participantName: "Layla Haddad",
    participantRole: "Programme Lead, Gulf Innovation Fund",
    participantHue: 178,
    online: false,
    typing: false,
    lastMessageAt: "2026-08-01T11:30:00Z",
    unreadCount: 0,
    pinned: false,
    messages: [
      {
        id: "m8",
        senderId: "them",
        content: "The co-investment committee approved matching funds for your round.",
        createdAt: "2026-08-01T11:15:00Z",
        read: true,
      },
      {
        id: "m9",
        senderId: "me",
        content: "Fantastic news — thank you for pushing this through.",
        createdAt: "2026-08-01T11:30:00Z",
        read: true,
      },
    ],
  },
  {
    id: "conv_5",
    participantName: "Michael Stein",
    participantRole: "Managing Partner, Harborcrest",
    participantHue: 152,
    online: false,
    typing: false,
    lastMessageAt: "2026-07-30T16:45:00Z",
    unreadCount: 0,
    pinned: false,
    messages: [
      {
        id: "m10",
        senderId: "them",
        content:
          "Board deck template worked well, thanks for sharing it with the portfolio team.",
        createdAt: "2026-07-30T16:45:00Z",
        read: true,
      },
    ],
  },
];

export function getConversationById(id: string): Conversation | undefined {
  return CONVERSATIONS.find((conversation) => conversation.id === id);
}
