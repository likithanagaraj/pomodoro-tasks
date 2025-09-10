import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useData } from "@/hooks/getData";
import { LineChart } from "react-native-gifted-charts";
const ProgressCard = ({ data }: { data: { value: number,day:string }[] }) => {
 const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-03"

const filteredData = data.filter(d => d.day <= today); 

const chartData = filteredData.map(d => ({
  value: d.value,
  label: new Date(d.day).getDate().toString() 
}));

console.log(chartData, "chartData in progress-card.tsx");
console.log(today, "date");
  
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
          animationDuration={1200} xAxisLabelTextStyle={{ fontSize: 12 }} data={chartData} />
      </CardContent>

    </Card>
  );
};

export default ProgressCard;
