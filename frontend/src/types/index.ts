export interface Submission {
  submissionId: string;
  producerId: string;
  djId: string;
  trackTitle: string;
  trackDescription?: string;
  hasInitialMessage: boolean;
  unreadProducerMessage: boolean;
  djReplied: boolean;
  unreadDjReply: boolean;
  messages?: Message[];
  tags?: string[];
}

export interface Message {
  senderId: string;
  text: string;
  createdAt?: Date;
}