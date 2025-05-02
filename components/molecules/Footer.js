/** @format */

import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';
import logo from '@/app/logo.png';

const Footer = () => {
  return (
    <div className='flex flex-col justify-center gap-4 py-2 pb-6 text-xs'>
      <div className=' w-full flex-shrink-0 md:mx-0 mx-auto text-center md:text-left'>
        <Link
          className='flex justify-center items-center gap-2 shrink-0 '
          href='/'
          title={`${config.appName} homepage`}>
          <Image
            src={logo}
            alt={`${config.appName} logo`}
            className='w-full'
            priority={true}
            width={130}
            height={70}
          />
        </Link>
      </div>
      <div className='flex gap-2 justify-center'>
        {/* <a
          href='https://www.linkedin.com/in/sagarjaid/'
          target='_blank'>
          Sagar Jaid
        </a>
        <span>|</span> */}

        <a
          href='/privacy'
          target='_blank'>
          Privacy
        </a>
        <span>|</span>
        <a
          href='/tos'
          target='_blank'>
          T&C
        </a>
        <span>|</span>

        <Link
          href='/#pricing'
          className='link link-hover'>
          Pricing
        </Link>
        <span>|</span>

        <a
          href={`mailto:sagarjaid321@gmail.com`}
          target='_blank'
          className='link link-hover'
          aria-label='Contact Support'>
          Support
        </a>
      </div>
    </div>
  );
};

export default Footer;
