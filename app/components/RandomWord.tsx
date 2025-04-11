/** @format */
'use client';

import { useEffect, useState } from 'react';

const words = ['Wanderer', 'Explorer', 'Traveler', 'Nomad', 'You'];

export default function RandomWord() {
  const [randomWord, setRandomWord] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomIndex]);
  }, []);

  return (
    <span className='underline decoration-wavy decoration-rose-300 underline-offset-4'>
      {randomWord}
    </span>
  );
}
