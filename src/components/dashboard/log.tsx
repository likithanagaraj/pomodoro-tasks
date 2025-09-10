import { useData } from '@/hooks/getData';
import { Text, View } from 'react-native';

const PomodoroLog = () => {
  const { pomodoroData } = useData();

  const formatTime = (timestamp) => {
    try {
      // Handle ISO format
      if (timestamp.includes('T')) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      }
      // Handle custom format "22-37-41-1-9-2025"
      else if (timestamp.includes('-')) {
        const parts = timestamp.split('-');
        if (parts.length === 6) {
          return `${parts[0]}:${parts[1]}`;
        }
      }
      return timestamp;
    } catch (error) {
      return timestamp;
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  return (
    <View className="flex-1 bg-gray-50 px-5 pt-5">
      <Text className="text-3xl font-bold text-gray-900 mb-5">Today's log</Text>
      
      
        {pomodoroData.map((session, index) => (
          <View key={session.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            {/* Session Header */}
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center">
                <View className={`w-2 h-2 rounded-full mr-2 ${
                  session.mode === 'work' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <Text className="text-sm font-medium text-gray-700 capitalize">
                  {session.mode}
                </Text>
              </View>
              <Text className="text-base font-semibold text-gray-900">
                {formatDuration(session.duration)}
              </Text>
            </View>
            
            {/* Time Row */}
            <View className="flex-row items-center">
              <View className="flex-1 items-center">
                <Text className="text-xs font-normal text-gray-500 mb-1">Started</Text>
                <Text className="text-sm font-medium text-gray-900">
                  {formatTime(session.startedAt)}
                </Text>
              </View>
              
              <View className="w-px h-8 bg-gray-200 mx-4" />
              
              <View className="flex-1 items-center">
                <Text className="text-xs font-normal text-gray-500 mb-1">Ended</Text>
                <Text className="text-sm font-medium text-gray-900">
                  {formatTime(session.completedAt)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        
       
      
    </View>
  );
};

export default PomodoroLog;