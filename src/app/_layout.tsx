import '@/styles/global.css';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
const InterBold = require("../../assets/fonts/InterBold.ttf");
const InterExtraBold = require("../../assets/fonts/InterExtraBold.ttf");
const InterLight = require("../../assets/fonts/InterLight.ttf");
const InterMedium = require("../../assets/fonts/InterMedium.ttf");
const InterRegular = require("../../assets/fonts/InterRegular.ttf");
const InterSemiBold = require("../../assets/fonts/InterSemiBold.ttf");
export default function RootLayout() {
  let [fontsLoaded] = useFonts({
  "InterBold": InterBold,
  "InterExtraBold": InterExtraBold,
  "InterLight": InterLight,
  "InterMedium": InterMedium,
  "InterRegular": InterRegular,
  "InterSemiBold": InterSemiBold,
});
if (!fontsLoaded) {
  return null;
}
  return (
    <Stack >
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
  )
}
