import ProgressCard from "@/components/dashboard/ProgressCard";
import TimeLogCard from "@/components/dashboard/timeLogCard";
import WeekProgress from "@/components/dashboard/week-progress";
import { Text } from "@/components/ui/text";
import { useData } from "@/hooks/getData";
import { View } from "react-native";
// import { BsHourglassSplit } from "react-icons/bs";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { pomodoroData, weekData, totalPomodoroHours, todayTotalPomodoroHours, } = useData()

  console.log(weekData, "weekData in index.tsx");
  console.log(JSON.stringify(pomodoroData, null, 2), "pomodoroData in index.tsx");
  console.log(totalPomodoroHours, "totalPomodoroHours in index.tsx");

  if (!weekData) {
    return <View>
      <Text>Loading...</Text>
    </View>
  }

  return (
    <SafeAreaView className=" py-6 bg-[#F8F8F8] px-5">
      <Text variant={"h1"} className="text-black text-left mb-6 ">Home</Text>
      <View className="w-full  "  >
        <View className="flex-row">
          <TimeLogCard session={todayTotalPomodoroHours.data} />
          <ProgressCard data={weekData.map(d => ({ value: d.value }))} />
        </View>
        <WeekProgress
          barData={weekData.map(d => ({ value: d.value }))}
        />
      </View>
      <Text variant={"h3"} className="text-black text-left mb-6 ">Todays log</Text>
      <View>
        {pomodoroData.map(d => <Text key={d.id}>{d.duration} min</Text>)}
      </View>
    </SafeAreaView >
  );
};

export default Index;

// barData={[{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }, { value: 35 }, { value: 28 }, { value: 42 }]}