"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "@/i18n/link";
import { headerChip } from "./styles";

/**
 * Header icon link. The label is for screen readers, and a tooltip shows it
 * on hover and focus: written out, the labels don't fit beside the search in
 * the longer languages (ru, es, tl), even at full width. Needs a
 * TooltipProvider above it.
 */
export function HeaderLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href} className={`${headerChip} justify-center px-2.5`}>
          {icon}
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6} className="border-2 border-border text-sm font-bold">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
