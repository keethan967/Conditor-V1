import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/string";

const SIZES = {
  sm: "size-8 rounded-lg text-xs",
  default: "size-10 rounded-xl text-sm",
  lg: "size-14 rounded-2xl text-lg",
  xl: "size-20 rounded-3xl text-2xl",
} as const;

interface CompanyMarkProps {
  name: string;
  hue: number;
  size?: keyof typeof SIZES;
  className?: string;
}

/**
 * Generated company "logo" — a gradient tile with initials. Keeps every
 * startup/accelerator card visually finished without depending on uploaded
 * or externally hosted logo assets that don't exist yet.
 */
export function CompanyMark({
  name,
  hue,
  size = "default",
  className,
}: CompanyMarkProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-semibold text-white ring-1 ring-black/5",
        SIZES[size],
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, oklch(0.62 0.16 ${hue}) 0%, oklch(0.48 0.18 ${hue + 40}) 100%)`,
      }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
