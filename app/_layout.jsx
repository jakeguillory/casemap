import { Stack } from "expo-router"
import { Colors } from "../constants/Colors"
import { useColorScheme } from "react-native"
import { StatusBar } from "expo-status-bar"
import { UserProvider } from "../contexts/UserContext"   
import { CaseProvider } from "../contexts/CaseContext"   

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <UserProvider>
      <CaseProvider>
      <StatusBar value="auto" />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.title,
      }}>
        {/* Groups */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />

        {/* Individual Screens */}
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
      </CaseProvider>
    </UserProvider>
  )
}