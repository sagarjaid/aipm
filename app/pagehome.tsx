import { Suspense } from "react";
import Header from "@/components/Header";
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
import Navbar from "@/components/Navbar";
import VisaInterviewTwo from "@/components/core/visaInterviewTwo";
import VisaInterview from "@/components/core/visaInterview";

export default function Home() {
  const baseInterviewQuestions = [
    {
      questionNumber: 1,
      question: "What university are you planning to attend?",
      questionCategory: "universityAndStudyPlans",
    },
    {
      questionNumber: 2,
      question: "What was your GPA during your bachelor's degree?",
      questionCategory: "academicsHistory",
    },
    {
      questionNumber: 3,
      question: "Who will be paying for your education?",
      questionCategory: "studentFinances",
    },
    {
      questionNumber: 4,
      question: "What is your current job title?",
      questionCategory: "workExperience",
    },
    {
      questionNumber: 5,
      question: "Do you plan to work in the USA after graduating?",
      questionCategory: "postGraduationPlans",
    },
    {
      questionNumber: 6,
      question: "Why did you choose this university?",
      questionCategory: "universityAndStudyPlans",
    },
    {
      questionNumber: 7,
      question: "What funds will be used to pay for your studies?",
      questionCategory: "studentFinances",
    },
    {
      questionNumber: 8,
      question: "Why did you take a gap year?",
      questionCategory: "workExperience",
    },
    {
      questionNumber: 9,
      question: "Do you have any scholarship?",
      questionCategory: "otherQuestions",
    },
  ];
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <div className="flex h-screen w-full text-xs">
          <Navbar />

          <div className="flex w-full justify-between">
            <div className="flex w-full flex-col overflow-y-scroll">
              {/* <ChannelList filter={'all'} /> */}
              <main className="flex w-full max-w-5xl flex-col gap-6 p-4">
                <div className="flex flex-col items-start justify-start p-1 pt-4 text-base xs:text-2xl sdm:text-2xl sm:gap-3 md:text-2xl">
                  <div className="font-semibold">
                    Welcome <span>{"User"}</span>!
                  </div>
                  <div className="text-sm">
                    Choose your goal from following 2 options.
                  </div>
                </div>
                <div className="flex w-full max-w-xl flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <div
                      // onClick={() => console.log('/career')}
                      className="flex h-60 cursor-pointer items-center justify-between gap-2 rounded-md border p-4 shadow-md hover:shadow-lg"
                    >
                      <div className="flex flex-col gap-3">
                        <img
                          src="history.svg"
                          alt="right"
                          className="h-10 w-10"
                        />
                        <div className="mt-4 text-lg font-semibold">
                          AI-powerd Career Suggestions
                        </div>
                        <div className="text-xs">
                          Get 4-to-6 career suggestion based on your personality
                          and interests.
                        </div>
                      </div>
                    </div>
                    <div
                      // onClick={() => console.log('/pathfinder')}
                      className="relative flex h-60 cursor-pointer items-center justify-between gap-2 rounded-md border p-4 shadow-md hover:shadow-lg"
                    >
                      <div className="absolute -top-2 right-4 w-max animate-pulse rounded-full bg-rose-500 px-1.5 text-xs text-transparent shadow-sm">
                        .
                      </div>
                      <div className="flex flex-col gap-3">
                        <img src="bag.svg" alt="right" className="h-10 w-10" />
                        <div className="mt-4 text-lg font-semibold">
                          Detailed Career Path Finder
                        </div>
                        <div className="text-xs">
                          Get career clarity of the career path with step by
                          step career plan.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>

            <div className="hidden w-[300px] cursor-pointer border-l px-4 py-4 lg:block">
              <div className="flex h-fit w-[260px] flex-col items-start rounded-md border">
                <div className="flex flex-col gap-3 border-b p-6">
                  <h2 className="text-base font-semibold">
                    List your youtube channel for FREE
                  </h2>
                  <div className="text-xs"> - Sell Faster</div>
                  <div className="text-xs">- Free to list</div>
                  <div className="text-xs">- Get Direct Message</div>
                </div>
                {/* <ButtonSubmitYT /> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
