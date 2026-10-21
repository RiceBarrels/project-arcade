"use client";

import { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useT } from "@/i18n/client";
import { hapticsEnabled, hapticsSupported, setHapticsEnabled, tapFeedback } from "@/lib/haptics";

// Per-browser preferences (stored in localStorage, not the account).
// Copy: docs/copy-en.md 18.4.
export function DevicePrefs() {
  const t = useT();
  // null until mounted: support and the stored choice are only known in the browser.
  const [state, setState] = useState<{ supported: boolean; on: boolean } | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ supported: hapticsSupported(), on: hapticsEnabled() });
  }, []);

  return (
    <section aria-labelledby="settings-device" className="rounded-lg border-4 border-border bg-card p-5 text-card-foreground shadow sm:p-6">
      <h2 id="settings-device" className="mb-4 flex items-center gap-2 text-2xl font-black">
        <Smartphone aria-hidden className="size-6" /> {t("This device")}
      </h2>
      <div className="flex min-h-11 items-center justify-between gap-4">
        <label htmlFor="haptics" className="font-bold">
          {t("Vibrate on tap")}
        </label>
        <Switch
          id="haptics"
          aria-describedby="haptics-hint"
          disabled={!state?.supported}
          checked={!!state?.supported && state.on}
          onCheckedChange={(on) => {
            setHapticsEnabled(on);
            setState((s) => (s ? { ...s, on } : s));
            if (on) tapFeedback();
          }}
        />
      </div>
      <p id="haptics-hint" className="mt-1 text-sm">
        {state && !state.supported
          ? t("This browser can't vibrate. Some devices, including iPhones and iPads, don't support it.")
          : t("A short buzz when you tap buttons. Saved on this device only.")}
      </p>
    </section>
  );
}
