# 01 — Channels, roles and permissions

Status: DRAFT target design. Not applied. Written from scratch because the current server state has not been seen (see "Current state to confirm" at the end).

Known so far (relayed by the coordinator on 2026-10-20): the owner is the only member, all server settings are still Discord defaults, there are no bots, voice is off for now, Server Discovery is off (invite link only), and volunteer applications are taken inside Discord, not on an outside form.

Design rules:
- As few channels as possible. Add a channel only when real conversation needs one.
- Lowercase English names with hyphens. No emoji in channel names, role names, forum tags or category names.
- Nothing in Discord arranges a loan. Borrowing, returns, damage prices and queues stay on the site.
- No paid features: no server subscriptions, no paid roles, no Server Shop, no donation links, no booster perks.

Public wording for these channels (welcome, rules, guide, templates) lives in `docs/copy-en.md` section 20. This file only defines structure.

## 1. Channels

| Category | Channel | Type | Purpose | Who can post |
|---|---|---|---|---|
| start-here | `#welcome` | Text, read-only | Welcome message (copy 20.1) and new member guide (copy 20.3), pinned | Owner, content-team |
| start-here | `#rules` | Text, read-only | Server rules (copy 20.2). Set as the Community rules channel. | Owner |
| start-here | `#announcements` | Announcement | Releases, maintenance, weekly updates (copy 20.4) | Owner, content-team |
| community | `#general` | Text | Talk about project-arcade, lending, borrowing, gear care | Everyone |
| community | `#introductions` | Text, slowmode 1 h | Say hello. City or area at most; no address, phone or email. | Everyone |
| community | `#off-topic` | Text | Anything else that follows the rules | Everyone |
| help | `#help` | Forum | Questions about using the site. Tech support answers. Bugs and ideas posted here are fine: tech support tags them and passes them into the weekly digest, and asks the poster to also use Send feedback on the site. | Everyone can create posts |
| help | `#contact-mods` | Text, private-thread tickets | Report a problem in Discord, or ask the mods something privately. Members open a private thread; they cannot post in the channel itself. | Everyone (threads only) |
| help | `#volunteer-apply` | Text, private-thread tickets | Volunteer applications (see `06-volunteers.md`) | Everyone (threads only) |
| volunteers | `#volunteer-lounge` | Text | All volunteers: coordination and questions | volunteer |
| volunteers | `#content-drafts` | Text | Draft announcements before posting | content-team, moderator |
| volunteers | `#support-desk` | Text | Tech support coordination; weekly bug and idea digest is drafted here (see `05-weekly-ops.md`) | tech-support, moderator |
| staff | `#mod-chat` | Text | Moderator discussion, hard cases | moderator, trial-moderator |
| staff | `#mod-log` | Text | One entry per moderation action (template in `03-moderation.md`). Also AutoMod alerts. | moderator, trial-moderator |
| staff | `#discord-updates` | Text | Required Community Updates channel; Discord posts here | Read-only for moderators |

Not created now:
- Voice channels (owner decision: no voice for now).
- `#translation` and the translator role: create when the site launches other languages.
- `#gear-talk` or local-area channels: only if `#general` gets busy enough to need splitting. Local channels in particular invite loan-matching, so add them only with the owner's approval.

### Why tickets use private threads
A public `#report-here` channel would expose reporters and start pile-ons. Reports and applications often include personal details. In `#contact-mods` and `#volunteer-apply`, members can create a **private thread** but cannot post in the channel. Only the member, anyone they add, and anyone with Manage Threads and Posts in that channel see the thread.

Fact-checked 2026-10-20 (Discord developer docs; medium confidence):
- Private threads no longer need a Server Boost.
- Current docs tie Create Private Threads, not Send Messages, to creating private threads in text channels. An old 2021 Discord blog says otherwise, so **test once with a non-admin account** before announcing the channel.
- **Every Manage Threads and Posts holder sees every private thread in the channel.** That is why only `moderator` and `trial-moderator` get it here. `tech-support` gets it only inside `#help` (see section 4), never server-wide.
- Whether the ticket creator can switch off "allow anyone to invite" is not documented. Moderators can. A member adding a friend to their own ticket is low risk.

Pin one short how-to message in each channel. Fallback if the test fails: members DM a moderator listed in `#contact-mods`. Do not fall back to letting members post in the channel, because that would make reports public.

### `#help` forum tags
Topic tags (members pick at least one): `account`, `listing`, `borrowing`, `queue`, `messages`, `bug`, `idea`, `other`.
Status tags (moderated: only Manage Threads holders, i.e. tech-support in `#help` and moderators): `answered`, `bug-sent-to-feedback`, `idea-sent-to-feedback`, `fixed`, `duplicate`.
13 tags, within Discord's limit of 20 per forum. A post can have at most 5.
Forum post guidelines (shown when creating a post): "Ask about using the site. Don't post loan requests, offers, prices or personal details. Bugs and ideas: please also use Send feedback on the site."

## 2. Roles

Order matters: a role can only manage roles below it. Top to bottom:

| # | Role | Who | Notes |
|---|---|---|---|
| 1 | (server owner) | The owner | Owner is not a role; owner has every permission. |
| 2 | `admin` | Owner only for now | Only create it if a second trusted admin is ever added. Not needed today. |
| 3 | `moderator` | Volunteers who passed the trial | Handles reports, timeouts, kicks, bans. |
| 4 | `trial-moderator` | New moderators, first 4 weeks | Can delete messages and time out. Cannot kick or ban. |
| 5 | `project-arcade-bot` (only if a management bot is added) | The bot | Discord creates it with the bot's name. Must sit below `moderator` and `trial-moderator` and above every role it manages. See `mcp-setup.md` 1.4. |
| 6 | `content-team` | Content/announcement volunteers | Posts in `#announcements` and `#welcome`. |
| 7 | `tech-support` | Tech support volunteers | Answers in `#help`, manages forum tags, drafts the weekly digest. |
| 8 | `volunteer` | Every volunteer, on top of their team role | Unlocks the volunteers category. Purely access; no moderation powers. |
| 9 | `@everyone` | All members | Base permissions below. |

No `news-ping` role: self-assigning it needs Onboarding, which we can't turn on yet (section 5). Members who want alerts set notifications on `#announcements` themselves. Add the role when Onboarding is turned on.

Not created: `translator` (later), any paid, supporter, donor or booster-perk role. If someone boosts the server, Discord adds its automatic booster role; give it **no** extra permissions and no special channel.

Display: hoist `moderator` and `trial-moderator` (shown separately in the member list) so people can find a mod. Colours are free choice, flat colours to match the site.

## 3. Server-level permissions per role

Y = allowed, - = not allowed. Anything not listed here is off for every role except the owner. In particular, nobody gets Administrator, Manage Server, Manage Webhooks or Mention @everyone, @here, and All Roles except the owner (and `admin` if it is ever created).

| Permission (Discord UI name) | @everyone | volunteer | tech-support | content-team | trial-moderator | moderator |
|---|---|---|---|---|---|---|
| View Channels | Y | Y | Y | Y | Y | Y |
| Create Invite | Y | Y | Y | Y | Y | Y |
| Change Nickname | Y | Y | Y | Y | Y | Y |
| Send Messages and Create Posts | Y | Y | Y | Y | Y | Y |
| Send Messages in Threads and Posts | Y | Y | Y | Y | Y | Y |
| Create Public Threads | Y | Y | Y | Y | Y | Y |
| Create Private Threads | - (only in ticket channels, see 4) | - | - | - | Y | Y |
| Embed Links | Y | Y | Y | Y | Y | Y |
| Attach Files | Y | Y | Y | Y | Y | Y |
| Add Reactions | Y | Y | Y | Y | Y | Y |
| Read Message History | Y | Y | Y | Y | Y | Y |
| Use Application Commands | Y | Y | Y | Y | Y | Y |
| Create Polls | - | - | - | Y | Y | Y |
| Use External Emoji / Stickers | - | - | - | - | - | - |
| Send Voice Messages | - | - | - | - | - | - |
| Send Text-to-Speech Messages | - | - | - | - | - | - |
| Mention @everyone, @here, and All Roles | - | - | - | - | - | - |
| Manage Messages | - | - | - | - | Y | Y |
| Pin Messages | - | - | - | Y | Y | Y |
| Bypass Slowmode | - | - | - | - | Y | Y |
| Manage Threads and Posts | - | - | - (granted only inside `#help`, section 4) | - | Y | Y |
| Manage Nicknames | - | - | - | - | Y | Y |
| Timeout Members | - | - | - | - | Y | Y |
| Kick, Approve, and Reject Members | - | - | - | - | - | Y |
| Ban Members | - | - | - | - | - | Y |
| View Audit Log | - | - | - | - | Y | Y |
| Manage Channels, Manage Roles, Manage Server, Manage Webhooks, Manage Expressions, Manage Events, Administrator | - | - | - | - | - | - (owner only) |

Notes:
- Add Reactions stays on: members react in their own chat. The no-emoji rule applies to everything the project publishes (names, tags, staff posts), not to how members react. Owner agreed (07 Q3).
- External emoji/stickers are off to keep the server's own space emoji-free and cut spam.
- Moderators do not get Manage Channels or Manage Roles. Structure changes, and giving or removing roles, go through the owner.
- Any role that gets a 2FA-gated permission anywhere, even in one channel, needs 2FA on each member's account. That covers `moderator`, `trial-moderator`, and `tech-support` (Manage Threads in `#help`).
- Permission names were fact-checked on 2026-10-20 against Discord's help center and developer changelog. Since 2026-02-23, Pin Messages and Bypass Slowmode are separate permissions: Manage Messages alone no longer pins. Discord's own pages sometimes use short forms ("Send Messages", "Manage Threads", "Kick Members"). The longer labels above are the likely role-screen names.
- "Require 2FA for moderator actions" covers Kick, Ban, Manage Messages, Manage Channels, Manage Roles, Manage Threads and Manage Server. It does **not** cover Timeout Members or Pin Messages.

## 4. Channel overrides

| Channel | Override |
|---|---|
| `#welcome`, `#rules` | @everyone: deny Send Messages, Create Threads, Add Reactions. content-team: allow Send in `#welcome` only. |
| `#announcements` | @everyone: deny Send Messages, Create Threads. content-team: allow Send Messages. |
| `#introductions` | Slowmode 1 hour. |
| `#help` (forum) | @everyone: allow Send Messages and Create Posts. tech-support: allow Manage Threads and Posts (this channel only, so they can apply status tags and close posts). Topic tags: members pick one, "require a tag" on. Status tags: marked moderated (only Manage Threads holders can add them). Max 20 tags per forum, 5 per post. |
| `#contact-mods`, `#volunteer-apply` | @everyone: deny Send Messages, deny Create Public Threads, allow Create Private Threads, allow Send Messages in Threads. moderator and trial-moderator see all tickets through their Manage Threads and Posts. Nobody else has it here. If a bot is added: bot's role deny View Channels and Manage Permissions, set by the owner (`mcp-setup.md` 1.5). |
| volunteers category | @everyone: deny View Channels. volunteer: allow View Channels. |
| `#content-drafts` | Only content-team and moderator can view. |
| `#support-desk` | Only tech-support and moderator can view. |
| staff category | @everyone: deny View Channels. moderator and trial-moderator: allow View Channels. |
| `#discord-updates` | Moderators: view only. |

After setup, check each private channel with "View Server As Role" for @everyone and for `volunteer`.

## 5. Server settings (target)

| Setting | Target | Why |
|---|---|---|
| Community | On | Needed for the rules channel, Rules Screening and announcement channels. Requires a verified-email verification level, the media filter on all members, a rules channel and a community updates channel. No member minimum. (Forum channels reportedly no longer need Community, since Aug 2025.) |
| Server Discovery | Off | Owner decision: invite link only. |
| Verification level | Medium (verified email and account older than 5 minutes) | Slows throwaway spam accounts. Community needs at least Low. |
| Explicit media content filter | Scan media from all members | Required by Community. |
| Require 2FA for moderator actions | On (owner turns on own 2FA first) | Stolen mod accounts cannot ban or delete. |
| Default notifications | Only @mentions | Keeps the server quiet. |
| Rules Screening | On (Server Settings > Safety Setup > DM and Spam Protection: "Members must accept rules before they can talk"). Up to 16 rules; we have 12. | New members can't talk, react or DM members until they accept the rules. Works without Onboarding. |
| Onboarding | **Off for now.** | Discord requires at least 7 default channels, 5 of them where @everyone can view and send. We have 3 (`#general`, `#introductions`, `#off-topic`) plus the `#help` forum. Revisit if the server grows. |
| Age-restricted (18+) server label | **Off** (owner decision, 07 Q1). The rules still say 18+. | Turning it on would make Discord itself keep teen and "unconfirmed" accounts out, but it also adds friction for new adult accounts. |
| AutoMod | See below | Built in, free, no bot. |
| Raid protection / DM spam protection (Safety Setup) | On, alerts to `#mod-log` | |
| Server subscriptions, Server Shop, any monetization | Off. Never press "Enable Monetization" (in Server Settings or the Developer Portal), never accept the Monetization Terms. | Non-profit rule. Never turned on. |
| System Messages (Server Settings > Engagement) | Turn off: random welcome message on join, "prompt members to reply with a sticker", boost messages, setup tips. | Discord's random join text and wave sticker aren't our copy and bring emoji/stickers into project space; boost messages advertise boosting. Moderators welcome people by hand. |
| Server Booster role | Created by Discord automatically after the first boost; it can't be deleted. Clear all its permissions, keep it low in the list, hide the boost progress bar. Boosting itself can't be turned off; the money goes to Discord. | No booster perks. |
| Widget, invites | One permanent invite link with no expiry, created by the owner. Invites in members' messages are blocked by AutoMod. | |

### AutoMod rules (all built in)
1. **Block mention spam:** more than 5 unique mentions in one message, block and time out 10 minutes, alert `#mod-log`.
2. **Block suspected spam content:** on.
3. **Commonly flagged words:** on (all three lists).
4. **Custom: invite and link spam (block):** block Discord invite links from everyone except moderators and trial-moderators, with a regex such as `discord(\.gg|(app)?\.com/invite)/`.
5. **Custom: money and off-site moves (alert only, do not block):** words such as `venmo`, `paypal`, `cashapp`, `zelle`, `e-transfer`, `etransfer`, `crypto`, `deposit`, `send money`, `whatsapp`, `telegram`, `text me`, `dm me`. Alert to `#mod-log` so a human checks whether it is a real problem. Blocking would catch innocent talk about the rules.
6. **Custom: high-risk gear (alert only):** `chainsaw`, `power tool`, `angle grinder`, `motorbike`, `e-scooter`, `belay`, `climbing harness`, `wheelchair`, `crutches`, `oxygen tank`. Alert only. Moderators remind people of the rule; they do not delete normal conversation. Short common words like "car" or "drill" are left out on purpose: they would flood `#mod-log`.
7. **Member profile names (Safety Setup > AutoMod > Members, "Block Words in Member Profile Names"):** `admin`, `moderator`, `staff`, `project-arcade`, `*support*`. It checks the server nickname, or the username if there is none. A matching member can't talk until they change the name. This stops impersonation. Moderators exempt.

Exempt `moderator` and `trial-moderator` from rules 4 to 7 (the owner and Manage Server holders are always exempt). Limits fact-checked 2026-10-20: up to 6 custom keyword rules (we use 3), 1000 keywords and 10 regex per rule. A keyword with no `*` matches whole words only. The built-in word lists and the spam filter are English-only. AutoMod rules can only be edited on desktop. Tune the word lists after the first month from `#mod-log` false alarms.

## 6. Bots

None now. Discord's built-in AutoMod and Rules Screening cover v1. If a management bot or MCP is added, follow `mcp-setup.md`. Never give any bot Administrator.

## 7. Current state to confirm with the owner

The coordinator relayed that settings are defaults and there are no bots. Still unseen:
- Channel list (Discord's default new server has a `#general` text channel and a `General` voice channel; delete the voice channel, keep `#general` if it exists).
- Any existing roles beyond @everyone.
- Any messages already posted, and the member count.
- Whether the owner's account has 2FA turned on (needed before "Require 2FA for moderator actions").

Step 0 of `08-setup-order.md` checks these before anything is built.
