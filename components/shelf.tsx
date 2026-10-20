import Link from "next/link";
import type { ReactNode } from "react";
import { ItemCard } from "@/components/item-card";
import type { ItemWithQueue } from "@/lib/domain";

// Early-Netflix style horizontal shelf (native scroll-snap, no JS).
// The list bleeds to the screen edge (-mx-4) but keeps a 16px inset via
// padding + matching scroll-padding, so snapped cards and their hard shadows
// are never flush with or clipped at the edge.
export function Shelf({
  title,
  icon,
  items,
  href,
}: {
  title: string;
  /** Decorative icon shown before the title. */
  icon?: ReactNode;
  items: ItemWithQueue[];
  href?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          {icon}
          {title}
        </h2>
        {href && (
          <Link href={href} className="inline-flex min-h-10 items-center px-1 text-sm font-bold underline underline-offset-4">
            See all
          </Link>
        )}
      </div>
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-5 pt-1">
        {items.map((item) => (
          <li key={item.id} className="w-60 shrink-0 snap-start">
            <ItemCard item={item} />
          </li>
        ))}
        {/* Trailing spacer: keeps the last card's shadow and right inset visible. */}
        <li aria-hidden className="w-px shrink-0" />
      </ul>
    </section>
  );
}
