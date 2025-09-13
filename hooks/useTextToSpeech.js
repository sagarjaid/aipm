import axios from "axios";
import { useRef, useState } from "react";

export const useTextToSpeech = () => {
  const abortControllerRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTextToSpeech = async (txt) => {
    if (isSpeaking) {
      console.log(
        "Already speaking, please wait until the current audio finishes.",
      );
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      const response = await axios.post(
        "/api/convert-to-speech",
        { text: txt },
        {
          responseType: "arraybuffer",
          signal,
        },
      );

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.addEventListener("play", () => setIsSpeaking(true));
      audio.addEventListener("ended", () => setIsSpeaking(false));
      audio.addEventListener("pause", () => setIsSpeaking(false));

      audio.play();
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous request canceled:", error.message);
      } else {
        console.error("Error converting text to speech:", error);
      }
    }
  };

  return { handleTextToSpeech, isSpeaking };
};
