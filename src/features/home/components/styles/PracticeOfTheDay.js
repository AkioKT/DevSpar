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
    fontSize: 28 * SCALE,
    marginBottom: 8,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  cardSub: {
    color: "#f9f9f9",
    fontSize: 14 * SCALE,
    marginBottom: 12,
    fontFamily: "Pixel-SemiBold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  choiceBtn: {
    width: "48%", // tetap aman karena kamu pakai gap 10
    backgroundColor: "#0b12208f",
    padding: 10 * SCALE,
    borderRadius: 4,
  },

  choiceSelected: {
    borderWidth: 1,
    borderColor: "#d53fffff",
  },

  choiceText: {
    color: "#fff",
    fontSize: 15 * SCALE,
    fontFamily: "Pixel-SemiBold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  primaryBtn: {
    backgroundColor: "#4bdd55ff",
    borderRadius: 4,
    width: "100%",
    paddingVertical: 8 * SCALE,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#121212",
    fontSize: 16 * SCALE,
    fontFamily: "Pixel-SemiBold",
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  ghostBtn: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    paddingVertical: 8 * SCALE,
    justifyContent: "center",
    alignItems: "center",
  },

  ghostBtnText: {
    color: "#fff",
    fontSize: 16 * SCALE,
    fontFamily: "Pixel-SemiBold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  correctText: {
    color: "#4ade80",
    marginTop: 8,
  },
  wrongText: {
    color: "#fb7185",
    marginTop: 8,
  },
});
