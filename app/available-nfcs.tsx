import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type NFCCard = {
  id: string;
  uid: string;
  status: "FREE" | "RESERVED";
};

const AvailableNFCs = () => {
  const router = useRouter();
  const [nfcCards, setNfcCards] = useState<NFCCard[]>([
    { id: "1", uid: "A1B2C3D4", status: "FREE" },
    { id: "2", uid: "04A224F", status: "FREE" },
    { id: "3", uid: "9F338CB1", status: "RESERVED" },
    { id: "4", uid: "355D33F", status: "RESERVED" },
    { id: "5", uid: "1324D53", status: "FREE" },
  ]);



  const renderCard = ({ item, index }: { item: NFCCard; index: number }) => {
    const rowTint = index % 2 === 0 ? styles.rowEven : null;
    return (
      <View style={[styles.row, rowTint]}>
        <View style={[styles.cell, styles.uidCell]}>
          <Text style={styles.normalText}>{item.uid}</Text>
        </View>
        <View style={[styles.cell, styles.statusCell]}> 
          <View style={[styles.statusBadge, item.status === 'FREE' ? styles.freeBadge : styles.reservedBadge]}>
            <Text style={[styles.statusText, item.status === 'FREE' ? styles.freeText : styles.reservedText]}>{item.status}</Text>
          </View>
        </View>
        <View style={[styles.cell, styles.actionsCell]}> 
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push({pathname: '/nfc-linking', params: { uid: item.uid }})}
          >
            <Text style={styles.actionBtnText}>Link</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/dashboard")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available NFC Cards</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>Available NFC Cards</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.table, { minWidth: Math.max(SCREEN_WIDTH - 48, 600) }]}>  
              <View style={styles.headerRow}>
                <View style={[styles.headerCell, styles.uidCell]}>
                  <Text style={styles.headerText}>NFC UID</Text>
                </View>

                <View style={[styles.headerCell, styles.statusCell]}>
                  <Text style={styles.headerText}>STATUS</Text>
                </View>

                <View style={[styles.headerCell, styles.actionsCell]}>
                  <Text style={styles.headerText}>ACTION</Text>
                </View>
              </View>

              <FlatList
                data={nfcCards}
                keyExtractor={(i) => i.id}
                renderItem={renderCard}
                showsVerticalScrollIndicator={false}
                style={styles.list}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f0f0' },
  screen: { alignItems: 'center', paddingVertical: 24 },
  card: {
    width: '92%',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  title: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 12 },

  table: { flexDirection: 'column' },
  headerRow: { flexDirection: 'row', paddingVertical: 8, alignItems: 'center' },
  headerCell: { paddingHorizontal: 8, justifyContent: 'center' },
  headerText: { fontSize: 12, color: '#9e9e9e', textTransform: 'uppercase', fontWeight: '600' },

  list: { maxHeight: 360 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  rowEven: { backgroundColor: '#fafafa' },

  cell: { paddingHorizontal: 8, justifyContent: 'center' },
  uidCell: { flex: 2, alignItems: 'flex-start' },
  statusCell: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  actionsCell: { flex: 1, alignItems: 'center' },

  normalText: { fontSize: 13, color: '#333' },

  actionBtn: { backgroundColor: '#2e7d32', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 6 },
  actionBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#0E6B3B',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'center',
  },
  freeBadge: {
    backgroundColor: '#E8F5E9',
  },
  reservedBadge: {
    backgroundColor: '#FFF3E0',
  },
  freeText: {
    color: '#2E7D32',
  },
  reservedText: {
    color: '#F57C00',
  }
});

export default AvailableNFCs;
