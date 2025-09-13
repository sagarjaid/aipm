// import { useState, useEffect, useCallback } from 'react';
// import { useDeviceDetection } from './useDeviceDetection';

// export const useWebcam = () => {
//   const [err, setErr] = useState(false);
//   const [stream, setStream] = useState(null);
//   const [cameraToggle, setCameraToggle] = useState(false);
//   const { isMobile } = useDeviceDetection();

//   const startWebcam = useCallback(async () => {
//     try {
//       const userStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });
//       setStream(userStream);
//     } catch (error) {
//       setErr(true);
//       console.error('Error accessing webcam:', error);
//     }
//   }, []);

//   const stopWebcam = useCallback(() => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//   }, [stream]);

//   const handleCameraToggle = useCallback(() => {
//     setCameraToggle((prev) => {
//       const newToggle = !prev;
//       if (newToggle) {
//         startWebcam();
//       } else {
//         stopWebcam();
//       }
//       return newToggle;
//     });
//   }, [startWebcam, stopWebcam]);

//   const handleUpNDown = () => {
//     setCameraToggle(!cameraToggle);
//   };

//   useEffect(() => {
//     if (isMobile) {
//       stopWebcam();
//     }
//   }, [isMobile]);

//   useEffect(() => {
//     if (!stream) {
//       setCameraToggle(false);
//     }
//   }, [stream]);

//   return { err, stream, cameraToggle, handleCameraToggle, handleUpNDown };
// };

import { useState, useEffect, useCallback } from "react";
import { useDeviceDetection } from "./useDeviceDetection";

export const useWebcam = () => {
  const [err, setErr] = useState(false);
  const [stream, setStream] = useState(null);
  const [cameraToggle, setCameraToggle] = useState(false);
  const { isMobile } = useDeviceDetection();

  const startWebcam = useCallback(async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(userStream);
    } catch (error) {
      setErr(true);
      console.error("Error accessing webcam:", error);
    }
  }, []);

  const stopWebcam = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const handleCameraToggle = useCallback(() => {
    setCameraToggle((prev) => {
      const newToggle = !prev;
      if (newToggle) {
        startWebcam();
      } else {
        stopWebcam();
      }
      return newToggle;
    });
  }, [startWebcam, stopWebcam]);

  const handleUpNDown = () => {
    setCameraToggle(!cameraToggle);
  };

  useEffect(() => {
    if (isMobile) {
      stopWebcam();
    }
  }, [isMobile, stopWebcam]);

  useEffect(() => {
    if (!stream) {
      setCameraToggle(false);
    }
  }, [stream]);

  // Automatically start the webcam when the page loads
  useEffect(() => {
    startWebcam();
    setCameraToggle(true); // To reflect that the camera is active
  }, [startWebcam]);

  return { err, stream, cameraToggle, handleCameraToggle, handleUpNDown };
};
