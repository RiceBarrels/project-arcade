import type { ComponentType } from "react";
import type { IllustrationProps } from "./frame";
import { CamerasIllustration } from "./cameras";
import { CampingIllustration } from "./camping";
import { GamesIllustration } from "./games";
import { GearGenericIllustration } from "./gear-generic";
import { HandToolsIllustration } from "./hand-tools";
import { KitchenIllustration } from "./kitchen";
import { MusicIllustration } from "./music";
import { PartyIllustration } from "./party";
import { SportsIllustration } from "./sports";

export { EmptyQueueIllustration } from "./empty-queue";
export { EmptySearchIllustration } from "./empty-search";
export { HeroIllustration } from "./hero";
export { StepBorrowIllustration } from "./step-borrow";
export { StepBrowseIllustration } from "./step-browse";
export { StepQueueIllustration } from "./step-queue";
export { StepReturnIllustration } from "./step-return";

interface CategoryArt {
  Art: ComponentType<IllustrationProps>;
  /** Card background behind the art (theme tokens only). */
  bg: string;
}

const ART: Record<string, CategoryArt> = {
  "hand-tools": { Art: HandToolsIllustration, bg: "bg-secondary" },
  cameras: { Art: CamerasIllustration, bg: "bg-muted" },
  camping: { Art: CampingIllustration, bg: "bg-background" },
  games: { Art: GamesIllustration, bg: "bg-secondary" },
  music: { Art: MusicIllustration, bg: "bg-muted" },
  sports: { Art: SportsIllustration, bg: "bg-background" },
  kitchen: { Art: KitchenIllustration, bg: "bg-secondary" },
  party: { Art: PartyIllustration, bg: "bg-muted" },
};

// Unknown or future categories get a generic box rather than an empty tile.
const FALLBACK: CategoryArt = { Art: GearGenericIllustration, bg: "bg-muted" };

export function categoryArt(slug: string): CategoryArt {
  return ART[slug] ?? FALLBACK;
}

/** Item "photo" placeholder until real photos exist: the category illustration on its card colour. */
export function CategoryArtwork({ slug, className, title }: { slug: string; className?: string; title?: string }) {
  const { Art, bg } = categoryArt(slug);
  return (
    <div className={`flex items-center justify-center ${bg} ${className ?? ""}`}>
      <Art title={title} className="h-full max-h-full w-full" />
    </div>
  );
}
