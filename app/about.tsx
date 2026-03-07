import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onPress: () => void;
};

function FaqItem({ question, answer, isOpen, onPress }: FaqItemProps) {
  return (
    <View style={styles.faqItem}>
      <TouchableOpacity style={styles.faqHeader} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={18}
          color="#111111"
        />
      </TouchableOpacity>

      {isOpen && <Text style={styles.faqAnswer}>{answer}</Text>}
    </View>
  );
}

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "Is safePickup available for all schools?",
      answer:
        "SafePickup is available for schools that integrate the system into their dismissal process.",
    },
    {
      question: "How does SafePickup protect my data?",
      answer:
        "SafePickup protects data by using secure authentication, controlled access, and traceable pickup records.",
    },
    {
      question: "Can a parent track pickup history?",
      answer:
        "Yes. Parents can view previous pickup activity and monitor the pickup history linked to their account.",
    },
    {
      question: "Can a parent cancel a pickup request?",
      answer:
        "Yes. A parent can cancel the request before the dismissal process is completed, depending on school policy.",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.page}>
        <View style={styles.contentBox}>
          <Text style={styles.mainTitle}>about us</Text>
          <Text style={styles.paragraph}>
            SafePickup system is a smart student pickup management system that uses
            NFC technology to ensure secure and organized school dismissal.
          </Text>

          <Text style={styles.sectionTitle}>Our goal</Text>
          <Text style={styles.paragraph}>
            Our goal is to prevent unauthorized pickups, reduce congestion, and
            provide a fully traceable exit process.
          </Text>

          <View style={styles.faqList}>
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onPress={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </View>
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
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 70,
  },

  contentBox: {
    width: "100%",
    maxWidth: 760,
    alignItems: "center",
  },

  mainTitle: {
    fontSize: 38,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 14,
    textTransform: "lowercase",
  },

  sectionTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111111",
    marginTop: 22,
    marginBottom: 14,
  },

  paragraph: {
    fontSize: 17,
    lineHeight: 28,
    color: "#767676",
    textAlign: "center",
    maxWidth: 700,
    marginBottom: 8,
  },

  faqList: {
    width: "100%",
    marginTop: 34,
  },

  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
    paddingVertical: 16,
  },

  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#111111",
  },

  faqAnswer: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 24,
    color: "#6F6F6F",
    paddingRight: 28,
  },
});