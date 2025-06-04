import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import "@/global.css"
import { ReactQueryProvider } from "@/providers/react-query-provider"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import "react-native-reanimated"

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <GluestackUIProvider mode="light">
        <ReactQueryProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="[groceryId]"
              options={{ headerBackTitle: "List", headerTitle: "" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ReactQueryProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
