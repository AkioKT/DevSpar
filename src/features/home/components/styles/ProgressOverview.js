import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

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
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  row: {
    flexDirection: "row",
    // alignItems: "center",
    gap: 12,
    // justifyContent: "space",
  },
  smallText: {
    color: "#fff",
    fontSize: 16 * SCALE,
    fontFamily: "Pixel-Regular",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  progressBarBg: {
    width: "100%",
    height: 25,
    backgroundColor: "#0b12208f", // coklat seperti gambar
    borderRadius: 6,
    overflow: "hidden",
  },

  progressBarStriped: {
    flex: 1,
    flexDirection: "row",
  },

  stripe: {
    width: 16, // lebar garis hijau
    backgroundColor: "rgba(61, 235, 61, 1)",
    marginRight: 2, // jarak antar garis
    borderRadius: 2,
  },

  progressCover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
