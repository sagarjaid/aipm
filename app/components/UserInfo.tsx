/** @format */

'use client';

import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    device: '',
    browser: '',
    os: '',
    country: 'Unknown',
  });

  useEffect(() => {
    // Detect device type
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const device = isMobile ? 'Mobile' : 'Desktop';

    // Detect browser
    const userAgent = navigator.userAgent;
    let browser = '👻';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    // Detect OS
    let os = 'Unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'Mac';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'IOS';

    // Get country using IP geolocation
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        setUserInfo({
          device,
          browser,
          os,
          country: data.country_name || '👽',
        });
      })
      .catch(() => {
        setUserInfo({
          device,
          browser,
          os,
          country: '👽',
        });
      });
  }, []);

  return (
    <div className='absolute bottom-full left-0 mb-2 w-64 bg-white border flex flex-col gap-3 rounded-md font-medium shadow-lg p-4'>
      <div className='flex justify-between border-b border-gray-100 pb-2'>
        <span>Device</span>
        <span>{userInfo.device}</span>
      </div>
      <div className='flex justify-between border-b border-gray-100 pb-2'>
        <span>Browser</span>
        <span>{userInfo.browser}</span>
      </div>
      <div className='flex justify-between border-b border-gray-100 pb-2'>
        <span>OS</span>
        <span>{userInfo.os}</span>
      </div>
      <div className='flex justify-between'>
        <span>Country</span>
        <span>{userInfo.country}</span>
      </div>
    </div>
  );
};

export default UserInfo;
