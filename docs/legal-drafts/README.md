# Legal page drafts (terms and privacy, 12 languages)

- **Date:** 2026-10-20
- **Status:** machine-assisted draft — needs native-speaker review. Every file also needs lawyer review (see the DRAFT note at the top of each file). Nothing here has been reviewed by a native speaker or a lawyer.
- **Purpose:** ready to copy to `content/legal/<code>/terms.md` and `content/legal/<code>/privacy.md`. Format follows `docs/i18n.md` ("Legal pages") and was checked with the block parser in `components/legal/legal-page.tsx` and the frontmatter parser in `lib/legal.ts`: every language gives the same block structure as English.

## Files

| Code | Language | Files |
|---|---|---|
| en | English (source) | `en/terms.md`, `en/privacy.md` |
| zh | Simplified Chinese | `zh/terms.md`, `zh/privacy.md` |
| zh-hant | Traditional Chinese (Taiwan base) | `zh-hant/terms.md`, `zh-hant/privacy.md` |
| ja | Japanese (added 2026-10-21) | `ja/terms.md`, `ja/privacy.md` |
| es | Spanish (neutral Latin American) | `es/terms.md`, `es/privacy.md` |
| fr | French | `fr/terms.md`, `fr/privacy.md` |
| ar | Arabic (MSA, RTL) | `ar/terms.md`, `ar/privacy.md` |
| tl | Tagalog / Filipino | `tl/terms.md`, `tl/privacy.md` |
| vi | Vietnamese | `vi/terms.md`, `vi/privacy.md` |
| ko | Korean | `ko/terms.md`, `ko/privacy.md` |
| pt | Portuguese (pt-BR) | `pt/terms.md`, `pt/privacy.md` |
| ru | Russian | `ru/terms.md`, `ru/privacy.md` |

## Where the text comes from

- `en/*` is `docs/copy-en.md` section 8 (terms) and section 15 (privacy), laid out to match the live `/terms` and `/privacy` pages.
- `<code>/*` is section 8 and section 15 of `docs/copy-<code>.md`, copied verbatim (no new translation in these files). If a translation changes, change `docs/copy-<code>.md` and the page file together.
- `bun run i18n:check` fails when a `content/legal/<code>/*.md` page differs from its file here (since 2026-10-21). After changing a draft, tell 1号 to copy it to `content/legal`.
- Register: these pages use the formal form in every language (glossary section 4). Do not mix in UI strings, which are informal.

## Layout (same in every language)

Frontmatter `title` (translated) and `updated: 2026-10-20` (date of the English version; the page shows it in the reader's language), then a `::: draft` box and a `::: summary` box.

**terms.md:** numbered items 1 to 13 (bold lead, then text), then a `Contact: [contact email]` line, as in `content/legal/en/terms.md`.

**privacy.md:** 12 `##` sections in the English order:

1. What we collect (7 bullets)
2. Where it is stored
3. What other users can see
4. Analytics and cookies (DRAFT, needs review): 4 bullets, then a Cookies paragraph with 2 bullets; added and revised 2026-10-20, wording not final
5. How we use it
6. What we don't do (3 bullets)
7. Sharing
8. Keeping and deleting data (two paragraphs, *Feedback:* first)
9. Your choices
10. Age
11. Changes
12. Contact

Headings are translated; their order and count match English, so section N is the same section in every language.

## What is deliberately left out of the page files

- The translator-note paragraph inside each DRAFT blockquote (it stays in `docs/copy-<code>.md`).
- The owner/lawyer to-do line at the end of each section (internal; the live English page does not show it either).
- In terms item 12, the internal note "(one line, owner to confirm before launch)": the lead is just "Privacy.", as on the live English page.
- The "Last updated" line: the page component prints it from `updated`.
- The "unofficial translation, the English version applies" notice: the page component renders it from a dictionary key (wording per language in `docs/i18n-legal-notice.md`).

## Page language only (user decision, 2026-10-20)

The page files contain no English mixed into the running text: the DRAFT box starts with the translated marker in bold (the English "DRAFT — ..." sentence is removed), the Analytics heading carries only the translated "(draft, needs review)", and the English lead-ins of two markers are translated ("[TO CONFIRM from Vercel or the dashboard, not stated in the docs page above:" and "[TO CONFIRM / lawyer:"). The `docs/copy-<code>.md` files keep the English markers for tracing back to `docs/copy-en.md`, so for these few lines the page files and the copy files differ on purpose.

## Markers and placeholders kept on purpose

- The marker tokens: every `[TO CONFIRM`, `[NEEDS LAWYER CONFIRMATION: ...]` and `NEEDS REVIEW.`: these stay until the owner and a lawyer clear them. Do not publish while they are present.
- `[contact email]` and `[Link to privacy policy]`: the owner fills these in. 1号 can turn `[Link to privacy policy]` into a link to `/<locale>/privacy`.
- `[message removed]` stays in English because the database stores that exact text (`supabase/05-messages-and-deletion.sql`). If code later shows a localized label, the privacy text must change to match.
- Product and file names (Supabase, Vercel, ca-central-1, supabase/*.sql paths, `user_id ON DELETE SET NULL`).

## Differences from content/legal/en (for 1号)

- `content/legal/en/privacy.md`: 1号 added the Analytics section on 2026-10-20; the English text was revised again afterwards (page path only, ID stripping paragraph, new Cookies paragraph). `docs/legal-drafts/en/privacy.md` has the latest version.
- The draft box: `content/legal/en/*.md` uses a shortened note ("DRAFT: needs review by a lawyer before launch. This is plain-language product copy, not legal advice."). The translations keep the full DRAFT note from `docs/copy-<code>.md` (English marker, translation, and the sentence about wording, jurisdiction, liability limits and age rules). Either shorten the translations or use the full note in English too; tell 7号 which.

## Counts to check after any edit

| File | DRAFT note | [TO CONFIRM | [NEEDS LAWYER CONFIRMATION | Other |
|---|---|---|---|---|
| terms.md | 1 | 0 | 1 | 13 numbered items, 1 [contact email], 1 [Link to privacy policy] |
| privacy.md | 1 (plus "DRAFT" in the Analytics heading) | 7 | 0 | 12 `##` headings, 16 bullets, 2 [contact email], 1 [message removed], 3 [NEEDS REVIEW (profile paragraph, analytics paragraph, cookies), 1 "NEEDS REVIEW." in "Basic technical data" |

`updated` is 2026-10-20 in all 11 files (the English "Last updated" date, still a draft date: set it to the real publish date before launch). When the English date changes, update all 11 files.
