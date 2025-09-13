import Image from "next/image";
import RetakeAnswer from "./retakeAnswer";
import QuestionControls from "./questionControls";
import SubmitAnswer from "./submitAnswer";

import { useState, useCallback } from "react";
import { formatTime } from "../helper/helper";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useApiCall } from "@/hooks/useApiCall";
import { useRef } from "react";

const SpeechContainer = ({
  setOfficerToggle,
  handleTextToSpeech,
  isSpeaking,
  recording,
  transcript,
  startRecording,
  stopRecording,
  setVisaOfficerResponseText,
  setVisaOfficerFeedbackText,
  setVisaOfficerSampleResponseText,
  handleNextQuestion,
  currentQuestionIndex,
  totalQuestions,
  handleResult,
  loadingResult,
  setQnAObj,
  updateCurrentQuestionNumber,
  updateUserAnswer,
  qnAObj,
}) => {
  const [visaOfficerResponse, setVisaOfficerResponse] = useState(false);
  const [answer, setAnswer] = useState(false);
  const timeoutRef = useRef(null);

  const handleTimerEnd = useCallback(() => {
    handleStopRecording();
  }, []);

  const { countdown, startTimer, stopTimer, resetTimer } = useCountdownTimer(
    false,
    120,
    handleTimerEnd,
  );

  const { callApi } = useApiCall();

  const handleStartRecording = () => {
    startRecording();
    startTimer();
  };

  const handleStopRecording = async () => {
    stopRecording();
    setAnswer(true);
    stopTimer();
    resetTimer();

    if (transcript) {
      updateUserAnswer(qnAObj, currentQuestionIndex + 1, transcript);
      updateCurrentQuestionNumber(qnAObj, currentQuestionIndex + 1);
    }

    timeoutRef.current = setTimeout(async () => {
      console.log(qnAObj, "qnAObj handleStartRecording");
      try {
        const resData1 = await callApi("/api/get-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(qnAObj),
        });

        // console.log(resData1?.result, 'resData1?.result');

        const newQnAObj = JSON.parse(resData1?.result);
        setQnAObj(newQnAObj);

        // console.log(newQnAObj, 'resData1?.result || newQnAObj');

        setVisaOfficerResponseText(
          newQnAObj?.baseInterviewQuestions[currentQuestionIndex]
            ?.officerResponse?.officer?.visaOfficerResponse,
        );

        handleTextToSpeech(
          !isSpeaking &&
            newQnAObj?.baseInterviewQuestions[currentQuestionIndex]
              ?.officerResponse?.officer?.visaOfficerResponse,
        );

        setVisaOfficerFeedbackText(
          newQnAObj?.baseInterviewQuestions[currentQuestionIndex]
            ?.officerResponse?.officer?.feedbackToStudent,
        );

        setVisaOfficerSampleResponseText(
          newQnAObj?.baseInterviewQuestions[currentQuestionIndex]
            ?.officerResponse?.officer?.exampleResponse,
        );

        setAnswer(false);
        setOfficerToggle(true);
        setVisaOfficerResponse(true);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }, 4000);
  };

  const handleRetake = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setVisaOfficerResponse(false);
    setOfficerToggle(false);
    setVisaOfficerResponseText("");
    setVisaOfficerFeedbackText("");
    setVisaOfficerSampleResponseText("");
    setAnswer(false);
    stopTimer();
    resetTimer();
  };

  const handleNextQuestionWithReset = () => {
    handleNextQuestion();
    setVisaOfficerResponse(false);
    setOfficerToggle(false);
    setVisaOfficerResponseText("");
    setVisaOfficerFeedbackText("");
    setVisaOfficerSampleResponseText("");
    setAnswer(false);
    stopTimer();
    resetTimer();
  };

  return (
    <div className="flex w-full flex-col gap-8 px-4 pb-8 pt-6">
      {visaOfficerResponse ? (
        <>
          <RetakeAnswer handleRetake={handleRetake} />
          <QuestionControls
            loadingResult={loadingResult}
            handleNextQuestion={handleNextQuestionWithReset}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            handleResult={handleResult}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          {!answer ? (
            <>
              {recording ? (
                <div
                  onClick={handleStopRecording}
                  className="h-30 w-30 flex cursor-pointer rounded-full bg-green-500 p-2 shadow-lg"
                >
                  <Image alt="pause" src="/pause.svg" width={40} height={40} />
                </div>
              ) : (
                <div
                  onClick={handleStartRecording}
                  className="h-30 w-30 relative flex cursor-pointer"
                >
                  <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></div>
                  <div className="relative inline-flex rounded-full bg-red-500 p-2 shadow-lg">
                    <Image alt="mic" src="/mic.svg" width={40} height={40} />
                  </div>
                </div>
              )}
              <div className="mt-4 flex gap-1 text-xs font-bold">
                {recording ? (
                  <span className="text-rose-600">Stop</span>
                ) : (
                  <span className="text-green-700">Start</span>
                )}
                <span>recording your answer</span>
              </div>
              <div className="font-bold">{formatTime(countdown)}/02:00</div>
            </>
          ) : (
            <>
              <SubmitAnswer />
              <RetakeAnswer handleRetake={handleRetake} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SpeechContainer;
