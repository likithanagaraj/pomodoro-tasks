import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { HiHome } from "react-icons/hi";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
    <GestureHandlerRootView className='' style={{ flex: 1 }}>

      <Tabs
        initialRouteName='index' 
        screenOptions={{ 
          tabBarActiveTintColor: 'black', headerShown: false }}>

        <Tabs.Screen

          name="tasks"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="tasks" color={color} />,
          }}
        />
        <Tabs.Screen

          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <HiHome color="#929699" size={48} />,
          }}
        />

        {/* TODO: change icon color to black on active and our unlock pi tab bar was also looking good. and add these tab bar to appykit */}
        <Tabs.Screen
          name="pomodoro"
          options={{
            title: 'Pomodoro',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="clock-o" color={color} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
