import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Table from "../components/table";

type Student = {
  id: string;
  name: string;
  grade: string;
};

const NFCLinking = () => {
  const router = useRouter();
  const { uid } = useLocalSearchParams<{ uid: string }>();

  const [search, setSearch] = useState("");

  const [students] = useState<Student[]>([
    { id: "1", name: "ahmed alzaid", grade: "G1" },
    { id: "2", name: "Faisal Alahassoun", grade: "G2" },
    { id: "3", name: "Yasir Alateeq", grade: "G1" },
    { id: "4", name: "Yaser Alrashid", grade: "G3" },
    { id: "5", name: "John doe", grade: "G4" },
    { id: "6", name: "ahmed alzaid", grade: "G5" },
    { id: "7", name: "Faisal Alahassoun", grade: "G2" },
  ]);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = (student: Student) => {
    Alert.alert(
      "Confirm Link",
      `Link student ${student.name} to NFC ${uid}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            Alert.alert("Success", "Linked successfully.");
            router.back();
          },
        },
      ]
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

        <Text style={styles.headerTitle}>Link NFC Card</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.screen}>

        <View style={styles.card}>

          <Text style={styles.title}>
            Link student to NFC: {uid}
          </Text>

          <View style={styles.searchRow}>
            <TextInput
              placeholder="Find student by name"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          <Table
            title=""
            data={filtered}
            columns={[
              {
                key: "name",
                title: "NAME",
                flex: 2,
              },
              {
                key: "grade",
                title: "GRADE",
                flex: 1,
              },
              {
                key: "action",
                title: "ACTION",
                flex: 2,
                render: (item: Student) => (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleConfirm(item)}
                  >
                    <Text style={styles.actionBtnText}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                ),
              },
            ]}
          />

        </View>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  safe: {
    flex: 1,
  },

  screen: {
    margin: 20,
    flex: 1,
    alignItems: "center",
    paddingVertical: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 60,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
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

  searchRow: {
    marginBottom: 18,
  },

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
  },

  actionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

});

export default NFCLinking;