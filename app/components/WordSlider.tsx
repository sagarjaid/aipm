/** @format */

"use client"; // ✅ if using app directory (Next 13+)

import React, { useEffect, useState } from "react";

const words = [
  "Organized",
  "Productive",
  "Easy",
  "Worthwhile",
  "Fun",
  "Efficient",
  "Count",
];

const WordSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h2 relative mt-2 min-h-[1.5em] w-full text-3xl font-bold xs:text-4xl mdx:text-6xl">
      {words.map((word, index) => (
        <div
          key={word}
          className={`${
            index === currentIndex
              ? "translate-y-0 opacity-100 blur-0 transition-all duration-700 ease-in-out"
              : "absolute left-0 top-0 w-full translate-y-4 text-center text-gray-600 opacity-0 blur"
          } ${index === currentIndex ? "relative" : ""}`}
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordSlider;
