# Custom email (SMTP) research for project-arcade

Researched 2026-10-20 by session 4 (market research). Docs only: no account registered, no setting changed, no git.

Evidence labels: strong = read on the vendor's own official page this session; medium = official page seen only through a search excerpt, or official page that does not say everything; weak = third-party source. "Not found" means I could not find it.

## 5-line summary

1. Supabase default email: only delivers to project team members, 2 emails/hour, no SLA (strong). It cannot be used for public sign-ups; switch to custom SMTP before launch.
2. After custom SMTP, Supabase imposes 30 emails/hour until you change it in the Auth rate-limit settings (strong, SMTP page). The rate-limits page says only that it is configurable.
3. Recommended: Resend (free 3,000/month, 100/day, 3 domains; 50% nonprofit discount on paid plans; documented Supabase SMTP setup). Fallback: Amazon SES (cheapest at scale, but sandbox review and AWS account needed).
4. Send from a dedicated subdomain (e.g. `no-reply@mail.ricebarrel.com` or `updates.`), add the provider's SPF/DKIM records plus a `_dmarc` TXT in Vercel DNS, start DMARC at `p=none`. Never use a personal Gmail as the sender.
5. 11-language templates: Supabase's official method is Go-template `if` branches on `{{ .Data.language }}` (user metadata); for cleaner per-locale templates use the Send Email hook (official localization example). Contact mailbox: Vercel hosts no mailboxes, so use a separate inbox provider, on the same domain but a different address (`contact@`).

## 1. Supabase default service and custom SMTP

| Item | Finding | Evidence |
|---|---|---|
| Default service recipients | Delivers only to team members' addresses; others fail with "Email address not authorized" | strong (supabase.com/docs/guides/auth/auth-smtp) |
| Default service rate | "2 messages per hour"; can change without notice | strong (auth-smtp page; rate-limits page also says 2/hour) |
| Default service SLA | "No SLA guarantee on message delivery or uptime" | strong |
| After custom SMTP | Sends to all addresses; "a low rate-limit of 30 messages per hour is imposed"; change it on the Rate Limits page | strong (auth-smtp page) |
| Rate-limits page | Emails sent: 2/hour on built-in provider; with custom SMTP or Send Email hook the limit is configurable; no default number given on that page | strong |
| Other Auth limits (defaults) | OTP/magic link: 60 s between requests per user; `/auth/v1/verify`: 30 requests per 5 min per IP; sign-ups/sign-ins incl. OTP: 30 requests per 5 min per IP | strong |
| Setup fields | `smtp_host`, `smtp_port`, `smtp_user`, `smtp_pass`, `smtp_admin_email` (sender), `smtp_sender_name`; dashboard: Authentication > Email > SMTP Settings, or PATCH `https://api.supabase.com/v1/projects/$PROJECT_REF/config/auth` | strong |
| Providers Supabase lists | Resend, AWS SES, Postmark, Twilio SendGrid, ZeptoMail, Brevo (non-exhaustive) | strong |

Notes for us:
- Email verification plus security notifications (password, email, sign-in method, MFA) multiply volume: each sign-up is 1 email, each password/email change is 1-2. The 30/hour default after SMTP would throttle a launch spike; raise it deliberately (decision for the user/session 3, not done here).
- Rate limits are per project, not per user, so one burst can block everyone's verification mail.
- Not found: whether Supabase's 30/hour default has changed since the SMTP page was last updated.

## 2. Provider comparison

| Provider | Free tier | Paid (entry) | Card for free tier | Supabase hookup | Nonprofit | Data location / privacy | Evidence |
|---|---|---|---|---|---|---|---|
| Resend | 3,000/month, 100/day, 3 domains (no free trial, free-forever plan) | Pro $20/mo for 50,000; Scale $90/mo for 100,000 | Not stated on pricing page | Documented: host `smtp.resend.com`, port 465, user `resend`, password = API key; verified domain required | Yes: registered nonprofits can apply for 50% off paid plans (resend.com/nonprofits) | DPA: primary processing in the United States; EU SCCs and EU-US Data Privacy Framework; customer data deleted within 90 days of termination; a "multi-region" sending feature exists, regions not named on the pages I read | strong (pricing, Supabase doc, DPA) |
| Postmark | 100 emails/month (Developer plan, no expiry, no overages) | Basic $15/mo for 10,000 | Page says "No Credit Card Required" in a call to action | Listed by Supabase; I did not fetch a Supabase-specific Postmark guide | Not found | Postmark's EU privacy page (via search): data in a Chicago-area data center and AWS, no EU servers planned | medium (pricing strong, privacy page via search) |
| Brevo | Free SMTP relay 300/day per Brevo's own SMTP page (via search); pricing page fetch returned no content | Not verified (third party says from $9/mo) | Third party says no card; not verified | Listed by Supabase | Not found | Not found (company is EU-based per general knowledge, not verified) | medium to weak |
| Amazon SES | New AWS accounts: up to $200 credits (free plan 6 months, credits valid 12 months) | $0.10 per 1,000 emails a la carte; $0.16 per 1,000 Essentials | Page does not say; an AWS account is required | Listed by Supabase; needs SES SMTP credentials (region-specific) and a verified sender identity | Not found on pricing page | Region selectable (per-Region setup); not otherwise researched | strong (pricing), medium (sandbox) |
| Mailgun | 100/day, 1 custom domain | Basic from $15/mo for 10,000; Foundation $35/mo for 50,000 | Not stated | Not on Supabase's list; plain SMTP would work but I found no official guide | Not found | "Send email through the US or the EU from a single account" | strong |
| SendGrid, ZeptoMail | Not researched | Not researched | - | Listed by Supabase | - | - | Not found |

Amazon SES detail (medium, AWS docs via search): new accounts start in a sandbox, per Region; sandbox allows only verified recipients, 200 messages per 24 h, 1 per second. You must request production access (manual review, third party says about 24 hours). This blocks real sign-ups until approved.

Postmark detail: a third-party site claims manual account approval can take up to 24 hours (weak).

Resend detail: its free daily cap (100/day) is the binding limit for us, not the monthly 3,000. A launch day with more than 100 sign-ups or resets would stall. The Pro plan ($20/mo, or about $10/mo after the 50% nonprofit discount if approved) removes that; I did not verify the daily cap on paid plans.

### Recommendation

Primary: Resend.
- Documented Supabase SMTP setup, a free tier that covers pre-launch, a stated nonprofit discount, and its own docs recommend sending from a subdomain.
- Weak points: US processing (SCCs and DPF cover EU transfers; this is a privacy-page matter for the Privacy policy, not legal advice), and the 100/day cap on the free plan.

Fallback: Amazon SES, if volume grows or the nonprofit discount is refused. Cheapest per email, but the sandbox review, region-bound SMTP credentials and AWS billing add friction.

Not recommended for v1: Postmark (free tier only 100/month, no nonprofit program found); Mailgun (no Supabase guide found); Brevo (could not verify pricing and data location on its official pages).

Fees stay compatible with CLAUDE.md hard rules: no ads, no data selling, no payment escrow. Email provider fees are a platform running cost, not a user charge; the user decides who pays.

## 3. Domain authentication on Vercel DNS

Facts (strong unless noted):
- Vercel DNS records are managed under Domains > the domain > Advanced Settings (dashboard) or `vercel dns add <domain> <name> <TYPE> <value>` (CLI). Name field takes only the prefix (e.g. `mail`), not the full hostname. TTL default 60 s. Changes can take up to 24 h to propagate.
- Vercel has "DNS presets" for common providers, and says it does not provide an email service or mailboxes.
- Records only take effect if the domain uses Vercel's nameservers. Project domain `project-arcade.ricebarrel.com` is a subdomain of `ricebarrel.com`; I did not check where the `ricebarrel.com` zone itself lives. The request says its DNS is in Vercel DNS, taken as given.

Steps (generic; the exact record names and values come from the provider's dashboard, which I could not see):
1. In the provider (e.g. Resend), add the sending domain. Resend recommends a subdomain such as `updates.example.com` (strong).
2. Copy the records it shows: normally one SPF TXT (and possibly MX for the return path) and one or more DKIM records. Resend's DMARC page says the SPF and DKIM host names are in the Resend dashboard, not on the docs page (so exact values: not found).
3. Add them in Vercel DNS with `vercel dns add` or the dashboard; for MX, pass the priority.
4. Click Verify in the provider; check with `dig TXT <name> +short`.
5. Add DMARC: TXT at `_dmarc.<domain>`, value `v=DMARC1; p=none; rua=mailto:<report mailbox>;` (Resend's recommended starting record, strong). After sending real mail and seeing `dmarc=pass`, move to `p=quarantine`, later `p=reject`.
6. Put the sender name and address into Supabase SMTP settings. Do not use a personal Gmail as From: it cannot pass SPF/DKIM alignment for a custom domain and would hurt deliverability (my reasoning from how the records work; no Supabase page says this).

Sender address suggestions (decision for the user):
- From: `no-reply@mail.ricebarrel.com` (subdomain keeps the main domain's reputation separate; Resend recommends subdomains).
- Sender name: `project-arcade` (or `Gear Arcade`).
- Reply-To: the contact address in section 5, so users who reply reach a human.
- Not found: any Supabase guidance on a mandated From format.

Cautions:
- Do not add an email-provider MX at the apex unless you also want to receive mail there; MX controls incoming mail (Vercel doc).
- Keep DKIM/SPF values out of chat logs that are public; they are not secrets, but the SMTP password / API key is: set it only in the Supabase dashboard, never in the repo (CLAUDE.md secrets rule).

## 4. Email templates and 11 languages

Facts:
- Supabase templates (strong): Confirm sign up, Invite user, Magic link or OTP, Change email address, Reset password, Reauthentication. Security notification templates: Password changed, Email address changed, Phone number changed, Sign-in method linked/removed, Verification method added/removed. Notifications send only if enabled at project level.
- Variables: `{{ .ConfirmationURL }}`, `{{ .Token }}`, `{{ .TokenHash }}`, `{{ .SiteURL }}`, `{{ .RedirectTo }}`, `{{ .Data }}` (user metadata), `{{ .Email }}`, `{{ .NewEmail }}`, `{{ .OldEmail }}`, `{{ .Phone }}`, `{{ .OldPhone }}`, `{{ .Provider }}`, `{{ .FactorType }}`.
- The email-templates page itself documents no multi-language support.
- Official troubleshooting article "Customizing Emails by Language" (strong): save the language in user metadata at sign-up (`options.data`), read `{{ .Data.language }}` in the template, branch with Go template `if eq ... else if ... else`. Update later with `updateUser`. Each language needs an explicit branch; include a fallback `else`.
- Send Email hook (strong): replaces Supabase's sending so you can add custom logic "such as localization"; the docs include an i18n example (English, Spanish, French subjects and HTML) that reads an `i18n` value from user metadata, defaulting to `en`, using Postmark as the example sender; Resend is shown as a custom provider via an edge function. When the hook is enabled, SMTP is not used. Plan availability: not found on that page.

Options for 11 languages:

| Option | How | Pros | Cons |
|---|---|---|---|
| A. Go-template branches in the dashboard template | One template per email type containing 11 `if` branches on `.Data.language` | Official, no code, no edge function | Long templates (about 13 email types x 11 languages), edited by hand in the dashboard, easy to drift from `docs/copy-en.md`, no review in git |
| B. Send Email hook (edge function or Next.js route) | Hook receives `email_action_type` plus user metadata; code picks the locale file and sends via the provider API | Translations live in the repo like the rest of the copy; one template per type; can fall back to English | More code to build and secure (verify the hook signature); adds an edge function; this replaces SMTP, so the rate limit and provider choice still apply |
| C. English only at launch | Keep one English template per type | Matches the "English only for now" rule in CLAUDE.md | Non-English users get English security mail |

Recommendation: C for v1 (site is English only), prepare B when the first extra locale ships; A only as a stopgap. Store the user's language in `user_metadata.language` from day one (cheap and needed by both A and B).

Note: copy rule in CLAUDE.md says legal text is not invented; email wording for security notifications should also come from `docs/copy-en.md`.

Not found: any official list of translated Supabase default templates; any plan-gating details for the hook.

## 5. Contact mailbox ([contact email] on the privacy page)

- Vercel does not host mailboxes or provide domain email (strong, Vercel DNS docs). Receiving needs MX records at a mailbox provider.
- Recommendation: use a real, monitored address on the project domain, e.g. `contact@ricebarrel.com` (or `privacy@` / `support@`), on a different address than `no-reply@mail....`. Same registered domain keeps trust and avoids exposing a personal Gmail on the privacy page, which would tie a public legal page to a person.
- Do not put MX records for the contact inbox on the sending subdomain; keep sending (`mail.` subdomain) and receiving (apex or a separate address) separate so they cannot break each other.
- Which inbox provider (forwarding service vs. hosted mailbox, and cost): not researched; I did not read any official pricing for these. Needs a separate pass if wanted. Forwarding to an existing person's address still reveals that person on replies unless "send as" is configured.
- Whether the legal text of the privacy page needs a particular contact form: not covered, no legal advice.

## 6. Open items

- A person with the dashboard must confirm the current Supabase Auth rate-limit value after SMTP is enabled (docs say 30/hour; actual project value unchecked).
- Confirm Resend's nonprofit eligibility (registered nonprofit status; the project may not be a registered entity) and the free card requirement at sign-up; I did not register.
- Confirm Resend regions and whether the 100/day cap applies on paid plans.
- Brevo, Postmark and SES: official pricing pages were thin or unreadable; re-check before relying on them.
- Where the `ricebarrel.com` zone is hosted (Vercel nameservers or elsewhere) was not verified.
- Decide: sender subdomain name, sender display name, contact address and who monitors it, whether to localize emails in v1.

## 7. Setup steps (for a non-technical owner)

Decision from the user (relayed by session 31, 2026-10-20): provider Resend; sender `no-reply@project-arcade.ricebarrel.com` (the project hostname itself, not a separate `mail.` subdomain); the contact email stays a personal Gmail for now. This supersedes the `mail.` subdomain suggestion in section 3.

Nothing below has been done. Every step that touches an account, DNS or Supabase is for the user to do (or to approve in the terminal of the session that does it). Evidence labels as above. I could not see a live Resend dashboard, so exact record values are "copy from the dashboard".

Terms: "zone" = the list of DNS records for `ricebarrel.com` (in Vercel > Domains). "Name" in Vercel = only the part before `.ricebarrel.com`.

### Step 1. Add the domain in Resend

1. Log in to Resend, open Domains, Add Domain, enter `project-arcade.ricebarrel.com`. Pick the sending region you want (Resend lets you choose; region names not found on the pages I read). The region can change the MX value (search excerpt of Resend's DNS guides, medium).
2. Leave the Return-Path ("custom return path") at its default `send`. It cannot be changed later without deleting and re-adding the domain (strong, Resend custom-return-path page). Do not use odd words like `testing`; some mail clients show it.
3. Resend then shows a Records tab. What it contains (strong for the types, medium for the names; the docs say to always add the exact records shown in the Records tab):

| Purpose | Type | Name Resend shows (relative to your domain) | Notes |
|---|---|---|---|
| DKIM | TXT | `resend._domainkey` | Long public-key value; copy it, do not retype. |
| Return-path MX (bounces and complaints) | MX | `send` | Resend's DNS guides say priority 10; use a higher number such as 20 if 10 is taken. Value depends on region. |
| SPF | TXT | `send` | Example value `v=spf1 include:amazonses.com ~all`; use the exact value shown. |

   Note: for domains created after August 2026, Resend says it may use CNAME records instead of the TXT/MX pair for SPF-related verification (strong, manage-domains page). The Custom Return Path page also says CNAME-based domains get two records, on `send` and on `rsend`. So the table above may differ; the Records tab is the authority. Not found: the exact current record set for a domain created today.

   Because we add the sending domain `project-arcade.ricebarrel.com`, Resend's Name values are relative to it. In the Resend UI the names may be shown as `resend._domainkey.project-arcade` and `send.project-arcade` (Resend's guides say to paste only the part before your root domain). Not verified which form the UI shows for a domain that is itself a subdomain; use the rule in Step 2.

### Step 2. Put the records into Vercel DNS

Rule: in Vercel's Name field enter the full name minus `.ricebarrel.com`. So the full name `resend._domainkey.project-arcade.ricebarrel.com` becomes Name `resend._domainkey.project-arcade`, and `send.project-arcade.ricebarrel.com` becomes Name `send.project-arcade`. (Vercel docs: enter only the prefix, not the full hostname; strong.)

Dashboard: Domains > ricebarrel.com > Advanced Settings > add record: Name, Type, Value, TTL (default 60 s), Priority for MX.

CLI equivalent (commands are from Vercel's `vercel dns` page; strong):
```
vercel dns add ricebarrel.com resend._domainkey.project-arcade TXT "<DKIM value from Resend>"
vercel dns add ricebarrel.com send.project-arcade MX <MX value from Resend> 10
vercel dns add ricebarrel.com send.project-arcade TXT "<SPF value from Resend>"
```
Then wait (Vercel says up to 24 hours; usually minutes) and press Verify in Resend. Status meanings (strong): `pending` still checking; `verified` done; `failed` records not seen within 72 hours; `temporary_failure` a once-good record disappeared (Resend rechecks for 72 hours).

Check first what already exists: `vercel dns ls ricebarrel.com --limit 100`.

#### Conflict check: records under `project-arcade.ricebarrel.com` versus the existing `*` ALIAS and the `project-arcade` binding

Facts:
- Vercel's DNS page says ALIAS is "similar to a CNAME record" (strong). The general DNS rule is that a CNAME cannot share a name with other record types. I did not find Vercel text saying whether an ALIAS at a name blocks TXT/MX at that same name.
- Not found: any Vercel statement about how a `*` wildcard ALIAS interacts with more specific names.
- General DNS wildcard behaviour (RFC 4592, my knowledge, medium): a wildcard `*.ricebarrel.com` only answers for names that have no records of their own and no existing name below them. Once a name exists (it has records, or has records beneath it), the wildcard no longer applies to it.

Conclusion:
1. The records in Step 1 live at `resend._domainkey.project-arcade` and `send.project-arcade`, which are different names from `project-arcade` itself. They do not sit on the same name as the site binding, so the CNAME/ALIAS-coexistence rule does not apply to them. Risk: low.
2. Under the Resend setup above, no TXT or MX is needed at the bare name `project-arcade.ricebarrel.com`. Do not add any there. That is where the risk would be (an ALIAS plus MX/TXT on one name may be rejected by Vercel or behave oddly; not verified).
3. The new names are not covered by the root wildcard in a way that matters: they get their own explicit records, which win over the wildcard. Side effect to expect: `send.project-arcade...` and `resend._domainkey.project-arcade...` now resolve to MX/TXT only, not to the website, which is intended.
4. Residual risks: (a) Vercel's UI may refuse a record if it thinks it conflicts; if so, copy the exact error and send it to the coordinator rather than changing existing records; (b) a Vercel project-domain binding can add its own records automatically, so after adding, re-run `vercel dns ls` to confirm the site records are unchanged; (c) if Resend ends up showing a CNAME for the sending domain at the bare `project-arcade` name, stop: that would collide with the site binding (not expected from Resend's documented records; not verified).
5. Do not delete or edit the existing `*` ALIAS or the `project-arcade` record at any point. Only add.

### Step 3. Create the Resend API key

Facts (strong, Resend API-keys page): a key has a name, a permission, and an optional domain restriction. The domain restriction is chosen at creation and can only be edited in the dashboard. The key value cannot be viewed or edited after creation, so copy it once. Not found: the exact permission labels on the official pages I could read (a search excerpt and general knowledge suggest "Full access" and "Sending access"; unconfirmed).

Do:
1. Resend > API Keys > Create API Key.
2. Name: `supabase-auth-smtp`.
3. Permission: the sending-only option (not full access).
4. Domain: restrict to `project-arcade.ricebarrel.com`.
5. Copy the key straight into the clipboard. Do not paste it into chat, a file in the repo, or an `.env` that is committed (CLAUDE.md secrets rule). Do not send it to any Claude session.

### Step 4. Fill in Supabase (done by the user, in the Supabase dashboard)

Path (strong, Resend's Supabase guide): Authentication > Email (under Notifications) > SMTP Settings. Fields:

| Field | Value |
|---|---|
| Enable custom SMTP | on |
| Sender email | `no-reply@project-arcade.ricebarrel.com` |
| Sender name | `project-arcade` (user's choice) |
| Host | `smtp.resend.com` |
| Port | `465` (Resend's guide; Supabase's own example uses 587, no guidance on choosing found) |
| Username | `resend` |
| Password | the API key, pasted only here by the user |

Click Save. Supabase then sends all Auth mail through Resend. The API/CLI names of the same fields: `smtp_host`, `smtp_port`, `smtp_user`, `smtp_pass`, `smtp_admin_email`, `smtp_sender_name`. Do not set these through any chat or script that would contain the key.

Do Step 1 and 2 (domain shows `verified`) before Step 4; sending before verification will fail.

### Step 5. Verify it works, and Auth rate limits

Test (use a mailbox you control, not a team-member shortcut, since team-member-only was the default-service limit):
1. Sign up a test user on the site with a Gmail address. Look for the confirmation email in Inbox, then Spam/Junk. It should come from `project-arcade <no-reply@project-arcade.ricebarrel.com>`.
2. Click the link; confirm sign-in works.
3. Request a password reset for that user; check Inbox and Spam again.
4. In Gmail: three dots > Show original. Look for `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS` (or `dmarc=pass`, Resend's own check wording; strong). If DMARC is `none` because no record exists yet, add Step 6 and re-test.
5. In Resend > Emails, each message should show as delivered. If it shows bounced, read the reason shown there.
6. Remove the test user afterwards (Supabase dashboard > Authentication > Users; a delete, to be done by the user).

Auth Rate Limits page: `https://supabase.com/dashboard/project/_/auth/rate-limits` (strong). Settings to check:
- Emails sent per hour: Supabase sets 30 after custom SMTP. Resend free plan is 100/day, so 30/hour is already above what the daily cap allows for long. Keep 30 until the user upgrades Resend or sees real traffic; raising it does not help while the 100/day cap is the limit.
- OTP/magic-link per-user wait (default 60 s), verification requests per IP (default 30 per 5 min), and sign-ups/sign-ins per IP (default 30 per 5 min): leave defaults (strong; they protect against abuse).
- Exact labels in the UI: not verified; the labels may differ from the names above.

### Step 6. DMARC

Resend's recommended starting record (strong): TXT, name `_dmarc`, value `v=DMARC1; p=none; rua=mailto:<mailbox that can receive reports>;`. Starting with `p=none` means "monitor only, do not block". After you confirm all legitimate mail shows `dmarc=pass`, move to `quarantine`, later `reject`.

Where to put it, and the effect:
- Requested: `_dmarc.ricebarrel.com` (Vercel Name `_dmarc`). Under DMARC's normal lookup rules (general knowledge, medium), a receiver checks `_dmarc.<exact sending domain>` first, then falls back to the parent organizational domain. So a record at `_dmarc.ricebarrel.com` applies to everything under `ricebarrel.com`: the site mail, and any other mail sent from `ricebarrel.com` or other subdomains (for example the owner's other uses of that domain). With `p=none` nothing is blocked, and it adds report mail to the `rua` address, which can be many messages per day.
- Safer alternative (recommended): put it at `_dmarc.project-arcade.ricebarrel.com` (Vercel Name `_dmarc.project-arcade`), which covers only our sending domain and leaves the rest of `ricebarrel.com` untouched. Apply the same value.
- Before adding either, check whether one already exists: `dig TXT _dmarc.ricebarrel.com +short`. Only one DMARC record per name may exist; do not add a second.
- The `rua` mailbox: the user's decision. It must be able to receive; using the personal Gmail works but receives report attachments. Since the contact email stays the personal Gmail for now, this mixes reports into it; a dedicated filter or a different address is the user's call.
- SPF/DKIM `pass` alone does not make DMARC pass: DMARC also needs the visible From domain to align with the SPF or DKIM domain. Sending from `no-reply@project-arcade.ricebarrel.com` with the domain verified in Resend as the same name should align (my reading; confirm in the Gmail "Show original" check in Step 5).

### Step 7. Rollback

In reverse order; each is independent:
1. Stop using Resend for Auth mail: Supabase > Authentication > Email > SMTP Settings > turn custom SMTP off. This returns to the default service, which delivers only to team members at 2 per hour (strong). Effect: real users will not get verification or reset emails until custom SMTP is on again. If the site must stay open meanwhile, that is a security and product decision for the user (for example pausing sign-ups); this document does not recommend loosening email verification.
2. Revoke the key: Resend > API Keys > delete `supabase-auth-smtp`. Then the old password in Supabase is useless. Create a new key if you re-enable.
3. Remove the DNS records you added (only those): `vercel dns ls ricebarrel.com --limit 100`, find the record ids for `resend._domainkey.project-arcade`, `send.project-arcade` (MX and TXT), and `_dmarc...`, then `vercel dns rm <record-id>`. Do not touch the `*` ALIAS or `project-arcade`. Removing the DMARC record returns to the previous behaviour.
4. Delete the domain in Resend (Domains > the domain > delete), only if you are abandoning Resend. Re-adding it later regenerates keys and records; the return path `send` stays at the default unless changed before creation.
5. If DNS or sending looks wrong but you want to keep the setup: Resend rechecks missing records for 72 hours before marking the domain failed (strong), so a short mistake can usually be fixed in place.
6. TTL is 60 s by default on Vercel, so DNS reverts quickly in most caches (Vercel still says up to 24 h for full propagation).

### Not found in this pass
- Exact current Resend record set and exact names/values for a freshly added domain (only visible in the dashboard).
- Exact permission labels and the key-creation screen text.
- Whether Vercel allows MX/TXT on the same name as an ALIAS (avoided by design).
- How a `*` ALIAS in Vercel DNS interacts with new specific records (RFC behaviour assumed).
- Resend region names, and whether the free plan asks for a card at sign-up.

Additional sources for this chapter:
- https://resend.com/docs/dashboard/domains/manage-domains
- https://resend.com/docs/dashboard/domains/custom-return-path
- https://resend.com/docs/dashboard/api-keys/introduction
- https://resend.com/docs/dashboard/domains/dmarc
- https://resend.com/docs/send-with-supabase-smtp
- https://vercel.com/docs/cli/dns
- https://vercel.com/docs/domains/managing-dns-records
- Resend DNS guides (search excerpt only): https://www.resend.com/docs/add-a-domain

## Sources

- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/auth/rate-limits
- https://supabase.com/docs/guides/auth/auth-email-templates
- https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook
- https://supabase.com/docs/guides/troubleshooting/customizing-emails-by-language-KZ_38Q
- https://resend.com/pricing
- https://resend.com/docs/send-with-supabase-smtp
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/dashboard/domains/dmarc
- https://resend.com/legal/dpa
- https://postmarkapp.com/pricing and https://postmarkapp.com/euprivacy (via search)
- https://www.brevo.com/free-smtp-server (via search excerpt only)
- https://aws.amazon.com/ses/pricing/ and https://docs.aws.amazon.com/console/ses/sandbox (via search)
- https://www.mailgun.com/pricing/
- https://vercel.com/docs/domains/working-with-dns
- https://vercel.com/docs/domains/managing-dns-records
