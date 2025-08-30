export type PomodoroSession = {
  id: number;
  startedAt: string;    // "16-48-30-8-2025"
  completedAt: string;  // "17-48-30-8-2025"
  duration: number;     // minutes
  wasPaused: boolean;
  mode: "work" | "break"; // optional, if you also log breaks
};
