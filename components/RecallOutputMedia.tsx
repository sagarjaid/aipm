/** @format */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, X, Settings } from 'lucide-react';

interface RecallOutputMediaProps {
  botId?: string;
  onBotCreated?: (botId: string) => void;
  onError?: (error: string) => void;
}

const RecallOutputMedia: React.FC<RecallOutputMediaProps> = ({
  botId: initialBotId,
  onBotCreated,
  onError,
}) => {
  const [botId, setBotId] = useState<string | null>(initialBotId || null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meetingUrl, setMeetingUrl] = useState('');
  const [botName, setBotName] = useState('AI Assistant');
  const [webpageUrl, setWebpageUrl] = useState('https://aipm.so/ai?botID');
  const [showSettings, setShowSettings] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);

  // WebSocket connection for real-time transcript using us-west-2 region
  useEffect(() => {
    if (botId && isConnected) {
      const ws = new WebSocket(
        'wss://meeting-data.bot.recall.ai/api/v1/transcript'
      );

      ws.onopen = () => {
        console.log('Connected to Recall transcript WebSocket (us-west-2)');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Transcript data:', data);
          // Handle real-time transcript data here
        } catch (error) {
          console.error('Error parsing transcript data:', error);
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from Recall transcript WebSocket');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      wsRef.current = ws;

      return () => {
        ws.close();
      };
    }
  }, [botId, isConnected]);

  const createBot = async () => {
    if (!meetingUrl.trim()) {
      setError('Please enter a Google Meet URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recall/create-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meetingUrl: meetingUrl.trim(),
          botName: botName.trim(),
          webpageUrl: webpageUrl.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create bot');
      }

      setBotId(data.botId);
      setIsConnected(true);
      onBotCreated?.(data.botId);

      console.log('Bot created successfully:', data);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create bot';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const stopBot = async () => {
    if (!botId) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/recall/stop-media', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ botId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to stop bot');
      }

      setIsConnected(false);
      setBotId(null);
      console.log('Bot stopped successfully');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to stop bot';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMeetingUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingUrl(e.target.value);
    // Auto-detect if it's a Google Meet URL and suggest a bot name
    if (e.target.value.includes('meet.google.com')) {
      setBotName('AI Meeting Assistant');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-gray-900'>
          Recall.ai Output Media
        </h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className='p-2 text-gray-500 hover:text-gray-700 transition-colors'>
          <Settings size={20} />
        </button>
      </div>

      {error && (
        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
          {error}
        </div>
      )}

      {!isConnected ? (
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Google Meet URL
            </label>
            <input
              type='url'
              value={meetingUrl}
              onChange={handleMeetingUrlChange}
              placeholder='https://meet.google.com/xxx-xxxx-xxx'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {showSettings && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Bot Name
                </label>
                <input
                  type='text'
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder='AI Assistant'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Webpage URL
                </label>
                <input
                  type='url'
                  value={webpageUrl}
                  onChange={(e) => setWebpageUrl(e.target.value)}
                  placeholder='https://aipm.so/ai?botID'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </>
          )}

          <button
            onClick={createBot}
            disabled={isLoading || !meetingUrl.trim()}
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'>
            {isLoading ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                Creating Bot...
              </>
            ) : (
              <>
                <Video size={20} />
                Start Output Media
              </>
            )}
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          <div className='p-4 bg-green-50 border border-green-200 rounded-md'>
            <div className='flex items-center gap-2 text-green-800'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <span className='font-medium'>Connected to Meeting</span>
            </div>
            <p className='text-sm text-green-600 mt-1'>Bot ID: {botId}</p>
          </div>

          <div className='flex gap-3'>
            <button
              onClick={stopBot}
              disabled={isLoading}
              className='flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'>
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                  Stopping...
                </>
              ) : (
                <>
                  <X size={20} />
                  Stop Bot
                </>
              )}
            </button>
          </div>

          <div className='text-sm text-gray-600'>
            <p>
              • The bot is now streaming your webpage to the Google Meet call
            </p>
            <p>• Real-time transcripts are being received via WebSocket</p>
            <p>
              • Use the debug tools in Recall.ai dashboard to monitor
              performance
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecallOutputMedia;
