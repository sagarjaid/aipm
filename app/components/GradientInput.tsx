/** @format */

'use client';

import { useState } from 'react';

interface GradientInputProps {
  placeholder?: string;
  buttonText?: string;
}

export default function GradientInput({
  placeholder = 'Email',
  buttonText = 'Get early access',
}: GradientInputProps) {
  const onButtonClick = () => {
    window.open('https://www.linkedin.com/in/sagarjaid/', '_blank');
  };

  return (
    <div className='flex flex-col justify-between mdx:w-1/2 xs:w-full gap-3'>
      <div className='flex p-[3px] items-center justify-between rounded-full w-full relative overflow-hidden group'>
        <div className='absolute inset-0 bg-gradient-to-l from-stone-900 via-gray-50 to-gray-900 hover-animation' />
        <input
          type='email'
          placeholder={placeholder}
          className='rounded-l-full ml-3 sd:ml-0 w-full px-6 py-4 focus:outline-none relative z-10 bg-white/90 backdrop-blur-sm'
        />
        <button
          onClick={onButtonClick}
          className='bg-black text-white block w-[60%] border-black rounded-r-full px-4 py-4 relative z-10 hover:bg-gray-900 transition-colors duration-300'>
          {buttonText}
        </button>
      </div>
      <div className='text-[10px] text-center'>
        200+ companies and startups already join the waitlist
      </div>
      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .hover-animation {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        .group:hover .hover-animation {
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </div>
  );
}
