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

    console.log(qnAObj, "qnAObj");

    // Check for missing required fields
    if (!qnAObj) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Generate the user prompt based on the input

    const userPrompt = `Question and Answer Object

const QNAObj = ${qnAObj}

How to respond

- Analyze the above interview QNAObj
- In which case visa officer should Reject the student f1 visa are shared below
- In which case visa officer should Approve the student f1 visa are shared below
- 4-6 reasons should be proved  in response key "reasons" based upon QNAObj inetview questions and answer of users.
- You are not allowed to introduce any new key to the objects.
- Output the result in the following valid JSON format.
- Make sure to follow all above respond instructions.


Visa Rejection cases as followed
(In which case visa officer should Reject the student f1 visa)

- F1 visa is non immigrant visa consider by default student will try to become immigrant.
- If student likely to become a potential immigrant
- if student don't have a strong academic intent or history
- If student plan to work in the USA after graduation is consider as potential immigrant.
- If student don't have financial resources to study in the USA
- If user don't have strong ties to home country
- If student has some/lots of work experience there chance of potential immigration (not a strong factor)
- Any other reason to reject you my think


Visa Approval cases as followed
In which case visa officer should Approve the student f1 visa 

- If student don't plan to work in the USA after graduation and wants to return back to home country
- If student have  financial resources in place to study and fund living expense in the USA
- If student is genuine applicant with a strong academic intent
- If user have strong ties to home country
- Any other reason to approve you my think


Interview factors:

1. University and Study Plans
2. Academic History
3. Student Finances
4. Work Experience (if applicable)
5. Post-Graduation Plans
6. Other Questions


Response JSON obj
{
  interviewID: ${
    qnAObj?.interviewID || "interviewID from QNAObj Oject key interviewID"
  }  ,
  visaStatus: true as in if a students visa is approved || false as in the students visa is rejected,
  reasons: reasons for rejection or reasons for approval in form of [] (array of stings text) use from userAnswers qnAObj highly specific reasons, Note: you can't just simply state: Visa Approval/Rejection cases.
 } `;

    // Make the OpenAI API call

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userPrompt,
            },
          ],
        },
      ],
      temperature: 1,
      max_tokens: 2048,
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
