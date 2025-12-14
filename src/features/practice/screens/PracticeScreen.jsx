import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCustomFonts from "../../../hooks/useCustomFonts";
import ButtonClick from "../../../sounds/ButtonClick";
import InventoryScreen from "../components/Inventory";
import SelectMode from "../components/SelectMode";

const character = {
  1: require("../../../../assets/image/chibi-male-1.png"),
};

export default function PracticeScreen({ navigation }) {
  const goToBattleLobby = async () => {
    navigation.navigate("BattleLobby");
    ButtonClick();
  };

  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* Floating decorations */}
      <View style={styles.floatingDecorations} pointerEvents="none">
        <Text style={[styles.floatingIcon, { top: "8%", left: "10%" }]}>★</Text>
        <Text style={[styles.floatingIcon, { top: "12%", right: "15%" }]}>
          ✦
        </Text>
        <Text style={[styles.floatingIcon, { top: "75%", left: "8%" }]}>
          {"</>"}
        </Text>
        <Text style={[styles.floatingIcon, { top: "80%", right: "12%" }]}>
          ★
        </Text>
      </View>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>⚔️</Text>
          <View>
            <Text style={styles.headerTitle}>Coding Battle</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SelectMode />
        <InventoryScreen />
      </ScrollView>

      {/* Bottom CTA Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={goToBattleLobby}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#ffd700", "#ffed4e"]}
            style={styles.ctaGradient}
          >
            <View style={styles.ctaInner}>
              <Text style={styles.ctaText}>Start Coding Battle</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
    position: "relative",
  },

  /* Floating decorations */
  floatingDecorations: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  floatingIcon: {
    position: "absolute",
    color: "#ffd70033",
    fontSize: 18,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#ffd70066",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  /* Scroll */
  scrollContent: {
    padding: 20,
    // paddingHorizontal: 20,
    // paddingTop: 50,
    // paddingBottom: 20,
    zIndex: 1,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    fontSize: 36,
  },
  headerTitle: {
    fontFamily: "Pixel-Bold",
    fontSize: 28,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
  },

  /* Bottom CTA */
  bottomSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#0a0e27",
    borderTopWidth: 3,
    borderTopColor: "#3d5a80",
  },
  ctaButton: {
    borderRadius: 2,
    shadowColor: "#ffd700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  ctaGradient: {
    borderRadius: 2,
    borderWidth: 3,
    borderColor: "#000",
  },
  ctaInner: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 3,
    borderColor: "#ffffff44",
    borderBottomWidth: 0,
    borderRightWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  ctaText: {
    fontFamily: "Pixel-Bold",
    fontSize: 20,
    color: "#0a0e27",
    letterSpacing: 1,
    textShadowColor: "#ffffff66",
    textShadowOffset: { width: 1, height: 1 },
  },
});
