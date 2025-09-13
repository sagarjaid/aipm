/** @format */
"use client";

import { useEffect, useState } from "react";

const words = ["Wanderer", "Explorer", "Traveler", "Nomad"];

export default function RandomWord() {
  const [randomWord, setRandomWord] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const randomIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomIndex]);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <span className="underline decoration-rose-300 decoration-wavy underline-offset-4">
        Wanderer
      </span>
    );
  }

  return (
    <span className="underline decoration-rose-300 decoration-wavy underline-offset-4">
      {randomWord}
    </span>
  );
}
