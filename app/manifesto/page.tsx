/** @format */

import { Suspense } from 'react';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import scrum from '@/app/ai-scrum.png';
import pm from '@/app/ai-pm.png';
import logos from '@/app/logos.png';
import FooterBIg from '@/components/FooterBig';
import UserInfo from '../components/UserInfo';
import logo from '@/app/logo-2.png';
import RandomWord from '../components/RandomWord';
import AnimatedCard from '../components/AnimatedCard';
import sagar from '@/app/sagar.png';
import GradientInput from '../components/GradientInput';
import CountryFlag from '../components/CountryFlag';
import Photos from '../components/Photos';

const ParticleHead = dynamic(() => import('../components/ParticleHead'), {
  ssr: false,
});

import WordSlider from '../components/WordSlider';

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
            <h2 className='text-3xl mt-6 text-center font-bold'>Vision</h2>
            <div className=' mdx:text-xl xs:text-xs font-extralight text-xs max-w-xl leading-loose text-center'>
              Every team in this world deserves an AI Agent that fosters daily
              accountability drives last mile execution making the team 10X more
              productive — Not someday. Every single day
            </div>

            <h2 className='text-3xl mt-10 text-center font-bold'>Mission</h2>

            <div className=' mdx:text-xl xs:text-xs font-extralight mb-10 text-xs max-w-lg leading-loose text-center'>
              Enable companies with AI Scrum Masters and AI Project Managers
              that can collaborate, reason and act independently in real-world
              24/7
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full items-center justify-center gap-20 p-4'>
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
        <div className=' my-40 flex justify-center  w-full p-4'>
          <GradientInput />
        </div>
      </main>
      <FooterBIg />
    </>
  );
}
