// components/SpeechToText.js
"use client";

import { useState, useEffect } from "react";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onstart = () => {
        setIsRecording(true);
      };

      recognitionInstance.onresult = (event) => {
        let resultText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            resultText += event.results[i][0].transcript + " ";
          } else {
            resultText += event.results[i][0].transcript;
          }
        }
        setTranscript(resultText);

        if (resultText.toLowerCase().includes("stop recording")) {
          stopRecording();
          setTranscript(resultText.replace(/stop recording/gi, ""));
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech recognition not supported");
    }
  }, []);

  const startRecording = () => {
    if (recognition) {
      setTranscript("");
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="flex h-screen flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900">
      <h1 className="my-8 text-3xl uppercase text-white md:text-5xl">
        Real-time Stt App
      </h1>

      <div className="flex space-x-4">
        <button
          id="startBtn"
          onClick={startRecording}
          disabled={isRecording}
          className="flex items-center rounded-md bg-red-600 px-6 py-2 text-white shadow-lg transition hover:opacity-90 disabled:opacity-50"
        >
          {isRecording ? (
            <svg viewBox="0 0 100 100" className="h-6 w-6">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#ccc"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#ccc"
                strokeWidth="5"
                fill="none"
              >
                <animate
                  attributeName="r"
                  values="30; 25; 30"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="50" cy="50" r="5" fill="#ccc" />
            </svg>
          ) : (
            <span>Start Recording</span>
          )}
        </button>

        <button
          id="stopBtn"
          onClick={stopRecording}
          disabled={!isRecording}
          className="rounded-md bg-indigo-900 px-6 py-2 text-white shadow-lg transition hover:opacity-90 disabled:opacity-50"
        >
          Stop Recording
        </button>
      </div>

      <div
        id="result"
        className={`mt-8 w-full max-w-4xl rounded-md bg-white p-4 text-black shadow-lg ${
          !transcript && "hidden"
        }`}
      >
        {transcript}
      </div>
    </div>
  );
};

export default SpeechToText;
