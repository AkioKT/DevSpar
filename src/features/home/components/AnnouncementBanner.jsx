import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LivesContext } from "../../../context/LivesContext"; // sesuaikan path
// import untuk navigasi jika perlu
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/AnnouncementBanner";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

export default function AnnouncementBanner() {
  const announcements = {
    title: "XP Bonus Active!",
    text: "Earn Double XP for the next 24 hours",
  };

  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    // rotate announcement every 6s
    const t = setInterval(() => {
      setAnnouncementIndex((i) => (i + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <View style={styles.announcement}>
      <View
        style={{
          padding: 10,
          backgroundColor: "#0f1627",
          borderWidth: 3,
          borderColor: "#3d5a80",
          borderRadius: 4,
          shadowColor: "#f6db71ff",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,

          // Android
          elevation: 6,
        }}
      >
        <Ionicons name="megaphone-outline" size={18} color="#fff" />
      </View>
      <View style={{ gap: 14 }}>
        <View style={{width: "100%"}}>
          <Text style={[styles.announcementText, { fontSize: 20 * SCALE }]}>
            {announcements.title}
          </Text>
          <Text style={[styles.announcementText, { fontSize: 14 * SCALE }]}>
            {announcements.text}
          </Text>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              color: "#f4c713",
              fontSize: 20,
              fontFamily: "Pixel-Bold",
              textDecorationStyle: "solid",
              textDecorationColor: "#f4c713",
              textDecorationLine: "underline",
            }}
          >
            Learn More!
          </Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        style={styles.announcement}
        onPress={() =>
          Alert.alert("Announcement", announcements[announcementIndex].text)
        }
      >
        <Ionicons name="megaphone-outline" size={18} color="#fff" />
        <Text style={styles.announcementText}>
          {announcements[announcementIndex].text}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}
