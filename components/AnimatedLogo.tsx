/** @format */

'use client';

import Link from 'next/link';

const AnimatedLogo = () => {
  return (
    <Link
      href='/'
      className='flex items-center gap-2 group cursor-pointer overflow-hidden'>
      <div className='relative w-7 h-7'>
        <svg
          width='514'
          height='514'
          viewBox='0 0 514 514'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-full h-full transition-all duration-1000 ease-in-out group-hover:translate-x-[2.5rem]'
          style={{
            fill: 'black',
            color: 'rgb(51, 51, 51)',
          }}>
          <path
            d='M513 231.4H406.248L489.192 148.456L453.096 112.104L333.8 231.4H282.6V180.2L401.896 60.904L365.544 24.808L282.6 107.752V1H231.4V107.752L148.456 24.808L112.104 60.904L231.4 180.2V231.4H180.2L60.904 112.104L24.808 148.456L107.752 231.4H1V282.6H107.752L24.808 365.544L60.904 401.896L180.2 282.6H231.4V333.8L112.104 453.096L148.456 489.192L231.4 406.248V513H282.6V406.248L365.544 489.192L401.896 453.096L282.6 333.8V282.6H333.8L453.096 401.896L489.192 365.544L406.248 282.6H513V231.4Z'
            fill='black'
            stroke='black'
            strokeWidth='16'
          />
        </svg>
      </div>
      <p className='font-bold text-black text-3xl transition-all duration-1000 ease-in-out group-hover:translate-x-[-20%] group-hover:opacity-0'>
        aipm
      </p>
    </Link>
  );
};

export default AnimatedLogo;
