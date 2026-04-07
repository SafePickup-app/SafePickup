import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

type NavbarProps = {
  userName?: string;
  mainRoute?: string;
};

export default function Navbar({
  userName,
  mainRoute = "/dashboard",
}: NavbarProps) {
  const { username, signOut } = useAuth();
  const displayName = userName ?? username ?? "User";
  const pathname = usePathname();

  const goMain = () => {
    router.push(mainRoute as any);
  };

  const goAbout = () => {
    router.push("/about" as any);
  };

  const isMain = pathname === mainRoute;
  const isAbout = pathname === "/about";

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <View style={styles.leftSection}>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="#FFFFFF"
            style={styles.avatar}
          />
          <Text style={styles.userName}>{displayName}</Text>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={async () => {
              await signOut();
              router.replace("/");
            }}
          >
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={goMain}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, isMain && styles.activeText]}>
              main
            </Text>
            {isMain && <View style={styles.underline} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
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
    marginBottom: 10,
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
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 8,
  },
});
