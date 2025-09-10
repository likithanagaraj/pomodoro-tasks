import { savePomodoroSession } from "@/storage/pomodoro-storage";
import { useCallback, useEffect, useRef, useState } from "react";


const formatDate = (d: Date) => {
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  const ss = d.getSeconds().toString().padStart(2, "0");
  const DD = d.getDate();
  const MM = d.getMonth() + 1;
  const YYYY = d.getFullYear();
  return `${hh}-${mm}-${ss}-${DD}-${MM}-${YYYY}`;
};

export const usePomodoro = ({
  initialDuration = 25,
  breakDuration = 5,
}: { initialDuration?: number; breakDuration?: number } = {}) => {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [duration, setDuration] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(initialDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [wasPaused, setWasPaused] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);

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

        // Save session when completed
        if (mode === "work" && startTime) {
          const session = {
            id: Date.now(),
            startedAt: startTime,
            completedAt: formatDate(new Date()),
            duration,
            wasPaused,
            mode,
          };
          savePomodoroSession(session);
        }

        return 0;
      }
      return prev - 1;
    });
  }, [duration, wasPaused, mode, startTime]);

  const start = useCallback(() => {
    if (isRunning) return;
    setMode("work");
    setTimeLeft(duration * 60);
    setIsRunning(true);
    setWasPaused(false);
    setStartTime(formatDate(new Date()));
    intervalRef.current = setInterval(tick, 1000);
  }, [duration, isRunning, tick]);

  const pause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setWasPaused(true);
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

  const startBreak = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode("break");
    setTimeLeft(breakDuration * 60);
    setIsRunning(true);
    setStartTime(formatDate(new Date()));
    intervalRef.current = setInterval(tick, 1000);
  }, [breakDuration, tick]);

  // ✅ Update duration on-the-fly, also adjust timeLeft if in work mode
  const changeDuration = useCallback(
    (newDuration: number) => {
      if (newDuration < 5) return; // prevent too small
      setDuration(newDuration);

      // If user is in work mode, adjust timeLeft proportionally
      if (mode === "work") {
        setTimeLeft((prev) => {
          // Preserve remaining percentage
          const remainingPercent = prev / (duration * 60);
          return Math.floor(newDuration * 60 * remainingPercent);
        });
      }
    },
    [mode, duration]
  );

  return {
    mode,
    duration,
    timeLeft,
    isRunning,
    start,
    pause,
    resume,
    stop,
    startBreak,
    changeDuration,
  };
};
