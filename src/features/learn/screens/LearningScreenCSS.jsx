import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AllLevel from "../../../../assets/data/CSS/AllLevel";
import styles from "../../../style/Q1Style";
import ProgressBar from "../../../componentsglobal/ProgressBar";
import LifeTimer from "../../../componentsglobal/LifeTimer";
import CheckButton from "../../../componentsglobal/CheckButton";
import { questionHandlers } from "../../../hooks/questionHandlers";
import { useContext } from "react";
import { ProgressContext } from "../../../context/ProgressOverview";
import AlertLife from "../components/AlertLife";
import { LivesContext } from "../../../context/LivesContext";

export default function LearningScreen() {
  const route = useRoute();
  const { levelId, onFinish } = route.params;
  const { updateRecentActivity, updateProgress } = useContext(ProgressContext);
  const questions = AllLevel[levelId] || [];
  const { lives } = useContext(LivesContext);
  const [showAlert, setShowAlert] = useState(false);
  const {
    currentQuestion,
    selectedAnswer,
    question,
    setSelectedAnswer,
    handleAnswerPress,
    handleCheck,
    closeButton,
    titleDifficult,
    progress,
  } = questionHandlers(questions, onFinish);

  useEffect(() => {
    if (lives === 0) {
      setShowAlert(true);
    }
  }, [lives]);

  useEffect(() => {
    updateRecentActivity({
      course: "CSS",
      levelId: levelId,
      lesson: `Level ${parseInt(levelId) + 1}`,
      progress: 0,
    });
  }, []);

  useEffect(() => {
    updateRecentActivity((prev) => ({
      ...prev,
      progress: progress,
    }));

    updateProgress("CSS", progress); // optional
  }, [progress]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />

      {/* Header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>

          <ProgressBar progress={progress} />
        </View>

        <View style={styles.livesContainer}>
          <LifeTimer />
        </View>
      </View>

      <Text style={styles.title}>{titleDifficult}</Text>

      <View style={styles.contentContainer}>
        <View style={styles.speechBubble}>
          <View style={styles.audioIcon}>
            <Text style={styles.titleQuestion}>Question</Text>
          </View>
          <Text style={styles.speechText}>{question.text}</Text>
        </View>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>{question.questionText}</Text>

      <ScrollView style={styles.optionGap}>
        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedAnswer === option.id && styles.optionButtonSelected,
              ]}
              onPress={() => handleAnswerPress(option.id)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAnswer === option.id && styles.optionTextSelected,
                ]}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <CheckButton onPress={handleCheck} disabled={!selectedAnswer} />
      {showAlert && <AlertLife />}
    </SafeAreaView>
  );
}
