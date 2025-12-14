import styles from "./styles/RecommendedCoursesStyle";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import RecommendedIcon from "../../../../assets/image/recommended-icons.png";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function RecommendedCourses() {
  const recommendedMock = [
    { id: "c1", title: "HTML: Forms", level: "Beginner", progress: 0.1 },
    {
      id: "c2",
      title: "CSS: Flexbox basics",
      level: "Beginner",
      progress: 0.0,
    },
    { id: "c3", title: "JS: Variables", level: "Beginner", progress: 0.02 },
  ];
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Recommended Course</Text>

      <FlatList
        horizontal
        data={recommendedMock}
        keyExtractor={(i) => i.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.courseCard}
            onPress={() => navigation.navigate("MainTabs", { screen: "Learn" })}
          >
            <Text
              style={styles.courseTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text style={styles.courseLevel}>{item.level}</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${item.progress * 100}%` },
                ]}
              >
                {[...Array(20)].map((_, i) => (
                  <View key={i} style={styles.stripe} />
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
