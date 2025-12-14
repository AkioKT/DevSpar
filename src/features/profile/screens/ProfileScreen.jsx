import React, { useCallback } from "react";
import { ScrollView, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderProfile } from "../components/HeaderProfile";
import { SettingsPreferences } from "../components/Settings";
import { HistoryLog } from "../components/History";
import usePersistedState from "../hooks/usePersistedState";
import ResetStorage from "../../../componentsglobal/ResetStorage";
import styles from "../styles/ProfileScreen";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const [name, setName] = usePersistedState("profile_name", "");
  const [image, setImage] = usePersistedState("profile_image", null);

  const [theme, setTheme] = usePersistedState("settings_theme", "Light");
  const [sound, setSound] = usePersistedState("settings_sound", true);
  const [music, setMusic] = usePersistedState("settings_music", true);
  const [language, setLanguage] = usePersistedState("settings_language", "en");

  const [logs, setLogs] = usePersistedState("user_logs", {
    lastLogin: "2025-02-01",
    totalPlayTime: 0, // dalam detik
    totalWins: 7,
    totalFails: 4,
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri); // otomatis tersimpan karena usePersistedState
    }
  };

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        setLogs((prev) => ({
          ...prev,
          totalPlayTime: prev.totalPlayTime + 1,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.floatingDecorations}>
        <Text style={[styles.floatingIcon, { top: "8%", left: "10%" }]}>★</Text>
        <Text style={[styles.floatingIcon, { top: "12%", right: "15%" }]}>
          ✦
        </Text>
        <Text style={[styles.floatingIcon, { top: "75%", left: "8%" }]}>
          {"</>"}
        </Text>
        <Text style={[styles.floatingIcon, { top: "80%", right: "12%" }]}>
          ★
        </Text>
      </View>
      <ScrollView>
        <HeaderProfile
          username={name}
          setUsername={setName}
          image={image}
          onPickImage={pickImage}
        />

        <SettingsPreferences
          theme={theme}
          setTheme={setTheme}
          sound={sound}
          setSound={setSound}
          music={music}
          setMusic={setMusic}
          language={language}
          setLanguage={setLanguage}
        />

        <HistoryLog logs={logs} />
        <ResetStorage />
      </ScrollView>
    </View>
  );
}
