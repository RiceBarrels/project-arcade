import { User } from "lucide-react";

// Placeholder avatar until profiles.avatar_url is wired up. Decorative: the name is always shown beside it.
export function Avatar({ className }: { className?: string }) {
  return (
    <div className={`flex size-20 shrink-0 items-center justify-center rounded-lg border-2 border-border ${className ?? "bg-background"}`}>
      <User aria-hidden className="size-10" strokeWidth={2.5} />
    </div>
  );
}
