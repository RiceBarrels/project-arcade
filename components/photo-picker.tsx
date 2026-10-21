"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { useT } from "@/i18n/client";

// Photo picker for the listing form. The browser's own file input words its
// button in the browser's language ("Choose Files"), not the page's, so the
// real <input type="file"> stays in the form (same name, keyboard focus and
// form data) but is visually hidden behind a button-styled label in the page
// language. Files dropped on the control go into the input, as they would on
// a visible file input. Copy: docs/copy-en.md section 23.

export const MAX_PHOTOS = 8;

export function PhotoPicker({ id, name, hintId }: { id: string; name: string; hintId?: string }) {
  const t = useT();
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const statusId = `${id}-status`;
  const errorId = `${id}-error`;

  /** Keeps a valid selection, or clears the input and says why. */
  function take(input: HTMLInputElement, files: File[]) {
    let problem: string | null = null;
    if (files.some((f) => !f.type.startsWith("image/"))) problem = t("Please choose image files only.");
    else if (files.length > MAX_PHOTOS) problem = t("You can add up to 8 photos. Please choose fewer.");
    if (problem) {
      input.value = "";
      setCount(0);
    } else {
      setCount(files.length);
    }
    setError(problem);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const input = document.getElementById(id);
    const files = [...e.dataTransfer.files];
    if (!(input instanceof HTMLInputElement) || files.length === 0) return;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    input.files = dt.files;
    take(input, files);
  }

  return (
    <div className="space-y-1">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg ${dragging ? "outline-2 outline-offset-4 outline-ring outline-dashed" : ""}`}
      >
        <input
          id={id}
          name={name}
          type="file"
          accept="image/*"
          multiple
          aria-label={count === 0 ? t("Choose photos for your listing") : t("Change photos for your listing")}
          aria-describedby={[statusId, error ? errorId : null, hintId].filter(Boolean).join(" ")}
          aria-invalid={error ? true : undefined}
          onChange={(e) => take(e.currentTarget, [...(e.currentTarget.files ?? [])])}
          className="peer sr-only"
        />
        {/* A second label for the same input: clicking it opens the picker. Hidden
            from screen readers, which get the input's own name (it contains this
            visible text, WCAG 2.5.3) and the status. */}
        <label
          htmlFor={id}
          aria-hidden
          className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg border-2 border-border bg-background px-4 text-sm font-bold shadow-xs transition-transform select-none hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 md:min-h-10"
        >
          <ImagePlus aria-hidden className="size-4" />
          {count === 0 ? t("Choose photos") : t("Change photos")}
        </label>
        <p id={statusId} aria-live="polite" className="text-sm font-medium">
          {count === 0 ? t("No photos chosen yet") : t.plural(count, "{count} photo chosen", "{count} photos chosen")}
        </p>
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm font-bold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
