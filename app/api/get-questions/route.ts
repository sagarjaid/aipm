// app/api/get-questions/route.ts
import { interviewQuestions } from "@/components/helper/questions";
import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

// The GET method for your API route
export async function GET(req: Request) {
  const systemPrompt = `You are a visa officer conducting a student visa interview to determine the following key factors:

Visa Officer's Evaluation Criteria:

1. Is the student a genuine applicant with a strong academic intent?
2. Is the student likely to become a potential immigrant?
3. Does the student have adequate financial resources to study in the USA?

Interview Questions Categories:

1. University and Study Plans
2. Academic History
3. Student Finances
4. Work Experience (if applicable)
5. Post-Graduation Plans
6. Other Questions


const interviewQuestions = {
  universityAndStudyPlans: {
    1: 'Which university are you planning to attend?',
    2: 'What is the program that you are applying?',
    3: 'Why do you want the visa today?',
    4: 'Why this Hybrid program why not to go with normal program',
    5: 'Did you apply to any other universities?',
    6: 'How many other universities have you applied to?',
    7: 'List the names of the universities, you got accepted to. which one?',
    8: 'Why did you only apply to just one university?',
    9: 'What’s unique about this university?',
    10: 'Why did you choose this university?',
    11: 'Why did you choose this program?',
    12: 'What are the components of this program?',
    13: 'Why not study in your home country?',
    14: 'Why do you want to study in the USA?',
    15: 'What attracts you to the USA?',
  },
  academicsHistory: {
    1: "Where did you get your bachelor's degree?",
    2: 'When did you graduate?',
    3: 'What was your GPA?',
    4: 'What did you study?',
    5: 'What was your GRE/GMAT score?',
    6: 'What was your TOEFL score?',
  },
  studentFinances: {
    1: 'Who will be paying for your education?',
    2: 'Who is sponsoring you?',
    3: 'What funds will they use to pay for your studies?',
    4: 'What is their income?',
    5: 'How long have they worked in their job?',
    6: 'How much money do they have in bank account?',
    7: 'Any other asset your sponsor owns?',
    8: 'How much does your program cost?',
    9: 'Why did you take a gap year?',
    0: 'How are you planning to pay other expenses? like housing food, and living expenses?',
  },
  workExperience: {
    1: 'Do you Have work Experience? ',
    2: 'What is your current job title?',
    3: 'What is your current salary?',
    4: 'What your daily responsibilities look like?',
    5: 'How long have you been at your current job or industry?',
    6: 'Have you received any promotions?',
    7: 'Why are you leaving the workforce?',
  },
  postGraduationPlans: {
    1: 'Do you plan to work in the USA after graduating?',
    2: 'Do you plan to stay in USA after study?',
    3: 'Do you plan to return to your home country after graduating?',
    4: 'Why not the USA, The USA has lots of IT companies?',
    5: 'How do you plan to repay the loan?',
  },
  otherQuestions: {
    1: 'How many siblings do you have?',
    2: 'What did your father do?',
    3: 'Do you live with your family?',
    4: 'Who lives in your house?',
    5: 'Who all are part of your family?',
    6: 'Did you apply to any other countries?',
    7: 'Why did you change your field of study?',
    8: 'Do you have any scholarship?',
    9: 'My university has a high acceptance rate but a low graduation rate.',
  },
};

Response Interview Questions Structure:

You are allowed to ask a minimum of 1 and max 9 questions in total, balancing across the categories to examine the student based on the "Visa Officer's Evaluation Criteria". Use the provided interviewQuestions object as a reference point to out the JSON with appropriate and balanced questions.

For work-related questions, first confirm if the student has work experience. If they do, combine that with an additional relevant question, forming a compound question (two questions in one).

questionCategory enums : [  " universityAndStudyPlans",  "academicsHistory", "studentFinances", "workExperience",  "postGraduationPlans", "otherQuestions" ]

Output the result in the JSON format, ensuring each object inside balancedInterviewQuestionsArr has all keys - questionNumber should be in sequence, question, and questionCategory with appropriate questionCategory enums.`;

  try {
    // Call the OpenAI API to generate visa interview questions
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Extract the content from the API response
    const responseData = response.choices[0]?.message?.content;

    if (!responseData) {
      throw new Error("Invalid response from OpenAI");
    }

    // Return the result as JSON
    return NextResponse.json({ result: responseData });
  } catch (error) {
    console.error("Error:", error);

    // Return an error response
    return NextResponse.json({ result: error.message }, { status: 500 });
  }
}
