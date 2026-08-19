import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/string";

interface PersonaAvatarProps {
  name: string;
  /** Hue in degrees (0-360). Fixtures carry their own so a given person's color never changes between renders. */
  hue: number;
  size?: "sm" | "default" | "lg";
  className?: string;
}

/**
 * Deterministic colour-by-name avatar — no photo hosting to depend on, and
 * it reads as considered (Linear/Slack-style) rather than as a missing image.
 * Saturation/lightness are fixed so contrast against white text holds in
 * both themes.
 */
export function PersonaAvatar({
  name,
  hue,
  size = "default",
  className,
}: PersonaAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      <AvatarFallback
        style={{ backgroundColor: `oklch(0.58 0.14 ${hue})`, color: "white" }}
        className="font-medium"
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
