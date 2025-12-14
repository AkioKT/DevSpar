import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import LifeTimer from "./LifeTimer";

const AppBar = () => {
  // const [lives, setLives] = useState(3);
  return (
    <View style={[styles.appBar, { fontFamily: "Poppins-Thin" }]}>
      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={38} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.titleApp}>DevSpar</Text>
      <LifeTimer />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#020617",
    borderBottomWidth: 2, // ubah ke borderTop agar cocok untuk bottom bar
    borderColor: "#334155",
  },
  appBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  appBarRight: { flexDirection: "row", alignItems: "center" },
  livesContainer: {
    flexDirection: "row",
    gap: 5,
  },
  menuIcon: {
    color: "#fff",
    fontSize: 32,
  },
  titleContainer: {
    // width: 200,
  },
  titleApp: {
    color: "#fff",
    fontSize: 26,
    fontFamily: "Pixel-Bold",
    alignSelf: "center",
  },
});

export default AppBar;
