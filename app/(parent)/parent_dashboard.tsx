import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function ParentDashboard() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Pickup */}
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Student Pickup Request</Text>
          <Text style={styles.desc}>
            Once you arrive, tap here to request your child's school pickup.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/pickup_request")}
          >
            <Ionicons name="car" size={18} color="#0E6B3B" />
            <Text style={styles.buttonText}>Request Pickup</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Attendance */}
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Attendance Record</Text>
          <Text style={styles.desc}>
            Use this page to track your child's school entry and exit times.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/childLog")}
          >
            <Ionicons name="time" size={18} color="#0E6B3B" />
            <Text style={styles.buttonText}>View Attendance</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Congestion */}
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Congestion Overview</Text>
          <Text style={styles.desc}>
            Before arriving, you can see congestion near the school.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/Congestion_page")}
          >
            <Ionicons name="analytics" size={18} color="#0E6B3B" />
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </BlurView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
  },

  content: {
    padding: 20,
    gap: 25,
  },

  card: {
    borderRadius: 30,
    padding: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },

  desc: {
    color: "rgba(255,255,255,0.85)",
    marginBottom: 20,
    fontSize: 13,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },

  buttonText: {
    color: "#0E6B3B",
    fontWeight: "700",
  },
});
