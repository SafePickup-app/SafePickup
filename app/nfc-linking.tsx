import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Table from "../components/table";
import { adminService, StudentDto } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

const NFCLinking = () => {
  const router = useRouter();
  const { uid, nfcId } = useLocalSearchParams<{ uid: string; nfcId: string }>();
  const { role } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: adminService.getAllStudents,
    enabled: role === "ADMIN",
  });

  const linkMutation = useMutation({
    mutationFn: (studentId: string | number) =>
      adminService.linkNfcToStudent(studentId, nfcId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nfc", "cards"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      Alert.alert("Success", "NFC linked to student successfully.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    },
    onError: (err: any) => {
      Alert.alert("Error", err?.response?.data?.message || err?.message || "Failed to link.");
    },
  });

  if (role && role !== "ADMIN") {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.screen}>
          <Text>Admin access required.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const students: StudentDto[] = data ?? [];
  const filtered = students.filter((s) =>
    (s.username || s.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = (student: StudentDto) => {
    if (!nfcId) {
      Alert.alert("Error", "Missing NFC id.");
      return;
    }
    Alert.alert(
      "Confirm Link",
      `Link student ${student.username || student.name} to NFC ${uid}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => linkMutation.mutate(student.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>Link student to NFC: {uid}</Text>

          <View style={styles.searchRow}>
            <TextInput
              placeholder="Find student by name"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          {isLoading ? (
            <ActivityIndicator color="#0E6B3B" style={{ marginVertical: 30 }} />
          ) : isError ? (
            <Text style={{ color: "#D32F2F", textAlign: "center" }}>
              Failed to load students.
            </Text>
          ) : (
            <Table
              title=""
              data={filtered.map((s) => ({
                id: s.id,
                name: s.username || s.name || "",
                grade: s.grade || s.Grade || "",
                _raw: s,
              }))}
              columns={[
                { key: "name", title: "NAME", flex: 2 },
                { key: "grade", title: "GRADE", flex: 1 },
                {
                  key: "action",
                  title: "ACTION",
                  flex: 2,
                  render: (item: any) => (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => handleConfirm(item._raw)}
                      disabled={linkMutation.isPending}
                    >
                      {linkMutation.isPending ? (
                        <ActivityIndicator color="#fff" size="small" />
                      ) : (
                        <Text style={styles.actionBtnText}>Confirm</Text>
                      )}
                    </TouchableOpacity>
                  ),
                },
              ]}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },

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
    margin: 20,
    flex: 1,
    alignItems: "center",
    paddingVertical: 24,
  },

  card: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },

  searchRow: { marginBottom: 18 },

  searchInput: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  actionBtn: {
    backgroundColor: "#2e7d32",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 70,
    alignItems: "center",
  },

  actionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default NFCLinking;
