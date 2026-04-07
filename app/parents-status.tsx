import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { adminService, ParentForAssignment } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ParentsLinkingHub() {
  const router = useRouter();
  const { role } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["parents", "assignment"],
    queryFn: adminService.getParentsForAssignment,
    enabled: role === "ADMIN",
  });

  React.useEffect(() => {
    if (isError) {
      Alert.alert("Error", (error as Error)?.message || "Failed to load parents.");
    }
  }, [isError, error]);

  if (role && role !== "ADMIN") {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Admin access required.</Text>
      </SafeAreaView>
    );
  }

  const renderRow = ({ item, index }: { item: ParentForAssignment; index: number }) => {
    const backgroundColor = index % 2 === 0 ? "#ffffff" : "#fcfcfc";

    return (
      <View style={[styles.row, { backgroundColor }]}>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.nameText}>{item.username}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.normalText}>{item.nationalId}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.normalText}>{item.phone}</Text>
        </View>

        <View style={[styles.cell, styles.actionsCell]}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              router.push({
                pathname: "/student-assignment",
                params: {
                  parentId: String(item.id),
                  name: item.username,
                },
              })
            }
          >
            <Text style={styles.actionBtnText}>Link</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/dashboard")}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <ScrollView contentContainerStyle={styles.screen}>
          <BlurView intensity={60} tint="light" style={styles.card}>
            <Text style={styles.title}>Available Parents</Text>

            {isLoading ? (
              <ActivityIndicator color="#0E6B3B" style={{ marginVertical: 30 }} />
            ) : isError ? (
              <Text style={{ color: "#D32F2F", textAlign: "center" }}>
                Failed to load parents.
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={[
                    styles.table,
                    { minWidth: Math.max(SCREEN_WIDTH - 48, 800) },
                  ]}
                >
                  <View style={styles.headerRow}>
                    <View style={[styles.cell, styles.nameCell]}>
                      <Text style={styles.tableHeaderText}>NAME</Text>
                    </View>

                    <View style={[styles.cell, styles.centerCell]}>
                      <Text style={styles.tableHeaderText}>NATIONAL ID</Text>
                    </View>

                    <View style={[styles.cell, styles.centerCell]}>
                      <Text style={styles.tableHeaderText}>PHONE</Text>
                    </View>

                    <View style={[styles.cell, styles.actionsCell]}>
                      <Text style={styles.tableHeaderText}>ACTIONS</Text>
                    </View>
                  </View>

                  <FlatList
                    data={data ?? []}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderRow}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                  />
                </View>
              </ScrollView>
            )}
          </BlurView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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

  card: {
    borderRadius: 28,
    padding: 20,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    elevation: 6,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0E6B3B",
    marginBottom: 18,
  },

  table: { flexDirection: "column" },

  headerRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },

  tableHeaderText: {
    fontSize: 12,
    color: "#757575",
    textTransform: "uppercase",
    fontWeight: "600",
  },

  list: { maxHeight: 420 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  cell: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },

  nameCell: { flex: 2 },
  centerCell: { flex: 1.5, alignItems: "center" },
  actionsCell: { flex: 1.2, alignItems: "center" },

  nameText: { fontSize: 14, color: "#111" },
  normalText: { fontSize: 13, color: "#333" },

  actionBtn: {
    backgroundColor: "#0E6B3B",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  actionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});
