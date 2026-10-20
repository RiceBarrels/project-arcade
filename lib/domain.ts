// Domain types and pure helpers shared by server and client code.
// Row types mirror supabase/01-schema.sql.

export type Condition = "new" | "like_new" | "good" | "fair" | "worn";
export type ItemStatus = "available" | "on_loan" | "hidden";
export type QueueStatus = "waiting" | "offered" | "fulfilled" | "cancelled" | "expired";
export type LoanStatus =
  | "requested"
  | "approved"
  | "handed_off"
  | "returned"
  | "damaged"
  | "declined"
  | "cancelled";

export interface Category {
  slug: string;
  name: string;
}

/** Public profile fields (profiles is world-readable; never includes email). */
export interface Profile {
  id: string;
  display_name: string;
  city: string | null;
  bio: string | null;
  avatar_url: string | null;
  over_18_confirmed: boolean;
  created_at: string;
}

export interface Item {
  id: string;
  owner_id: string;
  title: string;
  category: string;
  safety_ack: boolean;
  description: string | null;
  condition: Condition;
  is_free: boolean;
  fee_amount: number | null;
  fee_period: "day" | "week" | "loan" | null;
  damage_price: number;
  damage_waived: boolean;
  currency: string;
  city: string;
  photos: string[];
  status: ItemStatus;
  created_at: string;
}

/** An item plus its live queue length (public.item_queue_length). */
export interface ItemWithQueue extends Item {
  queue_length: number;
}

export interface QueueEntry {
  id: string;
  item_id: string;
  user_id: string;
  status: QueueStatus;
  offered_at: string | null;
  created_at: string;
}

export interface Loan {
  id: string;
  item_id: string;
  borrower_id: string;
  lender_id: string;
  status: LoanStatus;
  damage_note: string | null;
  damage_price: number;
  damage_waived: boolean;
  requested_at: string;
}

/** public.profile_stats(). borrowed_damaged is not in the schema yet (requested from the database session). */
export interface ProfileStats {
  items_listed: number;
  loans_completed: number;
  loans_damaged: number;
  borrowed_returned: number;
  borrowed_damaged: number | null;
}

export const CONDITION_LABEL: Record<Condition, string> = {
  new: "New",
  like_new: "Like new",
  good: "Good",
  fair: "Fair",
  worn: "Well used",
};

// Allowlist of category slugs. High-risk categories (power tools, vehicles,
// climbing, medical equipment) are deliberately absent in v1; the DB has a
// matching check constraint as a backstop.
export const categories: Category[] = [
  { slug: "hand-tools", name: "Hand tools" },
  { slug: "cameras", name: "Cameras" },
  { slug: "camping", name: "Camping" },
  { slug: "games", name: "Games" },
  { slug: "music", name: "Instruments" },
  { slug: "sports", name: "Sports" },
  { slug: "kitchen", name: "Kitchen" },
  { slug: "party", name: "Party & events" },
];

export const BLOCKED_CATEGORIES = ["Power tools", "Vehicles", "Climbing gear", "Medical equipment"];

export const RESPONSE_WINDOW_HOURS = 48;
export const LAST_CALL_HOURS = 6;

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s: string) => UUID_RE.test(s);

/** Milliseconds left in a 48h offer window at `now` (negative once expired). */
export function offerMsLeft(offeredAt: string, now: number) {
  return Date.parse(offeredAt) + RESPONSE_WINDOW_HOURS * 3_600_000 - now;
}

export function formatTimeLeft(ms: number) {
  if (ms <= 0) return "0m";
  const totalMin = Math.floor(ms / 60_000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export const formatUSD = (n: number) => `$${n.toFixed(n % 1 ? 2 : 0)}`;

export function feeLabel(item: Pick<Item, "is_free" | "fee_amount" | "fee_period">) {
  if (item.is_free || item.fee_amount == null) return "Free";
  const per = item.fee_period === "loan" ? "per loan" : `per ${item.fee_period}`;
  return `${formatUSD(item.fee_amount)} ${per}`;
}

export function damageLabel(item: Pick<Item, "damage_price" | "damage_waived">) {
  return item.damage_waived ? "No charge if damaged" : formatUSD(item.damage_price);
}

/** Public URL of a file in the item-photos bucket (bucket is public-read). */
export function photoPublicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/item-photos/${path.split("/").map(encodeURIComponent).join("/")}`;
}

/** Month the member joined, e.g. "2026-03". */
export const memberSince = (createdAt: string) => createdAt.slice(0, 7);

/**
 * Only allow same-site, locale-prefixed relative paths as post-login targets
 * (prevents open redirects via ?next=).
 */
export function safeNextPath(next: string | null | undefined, fallback = "/en") {
  if (!next || !next.startsWith("/en") || next.startsWith("//") || next.includes("\\")) return fallback;
  return next;
}

/**
 * Writes (requests, listings, queue changes, reports, messages, account edits)
 * stay disabled until the database session's fixes are reviewed and the user
 * approves. Forms still validate, then show a "preview only" notice.
 */
export const WRITES_ENABLED = false;
