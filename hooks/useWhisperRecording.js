"use client";

import { useState, useEffect, useRef } from "react";

export const useWhisperRecording = ({
  removeSilence = false,
  stopTimeout = 60000,
  streaming = true,
} = {}) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); // Stores final transcribed text
  const [interimTranscript, setInterimTranscript] = useState(""); // Stores interim text
  const recognitionRef = useRef(null); // Ref for SpeechRecognition instance
  const stopTimeoutRef = useRef(null); // Ref for timeout to auto-stop the recording

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = streaming; // Continuous recording based on the streaming flag
      recognitionInstance.interimResults = true; // Capture partial results while speaking
      recognitionInstance.lang = "en-US"; // Set the language

      // When recording starts
      recognitionInstance.onstart = () => {
        setRecording(true);
        if (stopTimeout) {
          stopTimeoutRef.current = setTimeout(
            () => stopRecording(),
            stopTimeout,
          ); // Stop after timeout
        }
      };

      // Handle the results of speech recognition
      recognitionInstance.onresult = (event) => {
        let newInterimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          } else {
            newInterimTranscript += event.results[i][0].transcript;
          }
        }

        // Optionally remove extra silence or spaces
        if (removeSilence) {
          newInterimTranscript = newInterimTranscript
            .replace(/(\s+)/g, " ")
            .trim();
        }

        // Update interim transcript state for immediate feedback
        setInterimTranscript(newInterimTranscript);

        // Append the final transcript to the stored transcript
        setTranscript((prevTranscript) => prevTranscript + finalTranscript);
      };

      // Handle errors in speech recognition
      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setRecording(false);
      };

      // When recording ends
      recognitionInstance.onend = () => {
        setRecording(false);
        clearTimeout(stopTimeoutRef.current); // Clear auto-stop timeout when done
      };

      recognitionRef.current = recognitionInstance;
    } else {
      console.error("Speech recognition not supported");
    }
  }, [removeSilence, stopTimeout, streaming]);

  // Start recording function
  const startRecording = () => {
    setTranscript(""); // Clear transcript each time recording starts
    setInterimTranscript(""); // Clear interim transcript
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      clearTimeout(stopTimeoutRef.current); // Clear auto-stop timeout
    }
  };

  return {
    recording, // Is the recording active
    transcript: transcript + interimTranscript, // Combine final and interim transcripts for display
    startRecording, // Function to start recording
    stopRecording, // Function to stop recording
  };
};

// try ro make you own audio npm

// import useWhisper from '@chengsokdara/use-whisper';

// export const useWhisperRecording = (key) => {
//   const { recording, transcript, startRecording, stopRecording } = useWhisper({
//     apiKey: key,
//     removeSilence: true,
//     stopTimeout: 120000,
//     streaming: true,
//   });

//   return {
//     recording,
//     transcript,
//     startRecording,
//     stopRecording,
//   };
// };

// import { useState, useEffect, useRef } from 'react';

// export const useWhisperRecording = ({
//   removeSilence = false,
//   stopTimeout = 60000,
//   streaming = true,
// } = {}) => {
//   const [recording, setRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const recognitionRef = useRef(null);
//   const stopTimeoutRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (SpeechRecognition) {
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = streaming;
//       recognitionInstance.interimResults = true;
//       recognitionInstance.lang = 'en-US';

//       recognitionInstance.onstart = () => {
//         setRecording(true);
//         if (stopTimeout) {
//           stopTimeoutRef.current = setTimeout(
//             () => stopRecording(),
//             stopTimeout
//           );
//         }
//       };

//       recognitionInstance.onresult = (event) => {
//         let interimTranscript = '';
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           if (event.results[i].isFinal) {
//             interimTranscript += event.results[i][0].transcript + ' ';
//           } else {
//             interimTranscript += event.results[i][0].transcript;
//           }
//         }

//         if (removeSilence) {
//           interimTranscript = interimTranscript.replace(/(\s+)/g, ' ').trim(); // remove excessive spaces
//         }

//         setTranscript((prevTranscript) => prevTranscript + interimTranscript);
//       };

//       recognitionInstance.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setRecording(false);
//       };

//       recognitionInstance.onend = () => {
//         setRecording(false);
//         clearTimeout(stopTimeoutRef.current); // clear timeout if recognition ends
//       };

//       recognitionRef.current = recognitionInstance;
//     } else {
//       console.error('Speech recognition not supported');
//     }
//   }, [removeSilence, stopTimeout, streaming]);

//   const startRecording = () => {
//     setTranscript(''); // clear previous transcript
//     if (recognitionRef.current) {
//       recognitionRef.current.start();
//     }
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       clearTimeout(stopTimeoutRef.current); // stop timeout when manually stopped
//     }
//   };

//   return {
//     recording,
//     transcript,
//     startRecording,
//     stopRecording,
//   };
// };

// ('use client');

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// // Define the endpoint for the OpenAI Whisper API
// const WHISPER_API_URL = 'https://api.openai.com/v1/audio/transcriptions'; // Update the endpoint if needed

// export const useWhisperRecording = (apiKey) => {
//   const [recording, setRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   let mediaRecorder;

//   const startRecording = async () => {
//     // Request microphone access
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     mediaRecorder = new MediaRecorder(stream);
//     const audioChunks = [];

//     mediaRecorder.ondataavailable = (event) => {
//       audioChunks.push(event.data);
//     };

//     mediaRecorder.onstop = async () => {
//       const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//       await transcribeAudio(audioBlob);
//     };

//     mediaRecorder.start();
//     setRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const transcribeAudio = async (audioBlob) => {
//     const formData = new FormData();
//     formData.append('file', audioBlob);
//     formData.append('model', 'whisper-1'); // Specify the model to use
//     formData.append('language', 'en'); // Optional: specify the language

//     try {
//       const response = await axios.post(WHISPER_API_URL, formData, {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Update the transcript state with the response
//       setTranscript(response.data.text);
//     } catch (error) {
//       console.error('Error transcribing audio:', error);
//       setTranscript(''); // Reset the transcript in case of error
//     }
//   };

//   return {
//     recording,
//     transcript,
//     startRecording,
//     stopRecording,
//   };
// };
