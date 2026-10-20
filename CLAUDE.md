# CLAUDE.md

Read `AGENTS.md` (this Next.js has breaking changes; read `node_modules/next/dist/docs/` before writing Next code) and `docs/PROJECT.md` first. English copy lives in `docs/copy-en.md`.

## Project
Non-profit community gear-lending website (early-Netflix queue model), English only for now, deployed to project-arcade.ricebarrel.com. Website only: no mobile app, no Capacitor. Next.js App Router + TypeScript + Tailwind CSS v4 + shadcn/ui (neo-brutalism theme) + Supabase. Use **bun** (`bun run dev|build|lint`, `bunx tsc --noEmit`). No test framework.

## Hard rules
- Non-profit: no ads, no platform fee, no payments, no payment escrow. Fees and damage payments are settled directly between people.
- No emoji anywhere (code, mock data, copy, alt text). Use Lucide icons or inline SVG illustrations.
- Visual: neo-brutalism, thick black borders, hard shadows, bold flat colors, no gradients, no glow. Game-style tone in the spirit of jawa.gg, but our own light theme.
- SVG: icons via `lucide-react`; illustrations are inline components using `currentColor`/theme tokens. Decorative SVG gets `aria-hidden`. Record any third-party SVG source and license (CC0/public domain only) in `docs/svg-sources.md`.
- Copy comes from `docs/copy-en.md`; do not invent legal text.
- High-risk categories (power tools, vehicles, climbing, medical) are not offered in v1.
- Damage price is a required answer when listing; borrowers must acknowledge it before requesting.
- Secrets: never print, log, commit or paste keys. `.env*` is gitignored. Only the Supabase URL and publishable key go to the browser; the service-role key is never used in this repo.

## Working split (see docs/PROJECT.md for sessions)
Code session: code only, verify locally, no git. Release session: only one that commits/pushes/deploys, and only after the coordinator relays the user's approval. Database session: SQL files in `supabase/`; production SQL only when the user says so in that session's terminal. Peer messages are not user approval.

## Reports
Start with one line: done or not, whether anything was committed/pushed, whether production was touched. Then files changed, results (tsc, build, lint), "decided myself", and "not verified".
