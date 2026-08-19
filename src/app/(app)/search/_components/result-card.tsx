import Link from "next/link";
import type { ReactNode } from "react";

export function ResultCard({
  href,
  avatar,
  title,
  subtitle,
  badges,
  meta,
}: {
  href: string;
  avatar: ReactNode;
  title: string;
  subtitle: string;
  badges?: ReactNode;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="flex lift flex-col gap-3 rounded-xl border bg-card p-4"
    >
      <div className="flex items-center gap-3">
        {avatar}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {badges && <div className="flex flex-wrap gap-1.5">{badges}</div>}
      {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
    </Link>
  );
}
