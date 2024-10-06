import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
import Navbar from '@/components/Navbar';
import VisaInterviewTwo from '@/components/core/visaInterviewTwo';
import VisaInterview from '@/components/core/visaInterview';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className='flex flex-col items-center w-full justify-center pt-2'>
        <div className='flex max-w-5xl w-full gap-4 flex-col items-center justify-center'>
          <Suspense>
            <Header />
          </Suspense>
          <div className='flex flex-col text-center items-center p-1 pt-20 text-base font-bold xs:text-xl sdm:text-3xl sm:gap-3 md:text-4xl mdx:text-5xl '>
            <div>Practice USA F1 Mock Student Visa</div>
            <div>
              Interview,{' '}
              <span className='bg-blue-200'> Get Instant Feedback</span>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 pt-6 text-center text-gray-600 sm:text-base'>
            <a href='/'>
              <img
                src='/usedby.png'
                className='w-[200px]'
              />
            </a>
            <p className='text-center text-xs sm:text-base'>
              900+ students already interviewed
            </p>

            <a
              href='/interview/91739730173'
              className='flex gap-2 bg-white hover:bg-slate-50 p-2 px-3.5 border cursor-pointer border-black rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 48 48'>
                <path
                  fill='#FFC107'
                  d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
                />
                <path
                  fill='#FF3D00'
                  d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
                />
                <path
                  fill='#4CAF50'
                  d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
                />
                <path
                  fill='#1976D2'
                  d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
                />
              </svg>
              <span>Continue with Google</span>
            </a>

            <div className='flex flex-col gap-1'>
              <span className='text-xs'>✓ 1 Free Realistic Mock Interview</span>
              <span className='text-xs'>✓ No credit card required</span>
            </div>
          </div>

          <a
            href='/interview/91739730173'
            className='flex justify-center items-center w-full'>
            <img
              src='/interview-cover.png'
              className='w-[90%] sdm:w-2/3'
            />
          </a>
          <Pricing />
        </div>
        <Footer />
      </main>
    </>
  );
}
