import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  announcement: {
    backgroundColor: "#172038",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderWidth: 0.1,
    borderColor: "#f4c713",
    shadowColor: "#000",
    shadowRadius: 10,
  },
  announcementText: {
    color: "#fff",
    fontFamily: "Pixel-Bold",
  },
});

export default styles;
