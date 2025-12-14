import styles from "./styles/PracticeOfTheDay";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import PracticeIcon from "../../../../assets/image/practice-icon.png";
import useCustomFonts from "../../../hooks/useCustomFonts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = SCREEN_WIDTH * 0.7; // responsive

export default function PracticeOfTheDay() {
  const [practiceAnswer, setPracticeAnswer] = useState(null);
  const [practiceResult, setPracticeResult] = useState(null);
  const submitPractice = () => {
    const correct = practiceAnswer === practiceOfDayMock.answerIndex;
    setPracticeResult(correct ? "correct" : "wrong");
    if (correct) setXp((v) => v + 5);
  };
  const practiceOfDayMock = {
    id: "p1",
    question: "Apa output dari console.log(2 + '2')?",
    choices: ["4", "'22'", "TypeError", "NaN"],
    answerIndex: 1,
  };
  return (
    <View style={styles.card}>
      {/* OVERLAY */}
      <View>
        <Text style={styles.sectionTitle}>Practice of The Day</Text>

        <Text style={styles.cardSub}>{practiceOfDayMock.question}</Text>

        {/* CHOICES */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          {practiceOfDayMock.choices.map((c, i) => {
            const isCorrect = i === practiceOfDayMock.answerIndex;
            const isSelected = practiceAnswer === i;
            const locked = practiceResult === "wrong";

            return (
              <TouchableOpacity
                key={i}
                disabled={locked}
                style={[
                  styles.choiceBtn,
                  isSelected && styles.choiceSelected,
                  locked && isCorrect && { backgroundColor: "#19A974" },
                  locked &&
                    isSelected &&
                    !isCorrect && { backgroundColor: "#B00020" },
                ]}
                onPress={() => !locked && setPracticeAnswer(i)}
              >
                <Text style={styles.choiceText}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* BUTTONS */}
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              practiceResult === "wrong" && { backgroundColor: "#777" },
            ]}
            disabled={practiceResult === "wrong"}
            onPress={submitPractice}
          >
            <Text style={styles.primaryBtnText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ghostBtn}
            onPress={() => {
              setPracticeAnswer(null);
              setPracticeResult(null);
            }}
          >
            <Text style={styles.ghostBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// {practiceResult === "correct" && (
//           <Text style={styles.correctText}>Benar! +5 XP</Text>
//         )}
