"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { FocusStatus } from "@/components/focus-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useT } from "@/i18n/client";
import { WRITES_ENABLED } from "@/lib/domain";
import { updateProfile } from "@/components/settings/actions";
import {
  BIO_PLACEHOLDER,
  LIMITS,
  PREVIEW_ONLY,
  PROFILE_ERROR,
  PROFILE_SAVED,
  validateProfile,
  type ProfileErrors,
  type ProfileValues,
} from "@/components/settings/shared";

// Profile editor. Writes are off (WRITES_ENABLED): validates, then shows the
// preview notice. When enabled it calls the updateProfile Server Action, which
// re-reads the session and updates public.profiles for that user only.
// Errors and notices hold English source strings (msg) and are translated when shown.
export function ProfileForm({ initial }: { initial: ProfileValues }) {
  const t = useT();
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [formError, setFormError] = useState("");
  // Bumped on every successful submit so FocusStatus remounts and takes focus again.
  const [notice, setNotice] = useState<{ n: number; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function focusFirstInvalid(errs: ProfileErrors) {
    const first = (["display_name", "city", "bio"] as const).find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const fd = new FormData(e.currentTarget);
    const { values, errors: errs } = validateProfile({
      display_name: fd.get("display_name"),
      city: fd.get("city"),
      bio: fd.get("bio"),
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setNotice(null);
      focusFirstInvalid(errs);
      return;
    }
    if (!WRITES_ENABLED) {
      setNotice((prev) => ({ n: (prev?.n ?? 0) + 1, text: PREVIEW_ONLY }));
      return;
    }
    startTransition(async () => {
      const res = await updateProfile(values, t.locale).catch(() => ({ ok: false as const, error: PROFILE_ERROR }));
      if (res.ok) {
        setNotice((prev) => ({ n: (prev?.n ?? 0) + 1, text: PROFILE_SAVED }));
      } else {
        setNotice(null);
        const fields = "fields" in res ? res.fields : undefined;
        if (fields) {
          setErrors(fields);
          focusFirstInvalid(fields);
        } else {
          setFormError(res.error);
        }
      }
    });
  }

  // Editing again clears a stale confirmation.
  const clearNotice = () => {
    if (notice) setNotice(null);
    if (formError) setFormError("");
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={clearNotice} noValidate className="space-y-5">
      <Field
        name="display_name"
        label={t("Display name")}
        error={errors.display_name}
        hint={t("Up to {max} characters.", { max: LIMITS.display_name })}
      >
        {(a11y) => (
          <Input
            {...a11y}
            defaultValue={initial.display_name}
            maxLength={LIMITS.display_name}
            autoComplete="nickname"
            required
            aria-required
          />
        )}
      </Field>
      <Field
        name="city"
        label={t("City")}
        error={errors.city}
        hint={t("Optional. Up to {max} characters.", { max: LIMITS.city })}
      >
        {(a11y) => (
          <Input {...a11y} defaultValue={initial.city} maxLength={LIMITS.city} autoComplete="address-level2" />
        )}
      </Field>
      <Field
        name="bio"
        label={t("Bio")}
        error={errors.bio}
        hint={t("Optional. Up to {max} characters.", { max: LIMITS.bio })}
      >
        {(a11y) => (
          <Textarea
            {...a11y}
            defaultValue={initial.bio}
            maxLength={LIMITS.bio}
            placeholder={t(BIO_PLACEHOLDER)}
            className="min-h-28"
          />
        )}
      </Field>

      {formError && (
        <p role="alert" className="rounded-lg border-2 border-border bg-background p-3 text-sm font-bold text-destructive">
          {t(formError)}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? t("Saving…") : t("Save changes")}
        </Button>
        {notice && (
          <FocusStatus
            key={notice.n}
            className="rounded-lg border-2 border-border bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground shadow-xs"
          >
            {t(notice.text)}
          </FocusStatus>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: keyof ProfileValues;
  label: string;
  hint?: string;
  error?: string;
  children: (a11y: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
  }) => React.ReactNode;
}) {
  const t = useT();
  const id = `settings-${name}`;
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-bold">
        {label}
      </Label>
      {children({ id, name, "aria-invalid": !!error, "aria-describedby": describedBy })}
      {hint && (
        <p id={`${id}-hint`} className="text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-bold text-destructive">
          {t(error, { max: LIMITS[name] })}
        </p>
      )}
    </div>
  );
}
