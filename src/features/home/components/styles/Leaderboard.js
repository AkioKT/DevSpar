import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 380; // responsive scale

export default StyleSheet.create({
  card: {
    backgroundColor: "#1a1f3a",
    position: "relative",
    marginBottom: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 30 * SCALE,
    fontFamily: "Pixel-Bold",
    marginBottom: 10,
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  leaderIdx: {
    color: "#facc15",
    textAlign: "center",
    fontFamily: "Pixel-Bold",
    fontSize: 20 * SCALE,
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  leaderName: {
    color: "#fff",
    fontSize: 18 * SCALE,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    alignSelf: "center",
  },
  leaderXp: {
    color: "#57f149",
    fontSize: 18 * SCALE,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
