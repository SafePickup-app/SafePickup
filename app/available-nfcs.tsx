import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

import Table from "../components/table";
import { adminService, NfcCardDto } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

const AvailableNFCs = () => {
  const router = useRouter();
  const { role } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["nfc", "cards"],
    queryFn: adminService.getNfcCards,
    enabled: role === "ADMIN",
  });

  React.useEffect(() => {
    if (isError) {
      Alert.alert("Error", (error as Error)?.message || "Failed to load NFC cards.");
    }
  }, [isError, error]);

  if (role && role !== "ADMIN") {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.screen}>
          <Text style={{ color: "#fff" }}>Admin access required.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/dashboard")}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.screen}>
        {isLoading ? (
          <ActivityIndicator color="#fff" style={{ marginTop: 30 }} />
        ) : (
          <Table
            title="Available NFC Cards"
            data={data ?? []}
            columns={[
              {
                key: "uid",
                title: "NFC UID",
                flex: 1,
              },
              {
                key: "status",
                title: "STATUS",
                flex: 1,
                render: (item: NfcCardDto) => {
                  const isFree = String(item.status).toUpperCase() === "FREE";
                  return (
                    <View
                      style={[
                        styles.statusBadge,
                        isFree ? styles.freeBadge : styles.reservedBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          isFree ? styles.freeText : styles.reservedText,
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                  );
                },
              },
              {
                key: "action",
                title: "ACTION",
                flex: 1,
                render: (item: NfcCardDto) => (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() =>
                      router.push({
                        pathname: "/nfc-linking",
                        params: {
                          nfcId: String(item.id),
                          uid: item.uid,
                        },
                      })
                    }
                  >
                    <Text style={styles.actionBtnText}>Link</Text>
                  </TouchableOpacity>
                ),
              },
            ]}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },

  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 8,
  },

  actionBtn: {
    backgroundColor: "#2e7d32",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  actionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  statusText: { fontSize: 13, fontWeight: "600" },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  freeBadge: { backgroundColor: "#E8F5E9" },
  reservedBadge: { backgroundColor: "#FFF3E0" },
  freeText: { color: "#2E7D32" },
  reservedText: { color: "#F57C00" },
});

export default AvailableNFCs;
