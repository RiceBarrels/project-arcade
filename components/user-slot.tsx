import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/data/session";
import { path } from "@/lib/paths";

const chip =
  "inline-flex min-h-10 items-center gap-1.5 rounded-lg border-2 border-border bg-background px-3 text-foreground shadow-xs transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none";

// Reads the session: render inside <Suspense> (see SiteHeader).
export async function UserSlot() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <Link href={path("/login")} className={chip}>
        Sign in
      </Link>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      <Link href={path("/profile")} className={chip}>
        <User aria-hidden className="size-4" />
        <span className="max-w-32 truncate">{user.display_name}</span>
      </Link>
      <Link href={path("/settings")} className={chip} aria-label="Settings">
        <Settings aria-hidden className="size-4" />
      </Link>
      <form action={signOut}>
        <Button type="submit" variant="outline" className="min-h-10 normal-case tracking-normal" aria-label="Sign out">
          <LogOut aria-hidden /> <span className="hidden sm:inline">Sign out</span>
        </Button>
      </form>
    </div>
  );
}

export function UserSlotFallback() {
  return <span className={`${chip} w-24 animate-pulse`} aria-hidden />;
}
