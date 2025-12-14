import styles from "./styles/WeeklyChallenge";
import React from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import WeeklyChallengeIcon from "../../../../assets/image/weeklychallenge-icon.png";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function WeeklyChallenge() {
  const weeklyChallengeMock = {
    title: "Kompetisi Minggu: Frontend Sprint",
    goal: "Selesaikan 10 soal HTML/CSS",
    reward: "Badge: Frontender",
    progress: 0.3,
  };

  return (
    <TouchableOpacity
      style={styles.weeklyChallengeCard}
      onPress={() => Alert.alert("Weekly Challenge", weeklyChallengeMock.title)}
      activeOpacity={0.8}
    >
      {/* CONTENT */}
      <View>
        <Text style={styles.sectionTitle}>Weekly Challenge</Text>
        <View style={{ gap: 6 }}>
          <Text style={styles.cardSub}>{weeklyChallengeMock.title}</Text>

          {/* PROGRESS BAR */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${weeklyChallengeMock.progress * 100}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.smallText}>
            Reward: {weeklyChallengeMock.reward}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
