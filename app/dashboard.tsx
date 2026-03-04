import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

type CardProps = {
  title: string;
  description: string;
  buttonText: string;
  onPress?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  onPress,
}) => {
  return (
    <BlurView intensity={50} tint="light" style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>

      <TouchableOpacity style={styles.cardButton} onPress={onPress}>
        <Text style={styles.cardButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </BlurView>
  );
};

export default function Dashboard() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0E6B3B", "#0A4F2A", "#041E12"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            <Ionicons
              name="person-circle-outline"
              size={36}
              color="#fff"
            />
            <Text style={styles.userName}>Yasir Fahad</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          <Card
            title="Parent-Student Assignment"
            description="Link students to their respective parent accounts securely."
            buttonText="Manage Assignment"
            onPress={() => router.push("/parents-status")}
          />

          <Card
            title="NFC Card Assignment"
            description="Assign and manage NFC cards connected to student profiles."
            buttonText="Assign NFC Card"
            onPress={() => console.log("Assign NFC")}
          />

          <Card
            title="Parent Records & Logs"
            description="Browse and manage all registered parent accounts."
            buttonText="Explore"
            onPress={() => console.log("Explore Logs")}
          />

          <Card
            title="Add New Student"
            description="Add new students to verified parent accounts."
            buttonText="Add Student"
            onPress={() => router.push("/add-student")}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 40,
    marginBottom: 20,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },

  content: {
    paddingBottom: 30,
  },

  card: {
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 5,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "rgba(255,255,255,0.25)",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 16,
  },

  cardButton: {
    alignSelf: "flex-end",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
  },

  cardButtonText: {
    color: "#0E6B3B",
    fontSize: 13,
    fontWeight: "700",
  },
});