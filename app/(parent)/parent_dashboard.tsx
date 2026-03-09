import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ParentDashboard() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userRow}>
          <Ionicons name="person-circle-outline" size={36} color="#fff" />
          <Text style={styles.userName}>Yasir Fahad</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="log-out-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Pickup */}
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Student Pickup Request</Text>
          <Text style={styles.desc}>
            Once you arrive, tap here to request your child's school pickup.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push("/pickup_request")}>
            <Ionicons name="car" size={18} color="#0E6B3B" />
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Attendance */}
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Attendance Record</Text>
          <Text style={styles.desc}>
            Use this page to track your child's school entry and exit times.
          </Text>

          <TouchableOpacity style={styles.button}>
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

          <TouchableOpacity style={styles.button} onPress={() => router.push("/Congestion_page")}>
            <Ionicons name="analytics" size={18} color="#0E6B3B" />
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </BlurView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

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