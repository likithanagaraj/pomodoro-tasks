import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useData } from "@/hooks/getData";
import { LineChart } from "react-native-gifted-charts";
const ProgressCard = ({ data }: { data: { value: number }[] }) => {
  // const data = ;
  const { thisWeekVsLastWeekStat } = useData()
  return (
    <Card className="flex   w-1/2 max-w-sm bg-white rounded-lg border-gray-100 shadow-none">
      <CardHeader className="flex-row items-center justify-start pb-1 px-4">
        <CardTitle className="font-InterMedium text-black text-[14px]">
          {/* You've improved <Text className="font-InterExtraBold">23%</Text> better than last week */}
          {thisWeekVsLastWeekStat}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 px-2 w-full">
        <LineChart height={100} width={100} initialSpacing={0} areaChart curved hideYAxisText hideRules thickness={3} isAnimated
          animationDuration={1200} xAxisLabelTextStyle={{ fontSize: 12 }} data={data} />
      </CardContent>

    </Card>
  );
};

export default ProgressCard;
