import { View, Text, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/ProfileScreen";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import NeonCard from "./NeonCard";
import NeonDropdown from "./NeonDropdown";
import NeonToggle from "./NeonToggle";

export const SettingsPreferences = ({
  theme,
  setTheme,
  sound,
  setSound,
  music,
  setMusic,
  language,
  setLanguage,
}) => {
  
  const themeOptions = [
    "Pixel Dark",
    "Pixel Light",
    "Neon Cyber",
    "Retro Blue",
  ];
  const languageOptions = ["English"];

  return (
    <View style={styles.card}>
      <NeonCard>
        <Text style={styles.cardTitle}>Settings & Preferences</Text>

        {/* Theme */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="palette" size={20} color="#00f0ff" />
            <Text style={styles.settingLabel}>Theme</Text>
          </View>
          <NeonDropdown
            value={theme}
            options={themeOptions}
            onValueChange={setTheme}
          />
        </View>

        {/* Sound */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Ionicons name="volume-high" size={20} color="#00f0ff" />
            <Text style={styles.settingLabel}>Sound</Text>
          </View>
          <NeonToggle value={sound} onValueChange={setSound} />
        </View>

        {/* Music */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Ionicons name="musical-notes" size={20} color="#00f0ff" />
            <Text style={styles.settingLabel}>Music</Text>
          </View>
          <NeonToggle value={music} onValueChange={setMusic} />
        </View>

        {/* Language */}
        <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="globe" size={20} color="#00f0ff" />
            <Text style={styles.settingLabel}>Language</Text>
          </View>
          <NeonDropdown
            value={language}
            options={languageOptions}
            onValueChange={setLanguage}
          />
        </View>
      </NeonCard>
    </View>
  );
};

export default SettingsPreferences;
