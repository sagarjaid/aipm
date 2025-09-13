/** @format */

// 'use client';

import React, { Suspense } from "react";
import ScrumPageContent from "./AIPageContent";

const AIPage = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    }
  >
    <ScrumPageContent />
  </Suspense>
);

export default AIPage;
