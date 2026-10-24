"use client";

import { useRef, useState } from "react";
import { ChevronDown, LogOut, MessageSquareText, Settings, User } from "lucide-react";
import { FeedbackDialog } from "@/components/feedback/feedback-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useT } from "@/i18n/client";
import { Link } from "@/i18n/link";
import { signOut } from "@/lib/auth/actions";
import { headerChip } from "./styles";

/**
 * Desktop header, signed in: the name opens a menu with the profile,
 * settings, feedback and sign out. Escape and clicking outside close it.
 */
export function AccountMenu({ name }: { name: string }) {
  const t = useT();
  const trigger = useRef<HTMLButtonElement>(null);
  const signOutForm = useRef<HTMLFormElement>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button ref={trigger} type="button" className={headerChip}>
            <User aria-hidden className="size-4" />
            <bdi className="max-w-32 truncate">{name}</bdi>
            <ChevronDown aria-hidden className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8} className="min-w-48">
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User aria-hidden /> {t("Profile")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings aria-hidden /> {t("Settings")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setFeedbackOpen(true)}>
            <MessageSquareText aria-hidden /> {t("Send feedback")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => signOutForm.current?.requestSubmit()}>
            <LogOut aria-hidden className="rtl:-scale-x-100" /> {t("Sign out")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <form ref={signOutForm} action={signOut} hidden>
        <input type="hidden" name="locale" value={t.locale} />
      </form>
      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} returnFocus={trigger} />
    </>
  );
}
