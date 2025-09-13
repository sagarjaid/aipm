"use client";

import UserFeedbackView from "../molecules/userFeedbackView";
import SpeechContainer from "../molecules/speechContainer";
import ToggleSections from "../molecules/toggleSections";
import Question from "../molecules/question";

import { useEffect, useState } from "react";
import { useWhisperRecording } from "@/hooks/useWhisperRecording";
import { useToggle } from "@/hooks/useToggle";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import { useApiCall } from "@/hooks/useApiCall";

const VisaInterview = ({ baseInterviewQuestions, interviewId }) => {
  const {
    officerToggle,
    feedbackToggle,
    responseToggle,
    setOfficerToggle,
    setFeedbackToggle,
    setResponseToggle,
    handleOfficerToggle,
    handleFeedbackToggle,
    handleResponseToggle,
  } = useToggle();

  const { handleTextToSpeech, isSpeaking } = useTextToSpeech();

  // const { handleTextToSpeech, isSpeaking } = useSpeechSynthesis();

  const { recording, transcript, startRecording, stopRecording } =
    useWhisperRecording();

  console.log({ transcript, recording }, "recording");

  const router = useRouter();
  const { callApi } = useApiCall();
  const supabase = createClient();

  const [visaOfficerResponseText, setVisaOfficerResponseText] = useState("");
  const [visaOfficerFeedbackText, setVisaOfficerFeedbackText] = useState("");
  const [visaOfficerSampleResponseText, setVisaOfficerSampleResponseText] =
    useState("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [loadingResult, setLoadingResult] = useState(false);
  const [qnAObj, setQnAObj] = useState({});

  const handleNextQuestion = () => {
    if (currentQuestionIndex < baseInterviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setOfficerToggle(false);
    setFeedbackToggle(false);
    setResponseToggle(false);
  };

  const handleResult = async () => {
    setLoadingResult(true);
    const { data, error } = await supabase
      .from("interviews")
      .update({ final_interview_questions: qnAObj })
      .eq("interview_id", interviewId);

    try {
      const resData1 = await callApi("/api/get-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qnAObj),
      });

      const result = JSON.parse(resData1?.result);
      console.log(result, "resData1?.result");

      const { data, error } = await supabase
        .from("interviews")
        .update({ interview_result: result, visa_status: result?.visaStatus })
        .eq("interview_id", interviewId);

      setLoadingResult(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }

    router.push(`/history/${interviewId}`);
  };

  const totalQuestions = baseInterviewQuestions?.length - 1;

  useEffect(() => {
    handleTextToSpeech(baseInterviewQuestions[currentQuestionIndex]?.question);
  }, [currentQuestionIndex]);

  // Function to transform baseInterviewQuestions into the desired format
  const transformInterviewQuestions = (
    baseInterviewQuestions,
    interviewID,
    currentQuestionNumber,
  ) => {
    return {
      interviewID: interviewID,
      currentQuestionNumber: currentQuestionNumber,
      baseInterviewQuestions: baseInterviewQuestions.map((question) => ({
        ...question,
        userAnswer: "",
        officerResponse: {},
      })),
    };
  };

  // Function to update userAnswer for a specific questionNumber
  const updateUserAnswer = (interview, questionNumber, answer) => {
    interview.baseInterviewQuestions.forEach((question) => {
      if (question.questionNumber === questionNumber) {
        question.userAnswer = answer;
      }
    });
  };

  // Function to update currentQuestionNumber
  const updateCurrentQuestionNumber = (interview, newQuestionNumber) => {
    interview.currentQuestionNumber = newQuestionNumber;
  };

  useEffect(() => {
    if (baseInterviewQuestions) {
      let interviewObj = transformInterviewQuestions(
        baseInterviewQuestions,
        interviewId,
        currentQuestionIndex + 1,
      );
      setQnAObj(interviewObj);
    }
  }, [baseInterviewQuestions]);

  // console.log(qnAObj, 'interview');

  // console.log(currentQuestionIndex, 'currentQuestionIndex');

  return (
    <div className="flex h-fit flex-col gap-4 rounded-xl p-4 sdm:flex-row">
      <div className="flex h-fit w-full flex-col rounded-lg border bg-white drop-shadow-xl sdm:w-[600px]">
        <Question
          questionNumber={
            baseInterviewQuestions[currentQuestionIndex].questionNumber
          }
          questionLength={baseInterviewQuestions.length}
          question={baseInterviewQuestions[currentQuestionIndex].question}
          handleTextToSpeech={handleTextToSpeech}
          isSpeaking={isSpeaking}
        />

        <UserFeedbackView
          userAnswer={transcript}
          recording={recording}
          isSpeaking={isSpeaking}
        />
        <SpeechContainer
          loadingResult={loadingResult}
          setQnAObj={setQnAObj}
          updateUserAnswer={updateUserAnswer}
          updateCurrentQuestionNumber={updateCurrentQuestionNumber}
          qnAObj={qnAObj}
          setOfficerToggle={setOfficerToggle}
          handleTextToSpeech={handleTextToSpeech}
          isSpeaking={isSpeaking}
          recording={recording}
          transcript={transcript}
          startRecording={startRecording}
          stopRecording={stopRecording}
          setVisaOfficerResponseText={setVisaOfficerResponseText}
          setVisaOfficerFeedbackText={setVisaOfficerFeedbackText}
          setVisaOfficerSampleResponseText={setVisaOfficerSampleResponseText}
          handleNextQuestion={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          handleResult={handleResult}
          baseInterviewQuestions={baseInterviewQuestions}
          currentQuestion={
            baseInterviewQuestions[currentQuestionIndex].question
          }
        />
        <ToggleSections
          visaOfficerResponseText={visaOfficerResponseText}
          visaOfficerFeedbackText={visaOfficerFeedbackText}
          visaOfficerSampleResponseText={visaOfficerSampleResponseText}
          officerToggle={officerToggle}
          setOfficerToggle={setOfficerToggle}
          handleOfficerToggle={handleOfficerToggle}
          handleTextToSpeech={handleTextToSpeech}
          isSpeaking={isSpeaking}
          feedbackToggle={feedbackToggle}
          setFeedbackToggle={setFeedbackToggle}
          handleFeedbackToggle={handleFeedbackToggle}
          responseToggle={responseToggle}
          setResponseToggle={setResponseToggle}
          handleResponseToggle={handleResponseToggle}
        />
      </div>
    </div>
  );
};

export default VisaInterview;
