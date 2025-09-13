"use client";

import { createClient } from "@/libs/supabase/client";
import { useEffect, useState } from "react";

const TakeInterviewCard = ({ generatedUUID }) => {
  const supabase = createClient();
  const [hasCredits, setHasCredits] = useState(false);

  useEffect(() => {
    const checkUserAccess = async () => {
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
          .select("total_credits")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        // Check if the user has access
        if (data?.total_credits > 0) {
          setHasCredits(true); // User is a paid user
        } else {
          setHasCredits(false); // User is a free user
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    checkUserAccess();
  }, []);

  return (
    <>
      <a
        href={hasCredits ? `/interview/${generatedUUID}` : "/pricing"}
        className="relative flex h-52 w-full cursor-pointer items-center justify-between gap-2 rounded-md border p-4 shadow-md hover:shadow-lg"
      >
        <div className="absolute -top-2 right-4 w-max animate-pulse rounded-full bg-blue-500 px-1 text-xs text-transparent shadow-sm">
          .
        </div>
        <div className="flex flex-col gap-3">
          <svg
            className="h-10 w-10"
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
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          <div className="mt-4 text-base font-semibold">
            Start New AI Mock Interview
          </div>
          <div className="text-xs text-gray-600">
            Our AI Visa officer will take an USA F1 visa interview, be prepared
          </div>
        </div>
      </a>
    </>
  );
};

export default TakeInterviewCard;
