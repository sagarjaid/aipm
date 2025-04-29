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
import UserInfo from '@/app/components/UserInfo';
import logo from '@/app/logo-2.png';
import RandomWord from '@/app/components/RandomWord';
import AnimatedCard from '@/app/components/AnimatedCard';
import sagar from '@/app/sagar.png';
import signature from '@/app/signature.png';
import GradientInput from '@/app/components/GradientInput';
import CountryFlag from '@/app/components/CountryFlag';

const ParticleHead = dynamic(() => import('@/app/components/ParticleHead'), {
  ssr: false,
});

import WordSlider from '@/app/components/WordSlider';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className='flex flex-col items-center  max-w-5xl mx-auto w-full justify-start overflow-hidden pb-40'>
        <div className='flex max-w-5xl w-full gap-4 flex-col items-center justify-center '>
          <Suspense>
            <Header />
          </Suspense>
        </div>
        <div className='flex flex-col items-center w-full justify-center'>
          <div className='flex max-w-5xl w-full gap-8 flex-col items-center justify-center px-4 pt-20'>
            <Link
              href='/#'
              aria-current='page'
              className='flex gap-2 justify-center md:justify-start items-center'>
              <Image
                src={logo}
                alt='logo'
                priority={true}
                className='animate-[spin_30s_linear_infinite] opacity-80'
                width={50}
                height={50}
              />
            </Link>
            {/* <div className='text-5xl font-extrabold'>It&apos;s time!</div> */}
            <div className='mdx:text-5xl xs:text-3xl text-2xl font-bold max-w-4xl text-center'>
              Vision
            </div>
            <div className=' mdx:text-2xl xs:text-xs font-extralight text-xs max-w-xl leading-loose text-center'>
              Every team in this world deserves an AI Agent that fosters daily
              accountability drives last mile execution making the team 10X more
              productive — Not someday. Every single day.
            </div>

            <div className='mdx:text-5xl xs:text-3xl text-2xl mt-10 font-bold max-w-4xl text-center'>
              Mission
            </div>
            <div className=' mdx:text-2xl xs:text-xs font-extralight mb-10 text-xs max-w-lg leading-loose text-center'>
              Enable companies with AI Scrum Masters and AI Project Managers
              that can collaborate, reason and act independently in real-world
              24/7
            </div>
            <GradientInput />
          </div>
        </div>
      </main>
      <FooterBIg />
    </>
  );
}
