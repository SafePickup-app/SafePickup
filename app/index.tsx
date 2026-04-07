import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import axios from "axios";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Missing fields", "Please enter your phone and password.");
      return;
    }
    try {
      setLoading(true);
      const { token } = await authService.login({ username, password });
      const role = await signIn(token);

      if (role === "ADMIN") {
        router.replace("/dashboard");
      } else if (role === "PARENT") {
        router.replace("/parent_dashboard");
      } else {
        Alert.alert("Login failed", "Unknown user role.");
      }
    } catch (err) {
      let message = "Unable to login. Please try again.";
      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data as any)?.message ||
          (err.response?.status === 401
            ? "Invalid phone or password."
            : err.message) ||
          message;
      }
      Alert.alert("Login failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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

        <Text style={styles.label}>username</Text>
        <TextInput
          style={styles.input}
          placeholder="john doe"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={username}
          onChangeText={setUsername}
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

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0E6B3B" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
      </BlurView>

      {/* <TouchableOpacity onPress={() => router.replace("/parent_dashboard")} style={{ marginTop: 20 }}>
        <Text style={styles.loginText}>Go to parent dashboard (temp button)</Text>
      </TouchableOpacity> */}
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