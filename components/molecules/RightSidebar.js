"use client";

import { createClient } from "@/libs/supabase/client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const RightSidebar = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [totalCredits, setTotalCredits] = useState(0);
  const [usedCredits, setUsedCredits] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [error, setError] = useState(null);

  const pathName = usePathname();

  useEffect(() => {
    const checkUserAccess = async () => {
      setLoading(true);
      try {
        // Get the current authenticated user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("No user found");

        // Fetch the user's profile from the 'profiles' table
        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("has_access, total_credits")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        // Check if the user has access
        if (data?.has_access) {
          setIsPaidUser(true); // User is a paid user
          if (data?.total_credits == 20) {
            setTotalCredits(20);
            setRemainingCredits(data.total_credits);
            setUsedCredits(0);
          } else {
            setTotalCredits(20);
            setUsedCredits(20 - data.total_credits);
            setRemainingCredits(data.total_credits);
          }
        } else {
          setIsPaidUser(false); // User is a free user
          if (data?.total_credits == 2) {
            setTotalCredits(2);
            setRemainingCredits(2);
            setUsedCredits(0);
          } else {
            setTotalCredits(2);
            setUsedCredits(2 - data.total_credits);
            setRemainingCredits(data.total_credits);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkUserAccess();
  }, []);

  return (
    <>
      {pathName.endsWith("/pricing") ? (
        <>
          <div className="flex h-fit w-full flex-col items-start rounded-md border border-gray-100 shadow">
            <div className="flex w-full flex-col gap-1.5 p-3 pb-3.5">
              <div className="flex w-full items-center justify-between">
                <h2 className="text-base font-semibold">Active Plan</h2>
                {/* <h2 className='text-base font-semibold'>SUCCESS Plan</h2> */}

                {isPaidUser ? (
                  <a
                    href="/account"
                    className="rounded-full border border-black px-2 py-0.5 text-[9px]"
                  >
                    Billing
                  </a>
                ) : (
                  <a
                    href="/pricing"
                    className="rounded-full border border-black bg-black px-2 py-0.5 text-[9px] text-white"
                  >
                    Upgrade
                  </a>
                )}

                {/* <span className='border border-black  bg-black text-white text-[9px] px-2 py-0.5 rounded-full'>
                      Upgrade
                    </span> */}
              </div>
              <div className="text-xs font-medium">
                {isPaidUser ? "Success Plan" : "Free Plan"}
              </div>
              <div className="text-xs">Interview credits:</div>
              <hr />

              <div className="mt-0.5 text-xs">Total : {totalCredits}</div>
              <div className="text-xs">Used : {usedCredits}</div>
              <div className="text-xs">Remaining : {remainingCredits}</div>
            </div>
          </div>
          <div className="hidden h-fit w-full flex-col items-start rounded-md border border-gray-100 bg-black text-white shadow lg:flex">
            <div className="flex w-full flex-col gap-1.5 p-3">
              <svg
                className="h-5 w-5"
                fill="white"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>

              <h2 className="text-sm font-semibold">Share Your Feedback</h2>

              <div className="text-[9px]">
                Help us improve the app by sharing your positive/negative
                experiences
              </div>

              <a
                href="https://www.linkedin.com/in/sagarjaid/"
                target="_blank"
                className="mt-2 w-fit rounded-full border border-white bg-white px-2 py-0.5 text-[9px] text-black"
              >
                Give Feedback
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-fit w-full flex-col items-start rounded-md border border-gray-100 shadow">
          <div className="flex w-full flex-col gap-1.5 p-3 pb-3.5">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-base font-semibold">Active Plan</h2>
              {/* <h2 className='text-base font-semibold'>SUCCESS Plan</h2> */}

              {isPaidUser ? (
                <a
                  href="/account"
                  className="rounded-full border border-black px-2 py-0.5 text-[9px]"
                >
                  Billing
                </a>
              ) : (
                <a
                  href="/pricing"
                  className="rounded-full border border-black bg-black px-2 py-0.5 text-[9px] text-white"
                >
                  Upgrade
                </a>
              )}

              {/* <span className='border border-black  bg-black text-white text-[9px] px-2 py-0.5 rounded-full'>
                      Upgrade
                    </span> */}
            </div>
            <div className="text-xs font-medium">
              {" "}
              {isPaidUser ? "Success Plan" : "Free Plan"}
            </div>
            <div className="text-xs">Interview credits:</div>
            <hr />

            <div className="mt-0.5 text-xs">Total : {totalCredits}</div>
            <div className="text-xs">Used : {usedCredits}</div>
            <div className="text-xs">Remaining : {remainingCredits}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
