import UserFeedbackView from "../molecules/userFeedbackView";
import SpeechContainer from "../molecules/speechContainer";
import ToggleSections from "../molecules/toggleSections";
import Question from "../molecules/question";

import { useState } from "react";
import { useWhisperRecording } from "@/hooks/useWhisperRecording";
import { useToggle } from "@/hooks/useToggle";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

const VisaInterviewHomePage = () => {
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

  const handleTextToSpeech = useTextToSpeech();

  const { recording, transcript, startRecording, stopRecording } =
    useWhisperRecording(process.env.NEXT_PUBLIC_OPENAI_KEY);

  const [visaOfficerResponseText, setVisaOfficerResponseText] = useState("");

  return (
    <div className="flex h-fit flex-col gap-4 rounded-xl p-4 sdm:flex-row">
      <div className="flex h-fit w-full flex-col rounded-lg border bg-white drop-shadow-xl sdm:w-[600px]">
        <Question
          questionNumber={1}
          question={"Why do you want the US student visa today?"}
          handleTextToSpeech={handleTextToSpeech}
        />
        <UserFeedbackView userAnswer={transcript} />
        <SpeechContainer
          setOfficerToggle={setOfficerToggle}
          handleTextToSpeech={handleTextToSpeech}
          recording={recording}
          transcript={transcript}
          startRecording={startRecording}
          stopRecording={stopRecording}
          setVisaOfficerResponseText={setVisaOfficerResponseText}
        />
        <ToggleSections
          visaOfficerResponseText={visaOfficerResponseText}
          officerToggle={officerToggle}
          setOfficerToggle={setOfficerToggle}
          handleOfficerToggle={handleOfficerToggle}
          handleTextToSpeech={handleTextToSpeech}
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

export default VisaInterviewHomePage;
