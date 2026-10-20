import { CookingPot, Camera, Gamepad2, Guitar, Package, PartyPopper, Tent, Volleyball, Wrench, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "hand-tools": Wrench,
  cameras: Camera,
  camping: Tent,
  games: Gamepad2,
  music: Guitar,
  sports: Volleyball,
  kitchen: CookingPot,
  party: PartyPopper,
};

// Decorative: always shown next to the category name.
export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = ICONS[slug] ?? Package;
  return <Icon aria-hidden className={className ?? "size-4"} />;
}
