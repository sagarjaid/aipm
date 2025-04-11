/** @format */

import { Suspense, useState } from 'react';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import scrum from '@/app/ai-scrum.png';
import pm from '@/app/ai-pm.png';
import message from '@/app/message.png';
import photo from '@/app/photo.png';
import logos from '@/app/logos.png';
import Footer from '@/components/molecules/Footer';
import FooterBIg from '@/components/FooterBig';
import FooterX from '@/components/Footer';
import UserInfo from './components/UserInfo';
import logo from '@/app/icon.png';
import RandomWord from './components/RandomWord';

const ParticleHead = dynamic(() => import('./components/ParticleHead'), {
  ssr: false,
});

import WordSlider from './components/WordSlider';

export default function Home() {
  return (
    <>
      <main className='flex flex-col items-center  max-w-5xl mx-auto w-full justify-start'>
        <div className='flex max-w-5xl w-full gap-4 flex-col items-center justify-center '>
          <Suspense>
            <Header />
          </Suspense>
        </div>
        <div className='flex flex-col items-center w-full justify-center'>
          <div className='flex max-w-5xl w-full gap-8 flex-col items-center justify-center px-4 pt-10 '>
            <ParticleHead />
            {/* <div className='text-5xl font-extrabold'>It&apos;s time!</div> */}
            <div className='mdx:text-5xl xs:text-3xl text-2xl font-extrabold max-w-4xl text-center'>
              What an AI Scrum Master and AI Project Manager should have been
            </div>
            <div className=' mdx:text-sm xs:text-xs text-xs max-w-lg text-center'>
              Let the AI manage your scrum calls, update Jira tickets, resolve
              conflicts and keep the dev team motivated and accountable
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
          </div>
        </div>

        <div className='flex flex-col justify-center mt-40 items-center gap-10 p-4'>
          <h2 className='text-3xl text-center font-bold'>
            To Start We have 2 Goals
          </h2>

          <div className='flex flex-col md:flex-row p-4 gap-8'>
            <div className='flex flex-col max-w-[260px] pt-10 pb-36 w-full items-start border px-6 gap-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300'>
              <Image
                src={scrum}
                className='animate-[spin_40s_linear_infinite]'
                alt='scrum'
                width={100}
                height={100}
              />
              <div className='text-xl font-medium'>AI Scrum Master</div>
              <p className='text-xs'>
                Innovating financial systems for a more transparent, inclusive
                and accessible economy.
              </p>
            </div>

            <div className='flex flex-col max-w-[260px] pt-10 pb-36 w-full items-start border px-6 gap-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300'>
              <Image
                src={pm}
                alt='pm'
                className='animate-[spin_30s_linear_infinite]'
                width={100}
                height={100}
              />
              <div className='text-xl font-medium'>AI Project Manager</div>
              <p className='text-xs'>
                Innovating financial systems for a more transparent, inclusive
                and accessible economy.
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full items-center justify-center gap-20 md:my-36 mt-20 '>
          <div className='relative group'>
            <h2 className='text-3xl font-bold'>
              Hey, <RandomWord /> from 🇮🇳
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
              className='relative z-10 flex w-full items-center justify-start space-x-6 p-8 bg-white rotate hover:rotate-1 transition-all duration-300 rounded-md'
              style={{
                boxShadow: '-0.4px 0.4px 0px rgba(0, 0, 15, 0.5)', // left and bottom shadow
              }}>
              <div className='p-10 mt-6'>
                <Image
                  src={logo}
                  alt={'logo'}
                  className='w-[60px] opacity-50'
                  priority={true}
                  width={100}
                  height={100}
                />
                <div className='mt-8 flex flex-col gap-6 text-base text-gray-900 text-justify'>
                  <p>It&apos;s 2020, we need to talk about email.</p>
                  <p>
                    Email gets a bad rap, but it shouldn&apos;t. Email&apos;s a
                    treasure.
                  </p>
                  <p>
                    It feels great to get an email from someone you care about.
                    Or a newsletter you enjoy. Or an update from a service you
                    like.
                  </p>
                  <p>That&apos;s how email used to feel all the time.</p>
                  <p>But things changed.</p>
                  <p>
                    You started getting stuff you didn&apos;t want from people
                    you didn&apos;t know. You lost control over who could reach
                    you. An avalanche of automated emails cluttered everything
                    up.
                  </p>
                  <p>
                    And Gmail, Outlook, Yahoo, and Apple just let it happen.
                  </p>
                  <p>
                    Now email feels like a chore, rather than a joy. Something
                    you fall behind on. Something you clear out, not cherish.
                    Rather than delight in it, you deal with it.
                  </p>
                  <p>
                    And yet, email remains a wonder. Thanks to email, people
                    across cultures, continents, countries, cities, and
                    communities communicate every day. It&apos;s reliable.
                    It&apos;s simple. It makes it easy for two humans to share
                    their love, and for millions of people to earn a living.
                  </p>
                  <p>
                    So good news, the magic&apos;s still there. It&apos;s just
                    obscured — buried under a mess of bad habits and neglect.
                    Some from people, some from machines, a lot from email
                    software.
                  </p>
                  <p>
                    Email deserves a dust off. A renovation. Modernized for the
                    way we email today.
                  </p>
                  <p>
                    With HEY, we&apos;ve done just that. It&apos;s a redo, a
                    rethink, a simplified, potent reintroduction of email. A
                    fresh start, the way it should be.
                  </p>
                  <p>
                    HEY is our love letter to email, and we&apos;re sending it
                    to you on the Web, Mac, Windows, Linux, iOS, and Android.
                  </p>
                  <p>- Sagar Jaid</p>
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

        <div className='flex flex-col w-full items-center justify-center gap-4 p-4 mt-40 md:mt-10'>
          <Image
            src={photo}
            alt='photo'
            className='w-full'
            width={1000}
            height={1000}
          />
        </div>
        <div className='flex flex-col w-full items-center justify-center gap-4 p-4 my-28 md:mt-0 '>
          <div className='md:relative top-20 flex flex-col items-center justify-center text-center gap-2'>
            <h2 className='mdx:text-6xl xs:text-4xl text-3xl font-extrabold'>
              Making Today
            </h2>
            {/* <h2 className='text-6xl font-extrabold'>Organized</h2> */}
            <WordSlider />
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
