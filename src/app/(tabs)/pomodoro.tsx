import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { usePomodoro } from "@/hooks/usePomodoro";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    // You can add changeDuration function in your hook
    changeDuration,
  } = usePomodoro({ initialDuration: 25, breakDuration: 5 });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const increaseTime = () => changeDuration(duration + 5);
  const decreaseTime = () => {
    if (duration > 5) changeDuration(duration - 5);
  };

  return (
    <SafeAreaView className="flex-1 py-2 bg-[#F8F8F8] items-center justify-center">
      <View className="px-6 py-4 items-center">
        <Text className="text-black text-lg font-bold">
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
            {/* Timer with arrows */}
            <View className="flex flex-row items-center justify-center gap-4">
              <TouchableOpacity className="  rounded-md" onPress={decreaseTime} >
                 {duration > 5 ? <AntDesign name="caretleft" size={16} color="black" /> : <AntDesign name="caretleft" size={16} color="gray" />}
              </TouchableOpacity>

              <Text className="font-bold text-[40px] text-black">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </Text>

              <TouchableOpacity onPress={increaseTime} className="  rounded-md">
                {/* <Text style={styles.arrowText}>+5</Text> */}
                <AntDesign name="caretright" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/* Buttons */}
        {mode === "work" && !isRunning && timeLeft === duration * 60 && (
          <Button className="bg-black" onPress={start}>
            <Text className="text-white">Start to Focus</Text>
          </Button>
        )}

        {mode === "work" && isRunning && (
          <View className="flex-row gap-2 mt-4">
            <Button className="bg-black" onPress={pause}>
              <Text className="text-white">Pause</Text>
            </Button>
            <Button className="bg-gray-200 px-3" onPress={stop}>
              <Text className="text-black">Stop</Text>
            </Button>
          </View>
        )}

        {mode === "work" && !isRunning && timeLeft !== duration * 60 && timeLeft > 0 && (
          <Button onPress={resume} className=" bg-black">
            <Text className="text-white">Continue</Text>
          </Button>
        )}

        {mode === "work" && timeLeft === 0 && (
          <Button onPress={startBreak} className=" bg-black">
            <Text className="text-white">Break</Text>
          </Button>
        )}
        
      </View>
    </SafeAreaView>
  );
};

export default Pomodoro;

const styles = StyleSheet.create({



});
