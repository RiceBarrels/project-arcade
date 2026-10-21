# 07 — Open questions, decisions, and what is not verified

Status: as of 2026-10-20. Session 8 never asks the owner directly; questions go through the coordinator (project-arcade-31).

## 1. Already decided by the owner (relayed by the coordinator, 2026-10-20)

| Decision | Where it's used |
|---|---|
| Start from scratch: default settings, owner is the only member, no bots | `01-structure.md` |
| Server is 18+, same as the site | `02-rules.md` rule 2, copy-en 20.1 to 20.3 |
| Voice off for now; no Server Discovery (invite link only) | `01-structure.md` |
| Volunteer applications inside Discord, not an outside form | `06-volunteers.md` |
| Management via `cappyeo/discord-mcp`, pinned, stdio, preview mode, our server only | `mcp-setup.md` |
| Bot: no Administrator, no Ban, no Kick for now. Owner bans by hand. | `mcp-setup.md` |

## 2. Owner answers to Q1-Q12 (relayed by the coordinator, 2026-10-20)

All followed session 8's recommendation, except Q2, Q5 and Q8, which were the owner's own choices.

| # | Question | Owner's answer | Where it's used |
|---|---|---|---|
| Q1 | Discord's own age-restricted (18+) label? | **No.** The rules still say 18+. | `01-structure.md` section 5 |
| Q2 | Contact email for ban appeals and complaints (`[contact email]` in copy-en 20.2 and 20.6) | **colinwilsonfan@gmail.com**. **This is the owner's personal Gmail, and it will appear publicly in the posted rules.** | copy-en 20.2, 20.6; `03-moderation.md` |
| Q3 | Tell members not to use emoji? | **No.** No-emoji applies only to project content (names, tags, staff posts). | `02-rules.md` part 4 |
| Q4 | Links to individual listings in Discord? | **Not in v1.** Home page links only. | `02-rules.md` rule 3 |
| Q5 | Time zone for the weekly rhythm | **US Eastern (ET).** Announcements give ET with UTC alongside. | `05-weekly-ops.md`, copy-en 20.4 |
| Q6 | Let session 8 read `#support-desk` through the MCP? | **Not now.** The owner pastes the digest. | `05-weekly-ops.md` section 4 |
| Q7 | Discord invite link on the site? | **Not now.** | - |
| Q8 | Donations in Discord? | **None at all, including for project-arcade itself.** Written into the rules. | `02-rules.md` rule 10, copy-en 20.2 |
| Q9 | Ask members to post in English? | **Yes**, kindly worded. | `02-rules.md` Language, copy-en 20.2 rule 11 |
| Q10 | Keeping closed ticket and application threads | **Delete 90 days after closing**, except threads tied to a ban or an open appeal. `#mod-log` entries stay. | `03-moderation.md` "Working a ticket" |
| Q11 | Second admin as backup | **Later**, once there are 2 or more active moderators. | `03-moderation.md` |
| Q12 | Zero-tolerance bans appealable? | **Yes, but normally upheld** unless clearly a mistake. | `03-moderation.md` section 5 |

**Reminder for the owner (Q2):** a personal address in public rules attracts spam and links your name to the project. You can switch to a dedicated project address at any time. If you do, update copy-en 20.2 and 20.6, any posted `#rules` and pinned messages, the Rules Screening text, and this table, all at once.

The owner did not override any item in section 3.

## 3. Decided by session 8 (reported to the owner; none overridden)

- Lean channel list (15 channels). No `#gear-talk`, local-area or voice channels for now.
- Reports and applications go through private threads (`#contact-mods`, `#volunteer-apply`), not a public `#report-here` channel.
- Onboarding off (Discord's 7-channel minimum), Rules Screening on, no `news-ping` role.
- Role ladder: `trial-moderator` (4 weeks, no kick or ban), then `moderator`. Only the owner assigns roles.
- Punishment ladder: reminder, warning, 1-day timeout, 1-week timeout, ban. Strikes count for 90 days. Bans need a second moderator first, except zero-tolerance cases. Under-18s are kicked, not banned, unless they rejoin while still under 18.
- Appeals: email within 30 days, one appeal per ban, reviewed by someone not involved, answer aimed at within 14 days. Zero-tolerance bans are appealable but normally upheld (Q12). Still "needs review" in copy.
- Safety emergencies (self-harm, threats, handoff incidents) have their own steps in `03-moderation.md`. Moderators never treat them as rule strikes.
- 2FA is required for moderators, trial moderators and tech support.
- Bot role sits below both moderator roles. The owner sets hard blocks so the bot can't see the ticket or staff channels (`mcp-setup.md` 1.5).
- The MCP is installed with a lockfile (`npm install --ignore-scripts`), not run through `npx`. The token is in the Keychain with no trusted apps, so each read asks the owner. The Discord session starts with `--strict-mcp-config --permission-mode manual`. Only the owner edits the MCP config.
- System Messages off; `#help` gets `bug`/`idea`/`fixed` tags; P0s go through `#support-desk`; the raw digest goes only to session 8, which splits it three ways.
- AutoMod: money and high-risk words *alert* only, invite links *block*. Specific word lists in `01-structure.md`.
- Members keep Add Reactions. External emoji, stickers, TTS and voice messages are off.
- Bot does not get Manage Threads and Posts (it would expose all tickets). The owner sets those parts by hand.
- Weekly digest: tech support or the owner drafts it, session 8 cleans it, coordinator passes it on. Session 1 never reads Discord.
- Rule content changes a to h applied in copy-en 20.2 (12 rules, new order, high-risk firm, `#contact-mods` reporting, Discord-only ban wording). Changes i to n applied after review (checked 2026-10-20).

## 4. Not verified (test or check before relying on it)

Fact-check run on 2026-10-20 (Discord developer docs, the help center read through its public API, Discord blog; two independent agents per topic). After that, a 4-lens review of these docs (52 agents): 46 findings confirmed: fixed in these docs, or sent to session 5 for copy-en (changes i to n in `02-rules.md`). Claude Code flags (`--strict-mcp-config`, `--permission-mode manual`) were checked on the installed 2.1.305. Still open:

| Item | How to settle it |
|---|---|
| A member with no Send Messages can open a private thread in `#contact-mods` (desktop and mobile) | Test with a second, non-admin account after setup |
| Whether a ticket creator can turn off "allow anyone to invite"; whether a creator can reopen an archived ticket | Same test |
| Forum channels no longer need Community (Aug 2025 blog vs older help article) | Moot once Community is on; check when creating `#help` |
| Onboarding minimum (official 7 channels / 5 writable; unofficial reports of 1) | Check in Server Settings > Onboarding if we ever want it |
| Server Booster role can be cleared to zero permissions | Check after the first boost |
| Exact permission labels on the role screen (long vs short forms) | While configuring |
| MCP: binary name, `serve` defaults, write-mode value, per-category tool allowlist, whether ban/kick are dry-run gated, what its audit log records | Read package docs at install time (from session 4) |
| Keychain `-T ""` makes every read ask (dialog appears when the Discord session starts) | Test once after step 13 of `mcp-setup.md` |
| Which permission Security Actions (Pause Invites and Pause DMs) needs in the app (the API says Manage Server) | Test with a moderator-only account after setup |
| Current server contents: channels, roles, posted messages, member count, owner's 2FA | Step 0 of `08-setup-order.md` |
| Similar communities' Discord setups | Session 4 found none (they use Facebook groups or their own platforms). Our design is our own, not copied from a real lending community. |

## 5. CLCAuto answers (relayed by the coordinator, 2026-10-20)

CLCAuto's code session searched their repo. They have no Discord or community chat, only a community section and a reports table built into their site. They have no flow for passing community feedback on, no volunteers, no volunteer agreement, and no experience with Discord bots or MCP. **There is nothing to reuse; these docs stand on their own.**

## 6. Still needs the owner (and a lawyer)

| Item | Status |
|---|---|
| Volunteer agreement / confidentiality terms | Needed if volunteers ever see site user data (copy-en 20.5 "needs review"). Today volunteers see only Discord tickets and applications, never site data. Owner and a lawyer decide; session 8 does not write legal text. |
| "Needs review" marks in copy-en 20.2 and 20.6 (appeal window and process, ban notice, under-18 note, appeal replies, self-harm care line) | Must be cleared, and the owner must approve, before `#rules` is posted. |
