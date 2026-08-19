import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Consistent width, card chrome and heading rhythm for every sign-in/sign-up/recovery screen. */
export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <div className={cn("flex w-full max-w-sm flex-col gap-6", className)}>
      <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-display-xs font-bold text-balance">{title}</h1>
          {description && (
            <p className="text-sm text-pretty text-muted-foreground">{description}</p>
          )}
        </div>

        {children}
      </div>

      {footer && (
        <div className="text-center text-sm text-muted-foreground">{footer}</div>
      )}
    </div>
  );
}
