import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
   <GestureHandlerRootView style={{flex:1}}>
     <Tabs initialRouteName='index' screenOptions={{ tabBarActiveTintColor: 'blue' ,headerShown:false}}>
     
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
         tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
       }}
     />
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
