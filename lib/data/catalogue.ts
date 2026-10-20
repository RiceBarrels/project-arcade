import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getCategory, isUuid, type Item, type ItemWithQueue, type Profile, type ProfileStats } from "@/lib/domain";
import { createPublicClient } from "@/lib/supabase/server";

// Public catalogue reads. They run as the anon role (no cookies), so they can
// live in "use cache" and prerender into the static shell. RLS only returns
// public rows here (non-hidden items, public profile fields).
// Tags: "items", "item:<id>", "profiles", "profile:<id>" for updateTag() once
// writes are enabled.

const ITEM_COLUMNS =
  "id, owner_id, title, category, safety_ack, description, condition, is_free, fee_amount, fee_period, damage_price, damage_waived, currency, city, photos, status, created_at";
const PROFILE_COLUMNS = "id, display_name, city, bio, avatar_url, over_18_confirmed, created_at";

/** PostgREST returns numeric columns as numbers or strings depending on size; normalise. */
function normaliseItem(row: Item): Item {
  return {
    ...row,
    fee_amount: row.fee_amount == null ? null : Number(row.fee_amount),
    damage_price: Number(row.damage_price),
    photos: row.photos ?? [],
  };
}

async function withQueueLengths(items: Item[]): Promise<ItemWithQueue[]> {
  // One RPC per item; fine for v1 volumes. A batched function is on the
  // database session's list.
  const lengths = await Promise.all(items.map((i) => queueLength(i.id)));
  return items.map((i, n) => ({ ...i, queue_length: lengths[n] }));
}

export async function queueLength(itemId: string): Promise<number> {
  "use cache";
  cacheLife("minutes");
  cacheTag("items", `item:${itemId}`);
  const { data, error } = await createPublicClient().rpc("item_queue_length", { p_item: itemId });
  if (error) throw error;
  return typeof data === "number" ? data : 0;
}

/**
 * Build a safe PostgREST ilike pattern for free text. The value is sent as a
 * double-quoted PostgREST literal (so , . : ( ) are plain characters) with
 * " and \\ escaped; * is PostgREST's wildcard and LIKE's own % and _ are
 * escaped so they match literally.
 */
function ilikePattern(q: string) {
  const text = q.replace(/\s+/g, " ").trim().slice(0, 80);
  if (!text) return null;
  const like = text.replace(/[\\%_]/g, (c) => `\\${c}`).replace(/\*/g, " ");
  return `"*${like.replace(/["\\]/g, (c) => `\\${c}`)}*"`;
}

export async function listItems(opts: { category?: string; q?: string; limit?: number } = {}): Promise<ItemWithQueue[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("items");
  const supabase = createPublicClient();
  let query = supabase
    .from("items")
    .select(ITEM_COLUMNS)
    .neq("status", "hidden")
    .order("created_at", { ascending: false })
    .limit(opts.limit ?? 60);
  if (opts.category && getCategory(opts.category)) query = query.eq("category", opts.category);
  const pattern = opts.q ? ilikePattern(opts.q) : null;
  if (pattern) query = query.or(`title.ilike.${pattern},description.ilike.${pattern},city.ilike.${pattern}`);
  const { data, error } = await query;
  if (error) throw error;
  return withQueueLengths((data as Item[]).map(normaliseItem));
}

export async function getItem(id: string): Promise<ItemWithQueue | null> {
  "use cache";
  if (!isUuid(id)) return null;
  cacheLife("minutes");
  cacheTag("items", `item:${id}`);
  const { data, error } = await createPublicClient()
    .from("items")
    .select(ITEM_COLUMNS)
    .eq("id", id)
    .neq("status", "hidden")
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const [withQueue] = await withQueueLengths([normaliseItem(data as Item)]);
  return withQueue;
}

export async function itemsByOwner(ownerId: string): Promise<ItemWithQueue[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("items", `owner:${ownerId}`);
  const { data, error } = await createPublicClient()
    .from("items")
    .select(ITEM_COLUMNS)
    .eq("owner_id", ownerId)
    .neq("status", "hidden")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return withQueueLengths((data as Item[]).map(normaliseItem));
}

export async function getProfile(id: string): Promise<Profile | null> {
  "use cache";
  if (!isUuid(id)) return null;
  cacheLife("minutes");
  cacheTag("profiles", `profile:${id}`);
  const { data, error } = await createPublicClient().from("profiles").select(PROFILE_COLUMNS).eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Profile | null) ?? null;
}

export async function getProfileStats(id: string): Promise<ProfileStats> {
  "use cache";
  cacheLife("minutes");
  cacheTag("profiles", `profile:${id}`);
  const { data, error } = await createPublicClient().rpc("profile_stats", { p_user: id });
  if (error) throw error;
  const row = (Array.isArray(data) ? data[0] : data) as Partial<ProfileStats> | undefined;
  return {
    items_listed: row?.items_listed ?? 0,
    loans_completed: row?.loans_completed ?? 0,
    loans_damaged: row?.loans_damaged ?? 0,
    borrowed_returned: row?.borrowed_returned ?? 0,
    // Not returned by profile_stats() yet; null renders as "not tracked yet".
    borrowed_damaged: typeof row?.borrowed_damaged === "number" ? row.borrowed_damaged : null,
  };
}

/** Home page trust strip: real counts from public data. */
export async function getCommunityCounts() {
  "use cache";
  cacheLife("hours");
  cacheTag("items", "profiles");
  const supabase = createPublicClient();
  const [items, members] = await Promise.all([
    supabase.from("items").select("id", { head: true, count: "exact" }).neq("status", "hidden"),
    supabase.from("profiles").select("id", { head: true, count: "exact" }),
  ]);
  if (items.error) throw items.error;
  if (members.error) throw members.error;
  return { items: items.count ?? 0, members: members.count ?? 0 };
}

/** Public URL for a photo stored in the item-photos bucket. */
export function photoUrl(path: string) {
  return createPublicClient().storage.from("item-photos").getPublicUrl(path).data.publicUrl;
}
