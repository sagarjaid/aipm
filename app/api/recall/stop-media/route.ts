/** @format */

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { botId } = await request.json();

    if (!botId) {
      return NextResponse.json(
        { error: "Bot ID is required" },
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

    // Stop the bot's output media using us-west-2 region
    const response = await fetch(
      `https://us-west-2.recall.ai/api/v1/bot/${botId}/output_media/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${recallApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ camera: true }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Recall API error:", errorData);
      return NextResponse.json(
        { error: "Failed to stop bot media", details: errorData },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Bot media stopped successfully",
    });
  } catch (error) {
    console.error("Error stopping Recall bot media:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
