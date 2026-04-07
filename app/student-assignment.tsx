import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import  {ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService, StudentDto } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function StudentAssignment() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const parentName = (params.name as string) || "";
  const parentId = Number(params.parentId);
  const [query, setQuery] = useState("");
  const { role } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: adminService.getAllStudents,
    enabled: role === "ADMIN",
  });

  const linkMutation = useMutation({
    mutationFn: (studentId: number) =>
      adminService.linkParentToStudent(parentId!, studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents", "assignment"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      Alert.alert("Success", "Student linked to parent successfully.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    },
    onError: (err: any) => {
      Alert.alert("Error", err?.response?.data?.message || err?.message || "Failed to link.");
    },
  });

  if (role && role !== "ADMIN") {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Admin access required.</Text>
      </SafeAreaView>
    );
  }

  const students: StudentDto[] = data ?? [];
  const filtered = students.filter((s) => {
    const name = (s.username || s.name || "").toLowerCase();
    return name.includes(query.toLowerCase());
  });

  const renderRow = ({ item, index }: { item: StudentDto; index: number }) => {
    const even = index % 2 === 0;
    const name = item.username || item.name || "";
    const grade = item.grade || item.Grade || "";

    return (
      <View style={[styles.row, even && styles.rowEven]}>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.gradeBadge}>{grade}</Text>
        </View>

        <View style={[styles.cell, styles.actionsCell]}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              if (!parentId) {
                Alert.alert("Error", "Missing parent id.");
                return;
              }
              linkMutation.mutate(Number(item.id));
            }}
            disabled={linkMutation.isPending}
          >
            {linkMutation.isPending ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.actionBtnText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Link student to:
            <Text style={styles.parentName}> {parentName}</Text>
          </Text>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Find student by name"
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>

          {isLoading ? (
            <ActivityIndicator color="#0E6B3B" style={{ marginVertical: 30 }} />
          ) : isError ? (
            <Text style={{ color: "#D32F2F", textAlign: "center" }}>
              Failed to load students.
            </Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  styles.table,
                  { minWidth: Math.max(SCREEN_WIDTH - 48, 500) },
                ]}
              >
                <View style={styles.headerRow}>
                  <View style={[styles.cell, styles.nameCell]}>
                    <Text style={styles.tableHeaderText}>NAME</Text>
                  </View>

                  <View style={[styles.cell, styles.centerCell]}>
                    <Text style={styles.tableHeaderText}>GRADE</Text>
                  </View>

                  <View style={[styles.cell, styles.actionsCell]}>
                    <Text style={styles.tableHeaderText}>ACTION</Text>
                  </View>
                </View>

                <FlatList
                  data={filtered}
                  keyExtractor={(i) => String(i.id)}
                  renderItem={renderRow}
                  showsVerticalScrollIndicator={false}
                  style={styles.list}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    borderRadius: 28,
    padding: 20,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  backButton: {
    top: 0,
    left: 20,
    width: 38,
    height: 38,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 18,
  },

  parentName: {
    color: "#0E6B3B",
    fontWeight: "700",
  },

  searchContainer: { marginBottom: 18 },

  searchInput: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
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

  list: { maxHeight: 360 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  rowEven: { backgroundColor: "#fafafa" },

  cell: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },

  nameCell: { flex: 2 },
  centerCell: { flex: 1, alignItems: "center" },
  actionsCell: { flex: 1, alignItems: "center" },

  nameText: { fontSize: 14, color: "#111" },

  gradeBadge: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
  },

  actionBtn: {
    backgroundColor: "#0E6B3B",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center", // Added to center the text perfectly
  },

  actionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
