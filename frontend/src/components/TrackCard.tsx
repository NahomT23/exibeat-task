"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FeedbackModal from "@/components/FeedbackModal";
import React from "react";
import ProgressBar from "@/components/ProgressBar";
import { getMessages } from "@/lib/api";

interface TrackCardProps {
  submission: {
    submissionId: string;
    trackTitle: string;
    producerId: string;
    hasInitialMessage: boolean;
    unreadProducerMessage: boolean;
    djReplied: boolean;
  };
  djId: string;
  onMessageRead: () => void;
  onFeedbackSent: () => void;
}

export default function TrackCard({
  submission,
  djId,
  onMessageRead,
  onFeedbackSent,
}: TrackCardProps) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    if (!showFeedbackModal) return;

    (async () => {
      setLoadingMessages(true);
      try {
        const data = await getMessages(submission.submissionId, djId);
        setMessages(data.messages || []);
        if (submission.unreadProducerMessage) {
          onMessageRead();
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoadingMessages(false);
      }
    })();
  }, [showFeedbackModal, submission.submissionId, djId, onMessageRead]);

  return (
    <div className="bg-white rounded-xl shadow-md w-full flex flex-col space-y-2">
      <div className="flex items-center px-4 pt-4">



        <div className="flex items-center flex-1">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{submission.trackTitle}</h2>
            <div className="flex items-center mt-1">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <span className="text-sm text-gray-600 ml-2">
                {submission.producerId}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 mx-4">
          <ProgressBar progress={30} />
        </div>


        <div className="flex flex-col items-end">
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-gray-800 underline"
            onClick={() => setShowFeedbackModal(true)}
            disabled={submission.djReplied}
          >
            Send Feedback
          </Button>
          {submission.hasInitialMessage && submission.unreadProducerMessage && (
            <div className="mt-1 text-xs text-gray-500">1 unread message</div>
          )}
        </div>
      </div>

      <FeedbackModal
        submission={{
          ...submission,
          producerId: submission.producerId,
          djId,
        }}
        messages={messages}
        loadingMessages={loadingMessages}
        djId={djId}
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onFeedbackSent={() => {
          onFeedbackSent();
          setShowFeedbackModal(false);
        }}
        setMessages={setMessages}
      />
    </div>
  );
}
