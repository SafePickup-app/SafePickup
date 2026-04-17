import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Table from "../../components/table";
import { MyStudentDto, parentService } from "../../services/parentService";

type StudentRow = MyStudentDto & {
  status: "APPROVED" | "REJECTED" | "NONE";
};

export default function PickupRequest() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [chooseAuthVisible, setChooseAuthVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingStudentId, setPendingStudentId] = useState<number | null>(null);
  const pendingLocationRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const otpInputRef = useRef<TextInput>(null);

  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  // Loading states for buttons
  const [pickupLoadingId, setPickupLoadingId] = useState<number | null>(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await parentService.getMyStudents();
        setStudents(data.map((s) => ({ ...s, status: "NONE" })));
      } catch {
        setModalMessage("Failed to load students.");
        setModalVisible(true);
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, []);

  const getPickupLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setModalMessage("Please allow location access to request pickup.");
      setModalVisible(true);
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  const handlePickupPress = async (id: number) => {
    pendingLocationRef.current = null;
    setPendingStudentId(id);
    setPickupLoadingId(id);

    try {
      const location = await getPickupLocation();

      if (!location) {
        setPendingStudentId(null);
        return;
      }

      pendingLocationRef.current = location;

      // Create exit log before showing auth modal
      console.log("lat:"+ location.latitude + "lon:"+ location.longitude);
      await parentService.pickupRequest(id, {
        parentLat: location.latitude,
        parentLon: location.longitude,
      });

      setChooseAuthVisible(true);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to request pickup. Please try again.";
      Alert.alert("Error", msg);
      setPendingStudentId(null);
      pendingLocationRef.current = null;
    } finally {
      setPickupLoadingId(null);
    }
  };

  const handleChooseOtp = async () => {
    setChooseAuthVisible(false);
    setSendingOtp(true);
    setOtpModalVisible(true);

    try {
      await parentService.sendOtp();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send OTP. Please try again.";
      Alert.alert("Error", msg);
    } finally {
      setSendingOtp(false);
      setTimeout(() => otpInputRef.current?.focus(), 50);
    }
  };

  const handleResendOtp = async () => {
    setSendingOtp(true);
    try {
      await parentService.sendOtp();
      Alert.alert("OTP Sent", "A new code has been sent to your mobile.");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to resend OTP. Please try again.";
      Alert.alert("Error", msg);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleChooseFaceId = async () => {
    setChooseAuthVisible(false);

    if (!pendingStudentId) return;

    setBiometricLoading(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert(
          "Error",
          "This device does not support biometric authentication.",
        );
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          "Error",
          "No biometric records found. Please set up Face ID or fingerprint.",
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify your identity",
        disableDeviceFallback: true,
      });

      if (result.success) {
        await parentService.verifyBiometric();
        setStudents((prev) =>
          prev.map((s) =>
            s.id === pendingStudentId ? { ...s, status: "APPROVED" } : s,
      ),
    );
  } else {
    Alert.alert("Error", "Authentication failed. Please try again.");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Authentication error occurred.";
      Alert.alert("Error", msg);
    } finally {
      setBiometricLoading(false);
      setPendingStudentId(null);
      pendingLocationRef.current = null;
    }
  };

  const closeOtpModal = () => {
    setOtpModalVisible(false);
    setOtp("");
    setPendingStudentId(null);
    pendingLocationRef.current = null;
  };

  const validateOtp = async () => {
    const studentId = pendingStudentId;
    if (!studentId) return;

    setVerifyingOtp(true);
    try {
      await parentService.verifyOtp(Number(otp));

      setOtpModalVisible(false);
      setOtp("");

      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId ? { ...s, status: "APPROVED" } : s,
        ),
      );
      Alert.alert("Success", "Pickup request submitted successfully.");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid OTP. Please try again.";
      Alert.alert("Error", msg);
    } finally {
      setVerifyingOtp(false);
      setPendingStudentId(null);
      pendingLocationRef.current = null;
    }
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
        {loadingStudents ? (
          <ActivityIndicator size="large" color="#0E6B3B" />
        ) : (
          <Table
            title="Request Pickup"
            data={students}
            columns={[
              {
                key: "username",
                title: "NAME",
                flex: 2.5,
              },
              {
                key: "action",
                title: "ACTION",
                flex: 1.5,
                render: (item: StudentRow) => (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handlePickupPress(item.id)}
                    disabled={pickupLoadingId === item.id}
                  >
                    {pickupLoadingId === item.id ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.actionText}>Pickup</Text>
                    )}
                  </TouchableOpacity>
                ),
              },
              {
                key: "status",
                title: "STATUS",
                flex: 1,
                render: (item: StudentRow) => {
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

                  return (
                    <Ionicons name="time-outline" size={22} color="#999" />
                  );
                },
              },
            ]}
          />
        )}
      </View>

      {/* Error Modal */}
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

      {/* Auth Method Chooser Modal */}
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
                <Text style={styles.authCardTitle}>
                  Biometric Authentication
                </Text>
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
                pendingLocationRef.current = null;
              }}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* OTP Modal */}
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
              Didn't get the code?{" "}
              {sendingOtp ? (
                <ActivityIndicator size="small" color="#0E6B3B" />
              ) : (
                <Text style={styles.resendLink} onPress={handleResendOtp}>
                  Click to resend
                </Text>
              )}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={closeOtpModal}
                disabled={verifyingOtp}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalConfirmButton,
                  !otp && styles.modalConfirmButtonDisabled,
                ]}
                onPress={validateOtp}
                disabled={!otp || verifyingOtp}
              >
                {verifyingOtp ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.modalConfirmText}>Confirm</Text>
                )}
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
    minWidth: 70,
    alignItems: "center",
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
    minWidth: 90,
    alignItems: "center",
  },
  modalConfirmButtonDisabled: {
    opacity: 0.5,
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
