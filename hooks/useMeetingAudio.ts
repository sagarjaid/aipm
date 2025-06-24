/** @format */

'use client';

import { useState, useEffect, useRef } from 'react';

// Type declarations for MediaStreamTrackProcessor and AudioData
declare global {
  interface Window {
    MediaStreamTrackProcessor: {
      new (options: { track: MediaStreamTrack }): MediaStreamTrackProcessor;
    };
  }
}

interface AudioData {
  numberOfFrames: number;
  numberOfChannels: number;
  sampleRate: number;
  timestamp: number;
  data: Float32Array;
}

interface MediaStreamTrackProcessor {
  readable: ReadableStream<AudioData>;
  close(): void;
}

interface UseMeetingAudioOptions {
  onAudioData?: (audioData: AudioData) => void;
  onError?: (error: string) => void;
}

export const useMeetingAudio = (options: UseMeetingAudioOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const trackProcessorRef = useRef<MediaStreamTrackProcessor | null>(null);
  const trackReaderRef = useRef<ReadableStreamDefaultReader<AudioData> | null>(
    null
  );

  const startListening = async () => {
    try {
      setError(null);

      // Check if MediaStreamTrackProcessor is supported
      if (!window.MediaStreamTrackProcessor) {
        throw new Error(
          'MediaStreamTrackProcessor is not supported in this browser'
        );
      }

      // Get user media with audio permission
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaStreamRef.current = mediaStream;
      const meetingAudioTrack = mediaStream.getAudioTracks()[0];

      if (!meetingAudioTrack) {
        throw new Error('No audio track found');
      }

      // Create track processor for audio data
      const trackProcessor = new window.MediaStreamTrackProcessor({
        track: meetingAudioTrack,
      });

      trackProcessorRef.current = trackProcessor;
      const trackReader = trackProcessor.readable.getReader();
      trackReaderRef.current = trackReader;

      setIsListening(true);

      // Start reading audio data
      const readAudioData = async () => {
        try {
          while (isListening) {
            const { value, done } = await trackReader.read();

            if (done) break;

            const audioData = value;
            options.onAudioData?.(audioData);
          }
        } catch (err: any) {
          const errorMessage = err.message || 'Error reading audio data';
          setError(errorMessage);
          options.onError?.(errorMessage);
        }
      };

      readAudioData();
    } catch (err: any) {
      const errorMessage =
        err.message || 'Failed to start listening to meeting audio';
      setError(errorMessage);
      options.onError?.(errorMessage);
    }
  };

  const stopListening = () => {
    setIsListening(false);

    // Clean up resources
    if (trackReaderRef.current) {
      trackReaderRef.current.cancel();
      trackReaderRef.current = null;
    }

    if (trackProcessorRef.current) {
      trackProcessorRef.current.close();
      trackProcessorRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return {
    isListening,
    error,
    startListening,
    stopListening,
  };
};
