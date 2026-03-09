import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <LinearGradient
      colors={["#0E6B3B", "#0A4F2A", "#041E12"]}
      style={styles.container}
    >
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },

          animation: "fade", // نوع الحركة
          animationDuration: 40, // أسرع وأنعم

          presentation: "card",

          gestureEnabled: true, // يسمح بالسحب للرجوع
          fullScreenGestureEnabled: true, // سحب من أي مكان
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            animation: "fade_from_bottom",
          }}
        />        <Stack.Screen
          name="register"
          options={{
            animation: "fade_from_bottom",
          }}
        />        <Stack.Screen name="dashboard" />
        <Stack.Screen name="available-nfcs" />
        <Stack.Screen name="parents-status" />
        <Stack.Screen name="student-assignment" />
        <Stack.Screen name="nfc-linking" />
        <Stack.Screen name="add-student" />
      </Stack>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});