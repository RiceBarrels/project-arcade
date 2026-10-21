import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { alternates, getLocale } from "@/i18n/server";
import { getLegalDoc } from "@/lib/legal";

// Copy: docs/copy-en.md section 8 (DRAFT, needs a lawyer before launch), kept in
// content/legal/<locale>/terms.md. Bracketed placeholders stay visible on purpose
// until the owner fills them in.

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("terms", await getLocale());
  return { title: doc.title, alternates: await alternates("/terms") };
}

export default async function TermsPage() {
  return <LegalPage name="terms" doc={await getLegalDoc("terms", await getLocale())} />;
}
