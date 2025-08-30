import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const Pomodoro = () => {
  // 1️⃣ Ref to store the interval ID so we can stop it later
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // 2️⃣ Total session in seconds (25 minutes initially, but adjustable)
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);

  // 3️⃣ Remaining seconds that will count down
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);

  // 4️⃣ Timer state
  const [isRunning, setIsRunning] = useState(false);

  // 5️⃣ Animation values for swipe feedback
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  // 6️⃣ Compute percent complete for the circle
  const percent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  // 7️⃣ Function to adjust timer duration (in minutes)
  const adjustTimer = (deltaMinutes: number) => {
    if (isRunning) return; // Don't adjust while running
    
    const newMinutes = Math.max(1, Math.min(60, Math.floor(totalSeconds / 60) + deltaMinutes));
    const newTotalSeconds = newMinutes * 60;
    
    setTotalSeconds(newTotalSeconds);
    setRemainingSeconds(newTotalSeconds);
  };

  // 8️⃣ Pan gesture handler for swiping to adjust time
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translateY.value;
      scale.value = withSpring(1.05); // Slight scale up on touch
    },
    onActive: (event, context) => {
      if (!isRunning) { // Only allow adjustment when not running
        translateY.value = context.startY + event.translationY * 0.3; // Dampen the movement
        
        // Trigger time adjustment based on swipe distance
        const swipeThreshold = 50;
        if (Math.abs(event.translationY) > swipeThreshold) {
          const direction = event.translationY < 0 ? 1 : -1; // Up = increase, Down = decrease
          runOnJS(adjustTimer)(direction);
          context.startY = 0; // Reset context to prevent rapid firing
          translateY.value = 0;
        }
      }
    },
    onEnd: () => {
      translateY.value = withSpring(0); // Spring back to center
      scale.value = withSpring(1); // Return to normal scale
    }
  });

  // 9️⃣ Animated style for the timer display
  const animatedTimerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    };
  });

  // 🔟 Start timer function
  const startTimer = () => {
    // Prevent multiple intervals if Start is clicked again
    if (intervalRef.current) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          // Stop timer at 0
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1; // decrease remaining seconds by 1
      });
    }, 1000); // every 1 second
  };

  // 11️⃣ Pause timer function
  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // stop the interval
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  // 12️⃣ Reset timer function
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  // 13️⃣ Convert remaining seconds to MM:SS format
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='flex-1 px-6 py-2 bg-[#F8F8F8]'>
        <View className='flex-1 items-center justify-center'>
          <Text className="font-semibold text-black text-xl text-center mb-8">Pomodoro</Text>

          {/* Container for the circular progress and timer overlay */}
          <View style={styles.progressContainer}>
            {/* 14️⃣ Circular progress showing the percentage of completion */}
            <CircularProgress
              value={percent} // computed percent
              activeStrokeColor='#3B82F6'
              inActiveStrokeColor='#E5E7EB'
              radius={120}
              strokeWidth={8}
              // Hide the built-in progress value
              showProgressValue={false}
            />

            {/* 15️⃣ Timer display overlaid in the center of the circle with pan gesture */}
            <PanGestureHandler onGestureEvent={panGestureHandler}>
              <Animated.View style={[styles.timerOverlay, animatedTimerStyle]}>
                <Text style={styles.timerText}>
                  {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                </Text>
                <Text style={styles.statusText}>
                  {remainingSeconds === 0 ? 'Done!' : isRunning ? 'Running' : 'Paused'}
                </Text>
                {!isRunning && (
                  <Text style={styles.instructionText}>
                    Swipe up/down to adjust
                  </Text>
                )}
              </Animated.View>
            </PanGestureHandler>
          </View>





          {/* 16️⃣ Duration display */}
          <View style={styles.durationInfo}>
            <Text style={styles.durationText}>
              Duration: {Math.floor(totalSeconds / 60)} minutes
            </Text>
          </View>

          {/* 17️⃣ Buttons to start/pause/reset */}
          <View className='flex-row mt-4 gap-4'>
            <Button 
              className='w-24' 
              onPress={startTimer}
              disabled={isRunning || remainingSeconds === 0}
            >
              <Text>Start</Text>
            </Button>
            <Button 
              className='w-24' 
              variant='secondary' 
              onPress={pauseTimer}
              disabled={!isRunning}
            >
              <Text>Pause</Text>
            </Button>
            <Button 
              className='w-24' 
              variant='outline' 
              onPress={resetTimer}
            >
              <Text>Reset</Text>
            </Button>
          </View>

          {/* 18️⃣ Quick duration buttons */}
          {/* <View className='flex-row mt-4 gap-2'>
            <Button 
              className='px-3 py-1' 
              variant='outline' 
              onPress={() => !isRunning && (setTotalSeconds(15 * 60), setRemainingSeconds(15 * 60))}
              disabled={isRunning}
            >
              <Text style={{ fontSize: 12 }}>15m</Text>
            </Button>
            <Button 
              className='px-3 py-1' 
              variant='outline' 
              onPress={() => !isRunning && (setTotalSeconds(25 * 60), setRemainingSeconds(25 * 60))}
              disabled={isRunning}
            >
              <Text style={{ fontSize: 12 }}>25m</Text>
            </Button>
            <Button 
              className='px-3 py-1' 
              variant='outline' 
              onPress={() => !isRunning && (setTotalSeconds(45 * 60), setRemainingSeconds(45 * 60))}
              disabled={isRunning}
            >
              <Text style={{ fontSize: 12 }}>45m</Text>
            </Button>
            <Button 
              className='px-3 py-1' 
              variant='outline' 
              onPress={() => !isRunning && (setTotalSeconds(60 * 60), setRemainingSeconds(60 * 60))}
              disabled={isRunning}
            >
              <Text style={{ fontSize: 12 }}>60m</Text>
            </Button>
          </View> */}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Add padding to make the touch area larger
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'monospace', // Use monospace for consistent digit width
  },
  statusText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  instructionText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 6,
    textAlign: 'center',
  },
  durationInfo: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  durationText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Pomodoro;