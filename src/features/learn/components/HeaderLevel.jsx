import LifeTimer from "../../../componentsglobal/LifeTimer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function HeaderLevel({ title }) {
  const navigation = useNavigation(); // ⬅️ Ambil objek navigation tanpa props
  const backPage = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.unitHeader}>
      <View style={styles.unitSubHeader}>
        <TouchableOpacity>
          <Ionicons
            name="chevron-back"
            size={28}
            color="#fff"
            onPress={backPage}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.unitTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.livesContainer}>
        <LifeTimer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  unitHeader: {
    backgroundColor: "#020617",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitSubHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  unitBack: {
    color: "white",
    fontSize: 4,
  },
  unitTitle: {
    color: "white",
    fontSize: 24,
    fontFamily: "Pixel-Bold",
  },
  unitSubtitle: {
    color: "white",
    fontSize: 16,
  },
});
