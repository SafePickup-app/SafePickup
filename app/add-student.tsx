import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AddStudentScreen() {
  const [form, setForm] = useState({
    name: "",
    grade: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Student Form Data:", form);
  };

  return (
    <LinearGradient
      colors={["#0E6B3B", "#0A4F2A", "#052E1A"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/dashboard")}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerText}>Add Student</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.title}>Add New Student Account</Text>
            <Text style={styles.subtitle}>
              Please enter student's personal information
            </Text>

            <Text style={styles.label}>Student Name</Text>
            <TextInput
              style={styles.input}
              placeholder="example: abdullah"
              placeholderTextColor="#888"
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
            />

            <Text style={styles.label}>Current Grade</Text>
            <TextInput
              style={styles.input}
              placeholder="G1"
              placeholderTextColor="#888"
              value={form.grade}
              onChangeText={(text) => handleChange("grade", text)}
            />

            <Text style={styles.label}>School Latitude</Text>
            <TextInput
              style={styles.input}
              placeholder="24.7136"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={form.latitude}
              onChangeText={(text) => handleChange("latitude", text)}
            />

            <Text style={styles.label}>School Longitude</Text>
            <TextInput
              style={styles.input}
              placeholder="46.6753"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={form.longitude}
              onChangeText={(text) => handleChange("longitude", text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    marginTop: 40,
    marginBottom: 20,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },

  backButton: { position: "absolute", left: 20 },

  headerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  button: {
    backgroundColor: "#0E6B3B",
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});