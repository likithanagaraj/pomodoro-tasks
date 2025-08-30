import { PomodoroSession } from "@/types/pomodoro";
import AsyncStorage from "@react-native-async-storage/async-storage";

const POMODORO_KEY = "pomodoro_sessions";

export const savePomodoroSession = async(session: PomodoroSession)=>{
  try {
    const existing = await AsyncStorage.getItem(POMODORO_KEY);
    const sessions = existing ? JSON.parse(existing) : [];

    // prepend new session
    const updated = [session, ...sessions];

    await AsyncStorage.setItem(POMODORO_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

export const getPomodoroSessions = async (): Promise<PomodoroSession[]> => {
  try {
    const stored = await AsyncStorage.getItem(POMODORO_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Error reading sessions:", err);
    return [];
  }
};