import { View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
const WeekProgress = () => {
  const barData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
  return (
    <View className='px-4 py-2 border-1  mb-4 rounded-xl bg-white '>
      <BarChart hideYAxisText xAxisLabelTexts={['Mon', 'Tue', 'Wed', 'Thu']} data={barData}/>
    </View>
  )
}

export default WeekProgress