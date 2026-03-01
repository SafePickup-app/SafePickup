import React, { useState } from "react";
import { router } from "expo-router";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";

export default function RegisterScreen() {
    const [form, setForm] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        nationalId: "",
    });

    interface FormData {
        username: string;
        phone: string;
        email: string;
        password: string;
        nationalId: string;
    }

    const handleChange = (key: keyof FormData, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleRegister = () => {
        console.log(form);
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            {/* Switch Header */}
            <View style={styles.switchContainer}>
                <TouchableOpacity
                    style={styles.switchButton}
                    onPress={() => router.replace("/")}
                >
                    <Text style={styles.switchText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.switchButton, styles.activeSwitch]}
                >
                    <Text style={styles.activeSwitchText}>New Account</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
                <View style={styles.card}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>
                        Please enter your personal information to create new account
                    </Text>

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example: Ahmed_Yasser"
                        value={form.username}
                        onChangeText={(text) => handleChange("username", text)}
                    />

                    <Text style={styles.label}>Phone number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="05XXXXXXXX"
                        keyboardType="phone-pad"
                        value={form.phone}
                        onChangeText={(text) => handleChange("phone", text)}
                    />

                    <Text style={styles.label}>Personal email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="yasir@example.com"
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={(text) => handleChange("email", text)}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        secureTextEntry
                        value={form.password}
                        onChangeText={(text) => handleChange("password", text)}
                    />

                    <Text style={styles.label}>National ID</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={form.nationalId}
                        onChangeText={(text) => handleChange("nationalId", text)}
                    />

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerText}>Create Account</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.bottomBar}>
                <Text style={styles.bottomText}>Contact Us</Text>
                <Text style={styles.bottomText}>Terms</Text>
                <Text style={styles.bottomText}>Policy</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F9",
        justifyContent: "space-between",
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

    headerButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: "#1E8E52",
    },

    activeButton: {
        backgroundColor: "#145C32",
    },

    headerText: {
        color: "#fff",
        fontWeight: "600",
    },
    switchContainer: {
        marginTop: 60,
        alignSelf: "center",
        flexDirection: "row",
        backgroundColor: "#1E8E52",
        borderRadius: 30,
        padding: 5,
        width: "80%",
    },

    switchButton: {
        flex: 1,
        paddingVertical: 10,
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
        color: "#1E8E52",
        fontWeight: "700",
    },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 25,
        borderRadius: 20,
        padding: 25,
        elevation: 5,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
    },

    subtitle: {
        textAlign: "center",
        fontSize: 12,
        color: "gray",
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
    },

    registerButton: {
        backgroundColor: "#1E8E52",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },

    registerText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },

    footerText: {
        textAlign: "center",
        marginTop: 15,
        fontSize: 12,
    },

    link: {
        color: "#1E8E52",
        fontWeight: "bold",
    },

    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 25,
        backgroundColor: "#0E6B3B",
    },

    bottomText: {
        color: "#fff",
        fontSize: 12,
    },
});