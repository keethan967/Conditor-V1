interface LegendItem {
  label: string;
  color: string;
  value?: string;
}

/**
 * Always present for 2+ series — the dependable identity channel, so a
 * reader is never required to color-match a thin line unaided. Skipped for
 * single-series charts, where the title already names what's plotted.
 */
export function ChartLegend({
  items,
  className,
}: {
  items: LegendItem[];
  className?: string;
}) {
  if (items.length < 2) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 ${className ?? ""}`}>
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <span
            className="h-0.5 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span>{item.label}</span>
          {item.value && (
            <span className="tabular font-medium text-foreground">{item.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
