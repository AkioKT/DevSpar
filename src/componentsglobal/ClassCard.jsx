import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native"; // ⬅️ Import hook ini
import useCustomFonts from "../../src/hooks/useCustomFonts";

const ClassCard = ({ classData }) => {
  const navigation = useNavigation(); // ⬅️ Ambil objek navigation tanpa props
  const onPress = () => {
    if (classData.name === "HTML") {
      navigation.navigate("HtmlLevel");
    } else if (classData.name === "CSS") {
      navigation.navigate("CssLevel");
    } else if (classData.name === "Javascript") {
      navigation.navigate("JavascriptLevel");
    } else if (classData.name === "Python") {
      navigation.navigate("PythonLevel");
    } else if (classData.name === "PHP") {
      navigation.navigate("PHPLevel");
    } else {
      console.log("Halaman belum tersedia untuk:", classData.name);
    }
  };
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <ImageBackground source={classData.image} style={styles.cardImage} />
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.cardTitle}>{classData.name}</Text>
        <Text style={styles.cardCode}>{classData.code}</Text>
        <Text numberOfLines={4} style={styles.cardDesc}>
          {classData.desc}
        </Text>

        {/* Tombol Select */}
        <TouchableOpacity
          style={styles.selectButton}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.selectText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: "#3d5a80",
    borderStyle: "solid",
  },
  cardHeader: {
    height: 200,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#3d5a80",
    overflow: "hidden",
  },
  cardImage: {
    height: 250,
    width: "100%",
  },
  cardFooter: {
    width: "100%",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#2d3853a3",
  },
  cardTitle: {
    fontFamily: "Pixel-Bold",
    fontSize: 30,
    color: "#F8FAFC",
  },
  cardCode: { fontSize: 18, color: "#F8FAFC", fontFamily: "Pixel-Bold" },
  cardDesc: {
    width: "100%",
    color: "#9ca5b3",
    fontSize: 14,
    fontFamily: "Pixel-Bold",
  },
  selectButton: {
    width: "100%",
    backgroundColor: "#facc15",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  selectText: {
    color: "#282103",
    fontFamily: "Pixel-Bold",
    fontSize: 20,
  },
});

export default ClassCard;
