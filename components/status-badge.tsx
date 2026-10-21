import { Badge } from "@/components/ui/badge";
import { getT } from "@/i18n/server";
import type { ItemStatus } from "@/lib/domain";

export async function StatusBadge({ status, inLine, className }: { status: ItemStatus; inLine: number; className?: string }) {
  const t = await getT();
  if (status === "available" && inLine === 0) {
    return <Badge className={className}>{t("Ready to borrow")}</Badge>;
  }
  if (status === "available") {
    return <Badge className={className} variant="secondary">{t("Offered to next · {count} in line", { count: inLine })}</Badge>;
  }
  return (
    <Badge className={className} variant="secondary">
      {inLine > 0 ? t("On loan · {count} in line", { count: inLine }) : t("On loan")}
    </Badge>
  );
}
