/** @format */

'use client'; // ✅ if using app directory (Next 13+)

import React, { useEffect, useState } from 'react';

const words = [
  'Organized',
  'Productive',
  'Easy',
  'Worthwhile',
  'Fun',
  'Efficient',
  'Count',
];

const WordSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h2 relative w-full mdx:text-6xl xs:text-4xl text-3xl font-extrabold'>
      {words.map((word, index) => (
        <div
          key={word}
          className={`absolute w-full text-center ${
            index === currentIndex
              ? 'transition-all duration-700 ease-in-out opacity-100 translate-y-0 blur-0 text-gray-600'
              : 'opacity-0 translate-y-4 blur text-gray-600'
          }`}>
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordSlider;
