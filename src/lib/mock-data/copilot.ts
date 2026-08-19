import type { CopilotSuggestion } from "./types";

export const COPILOT_SUGGESTIONS: CopilotSuggestion[] = [
  {
    id: "sug_find_investors",
    label: "Find investors for my stage",
    prompt: "Find investors who match my industry, stage and location.",
    icon: "search",
  },
  {
    id: "sug_improve_profile",
    label: "Improve my startup profile",
    prompt: "Review my startup profile and suggest specific improvements.",
    icon: "sparkles",
  },
  {
    id: "sug_review_deck",
    label: "Review my pitch deck",
    prompt: "Review my pitch deck and flag anything that would concern an investor.",
    icon: "file",
  },
  {
    id: "sug_write_outreach",
    label: "Write an outreach message",
    prompt: "Draft a cold outreach message to a Series A investor in fintech.",
    icon: "mail",
  },
  {
    id: "sug_explain_terms",
    label: "Explain an investing term",
    prompt: "Explain what a 'pro-rata right' means and why it matters.",
    icon: "book",
  },
  {
    id: "sug_summarize",
    label: "Summarize a startup",
    prompt: "Summarize this startup's traction in three sentences for a busy investor.",
    icon: "trending",
  },
];

/**
 * Canned assistant replies keyed by suggestion id, used until a real model is
 * wired up. `getCopilotReply` falls back to a generic acknowledgement for
 * free-form input so the widget never dead-ends.
 */
const CANNED_REPLIES: Record<string, string> = {
  sug_find_investors:
    "Based on your profile — AI, Series A, Austin — here are your strongest matches: Amara Chen at Kestrel Ventures (94% fit, leads AI/healthtech at your stage), and Michael Stein at Harborcrest Partners (81% fit, typically joins at Series B but has moved earlier for standout metrics). Want me to draft an intro request to either?",
  sug_improve_profile:
    "Your profile is strong on traction but light on team. Adding your advisory board and each founder's relevant prior outcome would likely lift investor save rate — profiles with a named advisory board see roughly 30% more saves in similar categories. Want help drafting those bios?",
  sug_review_deck:
    "Three things stand out: your market-size slide estimates from the top down without checking the number bottom-up — investors will ask about that. Your competitor slide is missing a 'why now' story. And your ask slide doesn't say exactly what the money will be used for. Want me to suggest replacement copy for any of these?",
  sug_write_outreach:
    "Here's a draft: \"Hi {{name}}, we're building {{startup}} — {{tagline}}. We just crossed {{traction}} and are raising {{stage}} funding. Given your focus on {{industry}}, I'd love 15 minutes to share what we're seeing. Are you free this week?\" Want me to personalize this with your actual numbers?",
  sug_explain_terms:
    "A 'pro-rata right' lets an investor put in more money later so they keep the same ownership percentage as the company raises more rounds. For founders, giving this to too many investors can leave less room for new investors later — it's worth limiting who gets it.",
  sug_summarize:
    "This startup has grown to solid sales with strong customer loyalty, backed by [X] big-business customers, and deals are closing faster as the market matures — the kind of story that usually supports raising a bigger round within 12-18 months.",
};

export function getCopilotReply(
  suggestionId: string | null,
  userInput: string,
): string {
  if (suggestionId && CANNED_REPLIES[suggestionId]) {
    return CANNED_REPLIES[suggestionId];
  }

  const trimmed = userInput.trim();
  if (!trimmed) {
    return "Ask me anything about investors, your profile, your pitch, or fundraising strategy.";
  }

  return `Here's my take: ${trimmed.endsWith("?") ? "great question — let me pull together specifics using your current profile and matches." : "I can help with that. Let me know if you'd like me to go deeper on any part of it."} In the meantime, try one of the suggestions below for a focused walkthrough.`;
}
