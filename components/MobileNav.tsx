/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/libs/supabase/client';
import apiClient from '@/libs/api';
import { Link } from 'lucide-react';
import { usePathname } from 'next/navigation';

// A button to show user some account actions
//  1. Billing: open a Stripe Customer Portal to manage their billing (cancel subscription, update payment method, etc.).
//     You have to manually activate the Customer Portal in your Stripe Dashboard (https://dashboard.stripe.com/test/settings/billing/portal)
//     This is only available if the customer has a customerId (they made a purchase previously)
//  2. Logout: sign out and go back to homepage
// See more at https://shipfa.st/docs/components/buttonAccount
const MobileNav = () => {
  const pathName = usePathname();

  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleBilling = async () => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        '/stripe/create-portal',
        {
          returnUrl: window.location.href,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

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
    <>
      <div className='overflow-hidden  bg-base-100 p-1'>
        <div className='space-y-2 text-sm'>
          {/* <button
            className='flex items-center gap-2 hover:bg-base-300 duration-200 p-1.5   w-full rounded-lg font-medium'
            onClick={() => (window.location.href = '/list')}>
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user?.user_metadata?.avatar_url}
                alt={'Profile picture'}
                className='w-5 h-5 rounded-full shrink-0'
                referrerPolicy='no-referrer'
                width={20}
                height={20}
              />
            ) : (
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
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            )}

            {user?.user_metadata?.name ||
              user?.email?.split('@')[0] ||
              'Account'}
          </button> */}

          {user && (
            <>
              <button
                className='flex items-center gap-2 hover:bg-base-300 duration-200 p-1.5   w-full rounded-lg font-medium'
                onClick={() => (window.location.href = '/dash')}>
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
                Dashboard
              </button>

              <button
                className='flex items-center gap-2 hover:bg-base-300 duration-200 p-1.5   w-full rounded-lg font-medium'
                onClick={() => (window.location.href = '/history')}>
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
                History
              </button>

              <button
                className='flex items-center gap-2 hover:bg-base-300 duration-200 p-1.5   w-full rounded-lg font-medium'
                onClick={() => (window.location.href = '/pricing')}>
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
                Pricing
              </button>

              <button
                className='flex items-center gap-2 hover:bg-base-300 duration-200 p-1.5   w-full rounded-lg font-medium'
                onClick={() => (window.location.href = '/account')}>
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
                Account
              </button>
            </>
          )}

          {!user && (
            <>
              <hr />
              <button
                className='flex items-center gap-2 hover:bg-base-300 duration-200 p-1.5   w-full rounded-lg font-medium'
                onClick={() => (window.location.href = '/signin')}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
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
                Continue with Google
              </button>
            </>
          )}

          {/* <button
                    className='flex items-center gap-2 hover:bg-base-300 duration-200 p-1.5   w-full rounded-lg font-medium'
                    onClick={handleBilling}>
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
                        d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
                      />
                    </svg>
                    My plans
                  </button> */}

          {user && (
            <button
              className='flex items-center gap-2 hover:bg-rose-200 duration-200 p-1.5   w-full rounded-lg font-medium'
              onClick={handleSignOut}>
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
                  d='M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9'
                />
              </svg>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
