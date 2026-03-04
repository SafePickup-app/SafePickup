import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/dashboard");
  };

  return (
    <LinearGradient
      colors={["#0E6B3B", "#0A4F2A", "#041E12"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

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

        {/* Glass Card */}
        <BlurView intensity={60} tint="light" style={styles.glassCard}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Enter your credentials to continue
          </Text>

          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="05XXXXXXXX"
            placeholderTextColor="rgba(255,255,255,0.6)"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Footer */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomText}>Contact Us</Text>
          <Text style={styles.bottomText}>Terms</Text>
          <Text style={styles.bottomText}>Policy</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    padding: 25,
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
    marginBottom: 25,
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

  loginButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    marginTop: 30,
  },

  loginText: {
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