# SVG sources

## Illustrations (`components/illustrations/`)
All drawn from scratch for this project as inline React SVG components (no third-party artwork, clip art or icon sets copied in). They share one frame (`frame.tsx`): 200x150 viewBox, 6px black outlines, flat fills from theme tokens only (`fill-chart-1..5`, `fill-background`, `fill-muted`, `fill-foreground`).

| File | Subject | Source |
|---|---|---|
| hand-tools.tsx | wrench, screwdriver, hammer | original |
| cameras.tsx | mirrorless camera | original |
| camping.tsx | tent and pine tree | original |
| games.tsx | game controller and die | original |
| music.tsx | acoustic guitar | original |
| sports.tsx | badminton rackets and shuttlecock | original |
| kitchen.tsx | pot with lid and steam | original |
| party.tsx | bunting, folding table, cake | original |
| gear-generic.tsx | box with tag (fallback for unknown categories) | original |
| hero.tsx | shelf of gear, item passed between hands | original |
| step-browse.tsx / step-queue.tsx / step-borrow.tsx / step-return.tsx | How it works steps | original |
| empty-queue.tsx | empty queue barrier | original |
| empty-search.tsx | empty shelf with magnifying glass | original |

## Icons
`lucide-react` npm package (ISC license), used as a dependency; no icon SVG is copied into the repo.
