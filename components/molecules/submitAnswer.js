import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

const SubmitAnswer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [countdownDate, setCountdownDate] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setCountdownDate(Date.now() + 4000);
  }, []);

  const renderer = ({ seconds }) => <span>{seconds}</span>;

  return (
    <div className="flex animate-pulse flex-col items-center justify-center gap-2 text-black">
      {/* <div
                  onClick={'handleSubmit'}
                  className='flex cursor-pointer w-fit items-center gap-2 justify-around border-2 border-green-600 rounded-full bg-green-500 p-2.5 px-4 text-white'>
                  <span className='text-sm font-semibold'>Submit Answer</span>
                  <svg
                    className='w-4'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={3}
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
                    />
                  </svg>
                </div> */}
      <div className="flex flex-col items-center justify-center gap-1 text-sm font-semibold">
        <span>Submitting your answer for feedback</span>
        <span className="flex gap-1">
          <span>automatically in</span>
          <span className="text-base text-rose-600">
            {isMounted && countdownDate > 0 ? (
              <Countdown date={countdownDate} renderer={renderer} />
            ) : (
              <span>4</span>
            )}
          </span>
          <span>seconds</span>
        </span>
      </div>
    </div>
  );
};

export default SubmitAnswer;
