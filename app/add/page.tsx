/** @format */

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RecallOutputMedia from '@/components/RecallOutputMedia';

const AddPage = () => {
  const searchParams = useSearchParams();
  const botId = searchParams.get('BotID');
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
    url.searchParams.set('BotID', newBotId);
    window.history.replaceState({}, '', url.toString());
  };

  const handleError = (error: string) => {
    console.error('Recall.ai Error:', error);
    // You can add toast notifications here if needed
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Recall.ai Output Media
          </h1>
          <p className='text-gray-600'>
            Stream your AI interface to Google Meet calls using Recall.ai
          </p>
        </div>

        <RecallOutputMedia
          botId={currentBotId || undefined}
          onBotCreated={handleBotCreated}
          onError={handleError}
        />

        <div className='mt-8 max-w-2xl mx-auto'>
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h3 className='font-semibold text-blue-900 mb-2'>How it works:</h3>
            <ul className='text-sm text-blue-800 space-y-1'>
              <li>• Enter your Google Meet URL to join the call</li>
              <li>
                • The bot will stream your AI interface (https://aipm.so/ai) to
                the meeting
              </li>
              <li>
                • Real-time meeting transcripts are received via WebSocket
              </li>
              <li>
                • Use the Recall.ai dashboard for debugging and monitoring
              </li>
            </ul>
          </div>

          <div className='mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <h3 className='font-semibold text-yellow-900 mb-2'>
              Requirements:
            </h3>
            <ul className='text-sm text-yellow-800 space-y-1'>
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

export default AddPage;
