/** @format */

"use client";

/**
 * ScrumMasterInput - Component for creating Recall AI bots
 *
 * This component automatically generates the webpage URL with the correct provider parameter
 * based on the config.ScrumMasterProvider.provider setting.
 *
 * The generated URL format: https://yoursite.com/scrum?provider=vapi&botID
 * This ensures Recall AI bots use the correct AI provider (ElevenLabs or Vapi).
 */

import { useState, useEffect } from "react";
import meet from "@/app/img/google-meet.svg";
import teams from "@/app/img/teams.svg";
import zoom from "@/app/img/zoom.svg";
import slack from "@/app/img/slack.svg";
import webex from "@/app/img/webex.svg";
import goTo from "@/app/img/go-to.svg";
import BookerDemo from "@/components/BookerDemo";
import config from "@/config";

interface ScrumMasterInputProps {
  emailPlaceholder?: string;
  meetPlaceholder?: string;
  buttonText?: string;
}

export default function ScrumMasterInput({
  emailPlaceholder = "Email",
  meetPlaceholder = "Google Meet URL",
  buttonText = "Join live Demo",
}: ScrumMasterInputProps) {
  const [email, setEmail] = useState("");
  const [meetUrl, setMeetUrl] = useState(
    "https://meet.google.com/ahz-iath-xks",
  );
  const [userName, setUserName] = useState("");
  const [optInInterview, setOptInInterview] = useState(false);
  const [optInManuallySet, setOptInManuallySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [botName, setBotName] = useState("AI Scrum Master");
  const [webpageUrl, setWebpageUrl] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<
    "google_meet" | "microsoft_teams" | null
  >(null);

  // Ensure component is mounted before rendering dynamic content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate webpage URL with provider parameter
  useEffect(() => {
    if (isMounted) {
      const provider = config.ScrumMasterProvider.provider;
      const baseUrl = "https://getaipm.com/scrum";
      const urlWithProvider = `${baseUrl}?provider=${provider}&botID`;
      setWebpageUrl(urlWithProvider);
    }
  }, [isMounted]);

  // Detect platform from URL and update current platform
  useEffect(() => {
    if (meetUrl) {
      if (meetUrl.includes("meet.google.com")) {
        setCurrentPlatform("google_meet");
      } else if (
        meetUrl.includes("teams.microsoft.com") ||
        meetUrl.includes("teams.live.com")
      ) {
        setCurrentPlatform("microsoft_teams");
      } else {
        setCurrentPlatform(null);
      }
    } else {
      setCurrentPlatform(null);
    }
  }, [meetUrl]);

  const onButtonClick = async () => {
    console.log("🚀 onButtonClick started");
    console.log("📝 Form data:", {
      email,
      userName,
      meetUrl,
      botName,
      webpageUrl,
      currentPlatform,
    });

    if (!email || !userName || !meetUrl) {
      console.log("❌ Validation failed: missing required fields");
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    // Check if the meeting URL is a supported platform
    const isGoogleMeet = meetUrl.includes("meet.google.com");
    const isMicrosoftTeams =
      meetUrl.includes("teams.microsoft.com") ||
      meetUrl.includes("teams.live.com");

    console.log("🔍 Platform detection:", {
      isGoogleMeet,
      isMicrosoftTeams,
      meetUrl,
    });

    if (!isGoogleMeet && !isMicrosoftTeams) {
      console.log("❌ Unsupported platform detected");
      setMessage({
        type: "error",
        text: "Currently, we only support Google Meet and Microsoft Teams. We are working round the clock to make other meeting platforms available for our beta users. If you have any special requests, feel free to reach out to us at hello@getaipm.com",
      });
      return;
    }

    // Open the meeting URL in a new tab immediately after validation
    try {
      console.log("🌐 Opening meeting URL in new tab:", meetUrl);
      const newTab = window.open(meetUrl, "_blank", "noopener,noreferrer");
      if (newTab) {
        newTab.opener = null;
      }
    } catch (e) {
      console.warn("Failed to open meeting URL in new tab:", e);
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // First, create a bot using Recall.ai API
      const requestBody = {
        meetingUrl: meetUrl,
        botName: botName.trim(),
        webpageUrl: webpageUrl.trim(),
        platform: isGoogleMeet ? "google_meet" : "microsoft_teams",
      };

      console.log("📤 Sending bot creation request:", requestBody);

      const botResponse = await fetch("/api/recall/create-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Bot response status:", botResponse.status);
      console.log(
        "📥 Bot response headers:",
        Object.fromEntries(botResponse.headers.entries()),
      );

      const botData = await botResponse.json();
      console.log("📥 Bot response data:", botData);

      if (!botResponse.ok) {
        console.log("❌ Bot creation failed:", botData);
        throw new Error(
          botData.error || "Failed to create AI Scrum Master bot",
        );
      }

      console.log("✅ Bot created successfully:", botData);

      // Store the bot ID and meeting info
      const meetingInfo = {
        botId: botData.botId,
        email,
        userName,
        meetUrl,
        optInInterview,
        createdAt: new Date().toISOString(),
      };

      // You can store this in localStorage or send to your backend
      console.log("💾 Meeting info stored:", meetingInfo);

      // Send lead data to Sheety API
      try {
        console.log("📊 Sending lead data to Sheety...");
        const sheetyUrl =
          "https://api.sheety.co/33d9ec27f5c7dfb130eb655baacab48d/aipmLeads/leads";
        const leadData = {
          lead: {
            name: userName,
            email: email,
            url: meetUrl,
            optin: optInInterview,
            date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format for consistency
          },
        };

        console.log("📊 Sheety lead data:", leadData);

        const sheetyResponse = await fetch(sheetyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leadData),
        });

        if (sheetyResponse.ok) {
          const sheetyData = await sheetyResponse.json();
          console.log("✅ Lead saved to Sheety:", sheetyData.lead);
        } else {
          console.warn(
            "❌ Failed to save lead to Sheety:",
            await sheetyResponse.text(),
          );
        }
      } catch (sheetyError) {
        console.warn("❌ Error saving lead to Sheety:", sheetyError);
        // Don't fail the main flow if Sheety fails
      }

      setMessage({
        type: "success",
        text: "AI Scrum Master has been sent to your meeting! Open & Join the meeting to see it in action.",
      });

      // Clear form on success
      setEmail("");
      setUserName("");
      setMeetUrl("");
      setOptInInterview(false);
      setOptInManuallySet(false);

      console.log("🎉 AI Scrum Master sent successfully:", botData);
    } catch (error: any) {
      console.error("💥 Error in onButtonClick:", error);
      console.error("💥 Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });

      setMessage({
        type: "error",
        text: error.message || "Failed to send AI Scrum Master",
      });
    } finally {
      console.log("🏁 onButtonClick completed, setting loading to false");
      setIsLoading(false);
    }
  };

  const isFormValid = email && userName && meetUrl;

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="group relative w-full cursor-pointer overflow-hidden p-[2.5px] shadow-2xl transition-all duration-300 hover:scale-[102%] xs:w-full mdx:w-1/2">
        <div className="hover-animation absolute inset-0 bg-gradient-to-l from-stone-600 via-green-100 to-green-600" />
        <div className="relative bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-gray-900">
                AI Scrum Facilitator demo
              </h3>
              <div className="text-[11px] text-gray-500">
                AI will join the meeing URL mention below & facilitate the
                meeting
              </div>
            </div>
            <div className="h-6 w-6 text-gray-400"></div>
          </div>
          <div className="space-y-4">
            <div className="h-10 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative w-full cursor-pointer overflow-hidden p-[2.5px] shadow-2xl transition-all duration-300 hover:scale-[102%] xs:w-full mdx:w-1/2">
      <div className="hover-animation absolute inset-0 bg-gradient-to-l from-stone-600 via-green-100 to-green-600" />
      <div className="relative flex min-h-[500px] flex-col bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-gray-900">
              AI Scrum Facilitator demo
            </h3>
            <div className="text-[11px] text-gray-500">
              AI will join the meeing url & facilitate current meeting
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="h-6 w-6 cursor-pointer text-gray-400 transition-colors duration-200 hover:text-gray-600"
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

        <div className="flex flex-1 flex-col justify-center space-y-4">
          {/* Show form fields and button only when there's no success message */}
          {!message || message.type !== "success" ? (
            <>
              {/* User Name Input */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);
                    if (!optInManuallySet) {
                      setOptInInterview(!!value);
                    }
                  }}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Meeting URL Input */}
              <div>
                <div className="flex w-full items-center justify-between gap-2">
                  {/* Show platform indicator based on current URL */}
                  {currentPlatform === "google_meet" && (
                    <div className="meet-tooltip relative flex items-center gap-2">
                      <div className="z-10 flex h-10 w-full cursor-pointer items-center justify-center gap-2 border-2 border-white bg-white transition-transform duration-200 hover:scale-105">
                        <img
                          src={meet.src}
                          alt="Google Meet"
                          className="h-6 w-6"
                        />
                        <span className="text-sm">Google Meet URL</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                        Currently Supported
                        <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                      </div>
                    </div>
                  )}

                  {currentPlatform === "microsoft_teams" && (
                    <div className="teams-tooltip relative flex items-center gap-2">
                      <div className="z-10 flex h-10 w-full cursor-pointer items-center justify-center gap-2 border-2 border-white bg-white transition-transform duration-200 hover:scale-105">
                        <img
                          src={teams.src}
                          alt="Microsoft Teams"
                          className="h-6 w-6"
                        />
                        <span className="text-sm">Microsoft Teams URL</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                        Currently Supported
                        <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                      </div>
                    </div>
                  )}

                  {/* Show only Google Meet when no URL is entered (default) */}
                  {!currentPlatform && (
                    <div className="meet-tooltip relative flex items-center gap-2">
                      <div className="z-10 flex h-10 w-full cursor-pointer items-center justify-center gap-2 border-2 border-white bg-white transition-transform duration-200 hover:scale-105">
                        <img
                          src={meet.src}
                          alt="Google Meet"
                          className="h-6 w-6"
                        />
                        <span className="text-sm">Google Meet URL</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                        Currently Supported
                        <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                      </div>
                    </div>
                  )}
                  <div>
                    {/* Platform Icons */}
                    <div className="mb-3 flex items-center -space-x-2">
                      {/* Google Meet - Show only when Microsoft Teams is selected */}
                      {currentPlatform === "microsoft_teams" && (
                        <div className="meet-tooltip relative">
                          <div
                            className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white shadow-sm transition-transform duration-200 hover:scale-110"
                            onClick={() => {
                              setCurrentPlatform("google_meet");
                              setMeetUrl("https://meet.google.com/");
                            }}
                          >
                            <img
                              src={meet.src}
                              alt="Google Meet"
                              className="h-6 w-6"
                            />
                          </div>
                          <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                            Currently Supported
                            <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                          </div>
                        </div>
                      )}

                      {/* Microsoft Teams - Show only when Google Meet is selected */}
                      {currentPlatform !== "microsoft_teams" && (
                        <div className="teams-tooltip relative">
                          <div
                            className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white shadow-sm transition-transform duration-200 hover:scale-110"
                            onClick={() => {
                              setCurrentPlatform("microsoft_teams");
                              setMeetUrl(
                                "https://teams.microsoft.com/l/meetup-join/",
                              );
                            }}
                          >
                            <img
                              src={teams.src}
                              alt="Microsoft Teams"
                              className="h-6 w-6"
                            />
                          </div>
                          <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                            Currently Supported
                            <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                          </div>
                        </div>
                      )}

                      {/* Zoom - Coming Soon */}
                      <div className="zoom-tooltip relative">
                        <div className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white opacity-60 shadow-sm transition-transform duration-200 hover:scale-110">
                          <img src={zoom.src} alt="Zoom" className="h-6 w-6" />
                        </div>
                        <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                          Coming Soon
                          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                        </div>
                      </div>

                      {/* Slack - Coming Soon */}
                      <div className="slack-tooltip relative">
                        <div className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white opacity-60 shadow-sm transition-transform duration-200 hover:scale-110">
                          <img
                            src={slack.src}
                            alt="Slack"
                            className="h-6 w-6"
                          />
                        </div>
                        <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                          Coming Soon
                          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                        </div>
                      </div>

                      {/* Webex - Coming Soon */}
                      <div className="webex-tooltip relative">
                        <div className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white opacity-60 shadow-sm transition-transform duration-200 hover:scale-110">
                          <img
                            src={webex.src}
                            alt="Webex"
                            className="h-6 w-6"
                          />
                        </div>
                        <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                          Coming Soon
                          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                        </div>
                      </div>

                      {/* GoToMeeting - Coming Soon */}
                      <div className="gotomeeting-tooltip relative hidden md:block">
                        <div className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white opacity-60 shadow-sm transition-transform duration-200 hover:scale-105">
                          <img
                            src={goTo.src}
                            alt="GoToMeeting"
                            className="h-5 w-5"
                          />
                        </div>
                        <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                          Coming Soon
                          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  type="url"
                  placeholder={
                    currentPlatform === "google_meet"
                      ? "https://meet.google.com/xxx-xxxx-xxx"
                      : currentPlatform === "microsoft_teams"
                        ? "https://teams.microsoft.com/l/meetup-join/..."
                        : "https://meet.google.com/xxx-xxxx-xxx or https://teams.microsoft.com/l/meetup-join/..."
                  }
                  value={meetUrl}
                  onChange={(e) => setMeetUrl(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>

              {/* Optional Opt-in Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  id="opt-in-interview"
                  type="checkbox"
                  checked={optInInterview}
                  onChange={(e) => {
                    setOptInInterview(e.target.checked);
                    setOptInManuallySet(true);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-gray-900"
                />
                <label
                  htmlFor="opt-in-interview"
                  className="text-[10px] text-gray-700"
                >
                  Opt me in for user interviews to improve the product{" "}
                  <span className="text-[9px] text-gray-500">(optional)</span>
                </label>
              </div>

              {/* Settings Fields */}
              {showSettings && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Bot Name
                    </label>
                    <input
                      type="text"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder="AIPM Scrum Master"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Webpage URL
                    </label>
                    <div className="mb-1 text-xs text-gray-500">
                      Automatically includes provider parameter from config
                    </div>
                    <input
                      type="url"
                      value={webpageUrl}
                      disabled
                      placeholder={
                        webpageUrl ||
                        "https://getaipm.com/scrum?provider=vapi&botID"
                      }
                      className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500"
                    />
                  </div>
                </>
              )}

              {/* Send Button with tooltip on invalid form */}
              <div
                className={
                  "relative " +
                  (!isFormValid && !isLoading ? "send-tooltip" : "")
                }
              >
                <button
                  onClick={onButtonClick}
                  disabled={!isFormValid || isLoading}
                  className="mt-2 flex w-full items-center justify-center gap-2 bg-black px-4 py-3 text-white transition-colors duration-300 hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-900"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
                        className="h-5 w-5"
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
                {!isFormValid && !isLoading && (
                  <div className="send-tooltip-content absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200">
                    All fields are required
                    <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                )}
              </div>
            </>
          ) : null}

          {/* Message Display */}
          {message && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div
                className={`rounded p-3 text-sm ${
                  message.type === "success"
                    ? "text-center text-2xl text-black"
                    : "border border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {message.text}
              </div>
              <div className="flex justify-center">
                <BookerDemo buttonText="BOOK DETAILED DEMO" />
              </div>
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
        /* Send button tooltip hover state */
        .send-tooltip:hover .send-tooltip-content {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
