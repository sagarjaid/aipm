/** @format */

// 'use client';

import React, { Suspense } from 'react';
import ScrumPageContent from './AIPageContent';

const AIPage = () => (
  <Suspense
    fallback={
      <div className='min-h-screen flex items-center justify-center bg-black text-white'>
        Loading...
      </div>
    }>
    <ScrumPageContent />
  </Suspense>
);

export default AIPage;
