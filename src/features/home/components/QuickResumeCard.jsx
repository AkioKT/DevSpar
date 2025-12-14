import styles from "./styles/QuickResumeCard";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ProgressContext } from "../../../context/ProgressOverview";
import allLevels from "../../../../assets/data/HTML/AllLevel";
import { Platform } from "react-native";
import CssIcon from "../../../../assets/image/CSS.png";
import JsIcon from "../../../../assets/image/JS.png";
import PythonIcon from "../../../../assets/image/PYTHON.png";
import PhpIcon from "../../../../assets/image/PHP.png";

export default function QuickResumeCard() {
  const navigation = useNavigation();
  const { recentActivity } = useContext(ProgressContext);
  const level = Number(recentActivity?.lesson?.match(/\d+/)?.[0] ?? 0);
  const completedLevel = Math.max(level - 1, 0);
  const totalLevel = Object.keys(allLevels).length;
  const progress = Math.min((completedLevel / totalLevel) * 100, 100);
  const courseIcons = {
    HTML: require("../../../../assets/image/thumbnail_html.png"),
    CSS: require("../../../../assets/image/thumbnail_css.png"),
    JavaScript: JsIcon,
    Python: PythonIcon,
    PHP: PhpIcon,
  };
  const courseName = recentActivity?.course;
  const DefaultIcon = "Test";
  const courseIcon = courseIcons[courseName] || DefaultIcon;

  return (
    <View style={styles.quickresumecard}>
      <View>
        {/* Course Icon */}
        <Image source={courseIcon} style={{ width: "100%", height: 250 }} />
        {/* Text Section */}
        <View style={{ padding: 10, gap: 10 }}>
          <Text style={[styles.cardSub, { color: "#f4c713" }]}>
            Continue your adventure!
          </Text>
          <Text style={styles.cardTitle}>
            {recentActivity?.course ?? "No recent"}
          </Text>
          <Text style={styles.cardSub}>
            {recentActivity?.course ?? "No recent"} Basic : Level{" "}
            {completedLevel}
          </Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => {
              if (!recentActivity) return;
              navigation.navigate("HtmlLevel");
            }}
          >
            <Text style={styles.continueText}>Tap to continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
