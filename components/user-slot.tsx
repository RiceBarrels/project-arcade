import { AccountMenu } from "@/components/header/account-menu";
import { headerChip } from "@/components/header/styles";
import { Link } from "@/i18n/link";
import { getT } from "@/i18n/server";
import { getCurrentUser } from "@/lib/data/session";

// Reads the session: render inside <Suspense> (see SiteHeader).
export async function UserSlot() {
  const [user, t] = await Promise.all([getCurrentUser(), getT()]);
  if (!user) {
    return (
      <>
        <Link href="/login" className={headerChip}>
          {t("Sign in")}
        </Link>
        <Link href="/signup" className={headerChip}>
          {t("Sign up")}
        </Link>
      </>
    );
  }
  return <AccountMenu name={user.display_name} />;
}

export function UserSlotFallback() {
  return <span className={`${headerChip} w-24 animate-pulse`} aria-hidden />;
}
