import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SAMPLE_DATA = [
  {
    id: "1",
    name: "ahmed alzaid",
    nid: "11******11",
    phone: "0512345678",
    status: "approved",
  },
  {
    id: "2",
    name: "Faisal Alahassoun",
    nid: "11******11",
    phone: "0512345678",
    status: "approved",
  },
  {
    id: "3",
    name: "Yasir Alateeq",
    nid: "11******11",
    phone: "0512345678",
    status: "approved",
  },
  {
    id: "4",
    name: "Yaser Alrashid",
    nid: "11******11",
    phone: "0512345678",
    status: "approved",
  },
  {
    id: "5",
    name: "John doe",
    nid: "11******11",
    phone: "0512345678",
    status: "Pending",
  },
  {
    id: "6",
    name: "ahmed alzaid",
    nid: "11******11",
    phone: "0512345678",
    status: "approved",
  },
  {
    id: "7",
    name: "Faisal Alahassoun",
    nid: "11******11",
    phone: "0512345678",
    status: "Pending",
  },
];

export default function ParentsLinkingHub() {
  const router = useRouter();

  const renderRow = ({ item, index }: { item: any; index: number }) => {
    const backgroundColor =
      index % 2 === 0 ? "#ffffff" : index % 2 === 1 ? "#fcfcfc" : "#f7f7f7";

    return (
      <View style={[styles.row, { backgroundColor }]}>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.normalText}>{item.nid}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.normalText}>{item.phone}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text
            style={[
              styles.statusBadge,
              item.status === "approved" ? styles.approved : styles.pending,
            ]}
          >
            {item.status}
          </Text>
        </View>

        <View style={[styles.cell, styles.actionsCell]}>
          <View style={styles.actionsColumn}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() =>
                router.push(
                  `/student-assignment?name=${encodeURIComponent(item.name)}`,
                )
              }
            >
              <Text style={styles.actionBtnText}>Link</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.actionBtnSpacing]}
            >
              <Text style={styles.actionBtnText}>History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#0E6B3B", "#0A4F2A", "#041E12"]}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/dashboard")}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Parents Assignment</Text>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <ScrollView contentContainerStyle={styles.screen}>
          <BlurView intensity={60} tint="light" style={styles.card}>
            <Text style={styles.title}>Available Parents</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  styles.table,
                  { minWidth: Math.max(SCREEN_WIDTH - 48, 900) },
                ]}
              >
                {/* Header Row */}
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

                  <View style={[styles.cell, styles.centerCell]}>
                    <Text style={styles.tableHeaderText}>STATUS</Text>
                  </View>

                  <View style={[styles.cell, styles.actionsCell]}>
                    <Text style={styles.tableHeaderText}>ACTIONS</Text>
                  </View>
                </View>

                <FlatList
                  data={SAMPLE_DATA}
                  keyExtractor={(i) => i.id}
                  renderItem={renderRow}
                  showsVerticalScrollIndicator={false}
                  style={styles.list}
                />
              </View>
            </ScrollView>
          </BlurView>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 40,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  backButton: {
    position: "absolute",
    left: 20,
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

  rowEven: {
    backgroundColor: "#fafafa",
  },

  cell: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },

  nameCell: { flex: 2 },
  centerCell: { flex: 1, alignItems: "center" },
  actionsCell: { flex: 1.6 },

  nameText: { fontSize: 14, color: "#111" },
  normalText: { fontSize: 13, color: "#333" },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
  },

  approved: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  },

  pending: {
    backgroundColor: "#fff3e0",
    color: "#ef6c00",
  },

  actionsColumn: {
    flexDirection: "column",
    alignItems: "center",
  },

  actionBtn: {
    width: "100%",
    backgroundColor: "#0E6B3B",
    borderRadius: 12,
    paddingVertical: 6,
    alignItems: "center",
  },

  actionBtnSpacing: {
    marginTop: 8,
  },

  actionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});
