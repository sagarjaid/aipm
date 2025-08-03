/** @format */

"use client";

import { useState } from "react";
import meet from "@/app/img/google-meet.svg";
import teams from "@/app/img/teams.svg";
import zoom from "@/app/img/zoom.svg";
import slack from "@/app/img/slack.svg";
import webex from "@/app/img/webex.svg";
import goTo from "@/app/img/go-to.svg";

interface ScrumMasterInputProps {
  emailPlaceholder?: string;
  meetPlaceholder?: string;
  buttonText?: string;
}

export default function ScrumMasterInput({
  emailPlaceholder = "Email",
  meetPlaceholder = "Google Meet URL",
  buttonText = "Send AI Scrum Master",
}: ScrumMasterInputProps) {
  const [email, setEmail] = useState("");
  const [meetUrl, setMeetUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [botName, setBotName] = useState("AI Scrum Master");
  const [webpageUrl, setWebpageUrl] = useState(
    "https://getaipm.com/scrum?botID"
  );

  const onButtonClick = async () => {
    if (!email || !meetUrl) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    // Check if the meeting URL is a Google Meet URL
    if (!meetUrl.includes("meet.google.com")) {
      setMessage({
        type: "error",
        text: "Currently, we only support Google Meet. We are working round the clock to make other meeting platforms available for our beta users. If you have any special requests, feel free to reach out to us at hello@getaipm.com",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // First, create a bot using Recall.ai API
      const botResponse = await fetch("/api/recall/create-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingUrl: meetUrl,
          botName: botName.trim(),
          webpageUrl: webpageUrl.trim(),
        }),
      });

      const botData = await botResponse.json();

      if (!botResponse.ok) {
        throw new Error(
          botData.error || "Failed to create AI Scrum Master bot"
        );
      }

      // Store the bot ID and meeting info
      const meetingInfo = {
        botId: botData.botId,
        email,
        meetUrl,
        createdAt: new Date().toISOString(),
      };

      // You can store this in localStorage or send to your backend
      console.log("Meeting info:", meetingInfo);

      setMessage({
        type: "success",
        text: "AI Scrum Master has been sent to your meeting! Check your Google Meet for the bot.",
      });

      // Clear form on success
      setEmail("");
      setMeetUrl("");

      console.log("AI Scrum Master sent successfully:", botData);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to send AI Scrum Master",
      });
      console.error("Error sending AI Scrum Master:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && meetUrl;

  return (
    <div className="w-full rounded-2xl p-[2.8px] relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300 mdx:w-1/2 xs:w-full">
      <div className="absolute inset-0 bg-gradient-to-l from-stone-900 via-green-100 to-gray-500 hover-animation" />
      <div className="bg-white rounded-xl shadow-md p-6 relative">
        <div className="flex justify-between items-center mb-6">
     <div className="flex flex-col gap-1">
     <h3 className="text-lg font-bold text-gray-900">AI Scrum Master Demo</h3>
     <div className="text-[11px] text-gray-500">AI will join your meeting & facilitate daily stand-up</div>
     </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
          title="Settings"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {/* Google Meet URL Input */}
        <div>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="relative meet-tooltip flex items-center gap-2">
              <div className="w-10 h-10 bg-white gap-2 w-full flex items-center justify-center border-2 border-white hover:scale-105 transition-transform duration-200 cursor-pointer z-10">
                <img src={meet.src} alt="Google Meet" className="w-6 h-6" />
                <span className="text-sm">Google Meet URL</span>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-green-600 text-white text-xs rounded opacity-0 transition-opacity duration-200 whitespace-nowrap z-20">
              Currently Supported
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
              </div>
            </div>
            <div>
              {/* Platform Icons */}
              <div className="flex items-center -space-x-2 mb-3">
                {/* Microsoft Teams - Coming Soon */}
                <div className="relative teams-tooltip">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer z-10 opacity-60">
                    <img
                      src={teams.src}
                      alt="Microsoft Teams"
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0 transition-opacity duration-200 whitespace-nowrap z-20">
                    Coming Soon
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                  </div>
                </div>

                {/* Zoom - Coming Soon */}
                <div className="relative zoom-tooltip">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer z-10 opacity-60">
                    <img src={zoom.src} alt="Zoom" className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0 transition-opacity duration-200 whitespace-nowrap z-20">
                    Coming Soon
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                  </div>
                </div>

                {/* Slack - Coming Soon */}
                <div className="relative slack-tooltip">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer z-10 opacity-60">
                    <img src={slack.src} alt="Slack" className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0 transition-opacity duration-200 whitespace-nowrap z-20">
                    Coming Soon
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                  </div>
                </div>

                {/* Webex - Coming Soon */}
                <div className="relative webex-tooltip">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer z-10 opacity-60">
                    <img src={webex.src} alt="Webex" className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0 transition-opacity duration-200 whitespace-nowrap z-20">
                    Coming Soon
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                  </div>
                </div>

                {/* GoToMeeting - Coming Soon */}
                <div className="relative gotomeeting-tooltip">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer z-10 opacity-60">
                    <img src={goTo.src} alt="GoToMeeting" className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0 transition-opacity duration-200 whitespace-nowrap z-20">
                    Coming Soon
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input
            type="url"
            placeholder="https://meet.google.com/xxx-xxxx-xxx"
            value={meetUrl}
            onChange={(e) => setMeetUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {/* Settings Fields */}
        {showSettings && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bot Name
              </label>
              <input
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="AIPM Scrum Master"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webpage URL
              </label>
              <input
                type="url"
                value={webpageUrl}
                disabled
                placeholder="https://getaipm.com/scrum?botID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </>
        )}

        {/* Send Button */}
        <button
          onClick={onButtonClick}
          disabled={!isFormValid || isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 disabled:bg-green-500 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {buttonText}
            </>
          )}
        </button>

        {/* Message Display */}
        {message && (
          <div
            className={`mt-3 p-3 rounded-md text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .hover-animation {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        .group:hover .hover-animation {
          animation: gradient-x 10s ease infinite;
        }
        
        /* Tooltip hover states */
        .meet-tooltip:hover > div:last-child {
          opacity: 1;
        }
        .teams-tooltip:hover > div:last-child {
          opacity: 1;
        }
        .zoom-tooltip:hover > div:last-child {
          opacity: 1;
        }
        .slack-tooltip:hover > div:last-child {
          opacity: 1;
        }
        .webex-tooltip:hover > div:last-child {
          opacity: 1;
        }
        .gotomeeting-tooltip:hover > div:last-child {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
