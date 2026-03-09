import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Table from "../../components/table";

type Student = {
  id: string;
  name: string;
  congestion: "LOW" | "MID" | "HIGH" | "NONE";
};

export default function CongestionScreen() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "ahmed alzaid", congestion: "NONE" },
    { id: "2", name: "Faisal Alahassoun", congestion: "LOW" },
    { id: "3", name: "Yasir Alateeq", congestion: "HIGH" },
    { id: "4", name: "Yaser Alrashid", congestion: "MID" },
  ]);

  const checkCongestion = (id: string) => {
    const levels = ["LOW", "MID", "HIGH"] as const;
    const random = levels[Math.floor(Math.random() * levels.length)];

    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, congestion: random } : s
      )
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.userRow}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
          <Text style={styles.userName}>Yasir Fahad</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      {/* Table */}
      <View style={styles.screen}>
        <Table
          title="Check Congestion"
          data={students}
          columns={[
            {
              key: "name",
              title: "NAME",
              flex: 2.5,
            },
            {
              key: "action",
              title: "ACTION",
              flex: 1.5,
              render: (item: Student) => (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => checkCongestion(item.id)}
                >
                  <Text style={styles.actionText}>Check</Text>
                </TouchableOpacity>
              ),
            },
            {
              key: "congestion",
              title: "CONGESTION",
              flex: 1,
              render: (item: Student) => {
                if (item.congestion === "LOW")
                  return (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#2E7D32"
                    />
                  );

                if (item.congestion === "MID")
                  return (
                    <Ionicons
                      name="alert-circle"
                      size={22}
                      color="#F9A825"
                    />
                  );

                if (item.congestion === "HIGH")
                  return (
                    <Ionicons
                      name="close-circle"
                      size={22}
                      color="#D32F2F"
                    />
                  );

                return (
                  <Ionicons
                    name="time-outline"
                    size={22}
                    color="#999"
                  />
                );
              },
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  header: {
    marginTop: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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

  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },

  actionBtn: {
    backgroundColor: "#0E6B3B",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },

  actionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});