import Link from "next/link";
import { MapPin } from "lucide-react";
import { ItemPhoto } from "@/components/item-photo";
import { StatusBadge } from "@/components/status-badge";
import { CONDITION_LABEL, damageLabel, feeLabel, type ItemWithQueue } from "@/lib/domain";
import { path } from "@/lib/paths";

// jawa.gg-style tile: big art block, thick border, hard shadow.
// Narrow enough for a two-column phone grid (about 140px at 320px wide):
// lines truncate and the price row wraps instead of overflowing.
export function ItemCard({ item }: { item: ItemWithQueue }) {
  return (
    <Link
      href={path(`/item/${item.id}`)}
      className="group block w-full min-w-0 overflow-hidden rounded-lg border-2 border-border bg-card text-card-foreground shadow transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
    >
      <div className="relative aspect-[4/3] border-b-2 border-border">
        <ItemPhoto item={item} className="h-full" artClassName="p-3 pt-9 sm:p-4 sm:pt-10" sizes="(min-width: 1024px) 240px, (min-width: 768px) 30vw, 50vw" />
        <StatusBadge className="absolute top-2 left-2 max-w-[calc(100%-1rem)]" status={item.status} inLine={item.queue_length} />
      </div>
      <div className="space-y-1 p-2.5 sm:p-3">
        <h3 className="line-clamp-2 text-sm font-black sm:line-clamp-1 sm:text-base">{item.title}</h3>
        <p className="flex min-w-0 items-center gap-1 text-xs font-medium text-muted-foreground sm:text-sm">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">
            {item.city} · {CONDITION_LABEL[item.condition]}
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-2 pt-1 text-xs font-bold sm:text-sm">
          <span>{feeLabel(item)}</span>
          <span>Damage: {damageLabel(item)}</span>
        </div>
      </div>
    </Link>
  );
}
