import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import Login from "../src/page/Login";
import SignUp from "../src/page/SignUp";

export default function GetStarted({ navigation }) {
  const [activeTab, setActiveTab] = useState("signin"); // signin or signup

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "signin" && styles.tabActive]}
              onPress={() => setActiveTab("signin")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "signin" && styles.tabTextActive,
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "signup" && styles.tabActive]}
              onPress={() => setActiveTab("signup")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "signup" && styles.tabTextActive,
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>
              {activeTab === "signin" ? "Welcome Back!" : "Join CodeCrack"}
            </Text>
            <Text style={styles.welcomeSubtitle}>
              {activeTab === "signin"
                ? "Sign in to continue your coding journey"
                : "Start your coding adventure today!"}
            </Text>
          </View>

          {/* Conditional Rendering: Login or SignUp */}
          {activeTab === "signin" ? (
            <Login navigation={navigation} />
          ) : (
            <SignUp navigation={navigation} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
    position: "relative",
  },
  keyboardView: {
    flex: 1,
  },

  // Corner Decorations

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // Tab Navigation
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(26, 31, 58, 0.6)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.2)",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "rgba(0, 240, 255, 0.15)",
    borderWidth: 1,
    borderColor: "#00f0ff",
    shadowColor: "#00f0ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  tabText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#00f0ff",
    fontWeight: "bold",
  },

  // Welcome Section
  welcomeSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeTitle: {
    fontFamily: "monospace",
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
    textShadowColor: "#00f0ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  welcomeSubtitle: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#98c1d9",
    textAlign: "center",
  },
});
