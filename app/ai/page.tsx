/** @format */

// 'use client';

import React, { Suspense } from 'react';
import AIPageContent from './AIPageContent';

const AIPage = () => (
  <Suspense
    fallback={
      <div className='min-h-screen flex items-center justify-center bg-black text-white'>
        Loading...
      </div>
    }>
    <AIPageContent />
  </Suspense>
);

export default AIPage;
