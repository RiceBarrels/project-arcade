# 05 — Weekly rhythm and the bug and idea pipeline

Status: DRAFT. Times are US Eastern (ET); public posts give ET with UTC alongside (owner decision, 07 Q5). Days can shift; the order matters more than the day.

Today the owner is alone, so the owner covers every row below. As volunteers join, hand rows over in the order shown in section 4.

## 1. Daily (about 10 minutes, any time of day)

| What | Who |
|---|---|
| Check `#contact-mods` tickets and `#mod-log` AutoMod alerts; reply to new tickets within 24 h (`03-moderation.md` "Working a ticket") | Moderators (rotate) |
| Answer new `#help` posts. Make sure each has a topic tag, adding `bug` or `idea` where it fits. Ask bug reporters to also use Send feedback on the site. | Tech support |
| Welcome people who posted in `#introductions` (a short reply there) | Anyone on the team |

## 2. Weekly

| Day | What | Who | Output |
|---|---|---|---|
| Mon | **Triage.** Go through `#help` posts tagged `bug` or `idea` that have no status tag yet (and anything people raised in `#general` that reads like one). Merge duplicates. Fill in the digest template (section 3) in `#support-desk`, including the "still open" list from earlier digests. | Tech support (owner until then) | Raw digest in `#support-desk` |
| Mon/Tue | **Hand-off.** The owner pastes the raw digest into **session 8 only**. Session 8 then: removes usernames, IDs, Discord links and personal details (session 1 can't open Discord links anyway); checks it against site feedback once that is live; drops anything that is really a site report or a dispute; sets the final priority (the drafter's P1/P2 is a suggestion); and splits the result three ways: bugs and already-approved ideas for session 1, new ideas for the owner, confusing copy for session 5. | Owner, session 8 | Clean digest, three parts |
| Tue | Coordinator sends the bug list (plus any owner-approved ideas) to session 1 as one message, copy items to session 5, and new ideas to the owner. **Session 1 never reads Discord directly.** If a raw digest reaches the coordinator, it goes back to session 8 first. | Coordinator | |
| Wed | **Announcements.** If session 3 deployed an owner-approved release, post it in `#announcements` with the copy-en 20.4 template. Otherwise skip, or post a short weekly update if there's real news. Never announce something that isn't live. | Content team (owner until then) | One post at most |
| Wed/Thu | **Close the loop.** Swap `bug` posts sent this week to `bug-sent-to-feedback` (same for ideas), and reply once: "Passed to the team. Thanks." When a release note lists a fix, tag the matching posts `fixed`, reply once ("This should be fixed now. Thanks for reporting."), and close them. Don't promise dates. | Tech support | |
| Fri | **Mod sync** (async, in `#mod-chat`): number of tickets and actions this week, tricky cases, any rule that keeps causing confusion. Rule change proposals go to session 8, then the owner. | Moderators | Short note |

If a week has nothing to report, the digest is one line: "Nothing new this week."

## 3. Digest template

```
project-arcade Discord digest, week of YYYY-MM-DD
Prepared by: <name or "owner">

URGENT (already sent the same day, see section 5): <none | short title only>

Still open from earlier digests
- <title> (first seen <date>)

Bugs (new)
- [P1|P2 suggested] <short title>
  Page or feature: <e.g. /browse, queue, messages, sign-up>
  What happens / what was expected: <one or two lines>
  Device and browser (if known): <e.g. iPhone Safari>
  Reported by: <number of people>, first seen <date>
  Also sent via Send feedback: yes | no | unknown
  Discord thread: <link>   (for session 8 only; removed before passing on)

Ideas (new)
- <short title>: <one line>. Asked by <number> people.

Confusing copy or flows (not bugs, people got lost)
- <where>: <what confused them>

Not for the code team (handled elsewhere)
- <number> site reports pointed to the Report button
- <number> disputes pointed to site messages

Numbers: new members <n>, #help posts <n>, tickets <n>, mod actions <n>
```

Priorities:
- **P0 (urgent):** security or privacy problem (for example someone's email showing, a login bypass), data loss, the site down, or a safety risk. Don't wait for Monday (section 5).
- **P1:** blocks a core flow: sign up, verify email, sign in, list an item, request, queue, approve, messages, mark returned.
- **P2:** annoying but there is a workaround: layout, wording, slow pages.
- **Idea:** new features or changes. They go to the owner first; session 1 only gets ideas the owner approved.

What never goes past session 8: Discord usernames or IDs, Discord links, emails, addresses, screenshots of personal messages, tokens, or links to someone's site profile.

## 4. Handing rows to volunteers (in this order)

1. Daily `#help` answers, then the Monday triage: first tech support volunteer.
2. Daily tickets and AutoMod alerts: first trial moderators.
3. Wednesday announcements: first content volunteer, using approved templates only.
4. The owner keeps approvals, role changes, bans when no second moderator exists, and pasting the digest into session 8 (until MCP read access is approved, see below).

Later, optional: once the Discord MCP is connected, session 8 could read `#support-desk` directly instead of the owner pasting. That needs the bot to see `#support-desk` and the privileged **Message Content** intent, which is off (`mcp-setup.md` 1.3). Owner said not now (07 Q6).

## 5. Urgent path (P0)

1. Whoever spots it posts in `#support-desk` (tech support and moderators can both see it) and pings the owner and the moderator role. Give no exploit details, only a link to the post. Moderators can also use `#mod-chat`. If the owner doesn't respond, DM the owner.
2. The owner tells the coordinator the same day. The coordinator sends it to session 1 right away (and to session 6 if it is data or access related).
3. In Discord, reply to the reporter: "Thanks, we've passed this on." No details, no timelines, nothing that helps someone exploit it.
4. If the post exposes personal data: tech support may lock or close the `#help` post at once, or delete the whole post if the leak is in its opening message. A single leaking reply needs a moderator (or the owner) to delete it, since tech support has no Manage Messages. Ask the reporter to keep it private.

## 6. Monthly

- Delete closed `#contact-mods` and `#volunteer-apply` threads older than 90 days, except those tied to a ban or an open appeal (07 Q10). Owner or a moderator; log the count in `#mod-log`.
- Review rules and AutoMod word lists against `#mod-log` (false alarms, gaps). Proposals go to session 8, then the owner.
- Volunteer check-in: ask how people are doing. For anyone inactive 30 days without notice (an away post in `#mod-chat` counts as notice), the owner checks in once. If there's no reply within a week, the owner removes their roles with a thank-you and an open door (`06-volunteers.md` section 5).
- Permissions audit:
  - View Server As Role for @everyone, `volunteer`, and the bot's role if one exists.
  - Server Settings > Integrations: look for unknown bots or webhooks.
  - Compare the audit log with `changelog.md`.
  - Check System Messages are still off and the booster role has no permissions.
