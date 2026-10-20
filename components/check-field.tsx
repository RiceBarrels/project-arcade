"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Required confirmation checkbox with optional helper and inline error.
export function CheckField({
  id,
  checked,
  onChange,
  error,
  helper,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  helper?: React.ReactNode;
  children: React.ReactNode;
}) {
  const describedBy = [helper ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onChange(v === true)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className="mt-2.5 size-5"
        />
        <Label htmlFor={id} className="block min-h-10 flex-1 cursor-pointer py-2 leading-snug">
          <span>{children}</span>
        </Label>
      </div>
      {helper && (
        <p id={`${id}-help`} className="pl-8 text-xs">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="pl-8 text-sm font-bold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
