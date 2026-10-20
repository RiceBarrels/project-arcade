import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { safeNextPath } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

// Landing point for links in auth emails (sign-up verification, password
// reset). Supports both email template styles:
// - token hash:  /auth/confirm?token_hash=...&type=email|signup|recovery&next=/en/...
// - PKCE code:   /auth/confirm?code=...&next=/en/...   (default {{ .ConfirmationURL }} redirect)
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"), "/en/welcome");

  const supabase = await createClient();
  let ok = false;
  if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error;
  } else if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  }

  // A failed password-reset link goes back to "reset your password", not to the
  // sign-up verification page (whose form resends a sign-up email).
  const isRecovery = type === "recovery" || next.startsWith("/en/reset-password");
  const failed = isRecovery ? "/en/forgot-password?expired=1" : "/en/verify-failed";
  return NextResponse.redirect(new URL(ok ? next : failed, request.url));
}
