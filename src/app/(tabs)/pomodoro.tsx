// @ts-nocheck
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';

const Pomodoro = () => {
  // 1️⃣ Ref to store the interval ID so we can stop it later
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // 2️⃣ Total session in seconds (25 minutes)
  const [totalSeconds] = useState(25 * 60);

  // 3️⃣ Remaining seconds that will count down
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

  // 4️⃣ Timer state
  const [isRunning, setIsRunning] = useState(false);

  // 5️⃣ Compute percent complete for the circle
  const percent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  // 6️⃣ Start timer function
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

  // 7️⃣ Pause timer function
  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // stop the interval
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  // 8️⃣ Reset timer function
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  // 9️⃣ Convert remaining seconds to MM:SS format
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <SafeAreaView className='flex-1 px-6 py-2'>
      <View className='flex-1 items-center justify-center'>
        <Text className="font-semibold text-black text-xl text-center mb-8"> Pomodoro</Text>

        {/* Container for the circular progress and timer overlay */}
        <View style={styles.progressContainer}>
          {/* 10️⃣ Circular progress showing the percentage of completion */}
          <CircularProgress
            value={percent} // computed percent
            activeStrokeColor='#3B82F6'
            inActiveStrokeColor='#E5E7EB'
            radius={120}
            strokeWidth={8}
            // Hide the built-in progress value
            showProgressValue={false}
          />

          {/* 11️⃣ Timer display overlaid in the center of the circle */}
          <View style={styles.timerOverlay}>
            <Text style={styles.timerText}>
              {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </Text>
            <Text style={styles.statusText}>
              {remainingSeconds === 0 ? 'Done!' : isRunning ? 'Running' : 'Paused'}
            </Text>
          </View>
        </View>

        {/* 12️⃣ Buttons to start/pause/reset */}
        <View className='flex-row mt-8 gap-4'>
          <Button 
          variant={"secondary"}
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

        
      </View>
    </SafeAreaView>
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
  progressInfo: {
    marginTop: 16,
  },
  progressText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default Pomodoro;