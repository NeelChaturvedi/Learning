import "@/global.css";
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tab)"/>
      <Stack.Screen name="layout"/>
      <Stack.Screen name="choose"/>
      <Stack.Screen name="user"/>
    </Stack>
  )
}
