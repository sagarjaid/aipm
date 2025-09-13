/** @format */

import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/logo-2.png";
import footer from "@/app/footer.png";
import AnimatedLogo from "./AnimatedLogo";
import ClickableEmail from "./ClickableEmail";
// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.mailgun.supportEmail, the link won't be displayed.

const FooterBIg = () => {
  return (
    <footer className='mx-auto w-full border-t border-base-content/10 bg-[url("/bg.svg")]'>
      <div className="mx-auto max-w-5xl px-8 py-16 md:py-24">
        <div className="flex flex-col flex-wrap gap-10 md:flex-row md:flex-nowrap md:gap-40 lg:items-start">
          <div className="mx-auto w-64 flex-shrink-0 text-center md:mx-0 md:text-left">
            <Link
              href="/#"
              aria-current="page"
              className="flex items-center justify-center gap-2 md:justify-start"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                priority={true}
                className="h-10 w-10 opacity-80 hover:animate-[spin_6s_linear_infinite]"
                width={100}
                height={100}
              />
            </Link>

            {/* <AnimatedLogo /> */}

            <p className="mt-4 text-sm text-base-content/80">
              Relentless clarity, progress everyday.
            </p>
            <p className="mt-3 text-xs text-base-content/60">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
          <div className="flex flex-col justify-end md:flex-row md:gap-10">
            <div className="w-full px-4 text-center md:text-left">
              <div className="footer-title mb-3 text-sm font-semibold tracking-widest text-base-content">
                LINKS
              </div>

              <div className="mb-10 flex flex-col justify-center gap-2 text-sm">
                <Link href="/" className="link-hover link">
                  Home
                </Link>
                <Link href="/manifesto" className="link-hover link">
                  Manifesto
                </Link>
                {/* {config.mailgun.supportEmail && (
                  <a
                    href={`mailto:${config.mailgun.supportEmail}`}
                    target='_blank'
                    className='link link-hover'
                    aria-label='Contact Support'>
                    Help
                  </a>
                )} */}

                <div className="flex justify-center md:justify-start">
                  <ClickableEmail
                    email={config.mailgun.supportEmail}
                    className="text-sm hover:text-gray-700"
                    showIcon={false}
                  />
                </div>
              </div>
            </div>

            <div className="w-full px-4 text-center md:text-left">
              <div className="footer-title mb-3 text-sm font-semibold tracking-widest text-base-content">
                LEGAL
              </div>

              <div className="mb-10 flex flex-col justify-center gap-2 text-sm">
                <Link href="/tos" className="link-hover link whitespace-nowrap">
                  Terms of services
                </Link>
                <Link
                  href="/privacy"
                  className="link-hover link whitespace-nowrap"
                >
                  Privacy policy
                </Link>
              </div>
            </div>

            <div className="w-full px-4 text-center md:text-left">
              <div className="footer-title mb-3 text-sm font-semibold tracking-widest text-base-content">
                SOCIAL
              </div>

              <div className="mb-10 flex flex-col justify-center gap-2 text-sm">
                <Link
                  href="https://www.linkedin.com/in/sagarjaid/"
                  className="link-hover link"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.linkedin.com/in/sagarjaid/"
                  className="link-hover link"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={footer}
        alt="logo"
        className="w-full"
        width={1000}
        height={1000}
      />
    </footer>
  );
};

export default FooterBIg;
