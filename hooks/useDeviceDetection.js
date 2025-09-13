import { useEffect, useState } from "react";

export const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth < 480);
      setIsDesktop(windowWidth >= 990);
      setIsTablet(windowWidth >= 480 && windowWidth < 990);
    };

    // Initial setup
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array to ensure the effect runs only once

  return { isMobile, isDesktop, isTablet };
};
