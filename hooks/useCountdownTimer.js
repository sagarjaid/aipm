import { useEffect, useState } from "react";

export const useCountdownTimer = (
  initialState = false,
  duration = 120,
  onTimerEnd,
) => {
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(initialState);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setCountdown((prev) => {
        if (prev >= duration) {
          clearInterval(timerId);
          setIsRunning(false);
          onTimerEnd();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, duration, onTimerEnd]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => setCountdown(0);

  return { countdown, isRunning, startTimer, stopTimer, resetTimer };
};
