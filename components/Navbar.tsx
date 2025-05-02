/** @format */

'use client';

import config from '@/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathName = usePathname();

  const allSvg = (
    <svg
      className='w-6 h-6'
      fill='none'
      strokeWidth={1.5}
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5 12h14'
      />
    </svg>
  );

  // const dashboardSvg = (
  //   <svg
  //     className='w-6 h-6'
  //     fill='none'
  //     strokeWidth={1.5}
  //     stroke='currentColor'
  //     viewBox='0 0 24 24'
  //     xmlns='http://www.w3.org/2000/svg'
  //     aria-hidden='true'>
  //     {/* <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /> */}

  //     <path
  //       strokeLinecap='round'
  //       strokeLinejoin='round'
  //       d='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'
  //     />
  //   </svg>
  // );

  const pricingSvg = (
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
        d='M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3'
      />
    </svg>
  );

  const historySvg = (
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
        d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3'
      />
    </svg>
  );

  const dashboardSvg = (
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
        d='M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z'
      />
    </svg>
  );

  const accountSvg = (
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
        d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
      />
    </svg>
  );

  const fillters = [
    {
      name: 'Dashboard',
      svg: dashboardSvg,
      slug: '/dash',
    },
    {
      name: 'History',
      svg: historySvg,
      slug: '/history',
    },
    {
      name: 'Pricing',
      svg: pricingSvg,
      slug: '/pricing',
    },
    {
      name: 'Account',
      svg: accountSvg,
      slug: '/account',
    },
  ];
  return (
    <div className='hidden lg:flex w-[300px] flex-col justify-between border-r p-4 cursor-pointer'>
      <div className='flex flex-col gap-2.5'>
        {fillters.map((el, i) => {
          const isActive = pathName.endsWith(el.slug);

          return (
            <Link
              key={i}
              href={el.slug}
              className={
                isActive
                  ? 'bg-gray-100 p-1.5 rounded-lg hover:bg-gray-200 flex gap-2'
                  : 'bg-white p-1.5 rounded-lg hover:bg-gray-100 flex gap-2'
              }
              // className='bg-white p-1.5 rounded-lg hover:bg-gray-100 flex gap-2'
            >
              {el.svg}
              <button>{el.name}</button>
            </Link>
          );
        })}
      </div>

      <div className='pb-10'>
        <div className='footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3'>
          LEGAL
        </div>

        <div className='flex flex-col justify-center items-start gap-2.5 mb-10 text-xs'>
          <Link
            href='/tos'
            target='_blank'
            className='link link-hover'>
            Terms of services
          </Link>
          <Link
            href='/privacy'
            target='_blank'
            className='link link-hover'>
            Privacy policy
          </Link>
          <Link
            href={`mailto:${config?.mailgun?.supportEmail}`}
            target='_blank'
            className='link link-hover'>
            Support
          </Link>

          <Link
            href='https://sagarjaid.com/'
            target='_blank'
            className='link link-hover'>
            Build by Sagar Jaid
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
