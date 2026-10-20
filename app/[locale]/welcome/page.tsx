import Link from "next/link";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { path } from "@/lib/paths";

export const metadata: Metadata = { title: "Email verified" };

export default function WelcomePage() {
  return (
    <AuthShell title="Email verified" intro="You're in. Start browsing, or list your first item.">
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg"><Link href={path("/browse")}>Browse the catalogue</Link></Button>
        <Button asChild size="lg" variant="outline"><Link href={path("/list")}>List your gear</Link></Button>
      </div>
    </AuthShell>
  );
}
