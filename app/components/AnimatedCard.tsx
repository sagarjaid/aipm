/** @format */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AnimatedCardProps {
  image: any;
  title: string;
  description: string[];
  imageClassName?: string;
}

export default function AnimatedCard({
  image,
  title,
  description,
  imageClassName,
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className='w-full rounded-lg p-[2.8px] relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300'>
      <div className='absolute inset-0 bg-gradient-to-l from-stone-900 via-green-100 to-gray-500 hover-animation ' />
      <div className='flex pt-16 rounded-lg pb-36 flex-col h-full w-full items-start px-6 gap-4 bg-white relative'>
        <Image
          src={image}
          className={imageClassName}
          alt={title}
          width={100}
          height={100}
        />
        <div className='text-xl font-medium'>{title}</div>
        <ul className='flex flex-col gap-2 text-xs list-disc pl-4'>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
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
      `}</style>
    </div>
  );
}
