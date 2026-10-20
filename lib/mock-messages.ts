import type { ThreadData } from "@/components/messages/types";

// Sample conversation for /en/messages/preview. Fictional people and item, no
// contact details. The viewer plays the borrower ("You") in this sample.

export const PREVIEW_LOAN_ID = "preview";

const LENDER = { id: "00000000-0000-4000-8000-00000000a001", display_name: "Rosa" };
const BORROWER_ID = "00000000-0000-4000-8000-00000000b002";

export const previewThread: ThreadData = {
  loanId: PREVIEW_LOAN_ID,
  status: "approved",
  itemTitle: "Two-person dome tent",
  itemCategory: "camping",
  myId: BORROWER_ID,
  other: LENDER,
  messages: [
    {
      id: "preview-1",
      loan_id: PREVIEW_LOAN_ID,
      sender_id: LENDER.id,
      body: "Hi, I approved your request for the tent. When would suit you to pick it up?",
      created_at: "2026-10-17T18:02:00Z",
    },
    {
      id: "preview-2",
      loan_id: PREVIEW_LOAN_ID,
      sender_id: BORROWER_ID,
      body: "Thanks Rosa. Saturday morning works for me. Is around 10 okay?",
      created_at: "2026-10-17T18:15:00Z",
    },
    {
      id: "preview-3",
      loan_id: PREVIEW_LOAN_ID,
      sender_id: LENDER.id,
      body: "10 is fine. How about the main entrance of the Central Library? It's busy on Saturday mornings.",
      created_at: "2026-10-17T18:21:00Z",
    },
    {
      id: "preview-4",
      loan_id: PREVIEW_LOAN_ID,
      sender_id: BORROWER_ID,
      body: "Perfect, I know where that is. I'll bring a big bag for the poles.",
      created_at: "2026-10-17T18:24:00Z",
    },
    {
      id: "preview-5",
      loan_id: PREVIEW_LOAN_ID,
      sender_id: LENDER.id,
      body: "Great. The pegs are in a small pouch inside the tent bag. There should be 12.",
      created_at: "2026-10-17T19:40:00Z",
    },
    {
      id: "preview-6",
      loan_id: PREVIEW_LOAN_ID,
      sender_id: BORROWER_ID,
      body: "Got it, I'll count them when I bring it back. See you Saturday at 10 at the library.",
      created_at: "2026-10-17T19:52:00Z",
    },
  ],
};
