/** @format */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface AnimatedCardProps {
  image: any;
  title: string;
  description: string[];
  imageClassName?: string;
  gradientDirection?: "left" | "right";
}

export default function AnimatedCard({
  image,
  title,
  description,
  imageClassName,
  gradientDirection = "left",
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Determine gradient classes based on direction prop
  const gradientClasses =
    gradientDirection === "left"
      ? "bg-gradient-to-l from-stone-600 via-green-100 to-green-600"
      : "bg-gradient-to-r from-stone-600 via-green-100 to-green-600";

  return (
    <div className="group relative w-full cursor-pointer overflow-hidden p-[2.5px] transition-all duration-300 hover:scale-105">
      <div className={`absolute inset-0 ${gradientClasses} hover-animation`} />
      <div className="relative flex h-full w-full flex-col items-start gap-4 bg-white px-6 pb-36 pt-16">
        <Image
          src={image}
          className={imageClassName}
          alt={title}
          width={100}
          height={100}
        />
        <div className="text-xl font-medium">{title}</div>
        <ul className="flex flex-col gap-2 pl-4 text-xs">
          {description.map((item, index) => (
            <li key={index} className="flex items-center">
              <div
                className={`mr-1 flex h-3 w-3 items-center justify-center rounded-full ${
                  item === "Facilitate Daily Stand-up" ||
                  item === "Monitor & update Jira tickets"
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              >
                <svg
                  className="h-2 w-2 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span
                className={`${item === "Facilitate Daily Stand-up" || item === "Monitor & update Jira tickets" ? "text-green-600" : ""} relative cursor-pointer rounded px-1 py-0.5 transition-colors duration-200 hover:bg-gray-50`}
                data-tooltip={
                  item === "Facilitate Daily Stand-up" ||
                  item === "Monitor & update Jira tickets"
                    ? "Live"
                    : "Coming Soon"
                }
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
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

        /* Tooltip styles */
        span[data-tooltip]:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
          padding: 4px 8px;
          background-color: #1f2937;
          color: white;
          font-size: 12px;
          border-radius: 4px;
          white-space: nowrap;
          z-index: 10;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        span[data-tooltip]:hover::before {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 2px;
          border: 4px solid transparent;
          border-top-color: #1f2937;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
