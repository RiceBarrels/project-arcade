import { Info, Lock, ShieldCheck } from "lucide-react";
import { CategoryArtwork } from "@/components/illustrations";
import { ReportButton } from "@/components/report-button";
import { formatMessageTime } from "./format";
import { LoanStatusBadge } from "./loan-status-badge";
import { MessageComposer } from "./message-composer";
import { DELETED_ACCOUNT, type ThreadData, type ThreadMessage } from "./types";

// One conversation per loan. Server component; only the composer and the
// report dialog run on the client.
export function ThreadView({ thread, preview = false }: { thread: ThreadData; preview?: boolean }) {
  const otherName = thread.other?.display_name ?? DELETED_ACCOUNT;
  const { status } = thread;

  // Who may write, per docs/copy-en.md 17.6:
  // - requested: locked until the lender approves.
  // - approved / handed_off: open.
  // - returned / damaged: still open (owner decision, matches messages_insert in
  //   supabase/05-messages-and-deletion.sql) so a damage claim can be settled; shows the finished-loan banner.
  // - declined / cancelled: never opened (getMyConversations doesn't list them either).
  // A deleted other party also closes the composer (the insert policy requires both people to exist).
  const isFinished = status === "returned" || status === "damaged";
  const isOpen = status === "approved" || status === "handed_off" || isFinished;
  const canWrite = isOpen && thread.other !== null;

  return (
    <div className="space-y-6">
      {preview && (
        <p className="rounded-lg border-4 border-border bg-secondary p-3 font-black text-secondary-foreground shadow-xs sm:p-4">
          Sample conversation. Nothing here is real or saved.
        </p>
      )}

      <header className="flex flex-wrap items-center gap-4">
        {thread.itemCategory && (
          <CategoryArtwork
            slug={thread.itemCategory}
            className="size-16 shrink-0 rounded-lg border-2 border-border p-1 sm:size-20"
          />
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <h1 className="text-3xl font-black break-words uppercase sm:text-4xl">
            {thread.itemTitle} with {otherName}
          </h1>
          <LoanStatusBadge status={status} />
        </div>
      </header>

      <section
        aria-label="Safety"
        className="space-y-2 rounded-lg border-2 border-border bg-accent p-4 text-accent-foreground shadow-xs"
      >
        <p className="flex items-start gap-2 font-bold">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0" />
          The other person can&apos;t see your email address. Keep chat on the site.
        </p>
        <ul className="space-y-1 pl-7 text-sm font-medium">
          <li className="list-disc">Don&apos;t share passwords, payment details, or ID numbers in messages.</li>
          <li className="list-disc">Meet somewhere public if you can.</li>
        </ul>
      </section>

      <section aria-labelledby="thread-messages-heading" className="space-y-3">
        <h2 id="thread-messages-heading" className="sr-only">
          Messages
        </h2>
        {thread.messages.length === 0 ? (
          <p className="rounded-lg border-2 border-dashed border-border bg-muted p-4 font-medium">No messages yet. Say hello and agree a time and place.</p>
        ) : (
          <ol className="space-y-3">
            {thread.messages.map((m) => (
              <Bubble key={m.id} message={m} mine={m.sender_id === thread.myId} otherName={otherName} otherId={thread.other?.id ?? null} />
            ))}
          </ol>
        )}
      </section>

      {isFinished && <Notice icon="info">This loan is finished. You can still message each other about a damage claim.</Notice>}
      {status === "requested" ? (
        <Notice icon="lock">Messaging opens once the lender approves the request.</Notice>
      ) : !isOpen ? (
        <Notice icon="lock">This request is closed, so you can&apos;t send new messages.</Notice>
      ) : !canWrite ? (
        <Notice icon="info">The other person deleted their account, so new messages can&apos;t be sent.</Notice>
      ) : (
        <MessageComposer loanId={thread.loanId} senderId={thread.myId} preview={preview} />
      )}

      {thread.other && (
        <div
          role="group"
          aria-labelledby="report-conversation-label"
          className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-border pt-4"
        >
          <p id="report-conversation-label" className="text-sm font-bold">
            Report this conversation
          </p>
          <ReportButton target="user" targetId={thread.other.id} />
        </div>
      )}
    </div>
  );
}

function Bubble({
  message,
  mine,
  otherName,
  otherId,
}: {
  message: ThreadMessage;
  mine: boolean;
  otherName: string;
  otherId: string | null;
}) {
  const sender = mine
    ? "You"
    : message.sender_id === null
      ? DELETED_ACCOUNT
      : message.sender_id === otherId
        ? otherName
        : DELETED_ACCOUNT;
  const time = formatMessageTime(message.created_at);
  return (
    <li className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] space-y-1 rounded-lg border-2 border-border p-3 shadow-xs sm:max-w-[70%] ${
          mine ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
        }`}
      >
        <p className="text-xs font-black uppercase">{sender}</p>
        <p className="break-words whitespace-pre-wrap">{message.body}</p>
        {time && (
          <p className="text-xs font-medium">
            <time dateTime={message.created_at}>{time}</time>
          </p>
        )}
      </div>
    </li>
  );
}

function Notice({ icon, children }: { icon: "lock" | "info"; children: React.ReactNode }) {
  const Icon = icon === "lock" ? Lock : Info;
  return (
    <p className="flex items-start gap-2 rounded-lg border-2 border-border bg-muted p-4 font-bold">
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0" />
      {children}
    </p>
  );
}
