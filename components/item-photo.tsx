import Image from "next/image";
import { CategoryArtwork } from "@/components/illustrations";
import { photoPublicUrl, type Item } from "@/lib/domain";

// First listing photo, or the category illustration while a listing has none.
// The photo is described by the title shown next to it, so alt stays empty.
export function ItemPhoto({
  item,
  className,
  artClassName,
  sizes,
  priority,
}: {
  item: Pick<Item, "photos" | "category">;
  className?: string;
  artClassName?: string;
  sizes: string;
  priority?: boolean;
}) {
  const first = item.photos[0];
  if (!first) return <CategoryArtwork slug={item.category} className={`${className ?? ""} ${artClassName ?? ""}`} />;
  return (
    <div className={`relative overflow-hidden bg-muted ${className ?? ""}`}>
      <Image src={photoPublicUrl(first)} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
