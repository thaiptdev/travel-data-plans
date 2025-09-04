import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="plan/[id]" options={{ title: "Plan Details" }} />
        <Stack.Screen
          name="checkout"
          options={{ title: "Checkout", presentation: "modal" }}
        />
        <Stack.Screen
          name="confirmation"
          options={{
            title: "Order Confirmed",
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
      </Stack>
    </>
  );
}
