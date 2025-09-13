/** @format */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { meetingUrl, botName, webpageUrl } = await request.json();

    if (!meetingUrl || !botName || !webpageUrl) {
      return NextResponse.json(
        { error: "Missing required fields: meetingUrl, botName, webpageUrl" },
        { status: 400 },
      );
    }

    const recallApiKey = process.env.RECALL_API_KEY;
    if (!recallApiKey) {
      return NextResponse.json(
        { error: "Recall API key not configured" },
        { status: 500 },
      );
    }

    // Create bot with output media configuration using us-west-2 region (Pay-as-you-go)
    const response = await fetch("https://us-west-2.recall.ai/api/v1/bot/", {
      method: "POST",
      headers: {
        Authorization: `Token ${recallApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meeting_url: meetingUrl,
        bot_name: botName,
        output_media: {
          camera: {
            kind: "webpage",
            config: {
              url: webpageUrl,
            },
          },
        },
        variant: {
          google_meet: "web_4_core", // Use 4-core variant for better performance
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Recall API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create bot", details: errorData },
        { status: response.status },
      );
    }

    const botData = await response.json();

    return NextResponse.json({
      botId: botData.id,
      status: botData.status,
      meetingUrl: botData.meeting_url,
      botName: botData.bot_name,
    });
  } catch (error) {
    console.error("Error creating Recall bot:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
