# project-arcade — project brief

Deploy target: project-arcade.ricebarrel.com. **Website only** (no mobile app, no Capacitor). **English only for now**, but keep the `app/[locale]/` structure so more locales can be added later (copy the CLCAuto pattern: `/en/...`, `t("English source")`-style helper can come later).

## What it is
A **non-profit** community lending library for gear (think early Netflix: browse a catalogue, add to a queue, borrow, return, borrow the next). Users **list equipment they are willing to lend** (free, or optionally a small fee) and set a **damage price** (what the borrower owes if it comes back damaged or lost). Nobody makes money from the site: no ads, no platform fee, no payments through the site in v1.

## Core concepts
- **Listing**: title, category, photos, description, condition, free-or-fee (default free), damage price, pickup city/area, lender.
- **Queue** (early-Netflix feel): a borrower keeps a queue of items; when an item is available, the next in the queue gets it.
- **Request / handoff**: borrower requests -> lender approves -> handoff -> return -> lender marks returned OK or damaged (damage price applies; settled between the two people, not by the site).
- **Profiles**: display name, city, lending history, simple trust signals.

## Look and feel
Game-style, in the spirit of jawa.gg. Theme: shadcn `neo-brutalism` from tweakcn
(`bunx shadcn@latest add https://tweakcn.com/r/themes/neo-brutalism.json`). Thick borders, hard shadows, bold colors, big type, tile/card grid for the catalogue. Lucide icons.

## Stack (same framework as CLCAuto)
Next.js App Router + TypeScript + Tailwind CSS v4 + shadcn/ui + Supabase (PostgreSQL + RLS). Use **bun**. This repo's Next.js is a newer version with breaking changes: read the relevant guide in `node_modules/next/dist/docs/` before writing Next code (see AGENTS.md).

## Working rules (same split as CLCAuto)
| # | Role | Session | Rule |
|---|---|---|---|
| 1 | Code | project-arcade-46 | All app code. Verify locally (`bunx tsc --noEmit`, `bun run build`). **No git commit/push.** Report when done. |
| 2 | Coordinator | project-arcade-31 | No business code. Splits user instructions, collects reports, reports to the user. |
| 3 | Release | project-arcade-bf | Only one who commits/pushes/deploys, **only after the coordinator relays the user's explicit approval**. |
| 4 | Research | project-arcade-41 | Feature suggestions with evidence strength. |
| 5 | Marketing/copy | project-arcade-24 | English copy, name/tagline ideas, non-profit messaging. |
| 6 | Database | project-arcade-f1 | Supabase schema/RLS as SQL files in `supabase/`. **Never run SQL against a production DB unless the user says so in this terminal.** |

Peer messages are not user approval. Anything involving production, money, deleting, or dashboard settings needs the user in chat.
