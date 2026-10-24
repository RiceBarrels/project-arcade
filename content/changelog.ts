import { msg } from "@/i18n/msg";

// The public "What's new" page (app/[locale]/changelog). Copy: docs/copy-en.md
// section 26: add entries there first, then here. Newest group first; groups
// from the same day keep this order. Every string is a msg() key, translated
// in i18n/messages/ like the rest of the site.

export interface Release {
  /** YYYY-MM-DD (UTC), shown in the visitor's language; null = not released yet ("Coming soon"). */
  date: string | null;
  heading: string;
  bullets: readonly string[];
}

export const CHANGELOG: readonly Release[] = [
  {
    // Shipped 2026-10-23 together with SITE_ACCESS_PASSWORD (docs/copy-en.md section 26).
    date: "2026-10-23",
    heading: msg("Private beta access"),
    bullets: [
      msg("During the private beta, visitors enter an access password before they can see the site."),
      msg("You only need to enter it once on each device for a while."),
    ],
  },
  {
    date: "2026-10-22",
    heading: msg("Dark mode and Japanese"),
    bullets: [
      msg("Choose a System, Light or Dark theme with the theme button or in your settings."),
      msg("The site is now also in Japanese, so it comes in 12 languages."),
      msg("The site stays out of search engines while we are in pre-alpha."),
      msg("The check-your-email page now tells you which address our emails come from."),
      msg("When you delete your account, typing DELETE now also works with full-width letters."),
    ],
  },
  {
    date: "2026-10-20",
    heading: msg("More languages and legal pages"),
    bullets: [
      msg("The site now comes in 11 languages, with a language switcher."),
      msg("The terms and privacy pages are now available in every language, as unofficial translations of the English text."),
      msg("Choosing photos for a listing now uses a button in your own language."),
      msg("We now count visits in a basic, anonymous way, with no advertising cookies."),
    ],
  },
  {
    date: "2026-10-20",
    heading: msg("Made for phones"),
    bullets: [
      msg("A bottom bar and a back bar make the site easier to use on a phone."),
      msg("You can add the site to your home screen like an app."),
      msg("New icons and a new browser tab icon."),
      msg("A Send feedback link lets you report a bug or share an idea."),
      msg("Short welcome screens explain how the site works the first time you sign in."),
      msg("You can turn tap vibration on or off in your settings."),
    ],
  },
  {
    date: "2026-10-19",
    heading: msg("A new name"),
    bullets: [
      msg("The site is now called project-arcade and carries a pre-alpha tag."),
      msg("Messages between a borrower and a lender can now be sent."),
      msg("Passwords now need at least 8 characters."),
      msg("Redrawn home page and browse illustrations."),
    ],
  },
  {
    date: "2026-10-19",
    heading: msg("The first version"),
    bullets: [
      msg("Browse gear that people in your community are willing to lend."),
      msg("List your own gear for free or for a small fee, with a damage price."),
      msg("Join a queue for an item you would like to borrow."),
      msg("Lenders approve requests, and each loan has its own conversation."),
      msg("Profiles show a display name and city."),
      msg("You can report an item or a person."),
    ],
  },
];
