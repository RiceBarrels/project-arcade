import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy policy" };

// Copy: docs/copy-en.md section 15 (DRAFT, needs lawyer review; [TO CONFIRM]
// items are not confirmed by the owner). Placeholders stay visible on purpose.
const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "What we collect",
    body: (
      <ul className="list-disc space-y-1 pl-6">
        <li><strong>Account details:</strong> your email address (verified at sign-up) and sign-in information.</li>
        <li><strong>Profile:</strong> display name, city or area, and any other profile details you choose to add.</li>
        <li><strong>Listings:</strong> titles, descriptions, categories, condition, pickup area, prices you set (fee and damage price) and the photos you upload.</li>
        <li><strong>Borrowing records:</strong> requests, queue entries, approvals, handoff and return markings (OK or damaged), and related notes.</li>
        <li><strong>Reports:</strong> reports you send, and reports made about you or your listings.</li>
        <li><strong>Basic technical data:</strong> [TO CONFIRM: e.g. server logs, IP address, cookies needed for sign-in. Fill in once the real setup is checked.]</li>
      </ul>
    ),
  },
  {
    title: "Where it is stored",
    body: <p>Your account, profile, listings, borrowing records and photos are stored with Supabase (database, authentication and file storage). The data is stored in Canada (Supabase region ca-central-1). The website is hosted on Vercel.</p>,
  },
  {
    title: "What other users can see",
    body: <p>Your display name, city or area, listings, photos and lending history on your profile are visible to other users. Your exact address should not be put in listings. Your email address is never shown publicly. Once a request is approved, lender and borrower contact each other only through the site&apos;s in-app messages.</p>,
  },
  {
    title: "How we use it",
    body: <p>To run the site: show listings, manage queues and requests, let lenders and borrowers contact each other, handle reports, and keep the site safe.</p>,
  },
  {
    title: "What we don't do",
    body: (
      <ul className="list-disc space-y-1 pl-6">
        <li>We don&apos;t sell your data.</li>
        <li>We don&apos;t show ads.</li>
        <li>The site takes no payments, so we don&apos;t collect card or bank details.</li>
      </ul>
    ),
  },
  {
    title: "Sharing",
    body: <p>We share data with service providers needed to run the site (such as the database and hosting providers). We may disclose information if required by law. [TO CONFIRM / lawyer: full list of processors.]</p>,
  },
  {
    title: "Keeping and deleting data",
    body: <p>You can delete your account yourself in your account settings. When you do, your profile and photos are deleted. Borrowing records are kept but made anonymous, so they are no longer linked to you. [TO CONFIRM: how long other data, such as logs and reports, is kept. Lawyer to check any legal retention needs.]</p>,
  },
  {
    title: "Your choices",
    body: <p>You can edit your profile and listings in the app, and delete your account at any time. For other questions about your data, contact us at [contact email].</p>,
  },
  { title: "Age", body: <p>The site is for people 18 or older. We don&apos;t knowingly collect data from anyone under 18.</p> },
  { title: "Changes", body: <p>We may update this policy and will change the date above when we do.</p> },
  { title: "Contact", body: <p>[contact email]</p> },
];

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <p role="note" className="rounded-lg border-4 border-border bg-destructive p-4 font-bold text-white">
        DRAFT: needs lawyer review. Items marked [TO CONFIRM] have not been confirmed by the owner. Do not publish until confirmed and reviewed.
      </p>
      <header className="space-y-2">
        <h1 className="text-4xl font-black uppercase">Privacy policy</h1>
        <p className="text-sm font-medium">Last updated: [date]</p>
      </header>
      <p className="rounded-lg border-2 border-border bg-accent p-4 font-medium text-accent-foreground shadow-xs">
        <strong>The short version:</strong> We collect what we need to run the lending library, store it with our
        database provider, and don&apos;t use it for advertising.
      </p>
      {sections.map((s) => (
        <section key={s.title} className="space-y-2">
          <h2 className="text-2xl font-black">{s.title}</h2>
          {s.body}
        </section>
      ))}
    </article>
  );
}
