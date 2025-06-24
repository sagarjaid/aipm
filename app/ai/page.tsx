/** @format */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, X, Headphones, MessageSquare } from 'lucide-react';
import { useMeetingAudio } from '@/hooks/useMeetingAudio';

const AnimatedWaveform = ({ active }: { active: boolean }) => {
  const [time, setTime] = useState(0);
  const numBars = 12;
  const baseHeight = 30;
  const maxAmplitude = 50;
  const minAmplitude = 15;
  const maxBarHeight = (baseHeight + maxAmplitude) * 2;

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, [active]);

  // If not active, all bars are the same neutral height
  const heights = Array.from({ length: numBars }, (_, index) => {
    if (!active) return baseHeight;
    const frequency = 0.5 + index * 0.3;
    const distanceFromCenter = Math.abs(index - Math.floor(numBars / 2));
    const amplitude =
      maxAmplitude -
      (distanceFromCenter * (maxAmplitude - minAmplitude)) /
        Math.floor(numBars / 2);
    return baseHeight + Math.sin(time * frequency) * amplitude;
  });

  return (
    <div
      className='flex items-center justify-center'
      style={{ height: maxBarHeight + 100 }}>
      <div className='flex items-center gap-4 w-full h-full'>
        {heights.map((height, index) => (
          <div
            key={index}
            className='bg-white transition-all duration-75 ease-out rounded-full'
            style={{
              width: '12px',
              height: `${height * 2}px`,
              margin: 'auto 0',
              alignSelf: 'center',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add keyframes for dot animation
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes dot-bounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-8px); }
    }
    .animate-dot-bounce {
      animation: dot-bounce 1.2s infinite both;
    }
    @keyframes wave-bounce {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(2.2); }
    }
    .animate-wave {
      animation: wave-bounce 1s infinite ease-in-out;
    }
  `;
  if (!document.getElementById('dot-bounce-style')) {
    style.id = 'dot-bounce-style';
    document.head.appendChild(style);
  }
}

const AIPage: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Meeting audio hook
  const { isListening, startListening, stopListening } = useMeetingAudio({
    onAudioData: (audioData) => {
      // Process meeting audio data here
      console.log('Meeting audio data received:', audioData);
    },
    onError: (error) => {
      console.error('Meeting audio error:', error);
    },
  });

  const conversation = useConversation({
    onConnect: () => {
      setIsInitialized(true);
      setIsLoading(false);
      setError(null);
      resetSilenceTimer();
    },
    onDisconnect: () => {
      setIsInitialized(false);
      clearSilenceTimer();
    },
    onMessage: (message) => {
      if (message.source === 'ai') {
        resetSilenceTimer();
      }
    },
    onError: (error) => {
      setError(
        typeof error === 'string'
          ? error
          : 'An error occurred during the conversation'
      );
      setIsLoading(false);
      clearSilenceTimer();
    },
  });

  // Check if we're in a Recall.ai meeting context
  useEffect(() => {
    const checkMeetingContext = () => {
      // Check if we're running in a Recall.ai bot context
      const isBotContext =
        window.location.href.includes('BotID') ||
        document.referrer.includes('recall.ai') ||
        navigator.userAgent.includes('Recall');

      if (isBotContext) {
        setIsInMeeting(true);
        // Start listening to meeting audio
        startListening();
        // Connect to transcript WebSocket
        connectToTranscriptWebSocket();
      }
    };

    checkMeetingContext();
  }, []);

  // WebSocket connection for real-time transcripts
  const connectToTranscriptWebSocket = () => {
    try {
      const ws = new WebSocket(
        'wss://meeting-data.bot.recall.ai/api/v1/transcript'
      );

      ws.onopen = () => {
        console.log('Connected to Recall transcript WebSocket');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Transcript data:', data);

          // Add transcript to the list
          if (data.text) {
            setTranscripts((prev) => [...prev, data.text]);
          }
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
    } catch (error) {
      console.error('Failed to connect to transcript WebSocket:', error);
    }
  };

  // Silence timer logic
  const resetSilenceTimer = () => {
    clearSilenceTimer();
    silenceTimer.current = setTimeout(() => {
      endConversation();
    }, 60000); // 1 minute
  };

  const clearSilenceTimer = () => {
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
      silenceTimer.current = null;
    }
  };

  // Auto-start conversation on mount
  useEffect(() => {
    const start = async () => {
      try {
        setIsLoading(true);
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
        if (!agentId) throw new Error('Agent ID not configured');
        const response = await fetch('/api/elevenlabs/get-signed-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agentId }),
        });
        if (!response.ok) throw new Error('Failed to get signed URL');
        const { signedUrl } = await response.json();
        await conversation.startSession({ signedUrl });
      } catch (err: any) {
        setError(err.message || 'Failed to start conversation');
        setIsLoading(false);
      }
    };
    start();
    return () => clearSilenceTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endConversation = async () => {
    try {
      await conversation.endSession();
      setIsInitialized(false);
      clearSilenceTimer();

      // Clean up meeting resources
      if (isInMeeting) {
        stopListening();
        if (wsRef.current) {
          wsRef.current.close();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to end conversation');
    }
  };

  // Only animate wave when AI is speaking
  const waveActive = conversation.isSpeaking;
  const micActive = conversation.isSpeaking || isInitialized;

  // Status text logic
  let statusText = '';
  if (isLoading) {
    statusText = 'Loading...';
  } else if (conversation.isSpeaking) {
    statusText = 'AI is speaking...';
  } else if (conversation.status === 'connected') {
    statusText = isInMeeting ? 'Connected to Meeting' : 'Connected';
  } else {
    statusText = 'Disconnected';
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black relative'>
      <div className='flex flex-col gap-4 items-center space-x-4 w-full max-w-2xl'>
        <AnimatedWaveform active={conversation.isSpeaking} />

        <div className='flex items-center gap-4 justify-center'>
          <button
            className='bg-green-500 rounded-xl p-3.5 flex items-center justify-center focus:outline-none'
            aria-label='Mic Button'>
            <Mic
              size={25}
              strokeWidth={2.5}
              className={micActive ? 'text-black' : 'text-green-700'}
            />
          </button>

          {/* Meeting Audio Indicator */}
          {isInMeeting && (
            <button
              className={`rounded-xl p-3.5 flex items-center justify-center focus:outline-none ${
                isListening ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              aria-label='Meeting Audio'>
              <Headphones
                size={25}
                strokeWidth={2.5}
                className='text-white'
              />
            </button>
          )}

          {/* Transcripts Button */}
          {isInMeeting && transcripts.length > 0 && (
            <button
              onClick={() => setShowTranscripts(!showTranscripts)}
              className='bg-purple-500 rounded-xl p-3.5 flex items-center justify-center focus:outline-none'
              aria-label='Show Transcripts'>
              <MessageSquare
                size={25}
                strokeWidth={2.5}
                className='text-white'
              />
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={endConversation}
            className='bg-gray-400 hover:bg-gray-500 rounded-xl p-3.5 flex items-center justify-center focus:outline-none'
            aria-label='End Conversation'>
            <X
              size={25}
              strokeWidth={2.5}
              className='text-white'
            />
          </button>
        </div>
      </div>

      {/* Status Button at Bottom Center */}
      <div className='fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium shadow bg-white text-black opacity-90 pointer-events-none'>
        {statusText}
      </div>

      {/* Error Display */}
      {error && (
        <div className='absolute bottom-16 left-1/2 -translate-x-1/2 bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg'>
          {error}
        </div>
      )}

      {/* Transcripts Panel */}
      {showTranscripts && transcripts.length > 0 && (
        <div className='fixed top-4 right-4 w-80 max-h-96 bg-white rounded-lg shadow-lg p-4 overflow-y-auto'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='font-semibold text-gray-900'>Meeting Transcripts</h3>
            <button
              onClick={() => setShowTranscripts(false)}
              className='text-gray-500 hover:text-gray-700'>
              <X size={16} />
            </button>
          </div>
          <div className='space-y-2'>
            {transcripts.map((transcript, index) => (
              <div
                key={index}
                className='text-sm text-gray-700 p-2 bg-gray-50 rounded'>
                {transcript}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meeting Context Indicator */}
      {isInMeeting && (
        <div className='fixed top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium'>
          In Meeting
        </div>
      )}
    </div>
  );
};

export default AIPage;
