/** @format */

import Image from "next/image";
import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";
import img4a from "../img/4a.png";
import img4b from "../img/4b.png";
import img5 from "../img/5.png";
import img6 from "../img/6.png";
import img6a from "../img/6a.png";
import img7 from "../img/7.png";

export default function Photos() {
  return (
    <div className="mb-20 mt-20 flex min-h-screen w-full items-center justify-center bg-white p-8 lg:mt-2">
      <div className="relative w-full max-w-5xl">
        {/* Top row */}
        <div className="relative h-[500px] w-full">
          {/* Team hard at work */}
          <div className="absolute left-[8%] top-0 z-10 w-[280px] -rotate-[6deg] transform rounded-lg border bg-white p-2 shadow-lg">
            <div className="relative h-[360px] w-full">
              <Image
                src={img1}
                alt="Our team hard at work"
                fill
                className="rounded-sm border border-gray-700 object-fill"
                priority
              />
            </div>
            <p className="font-handwriting mt-3 text-center text-sm text-gray-700">
              Where it all started
            </p>
          </div>

          {/* Y Combinator office */}
          <div className="absolute left-[40%] top-[60px] z-10 w-[220px] rotate-[14deg] transform rounded-lg border bg-white p-2 shadow-lg">
            <div className="relative h-[280px] w-full">
              <Image
                src={img2}
                alt="At Y Combinator office"
                fill
                className="rounded-sm border border-gray-700 object-fill"
                priority
              />
            </div>
            <p className="font-handwriting mt-2 text-center text-sm text-gray-700">
              At Draper Startup House
            </p>
          </div>

          {/* Meetings and moments */}
          <div className="absolute right-[5%] top-[10px] z-20 w-[300px] rotate-[2deg] transform rounded-lg border bg-white p-3 shadow-md">
            <div className="relative h-[300px] w-full">
              <Image
                src={img5}
                alt="Meetings and moments that matter"
                fill
                className="rounded-sm border border-gray-700 object-cover"
                priority
              />
            </div>
            <p className="font-handwriting mt-2 text-center text-sm text-gray-700">
              Sharing thoghts on life as Dev
              <br />
              at geekyAnts
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative mt-[-60px] h-[400px] w-full">
          {/* Our friend Bisco */}
          <div className="absolute left-[10%] top-[30px] z-30 w-[300px] rotate-[8deg] transform rounded-lg border bg-white p-3 shadow-md">
            <div className="relative h-[360px] w-full">
              <Image
                src={img4a}
                alt="Our friend Bisco is the best!"
                fill
                className="rounded-sm border border-gray-700 object-fill"
                priority
              />
            </div>
            <p className="font-handwriting mt-2 text-center text-sm text-gray-700">
              Khabbu at Help
            </p>
          </div>

          {/* Perfect playlist */}
          <div className="absolute left-[42%] top-[50px] z-20 w-[220px] -rotate-[9deg] transform rounded-lg border bg-white p-3 shadow-md">
            <div className="relative h-[260px] w-full">
              <Image
                src={img3}
                alt="Perfect playlist for late night coding sessions"
                fill
                className="rounded-sm border border-gray-700 object-fill"
                priority
              />
            </div>
            <p className="font-handwriting mt-2 text-center text-sm text-gray-700">
              Perfect setup for Meeting
            </p>
          </div>

          {/* YC batch */}
          <div className="absolute right-[5%] top-[20px] z-10 w-[300px] rotate-[6deg] transform rounded-lg border bg-white p-3 shadow-md">
            <div className="relative h-[300px] w-full">
              <Image
                src={img6}
                alt="Our YC W24 batch is the best batch!"
                fill
                className="rounded-sm border border-gray-700 object-fill"
                priority
              />
            </div>
            <p className="font-handwriting mt-2 text-center text-sm text-gray-700">
              At local event in BLR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
