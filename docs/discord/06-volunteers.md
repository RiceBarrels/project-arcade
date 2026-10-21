# 06 — Volunteers: call-out, teams, onboarding

Status: DRAFT. The public call-out wording is `docs/copy-en.md` section 20.5 (session 5). This file holds team descriptions, the application flow and onboarding. Nothing posted yet.

Owner decisions so far: recruit early; applications inside Discord (private threads in `#volunteer-apply`), not an outside form; translators not now.

## 1. Rules for every volunteer

- 18 or older.
- Unpaid. There is no payment, no paid perks, no commission, and nobody profits from the project. Volunteers get no special treatment on the site (no queue priority, no extra access).
- Two-factor authentication on your Discord account: required for moderators, trial moderators and tech support (the server requires 2FA for moderator actions, which includes managing `#help` posts); strongly asked of everyone else.
- Read `#rules` and follow the staff conventions (`02-rules.md` part 4): no emoji in anything you post for the project, never ask members for emails, passwords, ID or payment, never DM members first about loans or money, and step aside when you're involved in a case.
- Keep private things private: tickets, `#mod-chat`, `#mod-log` and applications stay inside the server.
- You can step down any time. Just tell the owner.
- Volunteers do not get access to site data, the database, or site reports. *(Needs review, from copy-en 20.5: if that ever changes, the project needs a volunteer agreement and confidentiality terms first. Don't invent them.)*

## 2. Teams

### Moderators (`trial-moderator` -> `moderator`)
- **Does:** handles `#contact-mods` tickets and AutoMod alerts, applies the ladder in `03-moderation.md`, keeps `#mod-log`, helps review volunteer applications.
- **Good fit:** calm in arguments, fair, writes short clear messages, comfortable saying no.
- **Time:** 2-4 hours a week, with a quick daily look on the days you're on.
- **Trial:** 4 weeks as `trial-moderator` (can delete messages and time out; no kick or ban). The owner then promotes, extends, or thanks and closes.

### Content and announcements (`content-team`)
- **Does:** posts announcements and weekly updates from the copy-en 20.4 templates, keeps `#welcome` current, drafts in `#content-drafts`, flags confusing site copy for the digest.
- **Good fit:** clear, friendly English; checks facts before posting; happy to follow a style (no emoji, no hype, no promises the site can't keep, "no fees" always means the site charges no fees).
- **Time:** 1-2 hours a week.
- **Limits:** only announces things that are live. Never posts about money beyond the copy-en 20.7 wording.

### Technical support (`tech-support`)
- **Does:** answers `#help` posts about using the site (sign-up, email verification, listing, queue, messages), reproduces bugs, tags posts, asks reporters to use Send feedback, drafts the Monday digest (`05-weekly-ops.md`).
- **Good fit:** patient, careful about steps to reproduce, comfortable with browsers and phones. No coding needed.
- **Time:** 2-3 hours a week.
- **Limits:** cannot see anyone's account and must never ask for passwords or emails. Account-level problems go to the owner. Anything that looks like a security or privacy leak follows the urgent path (`05-weekly-ops.md` section 5).

### Translation (not started)
- Starts only when the site adds other languages. Draft translations of site copy already exist in `docs/copy-*.md`, with a shared `docs/glossary.md`; translation volunteers would review them with the translator session.
- For now: people can mention languages they speak in their application. We don't keep a separate list.

## 3. Application flow (inside Discord)

1. Member opens a **private thread** in `#volunteer-apply` titled `application - <team>`. Only they and moderators can see it.
2. They answer the questions below in the thread.
3. A moderator (the owner for now) replies within a week: a short chat in the thread, or a polite no.
4. Owner approves and gives the team role plus `volunteer` (moderators can't change roles). A moderator posts a welcome in `#volunteer-lounge`.
5. Close and lock the thread. It stays in Discord; nothing is copied elsewhere.

**Pinned message in `#volunteer-apply`** (session 5 to polish):
> Want to help run project-arcade? Open a private thread in this channel called "application - moderator", "application - content" or "application - tech support", and answer the questions below. Only you and the moderators can see it. Don't include your address, phone, email or ID.

**Questions:**
1. Which team, and why?
2. Are you 18 or older?
3. Roughly how many hours a week, and which days or times?
4. Any experience moderating, writing, or helping people with tech? (None is fine.)
5. How would you handle a member who keeps asking people in `#general` to lend them something?
6. Is your Discord account protected with two-factor authentication? (Required for moderator and tech support roles.)
7. Languages you speak (optional, for later).

## 4. Onboarding checklist (first week)

- [ ] Role given, welcome posted in `#volunteer-lounge`.
- [ ] Read `#rules` and the pinned staff handbook messages in your team's channels (`08-setup-order.md` part 2 lists them; volunteers don't need the repo).
- [ ] 2FA on (moderators, trial moderators and tech support: confirmed before any role is given).
- [ ] Shadow: watch one week of `#help` or tickets, ask questions in `#volunteer-lounge`.
- [ ] First solo task with a buddy reviewing (first ticket, first `#help` answer, first draft announcement).
- [ ] Knows where things go: site reports go to the site's Report button, bugs and ideas to Send feedback or the digest, emergencies to local services, money questions to the copy-en 20.7 wording.

## 5. Leaving and inactivity

- Stepping down: tell the owner; the owner removes the roles and posts thanks (if they want).
- Inactive 30 days with no notice (an away post in `#mod-chat` counts as notice): the owner checks in once; if there's no reply in a week, the owner removes the roles with a friendly note. They can come back.
- Removed for cause (broke staff conventions, misused powers): owner decides, removes the roles, and logs it in `#mod-log`. If the owner can't be reached and someone is actively misusing powers, a moderator times them out and pings the owner. A timeout doesn't remove channel access; only the owner can remove roles.
