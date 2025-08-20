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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h2 relative w-full mdx:text-6xl xs:text-4xl text-3xl font-bold mt-2 min-h-[1.5em]'>
      {words.map((word, index) => (
        <div
          key={word}
          className={`${
            index === currentIndex
              ? 'transition-all duration-700 ease-in-out opacity-100 translate-y-0 blur-0'
              : 'opacity-0 translate-y-4 blur text-gray-600 absolute top-0 left-0 w-full text-center'
          } ${index === currentIndex ? 'relative' : ''}`}>
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordSlider;
