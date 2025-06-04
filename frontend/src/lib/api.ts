const BASE_URL = process.env.BASE_URL

export interface SubmissionSummary {
  submissionId: string;
  trackTitle: string;
  producerId: string;
  hasInitialMessage: boolean;
  unreadProducerMessage: boolean;
  djReplied: boolean;
}

export interface SubmissionDetail {
  submissionId: string;
  producerId: string;
  djId: string;
  trackTitle: string;
  messages: { senderId: string; text: string; createdAt?: string }[];
  hasInitialMessage: boolean;
  djReplied: boolean;
}


export async function getSubmissionsForDJ(djId: string): Promise<SubmissionSummary[]> {
  const res = await fetch(`${BASE_URL}/dj/${djId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch submissions for DJ");
  }
  return res.json();
}


export async function getSubmissionsForProducer(producerId: string): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/producer/${producerId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch submissions for Producer");
  }
  return res.json();
}


export async function getMessages(
  submissionId: string,
  viewerId: string
): Promise<SubmissionDetail> {
  const res = await fetch(`${BASE_URL}/${submissionId}/messages?viewerId=${viewerId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }
  return res.json();
}

// SEND A
export const sendFeedback = async (
  submissionId: string,
  message: { senderId: string; text: string }
) => {
  const response = await fetch(`${BASE_URL}/${submissionId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error("Failed to send feedback");
  }
  return response.json();
};


export async function submitTrack(payload: {
  producerId: string;
  djId: string;
  trackTitle: string;
  initialMessage?: string;
}) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to submit track");
  }
  return res.json();
}
