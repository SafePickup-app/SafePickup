import { Stack, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function RootLayout() {
  const pathname = usePathname();

  const hideBars = pathname === "/" || pathname === "/register";

  return (
    <View style={styles.container}>
      {!hideBars && <Navbar userName="Yasir Fahad" />}

      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="register" />
          <Stack.Screen name="about" />
          <Stack.Screen name="homePage" />
          <Stack.Screen name="adminLogs" />
<Stack.Screen name="childLog" />
        </Stack>
      </View>

      {!hideBars && <Footer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF1EF",
  },
  content: {
    flex: 1,
  },
});