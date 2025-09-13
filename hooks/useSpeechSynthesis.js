"use client";

import { useState, useEffect } from "react";

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleVoicesChanged = () => {
      setVoices(speechSynthesis.getVoices());
    };

    speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

    // Get initial voices
    handleVoicesChanged();

    return () => {
      speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, []);

  const getVoiceIndex = () => {
    const desiredVoices = [
      "Microsoft AvaMultilingual Online (Natural) - English (United States)",
      "Microsoft AndrewMultilingual Online (Natural) - English (United States)",
      "Samantha",
      "Aaron",
    ];

    for (const desiredVoice of desiredVoices) {
      const index = voices.findIndex(
        (voice) => voice.name.toLowerCase() === desiredVoice.toLowerCase(),
      );
      if (index !== -1) {
        return index;
      }
    }

    return 0; // Default to the first voice if no desired voice is found
  };

  const handleTextToSpeech = (text) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[getVoiceIndex()] || voices[0]; // Default to the first voice if index is invalid

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  return {
    voices,
    isSpeaking,
    handleTextToSpeech,
  };
};

export default useSpeechSynthesis;
