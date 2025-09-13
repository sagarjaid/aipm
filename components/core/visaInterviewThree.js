"use client";

import UserFeedbackView from "../molecules/userFeedbackView";
import SpeechContainer from "../molecules/speechContainer";
import ToggleSections from "../molecules/toggleSections";
import Question from "../molecules/question";

import { useEffect, useState } from "react";
import { useWhisperRecording } from "@/hooks/useWhisperRecording";
import { useToggle } from "@/hooks/useToggle";
// import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";

const VisaInterviewThree = ({ baseInterviewQuestions }) => {
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

  // const { handleTextToSpeech, isSpeaking } = useTextToSpeech();

  const { handleTextToSpeech, isSpeaking } = useSpeechSynthesis();

  const { recording, transcript, startRecording, stopRecording } =
    useWhisperRecording(process.env.NEXT_PUBLIC_OPENAI_KEY);

  console.log({ transcript, recording }, "recording");

  const [visaOfficerResponseText, setVisaOfficerResponseText] = useState("");
  const [visaOfficerFeedbackText, setVisaOfficerFeedbackText] = useState("");
  const [visaOfficerSampleResponseText, setVisaOfficerSampleResponseText] =
    useState("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < baseInterviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setOfficerToggle(false);
    setFeedbackToggle(false);
    setResponseToggle(false);
  };

  const handleResult = () => {
    console.log(" getResult() got called");
  };

  const totalQuestions = baseInterviewQuestions?.length - 1;

  useEffect(() => {
    handleTextToSpeech(baseInterviewQuestions[currentQuestionIndex]?.question);
  }, [currentQuestionIndex]);

  return (
    <div className="flex h-fit flex-col gap-4 rounded-xl p-4 sdm:flex-row">
      <div className="flex h-fit w-full flex-col rounded-lg border bg-white">
        <Question
          questionNumber={
            baseInterviewQuestions[currentQuestionIndex].questionNumber
          }
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

export default VisaInterviewThree;
