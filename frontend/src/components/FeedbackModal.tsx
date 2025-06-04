// components/FeedbackModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendFeedback } from "@/lib/api";

interface FeedbackModalProps {
  submission: {
    submissionId: string;
    producerId: string;
    djId: string;
    trackTitle: string;
    hasInitialMessage: boolean;
    djReplied: boolean;
  };
  messages: { senderId: string; text: string; createdAt?: string }[];
  loadingMessages: boolean;
  djId: string;
  isOpen: boolean;
  onClose: () => void;
  onFeedbackSent: () => void;
  setMessages: (messages: any[]) => void;
}

export default function FeedbackModal({
  submission,
  messages,
  loadingMessages,
  djId,
  isOpen,
  onClose,
  onFeedbackSent,
  setMessages,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    setIsSubmitting(true);

    const newMessage = {
      senderId: djId,
      text: feedback.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      // Optimistically update UI
      setMessages([...messages, newMessage]);


      await sendFeedback(submission.submissionId, {
        senderId: djId,
        text: feedback.trim(),
      });

      setFeedback("");
      onFeedbackSent();
    } catch (error) {
      console.error("Failed to send feedback:", error);

      setMessages((prev) => prev.filter((m) => m !== newMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          {/*  track title */}
          <DialogTitle>{submission.trackTitle}</DialogTitle>
          <div className="text-sm text-gray-500 mt-1">
            From Producer: {submission.producerId}
          </div>
        </DialogHeader>

        <div className="py-4 space-y-6 px-4">
          {loadingMessages ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {messages.length > 0 &&
                messages.map((msg, index) => {
                  const isDJ = msg.senderId === djId;
                  const timestamp = msg.createdAt
                    ? new Date(msg.createdAt)
                    : new Date();

                  const weekday = timestamp.toLocaleDateString("en-US", {
                    weekday: "long",
                  });
                  const timeOnly = timestamp.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isDJ ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-4 rounded-lg max-w-[80%] ${
                          isDJ ? "bg-blue-50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          <span className="font-medium">
                            {isDJ ? "You" : "Producer"}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {weekday}, {timeOnly}
                          </span>
                        </div>
                        <p className="text-gray-700">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>

        <div className="mx-4 mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Your Feedback
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Type your reply to the producer..."
            className="min-h-[100px] w-full"
            disabled={submission.djReplied}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-2 px-4 pb-4 sticky bottom-0 bg-white">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !feedback.trim() || isSubmitting || submission.djReplied
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {submission.djReplied
              ? "Already Sent"
              : isSubmitting
              ? "Sending..."
              : "Send Feedback"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
