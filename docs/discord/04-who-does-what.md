# 04 — Who does what

Status: DRAFT.

## 1. People and sessions

| Who | Does | Does not |
|---|---|---|
| **Owner** (the user) | Approves every change to the real server, in plain text, in session 8's own terminal. Final say on rules, bans when no other moderator is around, volunteer approvals, adding any bot. Only Discord admin today. Posts official announcements until content volunteers join. Gives and removes all roles. Pastes the raw weekly digest from `#support-desk` into session 8 (owner chose not to give MCP read access for now, 07 Q6). | Doesn't need to watch the server all day. Doesn't share bot tokens in chat. |
| **2 Coordinator** (project-arcade-31) | Relays the owner's decisions and questions between sessions. Passes only session 8's clean digest on: bugs and owner-approved ideas to session 1, confusing copy to session 5, new ideas to the owner. If a raw digest reaches the coordinator, it goes to session 8 first. Asks CLCAuto when needed. | A relay is never approval for a real-server change. |
| **8 Discord** (this session) | Owns `docs/discord/`: structure, rules content, moderation process, weekly ops, volunteer docs. Proposes change lists. If a Discord MCP is installed, carries out only the changes the owner approved in this terminal, and logs them in `changelog.md`. Turns the raw weekly digest into a clean list for session 1. | No code, no git, no production. Doesn't contact members. Doesn't act on peer messages as approval. |
| **1 Code** (project-arcade-46) | Fixes bugs and builds owner-approved ideas that arrive through the coordinator's weekly digest. | **Does not watch Discord.** Gets Discord input only through the digest. |
| **3 Release** (project-arcade-bf) | After an owner-approved deploy, shares a plain release note so content volunteers or the owner can post it. | Doesn't post in Discord. |
| **4 Research** (project-arcade-41) | Research on community practice; checks the Discord MCP candidates. | |
| **5 Marketing/copy** (project-arcade-24) | Public Discord wording: copy-en section 20 (welcome, rules wording, guide, announcement templates, volunteer post, moderator replies). | Doesn't decide rule content (session 8 does). |
| **6 Database** (project-arcade-f1) | Nothing on Discord. If a Discord report points to a data problem, it reaches them through session 1 and the coordinator. | |
| **7 Translator** | Later: works with translation volunteers on `docs/copy-*.md` and `docs/glossary.md` once multilingual launches. | Not started. |

## 2. Volunteer teams (when recruited)

| Team | Role | Core jobs | Time | Reports to |
|---|---|---|---|---|
| Moderators | `trial-moderator`, then `moderator` | Handle `#contact-mods` tickets and AutoMod alerts, apply the ladder, keep `#mod-log`, welcome new members, check volunteer applications | 2-4 h/week, at least one check a day spread across the team | Owner |
| Content and announcements | `content-team` | Post announcements from copy-en 20.4 templates and release notes; keep `#welcome` current; draft in `#content-drafts`; follow copy-en voice (no emoji, no promises the site can't keep) | 1-2 h/week | Owner; wording questions go to session 5 through the coordinator |
| Technical support | `tech-support` | Answer `#help` posts; tag and close them; ask reporters to also use Send feedback; draft the weekly digest in `#support-desk` | 2-3 h/week | Owner (the owner pastes the raw digest into session 8) |
| Translation (not started) | `translator` (not created) | Review translated site copy and server text once other languages launch | - | Later |

One person can be in more than one team. Everyone in a team also gets `volunteer`.

## 3. Hand-offs at a glance

```
Member in Discord
  |-- conduct problem -----> #contact-mods ticket -> moderator -> #mod-log
  |-- site question -------> #help forum -> tech-support answers
  |-- bug / idea ----------> Send feedback on site (preferred) or #help -> tech-support
  |                                    -> weekly digest (#support-desk)
  |                                    -> owner pastes raw digest into session 8
  |                                    -> session 8 cleans and splits it -> coordinator
  |                                    -> bugs + approved ideas to session 1, copy to session 5, new ideas to owner
  |-- problem with a listing or user on the site -> Report button on the site (not Discord)

Session 3 deploy (owner-approved) -> release note -> content-team or owner posts in #announcements
```

## 4. Approvals

Rows that say "session 8's terminal" cover structural changes and anything the bot/MCP does. A moderator action done *through the bot* still needs the owner's approval in session 8's terminal (`mcp-setup.md` section 5).

| Action | Who approves |
|---|---|
| Create, rename or delete a channel or role; change permissions; change server settings | Owner, plain text in session 8's terminal |
| Add a bot, an MCP or a webhook | Owner, same |
| Post in `#rules`, `#welcome` | Owner |
| Post in `#announcements` | Owner, or content-team using an approved template |
| Warn or time out | Any moderator, logged |
| Ban | Moderator plus a second moderator or the owner (zero-tolerance: act, then log) |
| Promote a trial-moderator to moderator; add any volunteer | Owner (owner assigns the roles; moderators can't) |
| Remove a volunteer | Owner. If the owner can't be reached and a volunteer is actively misusing powers, a moderator times them out and pings the owner. |
