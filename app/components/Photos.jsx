/** @format */

import Image from 'next/image';
import img1 from '../img/1.png';
import img2 from '../img/2.png';
import img3 from '../img/3.png';
import img4a from '../img/4a.png';
import img4b from '../img/4b.png';
import img5 from '../img/5.png';
import img6 from '../img/6.png';
import img6a from '../img/6a.png';
import img7 from '../img/7.png';

export default function Photos() {
  return (
    <div className='min-h-screen w-full bg-white p-8 mb-20 flex items-center justify-center'>
      <div className='max-w-5xl w-full relative'>
        {/* Top row */}
        <div className='relative w-full h-[500px]'>
          {/* Team hard at work */}
          <div className='absolute left-[8%] top-0 w-[280px] bg-white p-2 shadow-lg border rounded-lg transform -rotate-[6deg] z-10'>
            <div className='relative w-full h-[360px]'>
              <Image
                src={img1}
                alt='Our team hard at work'
                fill
                className='object-fill rounded-sm border border-gray-700'
                priority
              />
            </div>
            <p className='text-center mt-3 font-handwriting text-gray-700 text-sm'>
              Where it all started
            </p>
          </div>

          {/* Y Combinator office */}
          <div className='absolute left-[40%] top-[60px] w-[220px] border rounded-lg bg-white p-2 shadow-lg transform rotate-[9deg] z-20'>
            <div className='relative w-full h-[280px]'>
              <Image
                src={img2}
                alt='At Y Combinator office'
                fill
                className='object-fill rounded-sm border border-gray-700'
                priority
              />
            </div>
            <p className='text-center mt-2 font-handwriting text-gray-700 text-sm'>
              At Draper Startup House
            </p>
          </div>

          {/* Meetings and moments */}
          <div className='absolute right-[5%] top-[10px] w-[300px] border rounded-lg bg-white p-3 shadow-md transform rotate-[2deg] z-10'>
            <div className='relative w-full h-[300px]'>
              <Image
                src={img5}
                alt='Meetings and moments that matter'
                fill
                className='object-cover rounded-sm border border-gray-700'
                priority
              />
            </div>
            <p className='text-center mt-2 font-handwriting text-gray-700 text-sm'>
              Sharing thoghts on life as Dev
              <br />
              at geekyAnts
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className='relative w-full h-[400px] mt-[-80px]'>
          {/* Our friend Bisco */}
          <div className='absolute left-[10%] top-[30px] w-[300px] border rounded-lg bg-white p-3 shadow-md transform rotate-[8deg] z-30'>
            <div className='relative w-full h-[360px]'>
              <Image
                src={img4a}
                alt='Our friend Bisco is the best!'
                fill
                className='object-fill rounded-sm border border-gray-700'
                priority
              />
            </div>
            <p className='text-center mt-2 font-handwriting text-gray-700 text-sm'>
              Khabbu at Help
            </p>
          </div>

          {/* Perfect playlist */}
          <div className='absolute left-[42%] top-[50px] w-[220px] border rounded-lg bg-white p-3 shadow-md transform -rotate-[9deg] z-20'>
            <div className='relative w-full h-[260px]'>
              <Image
                src={img3}
                alt='Perfect playlist for late night coding sessions'
                fill
                className='object-fill rounded-sm border border-gray-700'
                priority
              />
            </div>
            <p className='text-center mt-2 font-handwriting text-gray-700 text-sm'>
              Perfect setup for Meeting
            </p>
          </div>

          {/* YC batch */}
          <div className='absolute right-[5%] top-[20px] w-[300px] border rounded-lg bg-white p-3 shadow-md transform rotate-[6deg] z-10'>
            <div className='relative w-full h-[300px]'>
              <Image
                src={img6}
                alt='Our YC W24 batch is the best batch!'
                fill
                className='object-fill rounded-sm border border-gray-700'
                priority
              />
            </div>
            <p className='text-center mt-2 font-handwriting text-gray-700 text-sm'>
              At local event in BLR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
