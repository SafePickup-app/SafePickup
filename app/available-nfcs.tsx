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

import Table from "../components/table";

type NFCCard = {
  id: string;
  uid: string;
  status: "FREE" | "RESERVED";
};

const AvailableNFCs = () => {
  const router = useRouter();

  const [nfcCards] = useState<NFCCard[]>([
    { id: "1", uid: "A1B2C3D4", status: "FREE" },
    { id: "2", uid: "04A224F", status: "FREE" },
    { id: "3", uid: "9F338CB1", status: "RESERVED" },
    { id: "4", uid: "355D33F", status: "RESERVED" },
    { id: "5", uid: "1324D53", status: "FREE" },
  ]);

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

        <Text style={styles.headerTitle}>Available NFC Cards</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.screen}>

        <Table
          title="Available NFC Cards"
          data={nfcCards}
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
              render: (item: NFCCard) => (
                <View
                  style={[
                    styles.statusBadge,
                    item.status === "FREE"
                      ? styles.freeBadge
                      : styles.reservedBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      item.status === "FREE"
                        ? styles.freeText
                        : styles.reservedText,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              ),
            },
            {
              key: "action",
              title: "ACTION",
              flex: 1,
              render: (item: NFCCard) => (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() =>
                    router.push({
                      pathname: "/nfc-linking",
                      params: { uid: item.uid },
                    })
                  }
                >
                  <Text style={styles.actionBtnText}>Link</Text>
                </TouchableOpacity>
              ),
            },
          ]}
        />

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

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

  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  freeBadge: {
    backgroundColor: "#E8F5E9",
  },

  reservedBadge: {
    backgroundColor: "#FFF3E0",
  },

  freeText: {
    color: "#2E7D32",
  },

  reservedText: {
    color: "#F57C00",
  },
});

export default AvailableNFCs;