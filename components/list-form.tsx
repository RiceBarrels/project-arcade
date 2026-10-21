"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/category-icon";
import { CheckField } from "@/components/check-field";
import { FocusStatus } from "@/components/focus-status";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BLOCKED_CATEGORIES, CONDITION_LABEL, categories, WRITES_ENABLED } from "@/lib/domain";

type Field = "title" | "category" | "condition" | "fee" | "damage" | "city" | "safety";
type Errors = Partial<Record<Field, string>>;

// Element that receives focus for each field's error, in form order.
const FOCUS_TARGET: Record<Field, string> = {
  title: "title",
  category: "category",
  condition: "condition",
  fee: "fee_amount",
  damage: "damage_price",
  city: "city",
  safety: "safety-ack",
};
const errorId = (field: Field) => `${field}-error`;

// Writes are off (WRITES_ENABLED): validates, then shows a preview notice.
// When enabled: upload photos to item-photos/<uid>/..., then insert into items.
// Field names mirror public.items (damage_price, damage_waived, safety_ack, is_free, fee_amount, fee_period).
export function ListForm() {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [pricing, setPricing] = useState<"free" | "fee">("free");
  const [feePeriod, setFeePeriod] = useState<"day" | "week" | "loan">("loan");
  const [damageWaived, setDamageWaived] = useState(false);
  const [safetyAck, setSafetyAck] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [published, setPublished] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(f.get("title") ?? "").trim()) next.title = "Please add a title.";
    if (!categories.some((c) => c.slug === category)) next.category = "Please pick a category.";
    if (!condition) next.condition = "Please pick a condition.";
    if (pricing === "fee") {
      const fee = Number(String(f.get("fee_amount") ?? "").trim());
      if (!String(f.get("fee_amount") ?? "").trim() || !Number.isFinite(fee) || fee <= 0) {
        next.fee = "Please enter the fee, or switch to Free.";
      }
    }
    // damage_price is a required answer: a positive amount, or the explicit
    // "No charge if damaged" (damage_waived, stored as 0). Never silently empty.
    if (!damageWaived) {
      const raw = String(f.get("damage_price") ?? "").trim();
      const n = Number(raw);
      if (raw === "" || !Number.isFinite(n) || n <= 0) {
        next.damage = "Please enter a damage price, even a small one. Or tick “No charge if damaged”.";
      }
    }
    if (!String(f.get("city") ?? "").trim()) next.city = "Please add a pickup city or area.";
    if (!safetyAck) next.safety = "Please confirm to continue.";
    if (Object.keys(next).length === 0) {
      setErrors({});
      setPublished(true);
      return;
    }
    // Commit the error state first, then move focus to the first problem so
    // keyboard and screen-reader users land on it (not on a stale field).
    flushSync(() => setErrors(next));
    const first = (Object.keys(FOCUS_TARGET) as Field[]).find((k) => next[k]);
    if (first) document.getElementById(FOCUS_TARGET[first])?.focus();
  }

  // Props tying a control to its error message.
  const invalid = (field: Field) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? errorId(field) : undefined,
  });

  if (published) {
    return (
      <FocusStatus className="rounded-lg border-4 border-border bg-secondary p-6 text-lg font-black text-secondary-foreground shadow">
        {WRITES_ENABLED ? "Listing published." : "Preview only: nothing was sent or saved yet."}
      </FocusStatus>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
      <FieldBox label="Title" htmlFor="title" field="title" error={errors.title}>
        <Input id="title" name="title" maxLength={120} placeholder="e.g. Socket wrench set" {...invalid("title")} />
      </FieldBox>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldBox label="Category" htmlFor="category" field="category" error={errors.category}>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="min-h-11 md:min-h-10 w-full" {...invalid("category")}>
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug} className="min-h-11 md:min-h-10">
                  <CategoryIcon slug={c.slug} /> {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs">Not allowed for now: {BLOCKED_CATEGORIES.join(", ").toLowerCase()}.</p>
        </FieldBox>
        <FieldBox label="Condition" htmlFor="condition" field="condition" error={errors.condition}>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger id="condition" className="min-h-11 md:min-h-10 w-full" {...invalid("condition")}>
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CONDITION_LABEL).map(([k, v]) => (
                <SelectItem key={k} value={k} className="min-h-11 md:min-h-10">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldBox>
      </div>

      <FieldBox label="Photos" htmlFor="photos">
        <Input id="photos" name="photos" type="file" accept="image/*" multiple className="min-h-11 md:min-h-10" />
        <p className="text-xs">A few clear photos help borrowers say yes. Up to 8.</p>
      </FieldBox>

      <FieldBox label="Description" htmlFor="description">
        <Textarea id="description" name="description" rows={4} maxLength={2000} placeholder="What's included, anything to know before borrowing." />
      </FieldBox>

      <FieldBox label="Free or fee" field="fee" error={errors.fee}>
        <RadioGroup value={pricing} onValueChange={(v) => setPricing(v as "free" | "fee")} className="flex flex-wrap gap-x-6" aria-label="Free or fee">
          <label className="flex min-h-11 md:min-h-10 cursor-pointer items-center gap-2 font-bold"><RadioGroupItem value="free" /> Free</label>
          <label className="flex min-h-11 md:min-h-10 cursor-pointer items-center gap-2 font-bold"><RadioGroupItem value="fee" /> Small fee</label>
        </RadioGroup>
        {pricing === "fee" && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-black" aria-hidden>$</span>
            <Input id="fee_amount" name="fee_amount" type="number" min="0" step="0.01" inputMode="decimal" placeholder="Fee" aria-label="Fee in USD" className="min-h-11 md:min-h-10 max-w-32" {...invalid("fee")} />
            <Select value={feePeriod} onValueChange={(v) => setFeePeriod(v as "day" | "week" | "loan")}>
              <SelectTrigger className="min-h-11 md:min-h-10 w-36" aria-label="Fee period"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="loan" className="min-h-11 md:min-h-10">per loan</SelectItem>
                <SelectItem value="day" className="min-h-11 md:min-h-10">per day</SelectItem>
                <SelectItem value="week" className="min-h-11 md:min-h-10">per week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <p className="text-xs">
          Lending is free by default. If you&apos;d like a small fee, you can set one. Any fee is agreed and paid directly between you and the borrower, not through this site.
        </p>
      </FieldBox>

      {/* Damage price: its own required question. Plain heading inside the box (no <legend> sitting on the border). */}
      <section
        role="group"
        aria-labelledby="damage-q"
        aria-describedby="damage-help"
        className="space-y-3 rounded-lg border-4 border-border bg-accent p-4 text-accent-foreground"
      >
        <h2 id="damage-q" className="text-lg font-black leading-snug">
          If this gets damaged or lost, what should the borrower pay?
        </h2>
        <Label htmlFor="damage_price">Damage price (USD)</Label>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black" aria-hidden>$</span>
          <Input
            id="damage_price"
            name="damage_price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            required={!damageWaived}
            disabled={damageWaived}
            placeholder={damageWaived ? "No charge" : "e.g. 60"}
            className="min-h-11 md:min-h-10 max-w-40 bg-background text-foreground"
            {...invalid("damage")}
          />
        </div>
        <p className="text-sm font-medium">
          Enter an amount. This is what the borrower agrees to owe you if the item comes back damaged or lost.
        </p>
        <label className="flex min-h-11 md:min-h-10 cursor-pointer items-center gap-3 text-sm font-bold">
          <Checkbox
            checked={damageWaived}
            onCheckedChange={(v) => setDamageWaived(v === true)}
            className="size-5 bg-background"
          />
          No charge if damaged
        </label>
        <p id="damage-help" className="text-xs">
          Think repair cost or replacement value, whichever is fair. Borrowers see this before they request, so a
          realistic number helps people say yes. The site doesn&apos;t collect this money. You and the borrower settle it directly.
        </p>
        {errors.damage && (
          <p id={errorId("damage")} role="alert" className="rounded-lg border-2 border-border bg-background p-2 text-sm font-bold text-destructive">
            {errors.damage}
          </p>
        )}
      </section>

      <FieldBox label="Pickup area" htmlFor="city" field="city" error={errors.city}>
        <Input id="city" name="city" maxLength={80} placeholder="e.g. Portland, OR" className="min-h-11 md:min-h-10" {...invalid("city")} />
        <p className="text-xs">Pick a city or general area. Don&apos;t put your exact address in the listing.</p>
      </FieldBox>

      <CheckField
        id="safety-ack"
        checked={safetyAck}
        onChange={setSafetyAck}
        error={errors.safety}
        helper="The site doesn't inspect or guarantee items. Check it over before it goes out, and again before you use it."
      >
        I&apos;m responsible for the safety of this item. I&apos;ve checked that it&apos;s safe to lend and that my
        description is accurate to the best of my knowledge.
      </CheckField>

      <Button type="submit" size="lg" className="w-full">Publish listing</Button>
    </form>
  );
}

function FieldBox({
  label,
  htmlFor,
  field,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  field?: Field;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="font-bold">{label}</Label>
      {children}
      {error && (
        <p id={field ? errorId(field) : undefined} role="alert" className="text-sm font-bold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
