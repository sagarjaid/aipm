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

export default function Home() {
  return (
    <>
      <main className='flex flex-col gap-4 items-center  max-w-5xl mx-auto w-full mt-2 justify-start'>
        <div className='flex max-w-5xl w-full gap-4 flex-col items-center justify-center '>
          <Suspense>
            <Header />
          </Suspense>
        </div>
        <div className='flex flex-col items-center w-full justify-center'>
          <div className='flex max-w-5xl w-full gap-6 flex-col items-center justify-center p-4 '>
            <ParticleHead />
            {/* <div className='text-5xl font-extrabold'>It&apos;s time!</div> */}
            <div className='text-5xl font-extrabold max-w-4xl text-center'>
              What an AI Scrum Master and AI Project Manager should have been
            </div>
            <div className=' text-sm max-w-md text-center'>
              Let the AI manage your scrum calls, update Jira tickets, resolve
              conflicts and keep the dev team motivated and accountable
            </div>

            <div>
              <div className='flex items-center border-2 border-black rounded-full w-full'>
                <input
                  type='email'
                  placeholder='Email'
                  className='rounded-l-full px-4 py-2 focus:outline-none'
                />
                <button className='bg-black text-white border-black rounded-r-full px-5 py-2'>
                  Join Waitlist
                </button>
              </div>
              <div className='text-[10px] mt-1.5 text-center'>
                200+ companies and startups already join the waitlist
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-10 border-x-[14px] border-t-[14px] w-11/12 mx-auto pb-10  border-gray-100 rounded-t-2xl'>
          <h2 className='text-3xl font-bold mt-20'>To Start We have 2 Goals</h2>

          <div className='flex p-4 gap-8'>
            <div className='flex flex-col max-w-[260px] pt-10 pb-36 w-full items-start border px-6 gap-2'>
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

            <div className='flex flex-col max-w-[260px] pt-10 pb-36 w-full items-start border px-6 gap-2'>
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

        <div className='flex flex-col w-full items-center justify-center gap-4'>
          <h2 className='text-3xl font-bold mt-20'>Hey, Nomad from 🇮🇳</h2>

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

        <div className=' flex flex-col w-full items-center justify-center gap-4 p-4 mb-20'>
          <div className='relative top-20 flex flex-col items-center gap-2'>
            <h2 className='text-6xl font-extrabold'>Making Today</h2>
            <h2 className='text-6xl font-extrabold'>Organized</h2>
          </div>

          <Image
            src={logos}
            alt='logo'
            className='w-full'
            width={1000}
            height={1000}
          />
        </div>
      </main>
      <FooterBIg />
    </>
  );
}
