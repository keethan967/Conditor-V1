import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ChecklistItem {
  label: string;
  done: boolean;
}

export function TaskChecklist({
  items,
  className,
}: {
  items: ChecklistItem[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-2.5 border-b py-2.5 last:border-b-0"
        >
          <span
            className={cn(
              "flex size-4.5 shrink-0 items-center justify-center rounded-full border",
              item.done
                ? "border-success bg-success text-success-foreground"
                : "border-border-strong text-transparent",
            )}
          >
            <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" />
          </span>
          <span
            className={cn(
              "text-sm",
              item.done ? "text-muted-foreground line-through" : "text-foreground",
            )}
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
