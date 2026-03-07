import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ActionCardProps = {
  title: string;
  description: string;
  buttonText: string;
  onPress?: () => void;
};

function ActionCard({
  title,
  description,
  buttonText,
  onPress,
}: ActionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>

      <View style={styles.cardButtonRow}>
        <TouchableOpacity style={styles.cardButton} onPress={onPress}>
          <Text style={styles.cardButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DashboardPage() {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.page}>
        <View style={styles.cardsRow}>
          <ActionCard
            title="Request Student Pickup"
            description="Once you arrive, tap here to request your child’s school pickup."
            buttonText="Request"
            onPress={() => console.log("Request Pickup")}
          />

          <ActionCard
            title="Attendance Record"
            description="Use this page to track your child’s school entry and exit times."
            buttonText="View Attendance"
            onPress={() => console.log("View Attendance")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  page: {
    flex: 1,
    backgroundColor: "#EEF1EF",
    paddingHorizontal: 28,
    paddingTop: 120,
    paddingBottom: 80,
  },

  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  },

  card: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 300,
    maxWidth: 440,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 26,
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0E6B3B",
    marginBottom: 12,
  },

  cardDescription: {
    fontSize: 15,
    lineHeight: 23,
    color: "#4F6A58",
    maxWidth: 290,
    marginBottom: 32,
  },

  cardButtonRow: {
    alignItems: "flex-end",
  },

  cardButton: {
    backgroundColor: "#5FA878",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 6,
    minWidth: 120,
    alignItems: "center",
  },

  cardButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});