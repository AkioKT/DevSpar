import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Svg, Polyline, Path } from "react-native-svg";
import { useFonts } from "expo-font";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import styles from "../../../style/AllCategoryStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LivesContext } from "../../../context/LivesContext";
import { useContext } from "react";
import { ProgressContext } from "../../../context/ProgressOverview";
import BackgroundHTML from "../../../../assets/image/thumbnail_html.png";
import ComingSoon from "../components/ComingSoon";
import HeaderLevel from "../components/HeaderLevel";

export default function CssLevel() {
  const COURSE_KEY = "CSS";
  const STORAGE_KEY = `levels_${COURSE_KEY}`;
  const { width } = useWindowDimensions();
  const levelSize = Math.min(80, (width - 10 * 2 - 20 * 4) / 4);
  const { updateProgress } = useContext(ProgressContext);
  const navigation = useNavigation();
  const [levels, setLevels] = useState([
    { id: 1, completed: false, locked: false }, // level 1 terbuka
    { id: 2, completed: false, locked: true },
    { id: 3, completed: false, locked: true },
    { id: 4, completed: false, locked: true },
    { id: 5, completed: false, locked: true },
    { id: 6, completed: false, locked: true },
    { id: 7, completed: false, locked: true },
    { id: 8, completed: false, locked: true },
    { id: 9, completed: false, locked: true },
    { id: 10, completed: false, locked: true },
  ]);
  const { lives } = useContext(LivesContext);
  useFocusEffect(
    useCallback(() => {
      const loadLevels = async () => {
        try {
          const storedLevels = await AsyncStorage.getItem(STORAGE_KEY);
          if (storedLevels) {
            setLevels(JSON.parse(storedLevels));
          }
        } catch (error) {
          console.log("Error loading levels:", error);
        }
      };
      loadLevels();
    }, [])
  );

  // 🔹 Simpan data ke AsyncStorage
  const saveLevels = async (newLevels) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLevels));
    } catch (error) {
      console.log("Error saving levels:", error);
    }
  };
  // 🔹 Fungsi menandai level selesai
  const completeLevel = (levelId) => {
    const newLevels = levels.map((level) => {
      if (level.id === levelId) return { ...level, completed: true };
      if (level.id === levelId + 1) return { ...level, locked: false };
      return level;
    });

    setLevels(newLevels);
    saveLevels(newLevels);

    // ✅ Hitung Progress HTML
    const completedCount = newLevels.filter((l) => l.completed).length;
    const total = newLevels.length;
    const percent = completedCount / total;

    updateProgress("CSS", percent);
  };

  const handleLevelPress = (levelId) => {
    const level = levels.find((l) => l.id === levelId);

    if (level.locked) {
      alert("Selesaikan level sebelumnya dulu!");
      return;
    }

    navigation.navigate("NavigationCSS", {
      screen: "LearningCSS",
      params: {
        levelId,
        onFinish: () => completeLevel(levelId),
      },
    });
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../../../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null; // atau tampilkan splash/loading
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={BackgroundHTML}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.2,
        }}
      />
      {/* Unit Header */}
      <HeaderLevel title="CSS" />
      {/* Progress Path */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.progressPath}
      >
        {/* Completed Level */}
        <View style={styles.levelContainer}>
          {levels.map((level) => (
            <Pressable
              key={level.id}
              onPress={() => !level.locked && handleLevelPress(level.id)}
              style={({ pressed }) => [
                styles.levelBox,
                {
                  width: levelSize,
                  height: levelSize,
                  backgroundColor: level.locked ? "#25283d" : "#facc15",
                  opacity: pressed && !level.locked ? 0.7 : 1,
                },
              ]}
            >
              {level.locked ? (
                <Ionicons name="lock-closed" size={24} color="#585e6b" />
              ) : level.completed ? (
                <Svg width="40" height="40" viewBox="0 0 24 24">
                  <Polyline
                    points="20 6 9 17 4 12"
                    stroke="#B8860B"
                    strokeWidth="3"
                    fill="none"
                  />
                </Svg>
              ) : (
                <Text style={styles.levelText}>{level.id}</Text>
              )}
            </Pressable>
          ))}
        </View>
        {/* Coming Soon Section */}
        <ComingSoon />
      </ScrollView>
    </View>
  );
}
