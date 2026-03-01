import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // بعد نجاح تسجيل الدخول:
  const handleLogin = () => {
    router.replace("/dashboard")
    // هنا تحط تحققك من السيرفر أو OTP

    };

  return (
    <SafeAreaView style={styles.container}>
      {/* Switch Header */}
      <View style={styles.switchContainer}>
        <TouchableOpacity style={[styles.switchButton, styles.activeSwitch]}>
          <Text style={styles.activeSwitchText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => router.replace("/register")}
        >
          <Text style={styles.switchText}>New Account</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Please enter your personal information to access your account
        </Text>

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="05XXXXXXXX"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Footer */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>Contact Us</Text>
        <Text style={styles.bottomText}>Terms</Text>
        <Text style={styles.bottomText}>Policy</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    justifyContent: "space-between",
  },

  switchContainer: {
    marginTop: 60,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#1E8E52",
    borderRadius: 30,
    padding: 5,
    width: "80%",
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
    color: "#1E8E52",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 25,
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },

  loginButton: {
    backgroundColor: "#1E8E52",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },

  loginText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 25,
    backgroundColor: "#0E6B3B",
  },

  bottomText: {
    color: "#fff",
    fontSize: 12,
  },
});