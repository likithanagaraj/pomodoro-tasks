import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
// import { HiHome } from "react-icons/hi";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function TabLayout() {
  return (
    <GestureHandlerRootView className='' style={{ flex: 1 }}>

      <Tabs
        initialRouteName='index' 
        
        screenOptions={{ 
          tabBarActiveTintColor: 'black', headerShown: false, tabBarStyle: { backgroundColor: "#F7F7F7" } }}>

        <Tabs.Screen

          name="tasks"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ focused,color }) => focused? <FontAwesome name="tasks" size={21} color={color} />:<FontAwesome name="tasks" size={21} color="#969696" />,
          }}
        />
        <Tabs.Screen

          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color,focused }) =>  focused? <Ionicons name="home" size={24} color={color} />:<Ionicons name="home" size={24} color={"#969696"} />,
          }}
        />

        {/* TODO: change icon color to black on active and our unlock pi tab bar was also looking good. and add these tab bar to appykit */}
        <Tabs.Screen
          name="pomodoro"
          options={{
            title: 'Pomodoro',
            tabBarIcon: ({ color ,focused}) => focused? <FontAwesome size={24} name="clock-o" color={color} />:<FontAwesome size={24} name="clock-o" color={"#969696"} />
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
