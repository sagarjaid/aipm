// app/api/converttext/route.ts
import { createAudioStreamFromText } from "@/components/helper/elevenLabs";
import { NextResponse } from "next/server";

// Handling the POST request in the App Router
export async function POST(req: Request) {
  try {
    // Parse the request body to extract the text
    const body = await req.json();
    const { text } = body;

    console.log(text, "text");

    // If no text is provided, return an error
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Create the audio buffer from the text
    const audioBuffer = await createAudioStreamFromText(text);

    // Create a response with the audio data
    const response = new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });

    return response;
  } catch (error) {
    console.error(error);

    // Return a 500 status if something goes wrong
    return NextResponse.json(
      { error: "Failed to generate audio" },
      { status: 500 },
    );
  }
}

// Handling non-POST methods
export function OPTIONS() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
