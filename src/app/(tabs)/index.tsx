
import ProgressCard from "@/components/dashboard/ProgressCard";
import TimeLogCard from "@/components/dashboard/timeLogCard";
import WeekProgress from "@/components/dashboard/week-progress";
import { getPomodoroSessions } from "@/storage/pomodoro_storage";
import { PomodoroSession } from "@/types/pomodoro";

import { useEffect, useState } from "react";
import { View } from "react-native";
// import { BsHourglassSplit } from "react-icons/bs";

import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  const [session, setsession] = useState<PomodoroSession[]>([]);
  useEffect(() => {
    const loadSession = async () => {
      const data = await getPomodoroSessions();
      console.log(data);
      setsession(data);
    };
    loadSession();
  }, []);

  return (
    <SafeAreaView className="flex-1 py-2 bg-[#F8F8F8] px-5">
      {session.map((session) => (
        <View className="w-full flex-row " key={session.id}>
          <View className="">
            <TimeLogCard session={session} />
            <ProgressCard session={session} />
            <WeekProgress/>
          </View>
        
        </View>
      ))}
    </SafeAreaView>
  );
};

export default index;
