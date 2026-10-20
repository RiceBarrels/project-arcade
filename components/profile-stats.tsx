import type { ProfileStats } from "@/lib/domain";

// Simple trust signals from public.profile_stats(). borrowed_damaged is null
// until supabase/06-queue-fixes.sql is applied; it then shows as a number.
export function ProfileStatsGrid({ stats }: { stats: ProfileStats }) {
  const lent = stats.loans_completed + stats.loans_damaged;
  const borrowed = stats.borrowed_returned + (stats.borrowed_damaged ?? 0);
  const cells = [
    { label: "Lent out", value: lent, hint: `${stats.items_listed} listed` },
    { label: "Borrowed", value: borrowed, hint: `${stats.borrowed_returned} returned OK` },
    { label: "Came back damaged", value: stats.loans_damaged, hint: "as lender" },
    { label: "Returned damaged", value: stats.borrowed_damaged ?? "–", hint: "as borrower" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cells.map((c) => (
        <div key={c.label} className="rounded-lg border-2 border-border bg-card p-3 text-center shadow-xs">
          <dt className="text-xs font-bold uppercase">{c.label}</dt>
          <dd className="text-3xl font-black">{c.value}</dd>
          <dd className="text-xs">{c.hint}</dd>
        </div>
      ))}
    </dl>
  );
}
