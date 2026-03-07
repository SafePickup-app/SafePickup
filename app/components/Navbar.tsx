import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NavbarProps = {
  userName?: string;
};

export default function Navbar({ userName = "Yasir Fahad" }: NavbarProps) {
  const pathname = usePathname();

  const goMain = () => {
    router.push("/homePage" as any);
  };

  const goAbout = () => {
    router.push("/about" as any);
  };

  const isMain = pathname === "/homePage";
  const isAbout = pathname === "/about";

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <View style={styles.leftSection}>
          <Ionicons name="chevron-down" size={18} color="#FFFFFF" />
          <Text style={styles.userName}>{userName}</Text>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="#FFFFFF"
            style={styles.avatar}
          />
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={goAbout} style={styles.tab} activeOpacity={0.8}>
            <Text style={[styles.tabText, isAbout && styles.activeText]}>about</Text>
            {isAbout && <View style={styles.underline} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={goMain} style={styles.tab} activeOpacity={0.8}>
            <Text style={[styles.tabText, isMain && styles.activeText]}>main</Text>
            {isMain && <View style={styles.underline} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  navbar: {
    backgroundColor: "#0E6B3B",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  avatar: {
    marginLeft: 8,
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  tab: {
    alignItems: "center",
    minWidth: 40,
  },
  tabText: {
    color: "#D8E6DC",
    fontSize: 13,
    fontWeight: "600",
  },
  activeText: {
    color: "#FFFFFF",
  },
  underline: {
    marginTop: 4,
    width: 35,
    height: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
});