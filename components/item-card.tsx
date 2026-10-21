import { MapPin } from "lucide-react";
import { ItemPhoto } from "@/components/item-photo";
import { StatusBadge } from "@/components/status-badge";
import { Link } from "@/i18n/link";
import { getT } from "@/i18n/server";
import { CONDITION_LABEL, damageLabel, feeLabel, type ItemWithQueue } from "@/lib/domain";

// jawa.gg-style tile: big art block, thick border, hard shadow.
// Narrow enough for a two-column phone grid (about 140px at 320px wide):
// lines truncate and the price row wraps instead of overflowing.
export async function ItemCard({ item }: { item: ItemWithQueue }) {
  const t = await getT();
  return (
    <Link
      href={`/item/${item.id}`}
      className="group block w-full min-w-0 overflow-hidden rounded-lg border-2 border-border bg-card text-card-foreground shadow transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
    >
      <div className="relative aspect-[4/3] border-b-2 border-border">
        <ItemPhoto item={item} className="h-full" artClassName="p-3 pt-9 sm:p-4 sm:pt-10" sizes="(min-width: 1024px) 240px, (min-width: 768px) 30vw, 50vw" />
        {/* Long translations wrap onto a second line instead of being cut off on a narrow card. */}
        <StatusBadge
          className="absolute top-2 start-2 h-auto min-h-7 max-w-[calc(100%-1rem)] text-start leading-tight whitespace-normal"
          status={item.status}
          inLine={item.queue_length}
        />
      </div>
      <div className="space-y-1 p-2.5 sm:p-3">
        <h3 dir="auto" className="line-clamp-2 text-sm font-black sm:line-clamp-1 sm:text-base ltr:text-left rtl:text-right">
          {item.title}
        </h3>
        <p className="flex min-w-0 items-center gap-1 text-xs font-medium text-muted-foreground sm:text-sm">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">
            <bdi>{item.city}</bdi> · {t(CONDITION_LABEL[item.condition])}
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-2 pt-1 text-xs font-bold sm:text-sm">
          <span>{feeLabel(item, t)}</span>
          <span>{t("Damage: {damage}", { damage: damageLabel(item, t) })}</span>
        </div>
      </div>
    </Link>
  );
}
