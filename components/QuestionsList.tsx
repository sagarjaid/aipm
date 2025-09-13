"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  addQuestion,
  removeQuestion,
  addMultipleQuestions,
  removeAllQuestions,
} from "../store/questionsSlice";

const QuestionsList = () => {
  const questions = useSelector(
    (state: RootState) => state.questions.questions,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleAddQuestion = () => {
    const newQuestion = {
      questionNumber: 10,
      question: "What motivates you to study?",
      questionCategory: "otherQuestions",
    };
    dispatch(addQuestion(newQuestion));
  };

  // Handle button click to remove all questions
  const handleRemoveAllQuestions = () => {
    dispatch(removeAllQuestions()); // Dispatch the removeAllQuestions action
  };

  const handleRemoveQuestion = (questionNumber: number) => {
    dispatch(removeQuestion(questionNumber));
  };

  // Function to handle adding multiple questions
  const handleAddQuestions = () => {
    const newQuestions = [
      {
        questionNumber: 10,
        question: "What motivates you to study?",
        questionCategory: "otherQuestions",
      },
      {
        questionNumber: 11,
        question: "What is your long-term career goal?",
        questionCategory: "postGraduationPlans",
      },
      {
        questionNumber: 12,
        question: "How do you plan to balance work and study?",
        questionCategory: "workExperience",
      },
    ];

    // Dispatching the action to add multiple questions
    dispatch(addMultipleQuestions(newQuestions));
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <h1>Questions List</h1>

      <ul>
        {questions.map((q) => (
          <li key={q.questionNumber}>
            {q.question} - {q.questionCategory}
            <button
              className="ml-2"
              onClick={() => handleRemoveQuestion(q.questionNumber)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button className="ml-2" onClick={handleRemoveAllQuestions}>
        Remove all
      </button>

      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleAddQuestions}>Add Multiple Questions</button>
    </div>
  );
};

export default QuestionsList;
