"use client";

import Typewriter from "typewriter-effect";

const Headline = () => {
  return (
    <>
      {/* <div className='text-xs bg-blue-200 rounded-full p-1.5 px-2.5 mb-3'>
        📞 incoming call AI is calling...
      </div> */}
      {/* 
      <div className='flex gap-2'>
        Hire a Fully Automated
        <span className='text-blue-500'>
          <Typewriter
            options={{
              strings: [
                'AI Scrum Master',
                'AI Project Manager',
                'AI Product Manager',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </div> */}
      <div>Hire a Fully Automated</div>
      <div className="text-blue-500">
        <Typewriter
          options={{
            strings: [
              "AI Scrum Master",
              "AI Project Manager",
              "AI Product Manager",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>

      {/* <div className='flex gap-0 text-base font-medium '> */}
      {/* <div className='flex text-sm md:text-xl gap-1 flex-wrap'>
        Remind yourself of your goals/tasks via ai call
        <span> Your Life Goals Reminded by AI call </span>
        <span className='flex'>
          every-
          <Typewriter
            options={{
              strings: ['day!', 'week!', 'month!', 'year!'],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </div> */}
    </>
  );
};

export default Headline;
