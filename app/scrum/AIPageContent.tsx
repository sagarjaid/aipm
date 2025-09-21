/** @format */

"use client";

/**
 * ScrumPageContent - AI Scrum Master Component
 *
 * This component supports two AI providers:
 * - ElevenLabs: Uses @elevenlabs/react for voice conversations
 * - Vapi: Uses @vapi-ai/web for voice conversations
 *
 * Provider can be set in two ways:
 * 1. Config file: config.ScrumMasterProvider.provider = "elevenlabs" | "vapi"
 * 2. URL parameter: ?provider=elevenlabs or ?provider=vapi (for Recall AI integration)
 *
 * Required environment variables:
 * ElevenLabs: NEXT_PUBLIC_ELEVENLABS_AGENT_ID
 * Vapi: NEXT_PUBLIC_VAPI_PUBLIC_KEY, NEXT_PUBLIC_VAPI_ASSISTANT_ID
 */

import React, { useEffect, useRef, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import Vapi from "@vapi-ai/web";
import { Mic, X, Headphones, MessageSquare } from "lucide-react";
import { useMeetingAudio } from "@/hooks/useMeetingAudio";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { JiraIssue } from "@/lib/jira-types";
import config from "@/config";

// type ScrumPageContentProps = {
//   issues: JiraIssue[];
// };

const AnimatedWaveform = ({ active }: { active: boolean }) => {
  const [time, setTime] = useState(0);
  const numBars = 12;
  const baseHeight = 12;
  const maxAmplitude = 18;
  const minAmplitude = 6;
  const maxBarHeight = (baseHeight + maxAmplitude) * 2;

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, [active]);

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
    <div className="flex h-9 min-w-[60px] items-center justify-center">
      <div className="flex h-full items-center gap-[2px]">
        {heights.map((height, index) => (
          <div
            key={index}
            className="rounded-full bg-gray-300 transition-all duration-75 ease-out"
            style={{
              width: "5px",
              height: `${height}px`,
              margin: "0",
            }}
          />
        ))}
      </div>
    </div>
  );
};

function getUniqueAssignees(issues: JiraIssue[]) {
  const assigneeMap = new Map<
    string,
    {
      accountId: string;
      displayName: string;
      avatarUrls: { "24x24": string; "48x48": string };
    }
  >();
  for (const issue of issues) {
    const assignee = issue.fields.assignee;
    if (assignee && assignee.accountId) {
      if (!assigneeMap.has(assignee.accountId)) {
        assigneeMap.set(assignee.accountId, assignee);
      }
    }
  }
  return Array.from(assigneeMap.values());
}

const ScrumPageContent = () => {
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const searchParams = useSearchParams();
  const agentId =
    searchParams.get("botID") || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

  // Get the provider from URL params (for Recall AI) or config
  const providerFromUrl = searchParams.get("provider");
  const provider = providerFromUrl || config.ScrumMasterProvider.provider;

  // Log provider source for debugging
  useEffect(() => {
    if (providerFromUrl) {
      console.log(`Provider set via URL parameter: ${provider}`);
    } else {
      console.log(`Provider set via config: ${provider}`);
    }
  }, [provider, providerFromUrl]);

  // Move CSS injection to useEffect to prevent hydration mismatch
  useEffect(() => {
    const style = document.createElement("style");
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
    if (!document.getElementById("dot-bounce-style")) {
      style.id = "dot-bounce-style";
      document.head.appendChild(style);
    }

    // Cleanup function to remove the style when component unmounts
    return () => {
      const existingStyle = document.getElementById("dot-bounce-style");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const { isListening, startListening, stopListening } = useMeetingAudio({
    onAudioData: (audioData) => {
      console.log("Meeting audio data received:", audioData);
    },
    onError: (error) => {
      console.error("Meeting audio error:", error);
    },
  });

  // ElevenLabs conversation (only used when provider is elevenlabs)
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
      if (message.source === "ai") {
        resetSilenceTimer();
      }
    },
    onError: (error) => {
      setError(
        typeof error === "string"
          ? error
          : "An error occurred during the conversation",
      );
      setIsLoading(false);
      clearSilenceTimer();
    },
  });

  // Vapi conversation state
  const [vapiStatus, setVapiStatus] = useState<string>("idle");
  const [vapiIsSpeaking, setVapiIsSpeaking] = useState(false);

  // Initialize Vapi when provider is vapi
  useEffect(() => {
    if (provider === "vapi") {
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      if (!publicKey) {
        setError("Vapi public key not found in environment variables");
        setIsLoading(false);
        return;
      }

      const vapi = new Vapi(publicKey);
      vapiRef.current = vapi;

      // Set up Vapi event listeners
      vapi.on("call-start", () => {
        console.log("Vapi call started");
        setIsInitialized(true);
        setIsLoading(false);
        setError(null);
        setVapiStatus("connected");
        resetSilenceTimer();
      });

      vapi.on("call-end", () => {
        console.log("Vapi call ended");
        setIsInitialized(false);
        setVapiStatus("idle");
        clearSilenceTimer();
      });

      vapi.on("speech-start", () => {
        console.log("Vapi speech started");
        setVapiIsSpeaking(true);
        resetSilenceTimer();
      });

      vapi.on("speech-end", () => {
        console.log("Vapi speech ended");
        setVapiIsSpeaking(false);
      });

      vapi.on("message", (message) => {
        console.log("Vapi message:", message);
        if (message.type === "transcript") {
          resetSilenceTimer();
        }
      });

      vapi.on("error", (error) => {
        console.error("Vapi error:", error);
        setError(
          error.message || "An error occurred during the Vapi conversation",
        );
        setIsLoading(false);
        clearSilenceTimer();
      });

      // Cleanup function
      return () => {
        if (vapiRef.current) {
          vapiRef.current.stop();
          vapiRef.current = null;
        }
      };
    }
  }, [provider]);

  useEffect(() => {
    const checkMeetingContext = () => {
      const isBotContext =
        window.location.href.includes("BotID") ||
        document.referrer.includes("recall.ai") ||
        navigator.userAgent.includes("Recall");
      if (isBotContext) {
        setIsInMeeting(true);
        startListening();
        connectToTranscriptWebSocket();
      }
    };
    checkMeetingContext();
  }, []);

  const connectToTranscriptWebSocket = () => {
    try {
      const ws = new WebSocket(
        "wss://meeting-data.us-west-2.recall.ai/api/v1/transcript",
      );
      ws.onopen = () => {
        console.log("Connected to Recall transcript WebSocket (us-west-2)");
      };
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Transcript data:", data);
          if (data.text) {
            setTranscripts((prev) => [...prev, data.text]);
          }
        } catch (error) {
          console.error("Error parsing transcript data:", error);
        }
      };
      ws.onclose = () => {
        console.log("Disconnected from Recall transcript WebSocket");
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      wsRef.current = ws;
    } catch (error) {
      console.error("Failed to connect to transcript WebSocket:", error);
    }
  };

  const resetSilenceTimer = () => {
    clearSilenceTimer();
    silenceTimer.current = setTimeout(() => {
      endConversation();
    }, 60000);
  };
  const clearSilenceTimer = () => {
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
      silenceTimer.current = null;
    }
  };

  useEffect(() => {
    console.log("i got called");
    const start = async () => {
      console.log("start got called");

      try {
        setIsLoading(true);
        await navigator.mediaDevices.getUserMedia({ audio: true });

        const list_of_team_members = "Asha, Bob, Charlie";

        console.log("list_of_team_members", list_of_team_members);
        console.log("Starting session with provider:", provider);

        if (provider === "elevenlabs") {
          console.log(
            "Starting ElevenLabs session with agentId:",
            agentId,
            "list_of_team_members:",
            list_of_team_members,
          );

          const response = await fetch("/api/elevenlabs/get-signed-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agentId, list_of_team_members }),
          });
          if (!response.ok) throw new Error("Failed to get signed URL");
          const { signedUrl } = await response.json();
          await conversation.startSession({ signedUrl });
        } else if (provider === "vapi") {
          console.log("Starting Vapi session");
          const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
          if (!assistantId) {
            throw new Error(
              "Vapi assistant ID not found in environment variables",
            );
          }

          if (vapiRef.current) {
            await vapiRef.current.start(assistantId);
          }
        }
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Failed to start conversation",
        });
        setIsLoading(false);
      }
    };
    start();
    return () => clearSilenceTimer();
  }, [provider]);

  const endConversation = async () => {
    try {
      if (provider === "elevenlabs") {
        await conversation.endSession();
      } else if (provider === "vapi" && vapiRef.current) {
        await vapiRef.current.stop();
      }
      setIsInitialized(false);
      clearSilenceTimer();
      if (isInMeeting) {
        stopListening();
        if (wsRef.current) {
          wsRef.current.close();
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to end conversation");
    }
  };

  const waveActive =
    provider === "elevenlabs" ? conversation.isSpeaking : vapiIsSpeaking;
  const micActive =
    provider === "elevenlabs"
      ? conversation.isSpeaking || isInitialized
      : vapiIsSpeaking || isInitialized;

  let statusText = "";
  if (isLoading) {
    statusText = "Loading...";
  } else if (waveActive) {
    statusText = "AI is speaking...";
  } else if (provider === "elevenlabs" && conversation.status === "connected") {
    statusText = isInMeeting ? "Connected to Meeting" : "Connected";
  } else if (provider === "vapi" && vapiStatus === "connected") {
    statusText = isInMeeting ? "Connected to Meeting" : "Connected";
  } else {
    statusText = "Disconnected";
  }

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
      setError(null);
    }
  }, [error, toast]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <AnimatedWaveform active={waveActive} />
      <div className="flex items-center gap-2">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500 p-2 focus:outline-none"
          aria-label="Mic Button"
          style={{ minWidth: 36, minHeight: 36 }}
        >
          <Mic
            size={18}
            strokeWidth={2.2}
            className={micActive ? "text-black" : "text-green-700"}
          />
        </button>
        {isInMeeting && (
          <button
            className={`flex h-9 w-9 items-center justify-center rounded-lg p-2 focus:outline-none ${
              isListening ? "bg-blue-500" : "bg-gray-400"
            }`}
            aria-label="Meeting Audio"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <Headphones size={18} strokeWidth={2.2} className="text-white" />
          </button>
        )}
        {isInMeeting && transcripts.length > 0 && (
          <button
            onClick={() => setShowTranscripts(!showTranscripts)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500 p-2 focus:outline-none"
            aria-label="Show Transcripts"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <MessageSquare size={18} strokeWidth={2.2} className="text-white" />
          </button>
        )}
        <button
          onClick={endConversation}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-300 p-2 hover:bg-gray-400 focus:outline-none"
          aria-label="End Conversation"
          style={{ minWidth: 36, minHeight: 36 }}
        >
          <X size={18} strokeWidth={2.2} className="text-gray-700" />
        </button>
      </div>
      <div className="ml-2 flex items-center gap-2">
        <span className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {statusText}
        </span>
      </div>
      {showTranscripts && transcripts.length > 0 && (
        <div className="absolute right-0 top-full z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Meeting Transcripts
            </h3>
            <button
              onClick={() => setShowTranscripts(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {transcripts.map((transcript, index) => (
              <div
                key={index}
                className="rounded bg-gray-50 p-2 text-xs text-gray-700"
              >
                {transcript}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrumPageContent;
