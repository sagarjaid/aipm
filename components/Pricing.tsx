"use client";
import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";
import { useState } from "react";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

const Pricing = ({ hide }: { hide: boolean }) => {
  const initialStage = hide ? false : true;

  const [toggle, setToggle] = useState<boolean>(initialStage);
  return (
    <section className="w-full overflow-hidden" id="pricing">
      <div
        className={
          hide ? "mx-auto max-w-5xl p-4" : "mx-auto max-w-5xl px-8 py-24"
        }
      >
        {!hide && (
          <div className="mb-20 flex w-full flex-col items-center justify-between text-center">
            <p className="mb-8 font-medium text-primary">Pricing</p>
            <h2 className="max-w-96 text-3xl font-bold tracking-tight lg:max-w-xl lg:text-5xl">
              Become Interview Ready with our affordable plan
            </h2>
          </div>
        )}

        <div className="relative flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch">
          <div className="relative w-full max-w-lg">
            {/* {plan.isFeatured && ( */}
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
              <span
                className={`badge border-0 bg-green-500 py-5 text-xs font-semibold text-primary-content sdm:py-1`}
              >
                ONE PLAN TO SECURE YOUR US F1 VISA
              </span>
            </div>
            {/* )} */}

            {/* {plan.isFeatured && ( */}
            <div
              className={`absolute -inset-[3px] z-10 rounded-[9px] bg-green-500`}
            ></div>
            {/* )} */}

            <div className="relative z-10 flex h-full flex-col gap-5 rounded-lg border bg-base-100 p-8 lg:gap-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-extrabold lg:text-xl">
                    Success Plan (45% off)
                  </p>
                  <p className="mt-2 text-xs text-base-content/60">
                    One Plan designed to build confidence and practice US F1
                    student visa interview. Try our AI mock interviews taken by
                    AI Visa Officer.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="mb-[4px] flex flex-col justify-end text-lg">
                  <p className="relative">
                    {/* <span className='absolute bg-rose-600 h-[1.5px] inset-x-0 top-[53%]'></span> */}
                    <span className="text-sm font-semibold text-base-content/80 text-red-500 line-through">
                      $69.99 USD
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <p
                    className={`text-5xl font-extrabold tracking-tight text-green-600`}
                  >
                    $39.99
                  </p>

                  <div className="mb-[4px] flex flex-col justify-end">
                    <p className="text-base font-semibold uppercase text-base-content/60 text-green-600">
                      USD
                    </p>
                    <p
                      className={`text-xs font-extrabold tracking-tight text-stone-500`}
                    >
                      OR (3,499 INR)
                    </p>
                  </div>
                </div>
              </div>

              {hide ? (
                <div
                  className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-1 text-xs"
                  onClick={() => setToggle(!toggle)}
                >
                  <hr className="w-full" />
                  <div className="relative -top-3 w-fit rounded-full border bg-white px-3 text-center text-gray-600">
                    {!toggle ? "show features" : "hide features"}
                  </div>
                </div>
              ) : (
                <hr className="w-full" />
              )}

              {toggle && (
                <>
                  <div>
                    <p className="text-lg font-extrabold text-green-600">
                      What you are paying for!
                    </p>
                    <p className="mt-1 text-xs text-base-content/60">
                      Features designed to get your visa approved
                    </p>
                  </div>
                  <ul className="flex-1 space-y-3.5 text-base leading-relaxed">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="flex flex-col">
                        <span>20 AI Mock Interviews</span>
                        <span className="text-[9px] text-base-content/60">
                          20 Premium AI Visa Mock Interviews with AI Visa
                          officer
                        </span>
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="flex flex-col">
                        <span>Visa Approved/ Rejected</span>
                        <span className="text-[9px] text-base-content/60">
                          Get realistic instant feedback from Our AI visa
                          officer - If your visa will be rejected or approved
                          based on your current mock interview within seconds.
                        </span>
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="flex flex-col">
                        <span>Premium HD Voices</span>
                        <span className="text-[9px] text-base-content/60">
                          All Visa Mock Interviews will be conducted with
                          Premium US accent human like voices
                        </span>
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="flex flex-col">
                        <span>Interview QNA Guide PDF</span>
                        <span className="text-[9px] text-base-content/60">
                          Most asked common question and answer guide for F1
                          visa interviews completely free (PDF)
                        </span>
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="flex flex-col">
                        <span>Additional +10 Interviews</span>
                        <span className="text-[9px] text-base-content/60">
                          Failed in real US f1 visa, To practice more get +10
                          additional interviews for absolutely FREE
                        </span>
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="flex flex-col">
                        <span>Mobile App (coming soon)</span>
                        <span className="text-[9px] text-base-content/60">
                          Practice US mock visa interview on the go with our
                          upcoming mobile app on both Android and IOS devices.
                        </span>
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="flex flex-col">
                        <span>Premium Support</span>
                        <span className="text-[9px] text-base-content/60">
                          We work hard to solve all of your questions/doubt as
                          quickly as possible. Get in touch with us via email,
                          call and chat.
                        </span>
                      </span>
                    </li>
                  </ul>
                </>
              )}

              <div className="space-y-2">
                <ButtonCheckout
                  variantId={config.lemonsqueezy.plans[0].variantId}
                />
                <p className="relative mt-3 flex items-center justify-center gap-2 text-center text-xs font-medium text-base-content/80">
                  Pay once. Access until you get your visa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
