import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Stack } from "expo-router";
import '../global.css';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'slide_from_right',
        animationDuration: 10,
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="productDetails" options={{ headerShown: false }} />
        <Stack.Screen name="categoryView" options={{ headerShown: false }} />
        <Stack.Screen name="brandView" options={{ headerShown: false }} />
        <Stack.Screen name="sortAndFilterView" options={{ 
          headerShown: false,
          animation: 'fade_from_bottom',
          animationDuration: 300,
          }} />
        <Stack.Screen name="findClothes" options={{ 
          headerShown: false,
          animation: 'fade_from_bottom',
          animationDuration: 300,
           }} />
      </Stack>
    </GluestackUIProvider>
  );
}
