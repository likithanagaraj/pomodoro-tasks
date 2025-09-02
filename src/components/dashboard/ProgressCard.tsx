import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { PomodoroSession } from "@/types/pomodoro";
import { Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
const ProgressCard = ({ session }: { session: PomodoroSession }) => {
  const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
  return (
    <Card className="flex   w-1/2 max-w-sm bg-white rounded-lg border-gray-100 shadow-none">
      <CardHeader className="flex-row items-center justify-start pb-1 px-4">
        <CardTitle className="font-InterMedium text-black text-[14px]">
          You've improved <Text className="font-InterExtraBold">23%</Text> better than last week
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 px-2 w-full">
        <LineChart  height={100} width={100}  initialSpacing={0} areaChart curved hideYAxisText hideRules thickness={3}  isAnimated
        animationDuration={1200} xAxisLabelTextStyle={{fontSize: 12}}    data={data}/>
      </CardContent>
      
    </Card>
  );
};

export default ProgressCard;
