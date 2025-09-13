/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

"use client";

import { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/libs/supabase/client";
import apiClient from "@/libs/api";
import { Link } from "lucide-react";
import { usePathname } from "next/navigation";

// A button to show user some account actions
//  1. Billing: open a Stripe Customer Portal to manage their billing (cancel subscription, update payment method, etc.).
//     You have to manually activate the Customer Portal in your Stripe Dashboard (https://dashboard.stripe.com/test/settings/billing/portal)
//     This is only available if the customer has a customerId (they made a purchase previously)
//  2. Logout: sign out and go back to homepage
// See more at https://getaipm.com/docs/components/buttonAccount
const ButtonAccount = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);

  const pathName = usePathname();

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
    window.location.href = "/";
  };

  if (pathName.endsWith("/") && !user) {
    return (
      <button
        className="flex w-fit items-center gap-1 rounded-lg border px-2 py-1.5 pr-2.5 font-medium duration-200"
        onClick={() => (window.location.href = "/signin")}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          strokeWidth={1.7}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
        <span className="font-semibold">Get 1 FREE Interview</span>
      </button>
    );
  }

  if (pathName.endsWith("/") && user) {
    return (
      <button
        className="flex w-fit items-center gap-1 rounded-lg border px-2 py-1.5 pr-2.5 font-medium duration-200"
        onClick={() => (window.location.href = "/dash")}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
          />
        </svg>
        <span className="font-base font-semibold">Dashboard</span>
      </button>
    );
  }

  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          <Popover.Button className="btn btn-sm bg-white text-xs shadow-none hover:bg-gray-50">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user?.user_metadata?.avatar_url}
                alt={"Profile picture"}
                className="h-5 w-5 shrink-0 rounded-full"
                referrerPolicy="no-referrer"
                width={20}
                height={20}
              />
            ) : (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-white capitalize text-black">
                {user?.email?.charAt(0)}
              </span>
            )}

            {user?.user_metadata?.name ||
              user?.email?.split("@")[0] ||
              (pathName.includes("/interview/") ? "Guest User" : "Account")}

            {isLoading ? (
              <span className="loading loading-spinner loading-xs border bg-black"></span>
            ) : (
              <>
                {user && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 opacity-50 duration-200 ${
                      open ? "rotate-180 transform" : ""
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </>
            )}
          </Popover.Button>
          {user && (
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-[175px] transform">
                <div className="overflow-hidden rounded-md bg-base-100 p-1 shadow-md ring-1 ring-base-content ring-opacity-5">
                  <div className="space-y-0.5 text-sm">
                    <button
                      className="flex w-full items-center gap-2 rounded-md px-4 py-1.5 font-medium duration-200 hover:bg-base-300"
                      onClick={() => (window.location.href = "/dash")}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                        />
                      </svg>
                      Dashboard
                    </button>

                    {/* <button
                    className='flex items-center gap-2 hover:bg-base-300 duration-200 py-1.5 px-4 w-full rounded-md font-medium'
                    onClick={() => (window.location.href = '/dashboard')}>
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
                        d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                    Submit Channel
                  </button> */}

                    {/* <button
                      className='flex items-center gap-2 hover:bg-base-300 duration-200 py-1.5 px-4 w-full rounded-md font-medium'
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

                    <button
                      className="flex w-full items-center gap-2 rounded-md px-4 py-1.5 font-medium duration-200 hover:bg-error/20 hover:text-error"
                      onClick={handleSignOut}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          )}
        </>
      )}
    </Popover>
  );
};

export default ButtonAccount;
