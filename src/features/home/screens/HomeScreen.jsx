import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LivesContext } from "../../../context/LivesContext"; // sesuaikan path
// import untuk navigasi jika perlu
import { useNavigation } from "@react-navigation/native";
import AppBar from "../../../componentsglobal/AppBar";
import AnnouncementBanner from "../components/AnnouncementBanner";
import QuickResumeCard from "../components/QuickResumeCard";
import DailyQuest from "../components/DailyQuest";
import WeeklyChallenge from "../components/WeeklyChallenge";
import PracticeOfTheDay from "../components/PracticeOfTheDay";
import Leaderboard from "../components/Leaderboard";
import ProgressOverview from "../components/ProgressOverview";
import RecommendedCourses from "../components/RecommendedCourse";
import CodingTips from "../components/CodingTips";
import MascotMessage from "../components/MascotMessage";
import AlertAddLife from "../components/AlertAddLife";
import styles from "../../../style/HomeScreenStyle";

export default function HomeScreen() {
  const [showAlert, setShowAlert] = useState(false);
  const openLifeModal = () => setShowAlert(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0e27" }}>
      <AppBar />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 16 }}
      >
        <AnnouncementBanner />
        <QuickResumeCard />
        <WeeklyChallenge />
        <DailyQuest onRewardHeart={openLifeModal} />
        <PracticeOfTheDay />
        <Leaderboard />
        <RecommendedCourses />
        <ProgressOverview />
        <View style={{ height: 80 }} />
      </ScrollView>
      {showAlert && <AlertAddLife onClose={() => setShowAlert(false)} />}
    </View>
  );
}
