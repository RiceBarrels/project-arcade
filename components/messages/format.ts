/**
 * Deterministic timestamp for messages, e.g. "2026-10-19 14:05 UTC". Uses the
 * ISO string (always UTC) instead of toLocaleString so server and browser
 * render the same text and hydration never mismatches.
 */
export function formatMessageTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const s = d.toISOString();
  return `${s.slice(0, 10)} ${s.slice(11, 16)} UTC`;
}
