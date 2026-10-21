# 03 — Moderation: reports, actions, appeals

Status: DRAFT. For moderators and the owner. Not public.

Today the owner is the only moderator. Everything below written for "a moderator" applies to the owner until volunteers join.

Evidence note: session 4's research (`docs/discord-research.md`) found no published moderation ladder from similar lending communities. The ladder below is our own design, informed only by general Discord guidance (weak to medium evidence).

## 1. Where reports come from

| Source | What it's for | Who handles it |
|---|---|---|
| Private thread in `#contact-mods` | Conduct in Discord: harassment, scams, DMs, spam | Moderators |
| DM to a moderator | Same, for people who prefer DMs | That moderator copies only what's needed into a `#contact-mods` thread; a `#mod-log` entry is written only if an action is taken |
| Email to [contact email] or DM to the owner | Complaints about a moderator, ban appeals | Owner |
| AutoMod alert in `#mod-log` | Flagged words, spam, mentions | Moderators |
| Discord's own reporting | Discord rule violations; Discord's Trust and Safety team decides | Members report directly; moderators also report serious cases |
| Report button **on the site** | Listings and users on the site (copy-en section 9) | Not Discord moderators. The site handles it from there. |
| Send feedback **on the site** | Bugs and ideas | See `05-weekly-ops.md` |

If a Discord report is really about the site (a fake listing, a damaged item, a lender not replying), the moderator replies with the copy-en 20.6 "report received" template and points the person to the site's Report button. Moderators do not judge site disputes and do not promise anything about site accounts.

## 2. Response times (targets, not promises)

- Zero-tolerance items (part 3): as soon as a moderator sees it.
- Other reports: first reply within 24 hours.
- AutoMod alerts: checked at least once a day.

These are internal targets for a small volunteer team. Public copy says "a moderator will look at it" and nothing more specific.

### Working a ticket
1. Claim it with a one-line "taking this" reply in the thread, so others stay out.
2. Conflict check. If the ticket is about a moderator, or about yourself or a friend, hand it to the owner.
3. Send the copy-en 20.6 "report received" reply.
4. Decide using the ladder (part 3). If it's really about the site, point to the site's Report button.
5. Log any action in `#mod-log` (part 4).
6. Close and lock the thread.

Keeping: delete closed ticket and application threads 90 days after closing, except threads tied to a ban or an open appeal. `#mod-log` entries stay (owner decision, 07 Q10). The monthly review in `05-weekly-ops.md` does the clean-up.

## 3. Ladder

| Step | Action | Who can do it | When |
|---|---|---|---|
| 0 | Friendly reminder in channel, or move the message | Any moderator, tech-support in `#help` | First minor slip (off-topic, wrong channel, a borrow request in Discord) |
| 1 | Warning: delete the message if needed, send the copy-en 20.6 warning template | trial-moderator, moderator | Rule broken after a reminder, or a clear first breach |
| 2 | Timeout 24 hours | trial-moderator, moderator | Second warning within 90 days, or a heated moment that needs cooling off |
| 3 | Timeout 7 days | moderator | Third strike within 90 days |
| 4 | Ban (fourth strike) | moderator, after a second moderator or the owner agrees in `#mod-chat` | Fourth strike within 90 days |
| 4z | Ban (zero-tolerance) | moderator, at once, then log | Anything on the zero-tolerance list below |
| - | Kick (no ban) | moderator | Only when someone is under 18 (rule 2), or a mistaken account. They can rejoin later. If an under-18 rejoins while still under 18: ban, unban on request at 18. |

Strikes older than 90 days don't count toward the next step, but stay in `#mod-log`.

The timeout lengths match Discord's built-in choices (60 seconds, 5 minutes, 10 minutes, 1 hour, 1 day, 1 week). During a timeout the member can read but can't post, react or join voice.

**Raids and scam waves.** Moderators see Discord's raid alert in `#mod-log`. They time out or ban the raid accounts, delete their messages, and post in `#mod-chat` pinging the owner. Pausing invites or DMs (server menu > Security Actions, up to 24 hours) most likely needs Manage Server, so the owner does it (07 section 4). Log it in `#mod-log`.

**Safety emergencies** (real-world risk, not just rule-breaking):
- **Self-harm or suicide messages** are never a strike, warning or ban. Reply once, calmly, with the copy-en 20.6 care line (needs review). Report the message to Discord with its self-harm option. Move the talk out of public view if needed. Tell the owner through the urgent path (`05-weekly-ops.md` section 5).
- **Credible threats against a person, doxxing, or a member saying they were threatened or followed at a handoff:**
  1. Copy the message links and user IDs into `#mod-log`.
  2. Report to Discord.
  3. Remove the content and ban under the zero-tolerance list.
  4. Tell the person affected that if they are in danger they should contact local emergency services. If it happened through a loan, they should also use the site's Report button.
  5. Tell the owner through the urgent path.
- Moderators don't investigate, contact police on someone's behalf, or promise outcomes.

**If the owner is unreachable for more than 48 hours during an incident:** moderators keep using timeouts and bans, and log everything. Structural changes wait. A second trusted admin gets added once there are 2 or more active moderators (owner decision, 07 Q11).

**Zero-tolerance: straight to ban, then log**
- Scams, phishing, payment requests aimed at members, impersonating staff or project-arcade.
- Threats of violence, hate speech, doxxing (posting someone's address, phone or similar).
- Any sexual content, and anything sexual involving a minor. Also report it to Discord Trust and Safety, don't screenshot or share the content further, and tell the owner right away.
- An adult pressuring or trying to move a known minor into DMs. Report to Discord too.
- Spam bots and raid accounts.

**Never a moderation action:** someone's loan going badly on the site, a fee or damage dispute, criticism of the project. Those get a pointer to the right place, not a strike. The exceptions are abuse or harassment, which are handled under rule 1.

**Two-person check:** apart from zero-tolerance cases, a ban needs a second moderator (or the owner) to agree in `#mod-chat` first. While the owner is the only moderator, the owner acts alone and logs the reason.

**Conflicts of interest:** don't act on a case involving yourself, a friend, or your own loan. Hand it over in `#mod-chat`.

## 4. Logging

Every action from step 1 up gets one entry in `#mod-log`. Discord's audit log records the action; `#mod-log` records the reason.

```
Action: warning | timeout 24h | timeout 7d | kick | ban | unban
Member: <Discord user ID>   (ID, not just name; names change)
Rule: <number and short name, e.g. 4 money>
What happened: <one or two factual lines, link to the message if it still exists>
Message to member: sent template <name> | not sent (reason)
Moderator: <name>   Second moderator (bans): <name or "owner acting alone">
```

Keep it factual. Don't copy personal details into the log. Don't screenshot DMs into public channels.

## 5. Appeals

- Warnings and timeouts: the member can reply to the moderator or open a `#contact-mods` thread. A different moderator takes a look.
- Bans: the member emails [contact email] (owner's answer to 07 Q2: the owner's personal address, which is public in the rules) within 30 days of the ban. A moderator who wasn't involved in the ban, or the owner, reviews it. One appeal per ban. Aim to answer within 14 days. Decision options: unban, shorten to a timeout, or uphold. Log the outcome in `#mod-log`.
- Zero-tolerance bans can still be appealed, but the reviewer upholds them unless the ban was clearly a mistake (for example the wrong account). This keeps the public promise that every appeal gets a review.
- This whole section is session 8's proposal. The appeal window, contact address and process still need review (copy-en 20.2 and 20.6, `07-open-questions.md`).

## 6. Discord and the site are separate

- A Discord ban removes someone from Discord only. Moderators do not delete, suspend or flag site accounts.
- If the same person also caused trouble on the site, the person affected (or a moderator) uses the site's Report button. The site handles it from there.
- Never post or confirm in Discord whether someone has a site account, what they listed, or their site profile details.

## 7. Moderator wellbeing

From Discord's own burnout guidance (medium evidence, via session 4's research):
- Nobody is expected to be online all day. Post in `#mod-chat` when you're away.
- Rotate the heavy jobs (appeals, `#mod-log` review) every few weeks.
- Use `#mod-chat` to vent or ask for a second opinion before acting.
- Step down any time with a message to the owner. No explanation needed.
