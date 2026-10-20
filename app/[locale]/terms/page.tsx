import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of use" };

// Copy: docs/copy-en.md section 8 (DRAFT, needs a lawyer before launch).
// Bracketed placeholders are left visible on purpose until the owner fills them in.
const terms: [string, string][] = [
  ["We're a bulletin board, not a lender.", "The site is not the lender, the borrower, or a party to any loan. We only connect people."],
  ["We don't hold items or money.", "We never take possession of gear, and we don't collect, hold or transfer payments of any kind."],
  ["We don't guarantee anything about items.", "We don't inspect, verify or guarantee the condition, safety, quality or legality of any item, or the identity or reliability of any user. Listing descriptions are written by users."],
  ["You must be 18 or older", "to create an account, list items or borrow."],
  ["Use at your own risk.", "You are responsible for deciding whether to lend or borrow, for using items safely, and for following any rules that apply to you. Check items before use and don't lend or borrow anything unsafe or illegal."],
  ["Damage price is settled between you.", "If an item comes back damaged or lost, the borrower and lender settle the damage price directly. The site doesn't collect it, enforce it or resolve disputes about it."],
  ["Be a decent human.", "No fake listings, harassment, or anything illegal. We may remove listings or accounts that break these rules."],
  ["Reporting.", "If something looks wrong, use the Report button. We'll review reports, but we can't promise to act on every one or to resolve disputes between users."],
  ["Changes.", "We may update these terms. Continuing to use the site means you accept the current version."],
  ["Not allowed in v1.", "To keep things safe, these categories can't be listed for now: power tools, vehicles, climbing gear, and medical equipment. We may remove listings in these or other high-risk categories."],
  ["Lenders are responsible for item safety.", "If you list something, you confirm it's safe to lend and accurately described. Borrowers are responsible for using it safely while they have it."],
  ["Privacy.", "We only collect what's needed to run the site, and we don't sell your data. [Link to privacy policy]"],
  ["Non-profit.", "The site is non-profit: no ads, no fees, no payments through the site."],
];

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <p role="note" className="rounded-lg border-4 border-border bg-destructive p-4 font-bold text-white">
        DRAFT: needs review by a lawyer before launch. This is plain-language product copy, not legal advice.
      </p>
      <header className="space-y-2">
        <h1 className="text-4xl font-black uppercase">Terms of use</h1>
        <p className="text-sm font-medium">Last updated: Oct 19, 2025</p>
      </header>
      <p className="rounded-lg border-2 border-border bg-accent p-4 font-medium text-accent-foreground shadow-xs">
        <strong>The short version:</strong> This site helps neighbours lend gear to each other. We introduce you; the
        rest is between you and the other person.
      </p>
      <ol className="list-decimal space-y-3 pl-6">
        {terms.map(([lead, rest]) => (
          <li key={lead}>
            <strong>{lead}</strong> {rest}
          </li>
        ))}
      </ol>
      <p className="font-medium">Contact: [contact email]</p>
    </article>
  );
}
