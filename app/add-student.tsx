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
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

export default function AddStudentScreen() {
  const [form, setForm] = useState({
    name: "",
    grade: "",
    nationalId: "",
    latitude: "",
    longitude: "",
  });
  const { role } = useAuth();
  const queryClient = useQueryClient();

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const mutation = useMutation({
    mutationFn: adminService.registerStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      Alert.alert("Success", "Student registered successfully.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    },
    onError: (err: any) => {
      Alert.alert(
        "Error",
        err?.response?.data?.message || err?.message || "Failed to register student."
      );
    },
  });

  const handleSubmit = () => {
    if (role !== "ADMIN") {
      Alert.alert("Forbidden", "Admin access required.");
      return;
    }
    const { name, grade, nationalId, latitude, longitude } = form;
    const missing: string[] = [];
    if (!name.trim()) missing.push("Student name is required");
    if (!grade.trim()) missing.push("Grade is required");
    if (!nationalId.trim()) missing.push("National ID is required");
    if (!latitude.trim()) missing.push("School latitude is required");
    if (!longitude.trim()) missing.push("School longitude is required");
    if (missing.length > 0) {
      Alert.alert("Missing fields", missing.join("\n"));
      return;
    }
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      Alert.alert("Invalid coordinates", "Latitude/Longitude must be numbers.");
      return;
    }
    mutation.mutate({
      name,
      Grade: grade,
      NationalId: nationalId,
      SchoolLat: lat,
      SchoolLon: lon,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
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

          <Text style={styles.label}>National Id</Text>
          <TextInput
            style={styles.input}
            placeholder="1234567890"
            placeholderTextColor="#888"
            value={form.nationalId}
            onChangeText={(text) => handleChange("nationalId", text)}
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

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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