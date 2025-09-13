import axios from "axios";
import { NextResponse } from "next/server";

// Handling the POST request for the /stream endpoint
export async function POST(req: Request) {
  try {
    // Parse the request body to extract text, voice settings, etc.
    const body = await req.json();
    const {
      text,
      voiceId = "Will",
      bitrate = "64k",
      speed = "0",
      pitch = "1",
      codec = "libmp3lame",
    } = body;

    // If no text is provided, return an error
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const bearerToken = `Bearer ${process.env.NEXT_PUBLIC_UNREALSPEECH_API_KEY}`;

    // API request to the external UnrealSpeech endpoint
    const headers = {
      Authorization: bearerToken,
    };

    const data = {
      Text: text, // Up to 1000 characters
      VoiceId: voiceId,
      Bitrate: bitrate,
      Speed: speed,
      Pitch: pitch,
      Codec: codec,
    };

    // Make the API call to get the audio stream
    const response = await axios({
      method: "post",
      url: "https://api.v7.unrealspeech.com/stream",
      headers: headers,
      data: data,
      responseType: "stream",
    });

    // Return the audio stream directly to the client
    const audioStream = response.data;

    // Return the audio stream as a response without saving to disk
    return new Response(audioStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'attachment; filename="audio.mp3"', // Allows user to download as audio.mp3
      },
    });
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
