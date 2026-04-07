import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

import Table from "../components/table";
import { adminService, AdminLogDto } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

export default function AdminLogs() {
  const router = useRouter();
  const { role } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "logs"],
    queryFn: adminService.getAdminLogs,
    enabled: role === "ADMIN",
  });

  React.useEffect(() => {
    if (isError) {
      Alert.alert("Error", (error as Error)?.message || "Failed to load logs.");
    }
  }, [isError, error]);

  if (role && role !== "ADMIN") {
    return (
      <View style={styles.page}>
        <View style={styles.screen}>
          <Text style={{ color: "#fff" }}>Admin access required.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.screen}>
        {isLoading ? (
          <ActivityIndicator color="#fff" style={{ marginTop: 30 }} />
        ) : (
          <Table
            title="Exit Logs"
            data={data ?? []}
            columns={[
              { key: "studentName", title: "STUDENT", flex: 2 },
              { key: "nfcUid", title: "NFC UID", flex: 2 },
              { key: "requestTime", title: "REQUEST TIME", flex: 2 },
              {
                key: "status",
                title: "STATUS",
                flex: 1,
                render: (item: AdminLogDto) => {
                  const s = String(item.status).toUpperCase();
                  if (s === "APPROVED")
                    return <Ionicons name="checkmark-circle" size={22} color="#2E7D32" />;
                  if (s === "REJECTED")
                    return <Ionicons name="alert-circle" size={22} color="#D32F2F" />;
                  return <Ionicons name="time-outline" size={22} color="#999" />;
                },
              },
            ]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },

  header: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
});
