import { Badge } from "@/components/ui/badge";
import type { ItemStatus } from "@/lib/domain";

export function StatusBadge({ status, inLine, className }: { status: ItemStatus; inLine: number; className?: string }) {
  if (status === "available" && inLine === 0) {
    return <Badge className={className}>Ready to borrow</Badge>;
  }
  if (status === "available") {
    return <Badge className={className} variant="secondary">Offered to next · {inLine} in line</Badge>;
  }
  return (
    <Badge className={className} variant="secondary">
      On loan{inLine > 0 ? ` · ${inLine} in line` : ""}
    </Badge>
  );
}
