import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      
      {/* Vision 2030 Logo */}
    

      {/* Links */}
      <View style={styles.links}>
        <TouchableOpacity  // onPress={() => router.push("/contact")} -------we will add later 
        >
          <Text style={styles.link}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity   // onPress={() => router.push("/terms")} -------we will add later 
        >
          <Text style={styles.link}>Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity  // onPress={() => router.push("/policy")} -------we will add later  
        
        >
          <Text style={styles.link}>Policy</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#0E6B3B",
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 110,
    height: 40,
  },

  links: {
    flexDirection: "row",
    gap: 25,
  },

  link: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});