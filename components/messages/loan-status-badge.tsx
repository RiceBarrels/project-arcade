import { Badge } from "@/components/ui/badge";
import { msg } from "@/i18n/msg";
import { getT } from "@/i18n/server";
import type { LoanStatus } from "@/lib/domain";

const LABEL: Record<LoanStatus, string> = {
  requested: msg("Requested"),
  approved: msg("Approved"),
  handed_off: msg("Handed off"),
  returned: msg("Returned"),
  damaged: msg("Damaged or lost"),
  declined: msg("Declined"),
  cancelled: msg("Cancelled"),
};

const OPEN: LoanStatus[] = ["approved", "handed_off"];

export async function LoanStatusBadge({ status, className }: { status: LoanStatus; className?: string }) {
  const t = await getT();
  return (
    <Badge variant={OPEN.includes(status) ? "default" : "secondary"} className={className}>
      {t(LABEL[status])}
    </Badge>
  );
}
