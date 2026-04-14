import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [chooseAuthVisible, setChooseAuthVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingStudentId, setPendingStudentId] = useState<string | null>(null);
  const [pendingLocation, setPendingLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const otpInputRef = useRef<TextInput>(null);

  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "ahmed alzaid", status: "NONE" },
    { id: "2", name: "Faisal Alahassoun", status: "APPROVED" },
    { id: "3", name: "Yasir Alateeq", status: "REJECTED" },
    { id: "4", name: "Yaser Alrashid", status: "REJECTED" },
  ]);

  const getPickupLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setModalMessage("Please allow location access to request pickup.");
      setModalVisible(true);
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  const requestPickup = async (id: string) => {
    const location = pendingLocation;

    if (!location) {
      setModalMessage("Location is required before requesting pickup.");
      setModalVisible(true);
      return;
    }

    /* todo: send http request: 
     * {
          parentLat: location.latitude,
          parentLon: location.longitude
        }
    */

    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "APPROVED" } : s)),
    );
  };

  const handlePickupPress = async (id: string) => {
    setPendingStudentId(id);

    const location = await getPickupLocation();

    if (!location) {
      setPendingStudentId(null);
      setPendingLocation(null);
      return;
    }

    setPendingLocation(location);
    setChooseAuthVisible(true);
  };

  const handleChooseOtp = () => {
    setChooseAuthVisible(false);
    setOtpModalVisible(true);
    setTimeout(() => otpInputRef.current?.focus(), 50);
  };

  const handleChooseFaceId = async () => {
    setChooseAuthVisible(false);

    if (!pendingStudentId) return;

    try {
      // 1. Check if device supports biometrics
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        alert("This device does not support biometric authentication.");
        return;
      }

      // 2. Check if biometrics are enrolled (Face ID / Fingerprint)
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        alert(
          "No biometric records found. Please set up Face ID or fingerprint.",
        );
        return;
      }

      // 3. Authenticate user
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify your identity",
        // fallbackLabel: "Use Passcode",
        disableDeviceFallback: true,
      });

      // 4. Only proceed if success
      if (result.success) {
        await requestPickup(pendingStudentId);
      } else {
        alert("Authentication failed. Please try again.");
        return;
      }
    } catch (error) {
      console.log(error);
      alert("Authentication error occurred.");
    } finally {
      setPendingStudentId(null);
      setPendingLocation(null);
    }
  };

  const closeOtpModal = () => {
    setOtpModalVisible(false);
    setOtp("");
    setPendingStudentId(null);
    setPendingLocation(null);
  };

  const validateOtp = async () => {
    if (otp !== "12345") {
      alert("Invalid OTP. Please try again.");
      return;
    }

    const studentId = pendingStudentId;

    setOtpModalVisible(false);
    setOtp("");

    if (!studentId) {
      return;
    }

    await requestPickup(studentId);
    setPendingStudentId(null);
    setPendingLocation(null);
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
                  onPress={() => handlePickupPress(item.id)}
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
                    <Ionicons name="close-circle" size={22} color="#D32F2F" />
                  );

                return <Ionicons name="time-outline" size={22} color="#999" />;
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

      <Modal transparent visible={chooseAuthVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, styles.chooseModalBox]}>
            <Text style={styles.modalTitle}>Verify Pickup</Text>
            <Text style={styles.modalText}>Choose how you want to verify:</Text>

            <TouchableOpacity style={styles.authCard} onPress={handleChooseOtp}>
              <View style={styles.authCardIconWrap}>
                <Ionicons name="key-outline" size={24} color="#0E6B3B" />
              </View>
              <View style={styles.authCardContent}>
                <Text style={styles.authCardTitle}>
                  One-Time Password (OTP)
                </Text>
                <Text style={styles.authCardSubtitle}>
                  A secure code sent to your mobile.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#2E7D32" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.authCard}
              onPress={handleChooseFaceId}
            >
              <View style={styles.authCardIconWrap}>
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color="#0E6B3B"
                />
              </View>
              <View style={styles.authCardContent}>
                <Text style={styles.authCardTitle}>Biometric Authentication</Text>
                <Text style={styles.authCardSubtitle}>
                  Quick facial/fingerprint verification.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#0E6B3B" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalCancelButton,
                { width: "50%", marginTop: 10 },
              ]}
              onPress={() => {
                setChooseAuthVisible(false);
                setPendingStudentId(null);
                setPendingLocation(null);
              }}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={otpModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="key" size={42} color="#0E6B3B" />

            <Text style={styles.modalTitle}>Enter OTP</Text>
            <Text style={styles.modalText}>
              Please enter the 5-digit OTP to proceed with pickup request.
            </Text>

            <TouchableOpacity
              activeOpacity={1}
              style={styles.otpBoxContainer}
              onPress={() => otpInputRef.current?.focus()}
            >
              {[0, 1, 2, 3, 4].map((index) => (
                <View key={index} style={styles.otpBox}>
                  <Text style={styles.otpDigit}>{otp[index] || ""}</Text>
                </View>
              ))}
            </TouchableOpacity>

            <TextInput
              ref={otpInputRef}
              style={styles.otpInputHidden}
              value={otp}
              onChangeText={(text) => {
                if (/^[0-9]*$/.test(text)) setOtp(text);
              }}
              keyboardType="numeric"
              maxLength={5}
              autoFocus={false}
            />

            <Text style={styles.resendRow}>
              Didn’t get the code?{" "}
              <Text
                style={styles.resendLink}
                onPress={() => {
                  setOtp("");
                  alert("Code resent. Please check your SMS.");
                }}
              >
                Click to resend
              </Text>
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={closeOtpModal}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={validateOtp}
              >
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
    marginBottom: 8,
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
  modalCancelButton: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelText: {
    color: "#666",
    fontWeight: "600",
  },
  modalConfirmButton: {
    backgroundColor: "#0E6B3B",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalConfirmText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
  },
  chooseModalBox: {
    backgroundColor: "#ffffff",
    borderColor: "#C6F6D5",
    borderWidth: 1,
  },
  authCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F0FFF4",
    borderColor: "#0E6B3B",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  authCardIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#D9F9E5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  authCardContent: {
    flex: 1,
  },
  authCardTitle: {
    color: "#0E6B3B",
    fontWeight: "700",
    fontSize: 14,
  },
  authCardSubtitle: {
    color: "#335846",
    fontSize: 12,
    marginTop: 2,
  },
  otpBoxContainer: {
    width: "100%",
    maxWidth: 320,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  otpBox: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: "#0E6B3B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f9fc",
  },
  otpDigit: {
    color: "#0E6B3B",
    fontSize: 20,
    fontWeight: "700",
  },
  otpInputHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
    left: -1000,
  },
  resendRow: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 15,
  },
  resendLink: {
    color: "#0E6B3B",
    fontWeight: "700",
  },
});
