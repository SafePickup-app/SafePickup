import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import Table from "../../components/table";

type Student = {
  id: string;
  name: string;
  status: "APPROVED" | "REJECTED" | "NONE";
};

export default function PickupRequest() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "ahmed alzaid", status: "NONE" },
    { id: "2", name: "Faisal Alahassoun", status: "APPROVED" },
    { id: "3", name: "Yasir Alateeq", status: "REJECTED" },
    { id: "4", name: "Yaser Alrashid", status: "REJECTED" },
  ]);

  const handlePickup = async (id: string) => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setModalMessage("Please allow location access to request pickup.");
      setModalVisible(true);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const userLat = location.coords.latitude;
    const userLon = location.coords.longitude;

    /* todo: send http request: 
     * {
          parentLat: userLat,
          parentLon: userLon
        }
    */

    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "APPROVED" } : s
      )
    );
  };

  return (
    <SafeAreaView style={styles.safe}>

      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.screen}>
        <Table
          title="Request Pickup"
          data={students}
          columns={[
            {
              key: "name",
              title: "NAME",
              flex: 2.5,
            },
            {
              key: "action",
              title: "ACTION",
              flex: 1.5,
              render: (item: Student) => (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handlePickup(item.id)}
                >
                  <Text style={styles.actionText}>Pickup</Text>
                </TouchableOpacity>
              ),
            },
            {
              key: "status",
              title: "STATUS",
              flex: 1,
              render: (item: Student) => {
                if (item.status === "APPROVED")
                  return (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#2E7D32"
                    />
                  );

                if (item.status === "REJECTED")
                  return (
                    <Ionicons
                      name="close-circle"
                      size={22}
                      color="#D32F2F"
                    />
                  );

                return (
                  <Ionicons
                    name="time-outline"
                    size={22}
                    color="#999"
                  />
                );
              },
            },
          ]}
        />
      </View>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="alert-circle" size={42} color="#FF6B6B" />

            <Text style={styles.modalText}>{modalMessage}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

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
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },

  actionBtn: {
    backgroundColor: "#0E6B3B",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },

  actionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },

  modalText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
    color: "#333",
  },

  modalButton: {
    marginTop: 20,
    backgroundColor: "#0E6B3B",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});