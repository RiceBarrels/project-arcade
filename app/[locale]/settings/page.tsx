import { Suspense } from "react";
import type { Metadata } from "next";
import { TriangleAlert, UserRound } from "lucide-react";
import { DeleteAccount } from "@/components/settings/delete-account";
import { DevicePrefs } from "@/components/settings/device-prefs";
import { AppearanceSettings } from "@/components/theme";
import { ProfileForm } from "@/components/settings/profile-form";
import { localePath } from "@/i18n/config";
import { alternates, getT } from "@/i18n/server";
import { hasLoanInProgress } from "@/lib/data/account";
import { requireUser } from "@/lib/data/session";
import { BackBar } from "@/components/mobile/back-bar";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Settings"), alternates: await alternates("/settings") };
}

// Static shell: the title. Everything that reads the session streams in below.
export default async function SettingsPage() {
  const t = await getT();
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <BackBar title={t("Settings")} fallback="/profile" />
      <h1 className="text-4xl font-black uppercase">{t("Settings")}</h1>
      <Suspense fallback={<SettingsFallback />}>
        <SettingsBody />
      </Suspense>
    </div>
  );
}

async function SettingsBody() {
  const t = await getT();
  const user = await requireUser(localePath("/settings", t.locale));
  const loanInProgress = await hasLoanInProgress(user.id);

  return (
    <div className="space-y-10">
      <section aria-labelledby="settings-profile" className="rounded-lg border-4 border-border bg-card p-5 text-card-foreground shadow sm:p-6">
        <h2 id="settings-profile" className="mb-5 flex items-center gap-2 text-2xl font-black">
          <UserRound aria-hidden className="size-6" /> {t("Profile")}
        </h2>
        <ProfileForm
          initial={{ display_name: user.display_name, city: user.city ?? "", bio: user.bio ?? "" }}
        />
      </section>

      <AppearanceSettings />

      <DevicePrefs />

      <section aria-labelledby="settings-delete" className="overflow-hidden rounded-lg border-4 border-border bg-card text-card-foreground shadow">
        <h2
          id="settings-delete"
          className="flex items-center gap-2 border-b-4 border-border bg-destructive px-5 py-3 text-2xl font-black text-destructive-foreground sm:px-6"
        >
          <TriangleAlert aria-hidden className="size-6" /> {t("Delete account")}
        </h2>
        <div className="p-5 sm:p-6">
          <DeleteAccount loanInProgress={loanInProgress} />
        </div>
      </section>
    </div>
  );
}

function SettingsFallback() {
  return (
    <div aria-hidden className="space-y-10">
      <div className="h-96 animate-pulse rounded-lg border-4 border-border bg-muted shadow" />
      <div className="h-64 animate-pulse rounded-lg border-4 border-border bg-muted shadow" />
    </div>
  );
}
