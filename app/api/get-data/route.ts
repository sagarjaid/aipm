// app/api/interviewresponse/route.ts
import {
  // generateQuestionResponse,
  generateSystemRole,
} from "@/components/helper/prompts";
import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export async function POST(req: Request) {
  try {
    // Parse the request body
    const qnAObj = await req.json();

    // Check for missing required fields
    if (!qnAObj) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Generate the user prompt based on the input

    const userPrompt = generateSystemRole(qnAObj);

    // Make the OpenAI API call
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: userPrompt,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "generate response ",
            },
          ],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: JSON.stringify(qnAObj),
            },
          ],
        },
      ],
      temperature: 1,
      max_tokens: 4071,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "json_object",
      },
    });
    const responseContent = response.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("Invalid response from OpenAI");
    }

    console.log(responseContent, "responseContent");

    // Return the AI-generated response
    return NextResponse.json({ result: responseContent });
  } catch (error) {
    console.error(error);

    // Return an error response in case of failure
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handling non-POST methods
export function OPTIONS() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
