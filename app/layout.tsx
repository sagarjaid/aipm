/** @format */

import { ReactNode } from "react";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import { GoogleAnalytics } from "@next/third-parties/google";
import { HotJar } from "@/components/helper/hotjar";
import ClientWrapper from "@/components/ClientWrapper";
import BackToTop from "@/components/BackToTop";
import config from "@/config";
import "./globals.css";
import HelloBar from "@/components/HelloBar";

// Define SEO metadata
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme={config.colors.theme}>
      <body>
        {config.domainName && <PlausibleProvider domain={config.domainName} />}
        <GoogleAnalytics gaId="G-XWQZQB0RB3" />{" "}
        {/* GA email: getaipmcom@gmail.com*/}
        {/* <HotJar /> */}
        <HelloBar />
        <ClientWrapper>{children}</ClientWrapper>
        <BackToTop />
      </body>
    </html>
  );
}
