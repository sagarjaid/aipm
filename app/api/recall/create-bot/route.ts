/** @format */

import { NextRequest, NextResponse } from "next/server";
import config from "@/config";

export async function POST(request: NextRequest) {
  console.log("🚀 POST /api/recall/create-bot started");
  
  try {
    const requestBody = await request.json();
    console.log("📥 Request body received:", requestBody);
    
    const { meetingUrl, botName, webpageUrl, platform } = requestBody;

    if (!meetingUrl || !botName || !webpageUrl) {
      console.log("❌ Missing required fields:", { meetingUrl, botName, webpageUrl });
      return NextResponse.json(
        { error: "Missing required fields: meetingUrl, botName, webpageUrl" },
        { status: 400 },
      );
    }

    // Get the current provider from config
    const provider = config.ScrumMasterProvider.provider;
    console.log("⚙️ Provider from config:", provider);
    
    // Add provider parameter to the webpage URL
    const urlWithProvider = new URL(webpageUrl);
    urlWithProvider.searchParams.set('provider', provider);
    const finalWebpageUrl = urlWithProvider.toString();
    console.log("🔗 Final webpage URL:", finalWebpageUrl);

    const recallApiKey = process.env.RECALL_API_KEY;
    if (!recallApiKey) {
      console.log("❌ Recall API key not configured");
      return NextResponse.json(
        { error: "Recall API key not configured" },
        { status: 500 },
      );
    }
    console.log("🔑 Recall API key found:", recallApiKey ? "***" + recallApiKey.slice(-4) : "null");

    // Determine platform and configure bot accordingly
    const isGoogleMeet = platform === "google_meet" || meetingUrl.includes("meet.google.com");
    const isMicrosoftTeams = platform === "microsoft_teams" || meetingUrl.includes("teams.microsoft.com") || meetingUrl.includes("teams.live.com");
    
    console.log("🔍 Platform detection:", { 
      platform, 
      meetingUrl, 
      isGoogleMeet, 
      isMicrosoftTeams 
    });

    // Base bot configuration - start with the working structure
    const botConfig: any = {
      meeting_url: meetingUrl,
      bot_name: botName,
      output_media: {
        camera: {
          kind: "webpage",
          config: {
            url: finalWebpageUrl,
          },
        },
      },
    };

    // Add platform-specific configuration
    if (isGoogleMeet) {
      botConfig.variant = {
        google_meet: "web_4_core", // Use 4-core variant for better performance
      };
      console.log("📱 Google Meet configuration added");
    } else if (isMicrosoftTeams) {
      // Microsoft Teams specific configuration
      botConfig.variant = {
        microsoft_teams: "web_4_core", // Use 4-core variant for better performance
      };
      botConfig.transcription_options = {
        provider: "recallai",
        recallai: {
          mode: "prioritize_low_latency",
          language_code: "en",
        },
      };
      console.log("📱 Microsoft Teams configuration added");
    } else {
      // Default configuration for other platforms (like Zoom)
      botConfig.variant = {
        zoom: "web_4_core", // Use 4-core variant for better performance
      };
      console.log("📱 Default platform configuration added");
    }
    
    console.log("🤖 Final bot configuration:", JSON.stringify(botConfig, null, 2));

    // Create bot with output media configuration using us-west-2 region (Pay-as-you-go)
    console.log("📤 Sending request to Recall API...");
    const response = await fetch("https://us-west-2.recall.ai/api/v1/bot/", {
      method: "POST",
      headers: {
        Authorization: `Token ${recallApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(botConfig),
    });

    console.log("📥 Recall API response status:", response.status);
    console.log("📥 Recall API response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.log("❌ Recall API request failed");
      let errorData;
      try {
        const responseText = await response.text();
        console.log("📥 Raw response text:", responseText);
        
        // Try to parse as JSON, but handle HTML responses
        if (responseText.startsWith('<!DOCTYPE') || responseText.startsWith('<html')) {
          console.log("❌ Received HTML response instead of JSON");
          errorData = { error: "Received HTML response from Recall API", status: response.status };
        } else {
          errorData = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.log("❌ Failed to parse error response:", parseError);
        errorData = { error: "Failed to parse error response", status: response.status };
      }
      
      console.error("❌ Recall API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create bot", details: errorData },
        { status: response.status },
      );
    }

    const botData = await response.json();
    console.log("✅ Bot created successfully:", botData);

    const responseData = {
      botId: botData.id,
      status: botData.status,
      meetingUrl: botData.meeting_url,
      botName: botData.bot_name,
      provider: provider,
      webpageUrl: finalWebpageUrl,
      platform: isGoogleMeet ? "google_meet" : isMicrosoftTeams ? "microsoft_teams" : "unknown",
    };
    
    console.log("📤 Sending success response:", responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("💥 Error in POST /api/recall/create-bot:", error);
    console.error("💥 Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
