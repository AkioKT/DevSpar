import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

const styles = StyleSheet.create({
  weeklyChallengeCard: {
    backgroundColor: "#1a1f3a",
    position: "relative",
    marginBottom: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
  },

  sectionTitle: {
    fontSize: 30 * SCALE,
    color: "#f9f9f9",
    fontFamily: "Pixel-Bold",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  cardSub: {
    color: "#f9f9f9",
    fontSize: 16 * SCALE,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  progressBarBg: {
    height: 14,
    backgroundColor: "#676767",
    borderRadius: 2,
    overflow: "hidden",
  },

  progressBarFill: {
    height: 14,
    backgroundColor: "#55e921",
  },

  smallText: {
    color: "#f9f9f9",
    fontSize: 16 * SCALE,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default styles;
