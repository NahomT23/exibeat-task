"use client";

import { useState, useEffect } from "react";
import { getSubmissionsForDJ } from "@/lib/api";
import TrackCard from "@/components/TrackCard";

function DJDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const djId = "dj_456";

  const markAsRead = (submissionId: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.submissionId === submissionId
          ? { ...sub, unreadProducerMessage: false }
          : sub
      )
    );
  };

  const markAsReplied = (submissionId: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.submissionId === submissionId
          ? { ...sub, djReplied: true }
          : sub
      )
    );
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const data = await getSubmissionsForDJ(djId);
        setSubmissions(data);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [djId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Track Submissions for DJ</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {submissions.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No tracks submitted yet
            </div>
          ) : (
            <div className="flex flex-col w-full space-y-6">
              {submissions.map((submission) => (
                <TrackCard
                  key={submission.submissionId}
                  submission={submission}
                  djId={djId}
                  onMessageRead={() => markAsRead(submission.submissionId)}
                  onFeedbackSent={() => markAsReplied(submission.submissionId)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DJDashboard;
