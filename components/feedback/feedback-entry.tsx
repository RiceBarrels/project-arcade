import { Suspense } from "react";
import { getCurrentUser } from "@/lib/data/session";
import { FeedbackPlaceholder, FeedbackTrigger, type FeedbackVariant } from "./feedback-trigger";

/**
 * "Send feedback" entry (footer, desktop header, Me page). Reads the session,
 * so it streams behind its own boundary; until then the entry is a plain
 * link to sign in.
 */
export function FeedbackEntry({ variant }: { variant: FeedbackVariant }) {
  return (
    <Suspense fallback={<FeedbackPlaceholder variant={variant} />}>
      <SignedInCheck variant={variant} />
    </Suspense>
  );
}

async function SignedInCheck({ variant }: { variant: FeedbackVariant }) {
  const user = await getCurrentUser().catch(() => null);
  return <FeedbackTrigger variant={variant} signedIn={!!user} />;
}
