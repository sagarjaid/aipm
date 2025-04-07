/** @format */

import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';
import logo from '@/app/icon.png';
import footer from '@/app/footer.png';
// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.mailgun.supportEmail, the link won't be displayed.

const FooterBIg = () => {
  return (
    <footer className='w-full mx-auto border-t border-base-content/10'>
      <div className='max-w-5xl mx-auto px-8 py-24'>
        <div className=' flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col gap-40'>
          <div className='w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left'>
            <Link
              href='/#'
              aria-current='page'
              className='flex gap-2 justify-center md:justify-start items-center'>
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                priority={true}
                className='w-12 h-12'
                width={100}
                height={100}
              />
              {/* <strong className='font-extrabold tracking-tight text-base md:text-lg'>
                {config.appName}
              </strong> */}
            </Link>

            <p className='mt-3 text-sm text-base-content/80'>
              {config.appDescription}
            </p>
            <p className='mt-3 text-sm text-base-content/60'>
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
          <div className='flex-grow flex flex-wrap justify-end -mb-10 md:mt-0 mt-10 gap-10'>
            <div className='px-4'>
              <div className='footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3'>
                LINKS
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm'>
                {config.mailgun.supportEmail && (
                  <a
                    href={`mailto:${config.mailgun.supportEmail}`}
                    target='_blank'
                    className='link link-hover'
                    aria-label='Contact Support'>
                    Support
                  </a>
                )}
                <Link
                  href='/#pricing'
                  className='link link-hover'>
                  Pricing
                </Link>
                <Link
                  href='/blog'
                  className='link link-hover'>
                  Blog
                </Link>
                <a
                  href='/#'
                  target='_blank'
                  className='link link-hover'>
                  Affiliates
                </a>
              </div>
            </div>

            <div className='px-4'>
              <div className='footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3'>
                LEGAL
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm'>
                <Link
                  href='/tos'
                  className='link link-hover'>
                  Terms of services
                </Link>
                <Link
                  href='/privacy-policy'
                  className='link link-hover'>
                  Privacy policy
                </Link>
              </div>
            </div>

            <div className='px-4'>
              <div className='footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3'>
                LEGAL
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm'>
                <Link
                  href='/tos'
                  className='link link-hover'>
                  Terms of services
                </Link>
                <Link
                  href='/privacy-policy'
                  className='link link-hover'>
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={footer}
        alt='logo'
        className='w-full'
        width={1000}
        height={1000}
      />
    </footer>
  );
};

export default FooterBIg;
