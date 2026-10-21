import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { alternates, getLocale } from "@/i18n/server";
import { getLegalDoc } from "@/lib/legal";

// Copy: docs/copy-en.md section 15 (DRAFT, needs lawyer review; [TO CONFIRM]
// items are not confirmed by the owner), kept in content/legal/<locale>/privacy.md.
// Placeholders stay visible on purpose.

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("privacy", await getLocale());
  return { title: doc.title, alternates: await alternates("/privacy") };
}

export default async function PrivacyPage() {
  return <LegalPage name="privacy" doc={await getLegalDoc("privacy", await getLocale())} />;
}
