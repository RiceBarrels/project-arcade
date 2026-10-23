import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { EmailOnlyForm } from "@/components/auth/email-only-form";
import { alternates, getT } from "@/i18n/server";
import { EMAIL_SENDER } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Check your email"), alternates: await alternates("/check-email") };
}

// Shown after sign-up (always, whether or not the address was new) and from
// the "not verified" sign-in error. Never displays the address.
export default async function CheckEmailPage() {
  const t = await getT();
  return (
    <AuthShell
      title={t("Check your email")}
      intro={
        <>
          <p>{t("Almost there. If this address can be used to sign up, you'll get an email from us shortly. Follow the link inside to finish.")}</p>
          <p className="mt-2 text-sm">{t("Can't find it? Check your spam or junk folder. Our emails come from {sender}.", { sender: EMAIL_SENDER })}</p>
        </>
      }
    >
      <section className="space-y-3 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
        <h2 className="text-xl font-black">{t("Didn't get it?")}</h2>
        <EmailOnlyForm
          kind="resend"
          button={t("Resend email")}
          helper={t("Enter the email you signed up with and we'll send the link again.")}
        />
      </section>
    </AuthShell>
  );
}
