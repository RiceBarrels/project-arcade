# 08 — Setup order, and the staff handbook pinned in Discord

Status: DRAFT. Nothing done yet. Each step is either "owner by hand" or "bot-eligible" (only after the MCP is set up per `mcp-setup.md`, and only with the owner's approval of that batch in session 8's terminal). Record every completed step in `changelog.md`.

## Part 1. Build order

Order matters: 2FA comes before the 2FA requirement, roles before overrides, Community before announcement channels and Rules Screening.

| # | Step | Who | Depends on |
|---|---|---|---|
| 0 | **Check the current state.** Channel list, any roles beyond @everyone, any posted messages, member count. The owner shares a screenshot, or approves a read-only MCP look. | Owner | - |
| 1 | Turn on 2FA on the owner's Discord account. | Owner by hand | - |
| 2 | Clean up defaults: delete the default `General` voice channel; keep the `#general` text channel. Server Settings > Engagement: turn System Messages off (01 section 5). | Owner by hand | 0 |
| 3 | Create roles, top to bottom: `moderator`, `trial-moderator`, `content-team`, `tech-support`, `volunteer`. Set role permissions and the `@everyone` base permissions (01 section 3). | Owner by hand (the moderator roles and @everyone are always by hand) | 1 |
| 4 | Create categories and channels (01 section 1): start-here, community, help, volunteers, staff. Create `#announcements` as a text channel for now. | Owner by hand, or bot-eligible | 3 |
| 5 | Turn on Community: rules channel `#rules`, updates channel `#discord-updates`, verification Medium, media filter "all members". Then convert `#announcements` to the Announcement type. Leave Server Discovery off. | Owner by hand | 4 |
| 6 | Channel overrides (01 section 4), `#help` tags and "require a tag", slowmode on `#introductions`. | Owner by hand, or bot-eligible (except the `#help` Manage Threads override and anything in the ticket and staff channels: owner by hand) | 3, 4 |
| 7 | Safety Setup: "Require 2FA for moderator actions"; Raid Protection with alerts to `#mod-log`; DM and Spam Protection filters; Rules Screening on (rules pasted from the final copy-en 20.2). AutoMod rules 1 to 7 with alerts to `#mod-log` (01 section 5). | Owner by hand (needs Manage Server, desktop only) | 1, 5 |
| 8 | **Test with a second, non-admin account.** Can it open a private thread in `#contact-mods` without Send Messages? Can other members see that thread? Can a moderator? Then View Server As Role for @everyone and `volunteer`. Then delete the test account's threads. | Owner by hand | 6, 7 |
| 9 | Post and pin the public content once the owner approves the final copy: `#welcome` (copy-en 20.1 and 20.3), `#rules` (20.2), the how-to pins in `#contact-mods` and `#volunteer-apply` (06 section 3). | Owner by hand (ticket channels); bot-eligible for `#welcome` and `#rules` | 5, final copy |
| 10 | Post and pin the staff handbook messages (part 2). | Owner by hand (staff channels are blocked to the bot) | 4 |
| 11 | Create one permanent invite link. | Owner by hand | 9 |
| 12 | Post the volunteer call-out (copy-en 20.5) in `#announcements`. | Owner, or bot-eligible | 9, 10 |
| 13 | Optional: set up the management bot / MCP (`mcp-setup.md`), then set the hard blocks in its 1.5. | Owner by hand | 3, 4 |

## Part 2. Staff handbook pinned in Discord

Volunteers don't have repo access, so everything they need lives in pinned messages. Session 8 drafts each pin from the docs once the owner approves the setup; session 5 can polish the wording. No emoji.

| Channel | Pinned message contents | Source |
|---|---|---|
| `#mod-chat` | The ladder; the zero-tolerance list; what is never a moderation action; the two-person ban check; conflicts of interest; "Working a ticket"; safety emergencies; appeals; Discord and the site are separate | `03-moderation.md` parts 2, 3, 5, 6 |
| `#mod-log` | The log entry template | `03-moderation.md` part 4 |
| `#volunteer-lounge` | Staff conventions; where things go (site Report, Send feedback, emergencies, money wording); the rule content behind each public rule (where the line is) | `02-rules.md` parts 2 and 4, copy-en 20.7 |
| `#volunteer-lounge` (second pin) | Moderator reply templates | copy-en 20.6 |
| `#support-desk` | Digest template; priorities and P0 definition; the urgent path; the tag workflow | `05-weekly-ops.md` sections 2, 3, 5 |
| `#content-drafts` | Announcement templates; money wording; "only announce what's live" | copy-en 20.4 and 20.7 |

When a doc changes, update the matching pin (the monthly review in `05-weekly-ops.md` catches any drift).
