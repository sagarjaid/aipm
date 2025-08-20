'use client';

import Link from 'next/link';

interface BookerDemoProps {
  buttonText?: string;
}

export default function BookerDemo({  buttonText = 'BOOK A DEMO' }: BookerDemoProps) {
  return (
    <Link 
    target='_blank'
      href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0dlFbpOGz632w39CFnxBTVwjC_q7qdR3T6WU2aoV9GbJqe7F1v5hsfBq6ldDwWXjc3MPHN8sof"
      className='bg-black border p-2 text-center w-fit text-white text-sm font-bold px-4 rounded-sm'
    >
      {buttonText}
    </Link>
  );
}
