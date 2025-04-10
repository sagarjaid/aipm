/** @format */

import { Suspense } from 'react';
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

        <div className='flex flex-col w-full items-center justify-center gap-4 md:mt-36 mt-20 '>
          <h2 className='text-3xl font-bold'>Hey, Nomad from 🇮🇳</h2>

          <Image
            src={message}
            alt='message'
            className='w-full'
            width={1000}
            height={1000}
          />
        </div>
        <div className='flex flex-col w-full items-center justify-center gap-4 p-4'>
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
