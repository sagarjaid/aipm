import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the question
interface Question {
  questionNumber: number;
  question: string;
  questionCategory: string;
}

// Define the initial state type
interface QuestionsState {
  questions: Question[];
}

// Initial state with the question array
const initialState: QuestionsState = {
  questions: [
    {
      questionNumber: 1,
      question: "What university are you planning to attend?",
      questionCategory: "universityAndStudyPlans",
    },
    {
      questionNumber: 2,
      question: "What was your GPA during your bachelor's degree?",
      questionCategory: "academicsHistory",
    },
    {
      questionNumber: 3,
      question: "Who will be paying for your education?",
      questionCategory: "studentFinances",
    },
    {
      questionNumber: 4,
      question: "What is your current job title?",
      questionCategory: "workExperience",
    },
    {
      questionNumber: 5,
      question: "Do you plan to work in the USA after graduating?",
      questionCategory: "postGraduationPlans",
    },
    {
      questionNumber: 6,
      question: "Why did you choose this university?",
      questionCategory: "universityAndStudyPlans",
    },
    {
      questionNumber: 7,
      question: "What funds will be used to pay for your studies?",
      questionCategory: "studentFinances",
    },
    {
      questionNumber: 8,
      question: "Why did you take a gap year?",
      questionCategory: "workExperience",
    },
    {
      questionNumber: 9,
      question: "Do you have any scholarship?",
      questionCategory: "otherQuestions",
    },
  ],
};

// Create the slice
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    // Reducer to add a single question
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },

    // Reducer to remove a question by its number
    removeQuestion: (state, action: PayloadAction<number>) => {
      state.questions = state.questions.filter(
        (q) => q.questionNumber !== action.payload,
      );
    },

    // New reducer to add multiple questions
    addMultipleQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions.push(...action.payload);
    },

    // New reducer to replace all current questions
    replaceAllQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload; // Replaces the current questions array
    },
    // New reducer to remove all questions
    removeAllQuestions: (state) => {
      state.questions = []; // Reset the questions array to an empty array
    },
  },
});

// Export the actions and the reducer
export const {
  addQuestion,
  removeQuestion,
  addMultipleQuestions,
  replaceAllQuestions,
  removeAllQuestions,
} = questionsSlice.actions;
questionsSlice.actions;
export default questionsSlice.reducer;
