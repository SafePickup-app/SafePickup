import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SAMPLE_STUDENTS = [
  { id: "1", name: "ahmed alzaid", grade: "G1" },
  { id: "2", name: "Faisal Alahassoun", grade: "G2" },
  { id: "3", name: "Yasir Alateeq", grade: "G1" },
  { id: "4", name: "Yaser Alrashid", grade: "G3" },
  { id: "5", name: "John doe", grade: "G4" },
  { id: "6", name: "ahmed alzaid", grade: "G5" },
  { id: "7", name: "Faisal Alahassoun", grade: "G2" },
];

export default function StudentAssignment() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const parentName = (params.name as string) || "";
  const [query, setQuery] = useState("");

  const filtered = SAMPLE_STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );

  const renderRow = ({ item, index }: { item: any; index: number }) => {
    const even = index % 2 === 0;

    return (
      <View style={[styles.row, even && styles.rowEven]}>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.gradeBadge}>{item.grade}</Text>
        </View>

        <View style={[styles.cell, styles.actionsCell]}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      {/* Back Button */}
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

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={[
                styles.table,
                { minWidth: Math.max(SCREEN_WIDTH - 48, 500) },
              ]}
            >
              {/* Table Header */}
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
                keyExtractor={(i) => i.id}
                renderItem={renderRow}
                showsVerticalScrollIndicator={false}
                style={styles.list}
              />
            </View>
          </ScrollView>
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

  // backButton: {
  //   position: "absolute",
  //   top: 10,
  //   left: 20,
  //   width: 42,
  //   height: 42,
  //   backgroundColor: "rgba(255,255,255,0.15)",
  //   borderRadius: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   zIndex: 10,
  // },

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

  // card: {
  //   borderRadius: 28,
  //   padding: 20,
  //   backgroundColor: "#ffffff",
  //   overflow: "hidden",
  //   elevation: 6,
  // },

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

  searchContainer: {
    marginBottom: 18,
  },

  searchInput: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  table: {
    flexDirection: "column",
  },

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

  list: {
    maxHeight: 360,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  rowEven: {
    backgroundColor: "#fafafa",
  },

  cell: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },

  nameCell: { flex: 2 },
  centerCell: { flex: 1, alignItems: "center" },
  actionsCell: { flex: 1, alignItems: "center" },

  nameText: {
    fontSize: 14,
    color: "#111",
  },

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
  },

  actionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
