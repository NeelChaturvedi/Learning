import "@/global.css";
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{title: "ClickedArt"}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="choose"/>
      <Stack.Screen name="user"/>
    </Stack>
  )
}
