import { LinearGradient } from "expo-linear-gradient";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayoutInner />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function RootLayoutInner() {
  const pathname = usePathname();

  const hideLayout = pathname === "/" || pathname === "/register";
  const isParentScreen =
    pathname.includes("parent_dashboard") ||
    pathname.includes("pickup_request") ||
    pathname.includes("Congestion_page") ||
    pathname.includes("childLog") ||
    pathname.includes("about");
  const mainRoute = isParentScreen ? "/parent_dashboard" : "/dashboard";

  return (
    <LinearGradient
      colors={["#0E6B3B", "#0A4F2A", "#041E12"]}
      style={styles.container}
    >
      <StatusBar style="light" />

      {!hideLayout && <Navbar mainRoute={mainRoute} />}

      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
            animation: "fade",
            animationDuration: 40,
            presentation: "card",
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              animation: "fade_from_bottom",
            }}
          />

          <Stack.Screen
            name="register"
            options={{
              animation: "fade_from_bottom",
            }}
          />

          <Stack.Screen name="dashboard" />
          <Stack.Screen name="available-nfcs" />
          <Stack.Screen name="parents-status" />
          <Stack.Screen name="student-assignment" />
          <Stack.Screen name="nfc-linking" />
          <Stack.Screen name="add-student" />
        </Stack>
      </View>

      {!hideLayout && <Footer />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
