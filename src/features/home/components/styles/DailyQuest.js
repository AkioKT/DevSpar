import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

export default StyleSheet.create({
  card: {
    backgroundColor: "#1a1f3a",
    position: "relative",
    marginBottom: 20,
    gap: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
  },
  sectionTitle: {
    color: "#f9f9f9",
    fontSize: 26 * SCALE,
    fontFamily: "Pixel-Bold",
  },
  questRow: {
    backgroundColor: "#0a0e27",
    borderRadius: 4,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  questTitle: {
    color: "#f9f9f9",
    fontFamily: "Pixel-SemiBold",
    fontSize: 16 * SCALE,
  },
  questReward: {
    color: "#f9f9f9",
    fontSize: 14 * SCALE,
    fontFamily: "Pixel-SemiBold",
  },
  questBtn: {
    backgroundColor: "#e9e9e9ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});
