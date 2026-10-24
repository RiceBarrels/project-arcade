# shadcn-only audit (2026-10-23)

Rule: UI uses shadcn registry components only; own components need the user's approval. Read-only audit by the coordinator, 38 agents. 31 findings confirmed by an adversarial second check; 34 more were over the per-scan cap and were NOT examined (components 19, pages 15), so this list is not complete.

Decided by the user: fix only the first two items before the desktop header ships; install new registry items as needed (`bunx shadcn@latest add <item>`); everything else waits for a later batch.

## Now (before the desktop header ships)
1. components/ui/dropdown-menu.tsx is hand-written on radix-ui (cut-down, different API). Replace with the registry item (`bunx shadcn@latest add dropdown-menu`), re-theme through classes only, keep the full part set. Callers: components/theme.tsx, components/header/account-menu.tsx.
2. components/mobile/onboarding.tsx builds a dialog from radix-ui directly. Use components/ui/dialog.tsx (DialogContent with showCloseButton={false} plus className overrides for the full-screen phone layout, safe-area padding, pager dots, text colour). Check visually.

## Later (not started)
| severity | file | line | shadcn item |
|---|---|---|---|
| must-fix | app/[locale]/item/[id]/page.tsx | 144 | @shadcn/skeleton |
| must-fix | app/[locale]/list/page.tsx | 28 | @shadcn/skeleton |
| must-fix | app/[locale]/messages/[loanId]/page.tsx | 52 | @shadcn/skeleton |
| must-fix | app/[locale]/messages/page.tsx | 89 | @shadcn/skeleton |
| must-fix | app/[locale]/profile/page.tsx | 151 | @shadcn/button |
| must-fix | app/[locale]/settings/page.tsx | 71 | @shadcn/skeleton |
| must-fix | components/auth/form-bits.tsx | 60 | @shadcn/alert |
| must-fix | components/avatar.tsx | 5 | @shadcn/avatar |
| must-fix | components/list-form.tsx | 263 | @shadcn/field |
| must-fix | components/locale-switcher.tsx | 31 | @shadcn/select |
| must-fix | components/mobile/onboarding.tsx | 5 | @shadcn/dialog |
| must-fix | components/mobile/onboarding.tsx | 5 | @shadcn/dialog |
| must-fix | components/settings/profile-form.tsx | 130 | @shadcn/alert |
| must-fix | components/ui/dropdown-menu.tsx | 1 | @shadcn/dropdown-menu |
| should-fix | app/[locale]/browse/page.tsx | 68 | @shadcn/empty |
| should-fix | app/[locale]/messages/page.tsx | 56 | @shadcn/item |
| should-fix | app/[locale]/messages/page.tsx | 39 | @shadcn/empty |
| should-fix | app/[locale]/messages/page.tsx | 111 | @shadcn/card |
| should-fix | app/[locale]/page.tsx | 76 | @shadcn/empty |
| should-fix | app/[locale]/profile/page.tsx | 130 | @shadcn/item |
| should-fix | app/[locale]/settings/page.tsx | 71 | @shadcn/skeleton |
| should-fix | components/avatar.tsx | 4 | @shadcn/avatar |
| should-fix | components/check-field.tsx | 1 | @shadcn/field |
| should-fix | components/focus-status.tsx | 13 | @shadcn/alert |
| should-fix | components/header/category-nav.tsx | 135 | @shadcn/button |
| should-fix | components/locale-switcher.tsx | 31 | @shadcn/select |
| should-fix | components/photo-picker.tsx | 76 | @shadcn/input |
| should-fix | components/return-check.tsx | 103 | @shadcn/label |
| should-fix | components/search-form.tsx | 12 | @shadcn/label |
| should-fix | components/theme.tsx | 88 | @shadcn/button |
| should-fix | components/ui/card.tsx | 1 | @shadcn/card |

Other facts: components/ui/dialog.tsx (useT hook, phone bottom-sheet layout) and alert-dialog.tsx differ from the registry in more than theme classes; the other 13 ui files match the registry apart from theme classes. `cn` is shadcn-ui's own npm package, so it is fine. i18n/client.tsx imports Direction from radix-ui (direction context, not UI).

Open: the 5 own files created for the desktop header before the rule (components/header/header-search.tsx, category-nav.tsx, account-menu.tsx, header-link.tsx, styles.ts) have not been approved as own components yet.
