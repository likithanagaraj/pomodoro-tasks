import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PomodoroSession } from "@/types/pomodoro";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native";
const TimeLogCard = ({ session, }: { session: PomodoroSession, }) => {
  return (
    <Card className="flex   w-1/2 max-w-sm bg-white rounded-lg border-gray-100 shadow-none">
      <CardHeader className="flex-row items-center justify-start pb-1 px-4">
        <CardTitle className="text-black text-[16px]">Today </CardTitle>
        <Ionicons name="hourglass-outline" size={16} color="black" />
      </CardHeader>
      <CardContent className="pb-2 px-4">
        <Text className="font-InterBold text-4xl">{session.duration}hr</Text>
      </CardContent>
      <CardFooter className="px-4">
        <Text className="text-sm leading-4">+25% better from yesterday</Text>
      </CardFooter>
    </Card>
  );
};

export default TimeLogCard;
