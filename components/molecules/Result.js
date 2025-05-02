/** @format */

'use client';

import { createClient } from '@/libs/supabase/client';
import { useState, useEffect } from 'react';

const Result = ({ interviewId }) => {
  const supabase = createClient();

  const [result, setResult] = useState({
    interviewID: interviewId,
    reasons: [],
    visaStatus: false,
  });

  const [reasons, setReasons] = useState([]);

  const [loading, setLoading] = useState(true);

  const getResult = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: resultData, error } = await supabase
      .from('interviews')
      .select('interview_result')
      .eq('interview_id', interviewId);

    setResult(resultData[0].interview_result);
    setReasons(resultData[0]?.interview_result?.reasons);

    console.log(resultData, 'resultData');
    setLoading(false);
  };

  useEffect(() => {
    getResult();
  }, [interviewId]);

  const message =
    'Hey, I found this AI-powered F1 visa interview tool that takes mock interview, I used it and got my F1 visa approved in the test > https://aipm.so/';

  return (
    <div className='flex h-full w-full cursor-pointer items-center justify-between gap-2 rounded-md  border shadow-md hover:shadow-lg'>
      {loading ? (
        <div className='w-full h-[630px] flex justify-center items-center'>
          <span>loading result...</span>
        </div>
      ) : (
        <div className='flex w-full flex-col gap-6'>
          <div className='flex flex-col gap-0.5 px-4 pt-4'>
            {result?.visaStatus ? (
              <svg
                className='w-16 h-16 text-green-600'
                fill='none'
                strokeWidth={3}
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m4.5 12.75 6 6 9-13.5'
                />
              </svg>
            ) : (
              <svg
                className='w-16 h-16 text-red-500'
                fill='none'
                strokeWidth={3}
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            )}

            <div className='text-lg mt-4 font-semibold'>Interview Result</div>
            <div className='text-xs text-gray-700'>
              InterviewID : {interviewId}
            </div>
          </div>
          <div className='flex flex-col gap-1 px-4 border-b pb-6'>
            {result?.visaStatus ? (
              <div className='text-green-600 text-lg font-bold'>
                Your visa has been Approved!
              </div>
            ) : (
              <div className='text-red-500 text-lg font-bold'>
                Sorry your visa has been Rejected
              </div>
            )}

            <div className='text-xs'>
              These reasons can help guide your visa preparation and provide
              strong points to address during the visa interview.
            </div>
          </div>

          <div className='flex flex-col pt-0 p-2 pl-4'>
            <div className='text-sm font-semibold'>
              Reasons why your visa was{' '}
              {result?.visaStatus ? 'Approved' : 'Rejected'}
            </div>

            {/* // <div className='flex flex-col gap-4 p-2 border rounded-sm mt-0 m-2.5'> */}
            <div className='flex flex-col text-xs  gap-4 p-2 pt-4 '>
              {reasons?.length > 0 ? (
                reasons.map((el, i) => (
                  <div key={i}>
                    <div className='flex gap-2'>
                      {/* <svg
                                      className='w-3.5 h-3.5 text-green-500'
                                      fill='none'
                                      strokeWidth={3}
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                      xmlns='http://www.w3.org/2000/svg'
                                      aria-hidden='true'>
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='m4.5 12.75 6 6 9-13.5'
                                      />
                                    </svg> */}
                      <span>{i + 1}.</span>
                      <span> {el}.</span>
                    </div>
                  </div>
                ))
              ) : (
                <div>Reasons not found :(</div>
              )}
            </div>
          </div>

          <div className='flex justify-start text-xs gap-5 px-4 pb-6'>
            {result?.visaStatus ? (
              <a
                href={`https://wa.me/?text=${encodeURIComponent(message)}`}
                target='_blank'
                className='flex  items-center gap-2 bg-white hover:bg-slate-50 p-2 px-3.5 border cursor-pointer border-black rounded-md'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
                  />
                </svg>
                <span>Share on WhatsApp</span>
              </a>
            ) : (
              <a
                href='/pricing'
                className='flex items-center gap-2 bg-white hover:bg-slate-50 p-2 px-3.5 border cursor-pointer border-black rounded-md'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
                  />
                </svg>
                <span>Upgrade to Success Plan</span>
              </a>
            )}

            <a
              href='/dash'
              className='flex items-center gap-2 bg-white hover:bg-slate-50 p-2 px-3.5 border cursor-pointer border-black rounded-md'>
              <svg
                className='w-5 h-5'
                fill='none'
                strokeWidth={1.5}
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
                />
              </svg>
              <span>Take another interview</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
