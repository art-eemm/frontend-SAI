import { KpiCardData } from "@/lib/types";

interface KpiGridProps {
  items: KpiCardData[];
}

export default function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {items.map((card, i) => (
        <div
          key={i}
          className="bg-accent rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-2 mb-3">
            {card.icon}
            <h3 className="text-sm font-medium text-foreground">
              {card.title}
            </h3>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-2xl font-light text-foreground">
              {card.value}
            </span>
            <span className="text-xs text-muted-foreground mb-1">
              {card.desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
