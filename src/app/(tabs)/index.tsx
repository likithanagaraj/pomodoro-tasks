import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { usePomodoro } from '@/hooks/usePomodoro';
import { View } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SafeAreaView } from 'react-native-safe-area-context';


const Home = () => {
  const {
    mode,
    timeLeft,
    isRunning,
    start,
    pause,
    resume,
    stop,
    changeDuration,
    startBreak,
    skipBreak,
  } = usePomodoro({ initialDuration: 0.4, breakDuration: 5 });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <SafeAreaView className='flex-1 py-2 bg-[#F8F8F8]'>
      {/* <Text >Home</Text> */}
      <View className='px-6 py-4'>
        <Text>{mode.toUpperCase()} MODE</Text>
        <View className="relative items-center justify-center">
          {/* Circular progress */}
          <CircularProgress
            value={53}
            activeStrokeColor="#3B82F6"
            inActiveStrokeColor="#E5E7EB"
            radius={120}
            strokeWidth={8}
            showProgressValue={false}
          />

          {/* Timer overlay */}
          <PanGestureHandler
          // onGestureEvent={panGestureHandler}
          >
            <Animated.View
              className="absolute items-center justify-center p-5"
            // style={animatedTimerStyle}
            >
              <Text className="text-4xl font-bold text-gray-800 font-mono">
                {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}
              </Text>
              {/* <Text className="text-sm font-medium text-gray-500 mt-1">
        {remainingSeconds === 0 ? "Done!" : isRunning ? "Running" : "Paused"}
      </Text> */}
              {!isRunning && (
                <Text className="text-[10px] text-gray-400 mt-1.5 text-center">
                  Swipe up/down to adjust
                </Text>
              )}
            </Animated.View>
          </PanGestureHandler>
        </View>;
        {/* <CircularProgress
          value={23} // computed percent
          activeStrokeColor='#3B82F6'
          inActiveStrokeColor='#E5E7EB'
          radius={120}
          strokeWidth={8}
          // Hide the built-in progress value
          showProgressValue={false}
        /> */}
        <Text className='text-4xl font-bold'>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </Text>

        {!isRunning ? (
          <Button onPress={start} >
            <Text>Start</Text>
          </Button>
        ) : (
          <Button onPress={pause} >
            <Text>Pause</Text>
          </Button>
        )}

        <Button onPress={resume} >
          <Text>Resume</Text>
        </Button>
        <Button onPress={stop} >
          <Text>Stop</Text>
        </Button>
        <Button onPress={() => changeDuration(30)} >
          <Text>+5 min</Text>
        </Button>
        <Button onPress={startBreak} >
          <Text>Start Break</Text>
        </Button>
        <Button onPress={skipBreak} >
          <Text>Skip Break</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Home