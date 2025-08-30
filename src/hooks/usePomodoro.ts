import { useCallback, useEffect, useRef, useState } from "react";

type Mode = "work" | "break";

interface UsePomodoroOptions {
  initialDuration?: number; // minutes
  breakDuration?: number; // minutes
}

export const usePomodoro = ({
  initialDuration = 25,
  breakDuration = 5,
}: UsePomodoroOptions = {}) => {
  
  const [mode, setMode] = useState<Mode>("work");
  const [duration, setDuration] = useState(initialDuration); // in minutes
  const [timeLeft, setTimeLeft] = useState(initialDuration * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup interval
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  const start = useCallback(() => {
    if (isRunning) return;
    setMode("work");
    setTimeLeft(duration * 60);
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  }, [duration, isRunning, tick]);

  const pause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  }, [isRunning, tick]);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setMode("work");
    setTimeLeft(duration * 60);
  }, [duration]);

  const changeDuration = useCallback(
    (newDuration: number) => {
      if (newDuration % 5 !== 0) return; // enforce 5-min intervals
      setDuration(newDuration);
      if (mode === "work") {
        setTimeLeft(newDuration * 60);
      }
    },
    [mode]
  );

  const startBreak = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode("break");
    setTimeLeft(breakDuration * 60);
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  }, [breakDuration, tick]);

  const skipBreak = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode("work");
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [duration]);

  return {
    mode,
    duration,
    timeLeft,
    isRunning,
    start,
    pause,
    resume,
    stop,
    changeDuration,
    startBreak,
    skipBreak,
  };
};