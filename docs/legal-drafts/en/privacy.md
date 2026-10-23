---
title: Privacy policy
updated: 2026-10-20
---

::: draft
**DRAFT — needs lawyer review.** Factual description of how the site works, written as plain-language copy, not legal advice. Items marked **[TO CONFIRM]** have not been confirmed by the owner. Do not publish until confirmed and reviewed.
:::

::: summary
**The short version:** We collect what we need to run the lending library, store it with our database provider, and don't use it for advertising.
:::

## What we collect

- **Account details:** your email address (verified at sign-up) and sign-in information.
- **Profile:** display name, city or area, and any other profile details you choose to add.
- **Listings:** titles, descriptions, categories, condition, pickup area, prices you set (fee and damage price) and the photos you upload.
- **Borrowing records:** requests, queue entries, approvals, handoff and return markings (OK or damaged), and related notes.
- **Reports:** reports you send, and reports made about you or your listings.
- **Feedback:** if you use Send feedback, we store your message, the type you chose (bug, idea or other), the page you were on, and a short note about your browser. If you're signed in, it's linked to your account. If you add a reply contact, we store that too. [TO CONFIRM: exact fields, based on supabase/08-feedback.sql, which did not exist yet when this was written.]
- **Basic technical data:** when you visit, our hosting and analytics providers process basic technical information, such as the pages you view, your approximate location (country or region), and your browser and device type. See "Analytics and cookies" below. [TO CONFIRM: server logs and IP address handling by Vercel and Supabase. NEEDS REVIEW.]

## Where it is stored

Your account, profile, listings, borrowing records and photos are stored with Supabase (database, authentication and file storage). The data is stored in Canada (Supabase region ca-central-1). The website is hosted on Vercel.

## What other users can see

Your public profile is visible to other users. It shows your display name, city or area (if you add one), bio, the month and year you joined, and your listings with their photos. It also shows simple counts: how many items you have listed, lent out and borrowed, how many came back OK, and how many were damaged or lost (as lender and as borrower). It does not list who you lent to or borrowed from. [NEEDS REVIEW: checked against components/profile-stats.tsx and the profile page on 2026-10-20; recheck if the profile changes.] Your exact address should not be put in listings. Your email address is never shown publicly. Once a request is approved, lender and borrower contact each other only through the site's in-app messages.

## Analytics and cookies (DRAFT, needs review)

We use Vercel Web Analytics to count visits to pages, so we can see which parts of the site are used. Based on Vercel's documentation (docs "Privacy and Compliance", last updated 2026-06-26):
- It does not use third-party cookies. Visitors are told apart by a hash created from the incoming request.
- The visitor session information is not stored permanently; it is discarded after 24 hours.
- It does not collect information that would let anyone follow you across different websites or apps, and it is used for combined statistics only.
- Each page view can include: the time, the page path, the referring page, approximate location (country, region, city), operating system and version, browser and version, and device type (mobile, tablet or desktop).

Before a page view is sent, we remove item, loan and profile IDs from the page path, and we remove query parameters and anything after a # sign. Links from our emails (the /auth/... pages that open when you click a sign-up or password-reset link) are not reported at all, and other pages are reported by their path only, such as /en/login. We don't send your user ID. We can't change the referring page, which the analytics tool includes by itself. [NEEDS REVIEW: based on the builder's check of the code on 2026-10-20.]

We don't use this to show ads, and we don't sell it.

Cookies: the site sets two kinds of cookies, both needed for it to work.
- A sign-in cookie, set by our sign-in provider (Supabase), keeps you signed in. It can be split into several parts.
- A language cookie remembers the language you chose. It lasts 1 year.

The site also stores your vibration setting, your theme choice (Light or Dark; nothing is stored if you leave it on System) and your progress through the welcome screens in your browser's local storage on your own device. This is not a cookie and is not sent to us.

We don't set advertising or cross-site tracking cookies. [NEEDS REVIEW: based on the builder's check of the code on 2026-10-20; recheck when anything is added.]

[TO CONFIRM from Vercel or the dashboard, not stated in the docs page above: (1) whether IP addresses are stored or only used briefly to work out approximate location; (2) how long aggregated analytics data is kept; (3) where analytics data is stored and processed. Do not publish a claim on these until checked.]

## How we use it

To run the site: show listings, manage queues and requests, let lenders and borrowers contact each other, handle reports, and keep the site safe.

## What we don't do

- We don't sell your data.
- We don't show ads.
- The site takes no payments, so we don't collect card or bank details.

## Sharing

We share data with service providers needed to run the site (such as the database and hosting providers). We may disclose information if required by law. [TO CONFIRM / lawyer: full list of processors.]

**Email delivery (Resend) (DRAFT, needs review).** We use Resend to send emails for your account: verifying your email, resetting your password, and security notices. These emails come from no-reply@project-arcade.ricebarrel.com. To send them, Resend receives your email address and the content of the message. We use Resend only to send emails that relate to your account, and it receives your email address only for that purpose. We do not send marketing emails. Resend's privacy policy says it transfers data to the United States and processes it there. [TO CONFIRM from Resend: (1) whether Resend acts as our processor and a data processing agreement is in place; (2) how long Resend keeps sent-email content and logs (its privacy policy gives no period); (3) Resend's sub-processors (it lists them at resend.com/legal/subprocessors). Lawyer to check international transfer wording.]

## Keeping and deleting data

*Feedback:* if you delete your account, your feedback is kept but no longer linked to you. [TO CONFIRM: matches `user_id ON DELETE SET NULL` in supabase/08-feedback.sql; retention period and whether a reply contact is also removed.]

You can delete your account yourself in your account settings. When you do, your profile, your items and their photos, and your place in queues are deleted. Your pending and approved requests are closed, and the text of messages you sent is replaced with "[message removed]". Borrowing records (item name, dates, damage price, damage notes and status), messages the other person sent in your conversations, and reports are kept but no longer linked to you. You can't delete your account while you have items currently handed off. [TO CONFIRM: how long logs and kept records are retained. Lawyer to check any legal retention needs. Based on supabase/05-messages-and-deletion.sql, which has not been run yet.]

## Your choices

You can edit your profile and listings in the app, and delete your account at any time. For other questions about your data, contact us at [contact email].

## Age

The site is for people 18 or older. We don't knowingly collect data from anyone under 18.

## Changes

We may update this policy and will change the date above when we do.

## Contact

[contact email]
