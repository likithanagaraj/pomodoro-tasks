import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { usePomodoro } from "@/hooks/usePomodoro";
import { savePomodoroSession } from "@/storage/pomodoro-storage";
import { AntDesign, Feather } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef } from "react";
import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Pomodoro = () => {
  const {
    mode,
    duration,
    timeLeft,
    isRunning,
    start,
    pause,
    resume,
    stop,
    startBreak,
    changeDuration,
  } = usePomodoro({ initialDuration: 25, breakDuration: 5 });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const wasPausedRef = useRef(false);
  
  const handlePause = () => {
    wasPausedRef.current = true;
    pause();
  };
  
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const increaseTime = () => changeDuration(duration + 5);
  const decreaseTime = () => {
    if (duration >= 5) changeDuration(duration - 5);
  };

  useEffect(() => {
    if(timeLeft === 0 && mode === "work"){
      savePomodoroSession({
        id: Date.now(),
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        duration: duration,
        wasPaused: wasPausedRef.current,
        mode: "work",
      })
    }
  }, [timeLeft, mode])

  return (
    <SafeAreaView className="flex-1 py-2 bg-[#F8F8F8] items-center justify-center">
      <View className="px-6 py-4 items-center">
        <Text className="text-black text-lg font-InterBold">
          {mode.toUpperCase()} MODE
        </Text>

        {/* Circular Progress */}
        <View className="relative items-center justify-center my-6">
          <CircularProgress
            value={progress}
            activeStrokeColor="#3B82F6"
            inActiveStrokeColor="#E5E7EB"
            radius={120}
            showProgressValue={false}
          />
          
          <Animated.View className="absolute items-center justify-center">
            {/* Icon above timer */}
            <View className="items-center justify-center mb-2">
              {isRunning && mode === "work" ? 
                <Ionicons name="hourglass-outline" size={24} color="black" /> : 
                <Feather name="coffee" size={24} color="black" />
              }
            </View>
            
            {/* Timer with side arrows */}
            <View className="flex-row items-center justify-center gap-2">
              {/* Left arrow */}
              {!isRunning ? (
                <Button  size={"lg"} variant={"link"} className="rounded-md" onPress={decreaseTime}>
                  {duration > 5 ? <AntDesign name="caretleft" size={16} color="black" /> : <View className="w-4" />}
                </Button>
              ) : <View className="w-8" />}

              {/* Centered timer */}
              <Text className="font-bold text-[40px] text-black">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </Text>

              {/* Right arrow */}
              {!isRunning ? (
                <Button size={"lg"} variant={"link"}  onPress={increaseTime} className="rounded-md">
                  <AntDesign name="caretright" size={16} color="black" />
                </Button>
              ) : <View className="w-8" />}
            </View>
          </Animated.View>
        </View>

        {/* Control Buttons */}
        {mode === "work" && !isRunning && timeLeft === duration * 60 && (
          <Button  size={"lg"} className="bg-black" onPress={start}>
            <Text className="text-white font-InterSemiBold">Start to Focus</Text>
          </Button>
        )}

        {mode === "work" && isRunning && (
          <View className="flex-row gap-2 mt-4">
            <Button  size={"lg"}  className="bg-black" onPress={handlePause}>
              <Text className="text-white font-InterSemiBold">Pause</Text>
            </Button>
          </View>
        )}

        {mode === "work" && !isRunning && timeLeft !== duration * 60 && timeLeft > 0 && (
          <View className="flex-row gap-2 mt-4">
            <Button onPress={resume} className="bg-black">
              <Text className="text-white font-InterSemiBold">Continue</Text>
            </Button>
            <Button className="bg-gray-200 px-3" onPress={stop}>
              <Text className="text-black font-InterSemiBold">Stop</Text>
            </Button>
          </View>
        )}

        {mode === "work" && timeLeft === 0 && (
          <Button onPress={startBreak} className="bg-black">
            <Text className="text-white font-InterSemiBold">Break</Text>
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Pomodoro;