import { View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
const WeekProgress = ({ barData }) => {
  // console.log("barData")
  // console.log(barData)
  return (
    <View className='py-2 overflow-hidden border-1  mb-4 rounded-xl bg-white '>
      <BarChart  hideYAxisText xAxisLabelTexts={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} width={340}   data={barData}/>
    </View>
  )
}

export default WeekProgress