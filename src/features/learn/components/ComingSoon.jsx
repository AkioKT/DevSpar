import { View, Text } from "react-native";
export default function ComingSoon() {
  return (
    <View
      style={{
        backgroundColor: "#25283d",
        width: "100%",
        padding: 20,
        borderWidth: 2,
        borderColor: "#585e6b",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#c3c9d6ff",
          fontFamily: "Pixel-Bold",
          fontSize: 16,
        }}
      >
        Coming soon
      </Text>
      <Text
        style={{
          color: "#dea617",
          fontFamily: "Pixel-Bold",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        More Challenging Level
      </Text>
    </View>
  );
}
