/** @format */

'use client';

import React, { useEffect, useState } from 'react';

const CountryFlag = () => {
  const [countryCode, setCountryCode] = useState('🇮🇳');

  useEffect(() => {
    // Get country using IP geolocation
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        const countryCode = data.country_code || 'IN';
        setCountryCode(getFlagEmoji(countryCode));
      })
      .catch(() => {
        setCountryCode('👽');
      });
  }, []);

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return <>{countryCode}</>;
};

export default CountryFlag;
