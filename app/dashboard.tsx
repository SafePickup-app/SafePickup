import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>

      <TouchableOpacity style={styles.cardButton} onPress={onPress}>
        <Text style={styles.cardButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userRow}>
          <Ionicons name="person-circle-outline" size={34} color="#fff" />
          <Text style={styles.userName}>Yasir Fahad</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Card
          title="Parent-Student Assignment"
          description="Link students to their respective parent accounts securely."
          buttonText="Manage Assignment"
          onPress={() => console.log("Manage Assignment")}
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
          onPress={() => console.log("Add Student")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  header: {
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#0E6B3B",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E8E52",
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 14,
  },

  cardButton: {
    alignSelf: "flex-end",
    backgroundColor: "#1E8E52",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  cardButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});