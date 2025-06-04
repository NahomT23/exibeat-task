// app/producer/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MessageModal from "@/components/MessageModal";
import { submitTrack } from "@/lib/api";
import { XIcon } from "@/components/XIcon";

export default function ProducerDashboard() {
  const [trackTitle, setTrackTitle] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!trackTitle) return;
    setIsSubmitting(true);
    try {
      await submitTrack({
        producerId: "prod_123", // TODO: replace with actual user ID
        djId: "dj_456",
        trackTitle,
        initialMessage: message || undefined
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Tracks Submitted
        </h1>

        <div className="flex items-center mb-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div className="ml-4 flex-grow">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {trackTitle}
              </span>
            </div>
            {message && (
              <div className="text-sm text-gray-600 mt-1">
                Message: {message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Submit Your Track
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Track Title
        </label>
        <input
          type="text"
          value={trackTitle}
          onChange={(e) => setTrackTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter track title"
          required
        />
      </div>

      <div className="flex items-center mb-6">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        <div className="ml-4 flex-grow">
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {trackTitle || "Untitled Track"}
            </span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                setTrackTitle("");
                setMessage("");
              }}
            >
              <XIcon />
            </button>
          </div>
          <button
            onClick={() => setShowMessageModal(true)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-1"
          >
            {message ? "Edit Message" : "Add Message"}
          </button>
          {message && (
            <div className="text-sm text-gray-600 mt-1 line-clamp-1">
              Message: {message}
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!trackTitle || isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isSubmitting ? "Submitting..." : "Submit Track"}
      </Button>

      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}