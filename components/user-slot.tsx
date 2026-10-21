import { LogOut, Settings, User } from "lucide-react";
import { FeedbackTrigger } from "@/components/feedback/feedback-trigger";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/link";
import { getT } from "@/i18n/server";
import { signOut } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/data/session";

const chip =
  "inline-flex min-h-11 md:min-h-10 items-center gap-1.5 rounded-lg border-2 border-border bg-background px-3 text-foreground shadow-xs transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none";

// Reads the session: render inside <Suspense> (see SiteHeader).
export async function UserSlot() {
  const [user, t] = await Promise.all([getCurrentUser(), getT()]);
  if (!user) {
    return (
      <Link href="/login" className={chip}>
        {t("Sign in")}
      </Link>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/profile" className={chip}>
        <User aria-hidden className="size-4" />
        <bdi className="max-w-32 truncate">{user.display_name}</bdi>
      </Link>
      <FeedbackTrigger variant="header" signedIn />
      <Link href="/settings" className={chip} aria-label={t("Settings")}>
        <Settings aria-hidden className="size-4" />
      </Link>
      <form action={signOut}>
        <input type="hidden" name="locale" value={t.locale} />
        <Button type="submit" variant="outline" className="min-h-11 md:min-h-10 normal-case tracking-normal" aria-label={t("Sign out")}>
          <LogOut aria-hidden className="rtl:-scale-x-100" /> <span className="hidden sm:inline">{t("Sign out")}</span>
        </Button>
      </form>
    </div>
  );
}

export function UserSlotFallback() {
  return <span className={`${chip} w-24 animate-pulse`} aria-hidden />;
}
