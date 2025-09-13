/** @format */

"use client";

import { useState } from "react";

interface GradientInputProps {
  placeholder?: string;
  buttonText?: string;
}

export default function GradientInput({
  placeholder = "Email",
  buttonText = "Get early access",
}: GradientInputProps) {
  const onButtonClick = () => {
    window.open("https://www.linkedin.com/in/sagarjaid/", "_blank");
  };

  return (
    <div className="flex flex-col justify-between gap-3 xs:w-full mdx:w-1/2">
      <div className="group relative flex w-full items-center justify-between overflow-hidden rounded-full p-[2.5px]">
        <div className="hover-animation absolute inset-0 bg-gradient-to-l from-black via-gray-50 to-black" />
        <input
          type="email"
          placeholder={placeholder}
          className="relative z-10 ml-3 w-full rounded-l-full bg-white/90 px-6 py-4 backdrop-blur-sm focus:outline-none sd:ml-0"
        />
        <button
          onClick={onButtonClick}
          className="relative z-10 block w-[60%] rounded-r-full border-black bg-black px-4 py-4 text-white transition-colors duration-300 hover:bg-gray-900"
        >
          {buttonText}
        </button>
      </div>
      <div className="text-center text-[10px]">
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
