/** @format */

import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/logo.png";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center gap-4 py-2 pb-6 text-xs">
      <div className="mx-auto w-full flex-shrink-0 text-center md:mx-0 md:text-left">
        <Link
          className="flex shrink-0 items-center justify-center gap-2"
          href="/"
          title={`${config.appName} homepage`}
        >
          <Image
            src={logo}
            alt={`${config.appName} logo`}
            className="w-full"
            priority={true}
            width={130}
            height={70}
          />
        </Link>
      </div>
      <div className="flex justify-center gap-2">
        {/* <a
          href='https://www.linkedin.com/in/sagarjaid/'
          target='_blank'>
          Sagar Jaid
        </a>
        <span>|</span> */}

        <a href="/privacy" target="_blank">
          Privacy
        </a>
        <span>|</span>
        <a href="/tos" target="_blank">
          T&C
        </a>
        <span>|</span>

        <Link href="/#pricing" className="link-hover link">
          Pricing
        </Link>
        <span>|</span>

        <a
          href={`mailto:sagar@getaipm.com`}
          target="_blank"
          className="link-hover link"
          aria-label="Contact Support"
        >
          Support
        </a>
      </div>
    </div>
  );
};

export default Footer;
