/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import scrum from '@/app/ai-scrum.png';
import pm from '@/app/ai-pm.png';
import logos from '@/app/logos.png';
import FooterBIg from '@/components/FooterBig';
import UserInfo from './components/UserInfo';
import logo from '@/app/logo-2.png';
import RandomWord from './components/RandomWord';
import AnimatedCard from './components/AnimatedCard';
import sagar from '@/app/sagar.png';
import GradientInput from './components/GradientInput';
import ScrumMasterInput from './components/ScrumMasterInput';
import CountryFlag from './components/CountryFlag';
import Photos from './components/Photos';

const ParticleHead = dynamic(() => import('./components/ParticleHead'), {
  ssr: false,
});

import WordSlider from './components/WordSlider';
import BookerDemo from '@/components/BookerDemo';

export default function Home() {
  return (
    <>
      <main className='flex flex-col items-center  bg-[url("/bg.svg")]  max-w-5xl mx-auto w-full justify-start overflow-hidden'>
        <div className='flex max-w-5xl w-full gap-4 lg:mt-4 flex-col items-center justify-center relative '>
          <Suspense>
            <Header />
          </Suspense>
        </div>
        <div className='flex flex-col items-center w-full justify-center '>
          <div className='flex max-w-5xl w-full gap-8 flex-col items-center justify-center px-4 pt-10'>
            <ParticleHead />
            {/* <div className='text-5xl font-extrabold'>It&apos;s time!</div> */}
            <div className='mdx:text-5xl xs:text-3xl text-2xl font-extralight max-w-4xl text-center'>
              What an <span className='font-bold'>AI Scrum Master</span> and{' '}
              <span className='font-bold'>AI Project Manager</span> should have
              been
              {/* What an <span className='font-bold'>AI Scrum Master</span>{' '}
              and <span className='font-bold'>AI Project Manager</span> should
              have been */}
            </div>
            <div  className=' mdx:text-sm xs:text-xs text-xs max-w-lg text-center'>
              Let the AI manage your scrum calls, update Jira tickets, resolve
              conflicts and keep the dev team motivated and accountable
            </div>

            <div  id='try-it'  className="flex flex-row items-start justify-center pt-6 space-x-0.5">
              <p className="text-xl font-bold text-green-600 animate-wiggle">Daily Stand-up is live, Try it</p>
              <svg viewBox="0 0 68 77" xmlns="http://www.w3.org/2000/svg" className="w-10 h-12 fill-current -scale-x-100 pt-3 text-primary">
                <path fillRule="evenodd" clipRule="evenodd" d="M36.4058 21.9334L41.1332 16.3559C39.2314 17.9379 37.6704 19.8143 36.4058 21.9334ZM23.1688 30.9494C25.2167 29.029 27.1793 27.057 29.4146 25.3858C26.7801 26.6313 24.9064 28.7351 23.1688 30.9494ZM33.2576 34.8628C33.7854 35.8059 34.3218 35.3399 34.8298 34.9399C36.5485 33.5884 36.678 31.5876 36.7834 29.6735C36.8603 28.2784 36.7645 26.8185 36.0412 25.5301C35.7657 25.0387 35.412 24.7259 34.9817 25.4387C33.8074 27.3851 32.9252 29.4359 32.76 31.7319C32.6813 32.8257 32.8093 33.9015 33.2576 34.8628ZM30.044 26.4983C28.4758 27.3028 27.2555 28.5674 26.0094 29.7814C20.6252 35.0274 17.2489 41.4539 14.905 48.5197C13.3395 53.2397 12.2395 58.0626 11.3075 62.9339C11.2221 63.3783 11.1535 63.8311 10.8458 64.1895C10.4999 64.592 10.1735 64.7341 10.044 64.0384C10.0116 63.8672 10.1324 63.62 9.81447 63.6931C8.71764 63.9447 8.57833 63.1202 8.38728 62.4074C8.02827 61.0698 8.27652 59.7088 8.39131 58.3751C8.71242 54.6385 9.17526 50.9104 10.1232 47.2754C11.0034 43.9008 12.3627 40.6916 13.8111 37.5224C14.7331 35.505 15.6989 33.4657 17.2506 31.8988C18.2815 30.8578 18.8385 29.5395 19.8363 28.51C21.7493 26.5365 23.6757 24.5912 25.9913 23.0773C27.8973 21.8315 29.9825 21.148 32.2609 21.1387C33.0121 21.1359 33.5561 20.852 33.993 20.285C35.171 18.7574 36.4016 17.263 37.6421 15.7973C39.6599 13.4123 42.0469 11.3584 44.4974 9.40976C48.406 6.30179 52.5732 3.62757 57.3413 2.00582C60.1437 1.05265 62.9687 0.295021 65.9574 1.11102C66.7443 1.32581 67.4328 1.66676 67.8401 2.42598C68.016 2.75297 68.0549 3.05479 67.8179 3.37093C67.5375 3.74424 67.3526 3.49944 67.042 3.35738C64.9118 2.3824 62.9132 3.24742 60.9212 3.90867C55.4318 5.7307 50.8176 9.01166 46.4398 12.6746C43.0898 15.4778 40.0455 18.5808 37.3679 22.0365C37.1552 22.3109 36.7658 22.5228 37.3009 22.9146C39.1654 24.2792 40.116 26.2265 40.5107 28.4278C41.1203 31.8255 40.7845 35.0594 38.2512 37.6832C36.8901 39.0932 35.496 39.1912 33.7364 38.3538C29.2533 36.221 28.3904 31.6356 29.8533 27.7477C29.9848 27.3997 30.1159 27.0518 30.2468 26.7046C30.1792 26.6355 30.1114 26.567 30.044 26.4983Z"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M12.7396 69.066C11.1773 70.7696 9.87903 72.6455 8.96903 74.7731C10.2258 72.8709 11.4825 70.9684 12.7396 69.066ZM4.16018 63.3217C5.28587 65.375 6.04163 67.5845 6.8814 69.7589C7.00686 70.0839 6.98214 70.5315 7.50699 70.5757C8.01112 70.618 8.14131 70.2023 8.2923 69.9013C9.11672 68.2617 10.3763 66.9558 11.4775 65.5213C12.1728 64.6148 12.7024 63.5696 13.4452 62.6601C14.5892 61.2601 15.6297 59.7727 16.6756 58.2955C17.2058 57.547 18.0634 57.0791 18.326 56.0843C18.5838 55.1085 19.3593 54.91 20.7139 55.5058C21.4054 55.8096 21.9699 56.4212 21.6002 57.3018C21.2961 58.026 20.9306 58.7392 20.4918 59.389C17.5869 63.6895 14.6474 67.9665 11.7376 72.2636C11.0844 73.228 10.4955 74.2376 9.88906 75.2334C8.78653 77.0441 7.96815 77.2015 6.16577 76.0678C4.76664 75.1877 3.99186 73.9692 3.66283 72.3613C3.02909 69.2664 2.30718 66.1894 1.09654 63.2558C0.853796 62.668 0.528696 62.1149 0.262714 61.5357C-0.0458552 60.8654 0.158774 60.5306 0.921301 60.5897C2.61148 60.7196 2.87504 60.94 4.16018 63.3217Z"></path>
              </svg>
            </div>

            <ScrumMasterInput />
            <div className='text-xs text-center'>
              100+ companies and startups already join the waitlist
            </div>
          </div>
        </div>

        <div
          id='products'
          className='flex flex-col justify-center pt-40 items-center gap-10 p-4'>
          <h2 className='text-3xl text-center font-bold'>
            To Start We have 2 Goals
          </h2>

          <div className='flex flex-col md:flex-row p-4 gap-8'>
            <div className='w-[300px]'>
              <AnimatedCard
                image={scrum}
                title='AI Scrum Master'
                description={[
                  'Facilitate Daily Stand-up',
                  'Remove Impediments',
                  'Protect Team Focus',
                  'Monitor Progress on Jira',
                ]}
                gradientDirection='left'
                imageClassName='animate-[spin_40s_linear_infinite]'
              />
            </div>

            <div className='w-[300px]'>
              <AnimatedCard
                image={pm}
                title='AI Project Manager'
                gradientDirection='right'
                description={[
                  'Track Project Progress',
                  'Team Coordination',
                  'Manage Risks & Issues',
                  'Communicate with Stakeholders',
                ]}
                imageClassName='animate-[spin_30s_linear_infinite]'
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full items-center justify-center gap-20 md:my-36 mt-20 p-4'>
          <div className='relative group'>
            <h2 className='text-3xl font-bold'>
              Hey, <RandomWord /> from <CountryFlag />
            </h2>
            <div className='hidden group-hover:block'>
              <UserInfo />
            </div>
          </div>

          <div className='relative block w-full max-w-3xl'>
            {/* Paper stack below - First paper */}
            <div
              className='absolute w-full bg-white rounded-md -rotate-2 z-0 overflow-hidden'
              style={{
                height: '102%',
                top: '10px',
                left: '6px',
                boxShadow: '-0.5px 0.5px 1px rgba(0, 0, 15, 0.3)',
              }}
            />

            {/* Paper stack below - Second paper */}
            <div
              className='absolute w-full bg-[#fcfcfc] rounded-md rotate-3 z-0 overflow-hidden'
              style={{
                height: '100%',
                top: '16px',
                left: '-4px',
                boxShadow: '-0.5px 0.5px 1px rgba(0, 0, 15, 0.3)',
              }}
            />

            <div
              className='relative z-10 flex w-full items-center justify-start space-x-6 p-8 bg-white lg:rotate-1 lg:hover:rotate-0 transition-all duration-300 rounded-md'
              style={{
                boxShadow: '-0.4px 0.4px 0px rgba(0, 0, 15, 0.5)', // left and bottom shadow
              }}>
              <div className='md:p-10 mt-6'>
                <Image
                  src={logo}
                  alt={'logo'}
                  className='w-[40px] grayscale opacity-40'
                  priority={true}
                  width={100}
                  height={100}
                />
                <div className='mt-8 flex flex-col gap-6 text-base text-gray-900'>
                  <p>It&apos;s 2025 — we need to talk about productivity. </p>
                  <p>
                    Specially in engineering teams. I used to hate working in
                    agile scrum teams.
                  </p>
                  <p>All those daily standups, all those meetings. </p>
                  <p>
                    They felt like interruptions — unnecessary overhead that
                    pulled me away from the real work of coding and shipping.
                  </p>
                  <p>But something changed.</p>
                  <p>
                    Over time, I realized those daily check-ins weren&apos;t
                    just rituals. They were the glue. The small, consistent
                    incremental improvements that kept me — and the team — on
                    track.
                  </p>
                  <p>
                    They made me accountable. they gave me clearity on what i
                    need to do today and till next week.
                  </p>
                  <p>
                    Suddenly, I wasn&apos;t just writing code. I was
                    contributing to a shared mission a feature that could reach
                    millions of people.
                  </p>
                  <p>
                    Scrum helped me understand what mattered today. It made sure
                    last-mile execution actually happened.{' '}
                  </p>
                  <p>
                    I only truly understood the power of agile when I left it.
                  </p>
                  <p>
                    for small time in my career i worked In a non-agile team, I
                    had freedom — but I was lost. No code. No clarity. No real
                    momentum.
                  </p>
                  <p>
                    I was operating at half my capacity — and getting a quarter
                    of the results.{' '}
                  </p>
                  <p>
                    Compare that to the agile team, where I was producing 10X
                    what I thought I could. The secret? Daily rhythm. Clear
                    focus. Shared goals. last-mile execution.
                  </p>
                  <p>
                    But not every team can afford an expensive seasoned scrum
                    master right?
                  </p>
                  <p>
                    That&apos;s why we&apos;re building the &quot;AIPM&quot; an
                    AI Scrum Master — an affordable, cloud-native, always-on
                    time and on goals that makes sure your idea, your team, your
                    startup, your company executes daily. Just relentless
                    clarity, progress every day.
                  </p>
                  <p>
                    Because every team in this world deserves an AI that fosters
                    daily accountability drives last mile execution making the
                    team 10X more productive — Not someday. Every single day.
                  </p>
                  <div className='flex items-center justify-between'>
                    <Image
                      src={sagar}
                      alt='photo'
                      className='w-16 h-16 rounded-full grayscale mt-10'
                      width={100}
                      height={100}
                    />
                    {/* <Image
                      src={signature}
                      alt='photo'
                      className='w-fit h-16 rounded-full grayscale mt-10'
                      width={3000}
                      height={1000}
                    /> */}
                  </div>
                  <div className='flex flex-col items-start justify-start'>
                    <p>founder @ aipm</p>
                    <p>
                      <a
                        href='https://www.linkedin.com/in/sagarjaid'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:underline'>
                        <strong>Sagar Jaid</strong>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className='absolute before:content-[""] top-0 right-0 border-[30px] border-solid border-transparent border-r-transparent border-b-white border-l-white block rounded-b-md'
                style={{
                  boxShadow: '-0.2px 0.2px 0px rgba(0, 0, 15, 0.5)', // left and bottom shadow
                }}
              />
            </div>
          </div>
        </div>

        <Photos />

        {/* <div className='flex flex-col w-full items-center justify-center gap-4 p-4 mt-40 md:mt-10'>
          <Image
            src={photo}
            alt='photo'
            className='w-full'
            width={1000}
            height={1000}
          />
        </div> */}
        <div className='flex flex-col w-full items-center justify-center gap-4 p-4 my-28 md:mt-0 '>
          <div className='md:relative top-32 flex flex-col items-center justify-center text-center gap-2'>
            <h2 className='mdx:text-6xl xs:text-4xl text-3xl font-extrabold'>
              Making Today
            </h2>
            {/* <h2 className='text-6xl font-extrabold'>Organized</h2> */}
            <WordSlider />
            <BookerDemo />
          </div>
          <Image
            src={logos}
            alt='logo'
            className='w-full hidden md:block'
            width={1000}
            height={1000}
          />
        </div>

        {/* <div className='flex w-full flex-col items-center justify-center gap-10 my-32 '>
          <div className='mdx:text-5xl xs:text-3xl text-2xl font-extrabold max-w-4xl text-center'>
            Get early access
          </div>

          <div className='flex flex-col justify-between mdx:w-1/2 xs:w-full gap-3'>
            <div className='flex items-center justify-between border-2 border-black rounded-full w-full'>
              <input
                type='email'
                placeholder='Email'
                className='rounded-l-full w-full px-6 py-4 focus:outline-none'
              />
              <button className='bg-black text-white block w-[60%] border-black rounded-r-full px-4 py-4'>
                Get early access
              </button>
            </div>
            <div className='text-[10px]  text-center'>
              200+ companies and startups already join the waitlist
            </div>
          </div>
        </div> */}
      </main>
      <FooterBIg />
    </>
  );
}
