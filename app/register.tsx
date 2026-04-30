import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import axios from "axios";
import { authService } from "../services/authService";

export default function RegisterScreen() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    nationalId: "",
  });

  interface FormData {
    username: string;
    phone: string;
    email: string;
    password: string;
    nationalId: string;
  }

  const handleChange = (key: keyof FormData, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { username, phone, email, password, nationalId } = form;
    const missing: string[] = [];
    if (!username.trim()) missing.push("Name is required");
    if (!phone.trim()) missing.push("Phone number is required");
    if (!email.trim()) missing.push("Email is required");
    if (!password.trim()) missing.push("Password is required");
    if (!nationalId.trim()) missing.push("National ID is required");
    if (missing.length > 0) {
      Alert.alert("Missing fields", missing.join("\n"));
      return;
    }
    try {
      setLoading(true);
      const { message } = await authService.registerParent(form);
      Alert.alert("Success", message || "Account created successfully.", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (err) {
      let msg = "Unable to register. Please try again.";
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as any;
        if (data?.message) {
          msg = data.message;
        } else if (data && typeof data === "object") {
          const messages = Object.values(data).filter(Boolean);
          if (messages.length > 0) msg = messages.join("\n");
        } else {
          msg = err.message || msg;
        }
      }
      Alert.alert("Registration failed", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Switch Header */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.switchText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.switchButton, styles.activeSwitch]}>
          <Text style={styles.activeSwitchText}>New Account</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <BlurView intensity={60} tint="light" style={styles.glassCard}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Please enter your information.
          </Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="example: Ahmed_Yasser"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={form.username}
            onChangeText={(text) => handleChange("username", text)}
          />

          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="05XXXXXXXX"
            placeholderTextColor="rgba(255,255,255,0.6)"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
          />

          <Text style={styles.label}>Personal email</Text>
          <TextInput
            style={styles.input}
            placeholder="yasir@example.com"
            placeholderTextColor="rgba(255,255,255,0.6)"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
          />

          <Text style={styles.label}>National ID</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="10-digit ID"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={form.nationalId}
            onChangeText={(text) => handleChange("nationalId", text)}
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0E6B3B" />
            ) : (
              <Text style={styles.registerText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </BlurView>
      </ScrollView>

      {/* Footer */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>Contact Us</Text>
        <Text style={styles.bottomText}>Terms</Text>
        <Text style={styles.bottomText}>Policy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  switchContainer: {
    marginTop: 60,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 30,
    padding: 5,
    width: "90%",
  },

  switchButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },

  activeSwitch: {
    backgroundColor: "#fff",
  },

  switchText: {
    color: "#fff",
    fontWeight: "600",
  },

  activeSwitchText: {
    color: "#0E6B3B",
    fontWeight: "700",
  },

  glassCard: {
    borderRadius: 30,
    marginTop: 12,
    padding: 20,
    marginHorizontal: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 5,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "600",
    color: "#fff",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    color: "#fff",
  },

  registerButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    marginTop: 30,
  },

  registerText: {
    color: "#0E6B3B",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 25,
  },

  bottomText: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
  },
});