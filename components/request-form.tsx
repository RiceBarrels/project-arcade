"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckField } from "@/components/check-field";
import { FocusStatus } from "@/components/focus-status";
import { useT } from "@/i18n/client";
import { WRITES_ENABLED } from "@/lib/domain";

// Writes are off (WRITES_ENABLED): the form validates, then shows a preview notice.
// When enabled: insert into loans (borrower_ack_damage_price) or queue_entries.
// Maps to loans.borrower_ack_damage_price + profiles.over_18_confirmed.
export function RequestForm({
  itemId,
  damagePrice,
  damageWaived,
  currency,
  canRequest,
  isOwner,
}: {
  itemId: string;
  damagePrice: number;
  damageWaived: boolean;
  currency?: string;
  /** true: request now; false: join the queue */
  canRequest: boolean;
  isOwner: boolean;
}) {
  const t = useT();
  const [ackDamage, setAckDamage] = useState(false);
  const [ackSafety, setAckSafety] = useState(false);
  const [adult, setAdult] = useState(false);
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);

  if (isOwner) {
    return (
      <p className="rounded-lg border-2 border-border bg-muted p-4 font-bold shadow">
        {t("This is your listing. Borrowers will see the request button here.")}
      </p>
    );
  }

  if (done) {
    return (
      // data-request-sent hides the phone sticky bar (see item page); id keeps #request valid.
      <div id="request" data-request-sent className="scroll-mt-4">
        <FocusStatus className="rounded-lg border-2 border-border bg-secondary p-4 font-bold text-secondary-foreground shadow">
          {!WRITES_ENABLED
            ? t("Preview only: nothing was sent or saved yet.")
            : canRequest
              ? t("Request sent. The lender will get back to you.")
              : t("Added to your queue. You keep your place in line.")}
        </FocusStatus>
      </div>
    );
  }

  const ok = ackDamage && ackSafety && adult;

  return (
    <form
      id="request"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTried(true);
        if (ok) setDone(true);
      }}
      className="scroll-mt-4 space-y-4 rounded-lg border-2 border-border bg-card p-5 shadow"
      data-item={itemId}
    >
      <CheckField
        id="ack-damage"
        checked={ackDamage}
        onChange={setAckDamage}
        error={tried && !ackDamage ? t("Please confirm the damage price to send your request.") : undefined}
        helper={t("The site doesn't take or hold any payment.")}
      >
        {damageWaived
          ? t("I understand the lender has set no charge if this item comes back damaged or lost, and I'll still take good care of it.")
          : t(
              "I understand that if this item comes back damaged or lost, I'll owe the lender the damage price of {price}, and we'll settle it directly.",
              { price: t.money(damagePrice, currency) },
            )}
      </CheckField>
      <CheckField
        id="ack-safety"
        checked={ackSafety}
        onChange={setAckSafety}
        error={tried && !ackSafety ? t("Please confirm to continue.") : undefined}
        helper={t("The site doesn't inspect or guarantee items. Check it over before it goes out, and again before you use it.")}
      >
        {t("I'm responsible for the safety of this item while I have it. I'll check it before use and use it appropriately.")}
      </CheckField>
      <CheckField
        id="ack-adult"
        checked={adult}
        onChange={setAdult}
        error={tried && !adult ? t("You need to be 18 or older to borrow.") : undefined}
        helper={t("You must be at least 18 to use this site.")}
      >
        {t("I'm 18 or older.")}
      </CheckField>
      <Button type="submit" size="lg" className="w-full">
        {canRequest ? t("Request to borrow") : t("Join the queue")}
      </Button>
    </form>
  );
}
