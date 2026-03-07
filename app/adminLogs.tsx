import { StyleSheet, Text, View } from "react-native";

export default function AdminLogs() {
  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>Exit Logs</Text>

        <View style={styles.parentBox}>
          <Text>Parent: <Text style={styles.blue}>Abdullah Ali</Text></Text>
          <Text>National ID: <Text style={styles.blue}>0123456789</Text></Text>
          <Text>Phone: <Text style={styles.blue}>0512345678</Text></Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.header}>STUDENT</Text>
          <Text style={styles.header}>NFC UID</Text>
          <Text style={styles.header}>REQUEST TIME</Text>
          <Text style={styles.header}>STATUS</Text>
        </View>

        {rows.map((row, i) => (
          <View key={i} style={styles.row}>
            <Text>{row.student}</Text>
            <Text>{row.nfc}</Text>
            <Text>{row.time}</Text>
            <Text style={[styles.status, statusStyle(row.status)]}>
              {row.status}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const rows = [
  { student: "abdullah", nfc: "ASWD2478", time: "2026-02-12", status: "APPROVED" },
  { student: "abdullah", nfc: "ASWD2478", time: "2026-02-11", status: "REJECTED" },
  { student: "Ali", nfc: "JDENAP34", time: "2026-02-10", status: "FREE" },
];

const statusStyle = (status: string) => {
  if (status === "APPROVED") return { backgroundColor: "#C6E9D3" };
  if (status === "REJECTED") return { backgroundColor: "#F7C6C6" };
  return { backgroundColor: "#CFE1FF" };
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#EEF1EF",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: 800,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  parentBox: {
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  blue: {
    color: "#2A6FD6",
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  header: {
    fontWeight: "700",
    width: 150,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
});