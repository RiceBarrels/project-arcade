"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, MessageSquareText } from "lucide-react";
import { path } from "@/lib/paths";
import { FeedbackDialog } from "./feedback-dialog";

export type FeedbackVariant = "footer" | "header" | "me";

const STYLE: Record<FeedbackVariant, string> = {
  footer: "inline-flex min-h-11 items-center px-2 font-bold underline underline-offset-4 md:min-h-10",
  header:
    "inline-flex min-h-11 items-center gap-1.5 rounded-lg border-2 border-border bg-background px-3 text-foreground shadow-xs transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none md:min-h-10",
  me: "flex min-h-14 w-full items-center gap-3 border-b-2 border-border px-4 py-2 text-left outline-none last:border-b-0 focus-visible:bg-muted",
};

function Content({ variant }: { variant: FeedbackVariant }) {
  if (variant !== "me") return <>Send feedback</>;
  return (
    <>
      <MessageSquareText aria-hidden className="size-5 shrink-0" />
      <span className="min-w-0 flex-1">
        <span className="block font-black">Send feedback</span>
        <span className="block text-sm">Found a bug or have an idea?</span>
      </span>
      <ChevronRight aria-hidden className="size-5 shrink-0" />
    </>
  );
}

/** Placeholder while the session streams in (no pathname: it may not be known during prerendering). */
export function FeedbackPlaceholder({ variant }: { variant: FeedbackVariant }) {
  return (
    <Link href={path("/login")} className={STYLE[variant]}>
      <Content variant={variant} />
    </Link>
  );
}

/** Opens the feedback dialog for members; signed-out visitors go to sign in and come back here. */
export function FeedbackTrigger({ variant, signedIn }: { variant: FeedbackVariant; signedIn: boolean }) {
  const pathname = usePathname();
  if (!signedIn) {
    return (
      <Link href={`${path("/login")}?next=${encodeURIComponent(pathname)}`} className={STYLE[variant]}>
        <Content variant={variant} />
      </Link>
    );
  }
  return (
    <FeedbackDialog>
      <button type="button" className={STYLE[variant]}>
        <Content variant={variant} />
      </button>
    </FeedbackDialog>
  );
}
