import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/link";
import { alternates, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Email verified"), alternates: await alternates("/welcome") };
}

export default async function WelcomePage() {
  const t = await getT();
  return (
    <AuthShell title={t("Email verified")} intro={t("You're in. Start browsing, or list your first item.")}>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg"><Link href="/browse">{t("Browse the catalogue")}</Link></Button>
        <Button asChild size="lg" variant="outline"><Link href="/list">{t("List your gear")}</Link></Button>
      </div>
    </AuthShell>
  );
}
