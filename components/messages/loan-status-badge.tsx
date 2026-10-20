import { Badge } from "@/components/ui/badge";
import type { LoanStatus } from "@/lib/domain";

const LABEL: Record<LoanStatus, string> = {
  requested: "Requested",
  approved: "Approved",
  handed_off: "Handed off",
  returned: "Returned",
  damaged: "Returned damaged",
  declined: "Declined",
  cancelled: "Cancelled",
};

const OPEN: LoanStatus[] = ["approved", "handed_off"];

export function LoanStatusBadge({ status, className }: { status: LoanStatus; className?: string }) {
  return (
    <Badge variant={OPEN.includes(status) ? "default" : "secondary"} className={className}>
      {LABEL[status]}
    </Badge>
  );
}
