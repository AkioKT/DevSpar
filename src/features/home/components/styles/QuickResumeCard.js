import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

const styles = StyleSheet.create({
  quickresumecard: {
    // height: "100%",
    backgroundColor: "#1a1f3a",
    marginBottom: 20,
    // padding: 10,
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
  },

  cardTitle: {
    width: "100%",
    color: "#f9f9f9",
    fontSize: 32 * SCALE,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  cardSub: {
    width: "100%",
    color: "#f9f9f9",
    fontSize: 18 * SCALE,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
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

  continueBtn: {
    width: "100%",
    backgroundColor: "#f4c713",
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
  },

  continueText: {
    color: "#000",
    fontSize: 20 * SCALE,
    fontFamily: "Pixel-Bold",
    // paddingRight: 6,
    // alignSelf: "center",
  },
});

export default styles;
