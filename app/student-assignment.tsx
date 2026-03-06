import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const SAMPLE_STUDENTS = [
  { id: '1', name: 'ahmed alzaid', grade: 'G1' },
  { id: '2', name: 'Faisal Alahassoun', grade: 'G2' },
  { id: '3', name: 'Yasir Alateeq', grade: 'G1' },
  { id: '4', name: 'Yaser Alrashid', grade: 'G3' },
  { id: '5', name: 'John doe', grade: 'G4' },
  { id: '6', name: 'ahmed alzaid', grade: 'G5' },
  { id: '7', name: 'Faisal Alahassoun', grade: 'G2' },
]

export default function StudentAssignment() {
  const params = useLocalSearchParams()
  const router = useRouter()
  const parentName = (params.name as string) || ''
  const [query, setQuery] = useState('')

  const filtered = SAMPLE_STUDENTS.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))

  const renderRow = ({ item, index }: { item: any; index: number }) => {
    const rowTint = index % 2 === 0 ? styles.rowEven : null
    return (
      <View style={[styles.row, rowTint]}>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.normalText}>{item.grade}</Text>
        </View>

        <View style={[styles.cell, styles.actionsCell]}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => {}}>
            <Text style={styles.actionBtnText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/parents-status")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>Link student to: {parentName}</Text>

          <View style={styles.searchRow}>
            <TextInput
              placeholder="find student by name"
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.table, { minWidth: Math.max(SCREEN_WIDTH - 48, 600) }]}>
              <View style={styles.headerRow}>
                <View style={[styles.headerCell, styles.nameCell]}>
                  <Text style={styles.headerText}>NAME</Text>
                </View>

                <View style={[styles.headerCell, styles.centerCell]}>
                  <Text style={styles.headerText}>GRADE</Text>
                </View>

                <View style={[styles.headerCell, styles.actionsCell]}>
                  <Text style={styles.headerText}>ACTION</Text>
                </View>
              </View>

              <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={renderRow} showsVerticalScrollIndicator={false} style={styles.list} />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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
  title: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 12 },
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

  searchRow: { marginBottom: 18 },
  searchInput: {
    width: 320,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  table: { flexDirection: 'column' },
  headerRow: { flexDirection: 'row', paddingVertical: 8, alignItems: 'center' },
  headerCell: { paddingHorizontal: 8, justifyContent: 'center' },
  headerText: { fontSize: 12, color: '#9e9e9e', textTransform: 'uppercase', fontWeight: '600' },

  list: { maxHeight: 360 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  rowEven: { backgroundColor: '#fafafa' },

  cell: { paddingHorizontal: 8, justifyContent: 'center' },
  nameCell: { flex: 2, alignItems: 'flex-start' },
  centerCell: { flex: 1, alignItems: 'center' },
  actionsCell: { flex: 1, alignItems: 'center' },

  nameText: { fontSize: 14, color: '#111' },
  normalText: { fontSize: 13, color: '#333' },

  actionBtn: { backgroundColor: '#2e7d32', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 6 },
  actionBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
})
