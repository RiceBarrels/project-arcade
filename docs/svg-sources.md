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
| hero.tsx | lending counter with a tent, toolbox and camera | original |
| step-browse.tsx / step-queue.tsx / step-borrow.tsx / step-return.tsx | How it works steps (step-borrow: two figures passing a box, no hands) | original |
| empty-queue.tsx | empty queue barrier | original |
| empty-search.tsx | empty shelf with magnifying glass | original |

## App icon (`public/icon.svg`)
Original artwork for this project: a yellow shipping carton with a label on its front and a blue round-trip badge (lent out, comes back), thick black outlines and hard shadows on the theme red (#ff3333). Everything sits inside the central 60% so maskable crops never cut it. Used as the SVG favicon and rendered by `scripts/generate-icons.tsx` (next/og, no extra packages) to `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png`, `public/apple-touch-icon.png` (180) and `app/favicon.ico` (16/32/48). The create-next-app default favicon was removed. No third-party artwork.

## Onboarding illustrations (`components/illustrations/onboarding.tsx`)
Queue with a "48" badge, cracked box with a price tag, chat bubble with a shield and an envelope with a padlock: original, same frame and rules as above. Screen 1 reuses `hero.tsx`.

## Icons
`lucide-react` npm package (ISC license), used as a dependency; no icon SVG is copied into the repo.
