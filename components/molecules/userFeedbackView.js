import Image from "next/image";
import CameraControls from "./cameraControls";
import DisplayText from "../atoms/displayText";
import Webcam from "./webcam";

import { useWebcam } from "@/hooks/useWebcam";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const UserFeedbackView = ({ userAnswer, recording, isSpeaking }) => {
  console.log(userAnswer, "userAnswer");

  const { err, stream, cameraToggle, handleCameraToggle, handleUpNDown } =
    useWebcam();
  const { isMobile, isDesktop, isTablet } = useDeviceDetection();

  console.log(stream, "stream");

  return (
    <div className="flex flex-col-reverse justify-between gap-4 p-4 pb-6 sdm:flex-row">
      <DisplayText text={userAnswer} />

      <div className="flex flex-col justify-around gap-4 sdm:h-full sdm:justify-between">
        <div className="flex h-full w-full min-w-60 flex-col gap-2 rounded-md border bg-white p-3">
          <CameraControls
            toggle={cameraToggle}
            handleToggle={handleCameraToggle}
            isMobile={isMobile}
            handleUpNDown={handleUpNDown}
          />

          {cameraToggle && !isDesktop && !isTablet && (
            <div className="flex h-full w-full items-center justify-center rounded-md border">
              {!isSpeaking ? (
                <Image
                  alt="talking"
                  className="my-16 sdm:my-10"
                  src="/talking-3.svg"
                  width={35}
                  height={35}
                />
              ) : (
                <Image
                  alt="wave"
                  src="/wave.gif"
                  className="my-16 sdm:my-10"
                  width={55}
                  height={55}
                />
              )}
            </div>
          )}

          {(isDesktop || isTablet) && !isMobile && (
            <div className="flex h-[159px] w-full items-center justify-center rounded-md">
              {!cameraToggle || err || !stream ? (
                <div className="flex h-full w-full items-center justify-center rounded-md border">
                  {!recording ? (
                    <Image
                      alt="talking"
                      src="/talking-3.svg"
                      width={35}
                      height={35}
                    />
                  ) : (
                    <Image alt="wave" src="/wave.gif" width={55} height={55} />
                  )}
                </div>
              ) : (
                <div className="h-[159px] w-52">
                  <Webcam stream={stream} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFeedbackView;
