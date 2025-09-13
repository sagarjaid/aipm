/** @format */

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RecallOutputMedia from "@/components/RecallOutputMedia";

const AddPageContent = () => {
  const searchParams = useSearchParams();
  const botId = searchParams.get("BotID");
  const [currentBotId, setCurrentBotId] = useState<string | null>(botId);

  useEffect(() => {
    if (botId) {
      setCurrentBotId(botId);
    }
  }, [botId]);

  const handleBotCreated = (newBotId: string) => {
    setCurrentBotId(newBotId);
    // Update URL with bot ID
    const url = new URL(window.location.href);
    url.searchParams.set("BotID", newBotId);
    window.history.replaceState({}, "", url.toString());
  };

  const handleError = (error: string) => {
    console.error("Recall.ai Error:", error);
    // You can add toast notifications here if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Recall.ai Output Media
          </h1>
          <p className="text-gray-600">
            Stream your AI interface to Google Meet calls using Recall.ai
          </p>
        </div>

        <RecallOutputMedia
          botId={currentBotId || undefined}
          onBotCreated={handleBotCreated}
          onError={handleError}
        />

        <div className="mx-auto mt-8 max-w-2xl">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">How it works:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Enter your Google Meet URL to join the call</li>
              <li>
                • The bot will stream your AI interface (https://getaipm.com/ai)
                to the meeting
              </li>
              <li>
                • Real-time meeting transcripts are received via WebSocket
              </li>
              <li>
                • Use the Recall.ai dashboard for debugging and monitoring
              </li>
            </ul>
          </div>

          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="mb-2 font-semibold text-yellow-900">
              Requirements:
            </h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• Recall.ai API key configured in environment variables</li>
              <li>• Google Meet URL with proper permissions</li>
              <li>• Your AI interface running at the specified URL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <AddPageContent />
    </Suspense>
  );
};

export default AddPage;
