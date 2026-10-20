import Link from "next/link";
import { MapPin } from "lucide-react";
import { ItemPhoto } from "@/components/item-photo";
import { StatusBadge } from "@/components/status-badge";
import { CONDITION_LABEL, damageLabel, feeLabel, type ItemWithQueue } from "@/lib/domain";
import { path } from "@/lib/paths";

// jawa.gg-style tile: big art block, thick border, hard shadow.
export function ItemCard({ item }: { item: ItemWithQueue }) {
  return (
    <Link
      href={path(`/item/${item.id}`)}
      className="group block w-full overflow-hidden rounded-lg border-2 border-border bg-card text-card-foreground shadow transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
    >
      <div className="relative aspect-[4/3] border-b-2 border-border">
        <ItemPhoto item={item} className="h-full" artClassName="p-4 pt-10" sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 90vw" />
        <StatusBadge className="absolute left-2 top-2" status={item.status} inLine={item.queue_length} />
      </div>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 font-black">{item.title}</h3>
        <p className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden /> {item.city} · {CONDITION_LABEL[item.condition]}
        </p>
        <div className="flex items-center justify-between gap-2 pt-1 text-sm font-bold">
          <span>{feeLabel(item)}</span>
          <span>Damage: {damageLabel(item)}</span>
        </div>
      </div>
    </Link>
  );
}
