// BattleScreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getSocket } from "./socket";
import { useContext } from "react";
import { EquipmentContext } from "../context/EquipmentContext";

export default function BattleScreen({ route, navigation }) {
  const { roomId, user, startTime } = route.params;
  const socket = getSocket();
  const [question, setQuestion] = useState(null);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [leaderboard, setLeaderboard] = useState([]);
  const [info, setInfo] = useState(null);
  const [localTimeDiff, setLocalTimeDiff] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { equipment } = useContext(EquipmentContext);

  const totalStats = {
    attack: 10 + (equipment.weapon?.stats?.attack || 0),
    defense: 5 + (equipment.armor?.stats?.defense || 0),
    hp: 100 + (equipment.armor?.stats?.hp || 0),
  };

  // animation values
  const vsAnim = useRef(new Animated.Value(0)).current;
  const feedbackAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(vsAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(vsAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    setLocalTimeDiff(Date.now() - startTime);

    socket.on("new_question", ({ question, index }) => {
      setQuestion(question);
      setIndex(index);
      setStatus("question");
      setSelectedAnswer(null);
      setInfo(null);
    });

    socket.on("answer_result", (res) => {
      setInfo(res);
      // Animate feedback
      Animated.sequence([
        Animated.timing(feedbackAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });

    socket.on("battle_ended", ({ leaderboard }) => {
      setLeaderboard(leaderboard);
      setStatus("ended");
    });

    socket.on("answer_ignored", (m) => {
      // optional show toast
    });

    return () => {
      // cleanup
    };
  }, []);

  const [remaining, setRemaining] = useState(15);
  useEffect(() => {
    let t = null;
    if (status === "question") {
      setRemaining(15);
      t = setInterval(() => setRemaining((r) => Math.max(r - 1, 0)), 1000);
    }
    return () => clearInterval(t);
  }, [status, question]);

  const submit = (idx) => {
    if (!question || selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    socket.emit("submit_answer", {
      roomId,
      questionId: question.id,
      answerIndex: idx,
    });
  };

  const progressPercent = (remaining / 15) * 100;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#00f0ff" />
          </TouchableOpacity>

          <View style={styles.vsBadge}>
            <Text style={styles.vsBadgeText}>VS MODE</Text>
          </View>

          <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.8}>
            <Ionicons name="settings-outline" size={24} color="#00f0ff" />
          </TouchableOpacity>
        </View>

        {/* System Alert Timer */}
        <View style={styles.timerSection}>
          <Text style={styles.systemLabel}>SYSTEM ALERT</Text>
          <View style={styles.timerBarContainer}>
            <LinearGradient
              colors={
                progressPercent > 50
                  ? ["#00f0ff", "#00d4ff"]
                  : progressPercent > 20
                  ? ["#ecd861ff", "#ff8c00"]
                  : ["#ff3b3b", "#cc0000"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.timerBarFill, { width: `${progressPercent}%` }]}
            />
          </View>
          <Text style={styles.timerText}>
            00:{remaining.toString().padStart(2, "0")}
          </Text>
        </View>

        {/* VS Animation */}
        {vsAnim._value > 0 && (
          <Animated.View style={[styles.vsAnimation, { opacity: vsAnim }]}>
            <View style={styles.vsGlow}>
              <Text style={styles.vsText}>VS</Text>
            </View>
          </Animated.View>
        )}

        {/* Question Card */}
        {status === "question" && question && (
          <View style={styles.questionCard}>
            {/* Question Header */}
            <View style={styles.questionHeader}>
              <View style={styles.questionNumberBadge}>
                <Text style={styles.questionNumberText}>
                  QUESTION {index + 1}/10
                </Text>
              </View>
              <View style={styles.xpBadge}>
                <Ionicons name="flash" size={16} color="#ffd700" />
                <Text style={styles.xpText}>+50 XP</Text>
              </View>
            </View>

            {/* Code Snippet (if available) */}
            {question.codeSnippet && (
              <View style={styles.codeContainer}>
                <View style={styles.codeHeader}>
                  <View style={styles.codeHeaderDots}>
                    <View
                      style={[styles.dot, { backgroundColor: "#ff5f56" }]}
                    />
                    <View
                      style={[styles.dot, { backgroundColor: "#ffbd2e" }]}
                    />
                    <View
                      style={[styles.dot, { backgroundColor: "#27c93f" }]}
                    />
                  </View>
                  <Text style={styles.codeFilename}>python_snippet.py</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.codeScroll}
                >
                  <Text style={styles.codeText}>{question.codeSnippet}</Text>
                </ScrollView>
              </View>
            )}

            {/* Question Text */}
            <Text style={styles.questionText}>
              {question.text ||
                "What is the output of the following Python snippet when executed?"}
            </Text>

            {/* Options */}
            <View style={styles.optionsContainer}>
              {question.options?.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionSelected,
                    ]}
                    onPress={() => submit(i)}
                    activeOpacity={0.8}
                    disabled={selectedAnswer !== null}
                  >
                    <View
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      <Text style={styles.optionLetter}>
                        {String.fromCharCode(65 + i)}
                      </Text>
                    </View>
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Waiting State */}
        {status === "waiting" && (
          <View style={styles.waitingCard}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={48}
              color="#00f0ff"
            />
            <Text style={styles.waitingText}>
              ⏳ Waiting for next question...
            </Text>
          </View>
        )}

        {/* Feedback State (Wrong Answer) */}
        {info && !info.isCorrect && (
          <Animated.View
            style={[
              styles.feedbackCard,
              styles.wrongCard,
              { opacity: feedbackAnim },
            ]}
          >
            <View style={styles.feedbackIconContainer}>
              <View style={styles.wrongIconCircle}>
                <Ionicons name="close" size={48} color="#fff" />
              </View>
            </View>
            <Text style={styles.feedbackTitle}>WRONG ANSWER</Text>
            <Text style={styles.feedbackSubtitle}>
              {info.firstResponder?.name || "Player"} chose '
              {String.fromCharCode(65 + (info.answerIndex || 0))}'.
            </Text>
            <Text style={styles.feedbackCorrect}>
              The correct answer was '
              {String.fromCharCode(65 + (question?.correctIndex || 0))}'.
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                setInfo(null);
                feedbackAnim.setValue(0);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>NEXT QUESTION →</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Feedback State (Correct Answer) */}
        {info && info.isCorrect && (
          <Animated.View
            style={[
              styles.feedbackCard,
              styles.correctCard,
              { opacity: feedbackAnim },
            ]}
          >
            <View style={styles.feedbackIconContainer}>
              <View style={styles.correctIconCircle}>
                <Ionicons name="checkmark" size={48} color="#fff" />
              </View>
            </View>
            <Text style={styles.feedbackTitle}>CORRECT!</Text>
            <Text style={styles.feedbackSubtitle}>
              {info.firstResponder?.name || "You"} answered correctly!
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                setInfo(null);
                feedbackAnim.setValue(0);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>NEXT QUESTION →</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Final Results Panel */}
        {status === "ended" && (
          <View style={styles.resultsPanel}>
            {/* Victory Banner */}
            <View style={styles.victoryBanner}>
              <View style={styles.confetti}>
                <Text style={styles.confettiDot}>●</Text>
                <Text style={[styles.confettiDot, { left: "30%" }]}>●</Text>
                <Text style={[styles.confettiDot, { left: "60%" }]}>●</Text>
                <Text style={[styles.confettiDot, { left: "90%" }]}>●</Text>
              </View>
              <Ionicons name="trophy" size={64} color="#ffd700" />
              <Text style={styles.victoryTitle}>VICTORY</Text>
              <Text style={styles.victorySubtitle}>
                {leaderboard[0]?.name.toUpperCase() || "PLAYER 1"} WINS!
              </Text>
            </View>

            {/* Leaderboard */}
            <View style={styles.leaderboardContainer}>
              {leaderboard.map((player, i) => {
                const isWinner = i === 0;
                return (
                  <View
                    key={player.id}
                    style={[styles.playerCard, isWinner && styles.winnerCard]}
                  >
                    <View style={styles.playerIconContainer}>
                      <Ionicons
                        name="person"
                        size={24}
                        color={isWinner ? "#ffd700" : "#00f0ff"}
                      />
                    </View>
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      {isWinner && (
                        <Text style={styles.winnerLabel}>Winner</Text>
                      )}
                    </View>
                    <Text style={styles.playerXP}>{player.score || 0} XP</Text>
                  </View>
                );
              })}
            </View>

            {/* Back to Lobby Button */}
            <TouchableOpacity
              style={styles.lobbyButton}
              onPress={() => navigation.navigate("BattleLobby")}
              activeOpacity={0.8}
            >
              <Text style={styles.lobbyButtonText}>BACK TO LOBBY</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#3d5a80",
    justifyContent: "center",
    alignItems: "center",
  },
  vsBadge: {
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#ffd700",
    paddingHorizontal: 20,
    paddingVertical: 8,
    transform: [{ skewX: "-10deg" }],
  },
  vsBadgeText: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#ffd700",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#3d5a80",
    justifyContent: "center",
    alignItems: "center",
  },

  // Timer Section
  timerSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  systemLabel: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#00f0ff",
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 1,
  },
  timerBarContainer: {
    height: 12,
    backgroundColor: "#1a1f3a",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3d5a80",
    marginBottom: 8,
  },
  timerBarFill: {
    height: "100%",
  },
  timerText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "right",
  },

  // VS Animation
  vsAnimation: {
    alignItems: "center",
    marginVertical: 20,
  },
  vsGlow: {
    backgroundColor: "#1a1f3a",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#ff3b3b",
    shadowColor: "#ff3b3b",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  vsText: {
    fontFamily: "monospace",
    fontSize: 48,
    color: "#ff3b3b",
    fontWeight: "900",
    letterSpacing: 8,
  },

  // Question Card
  questionCard: {
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#ffd700",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  questionNumberBadge: {
    backgroundColor: "#0a0e27",
    borderWidth: 2,
    borderColor: "#ffd700",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  questionNumberText: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#ffd700",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a0e27",
    borderWidth: 2,
    borderColor: "#ffd700",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    gap: 4,
  },
  xpText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#ffd700",
    fontWeight: "bold",
  },

  // Code Container
  codeContainer: {
    backgroundColor: "#0a0e27",
    borderRadius: 6,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3d5a80",
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1f3a",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 12,
  },
  codeHeaderDots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  codeFilename: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#98c1d9",
  },
  codeScroll: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#50fa7b",
    lineHeight: 18,
  },

  // Question Text
  questionText: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
    marginBottom: 16,
  },

  // Options
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a0e27",
    borderWidth: 2,
    borderColor: "#3d5a80",
    borderRadius: 6,
    padding: 14,
  },
  optionSelected: {
    borderColor: "#00f0ff",
    backgroundColor: "rgba(0, 240, 255, 0.1)",
  },
  optionLabel: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3d5a80",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionLabelSelected: {
    backgroundColor: "#00f0ff",
  },
  optionLetter: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  optionText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
    flex: 1,
  },

  // Waiting Card
  waitingCard: {
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#3d5a80",
    borderRadius: 8,
    padding: 40,
    marginHorizontal: 20,
    alignItems: "center",
    gap: 16,
  },
  waitingText: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#98c1d9",
    textAlign: "center",
  },

  // Feedback Card
  feedbackCard: {
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    borderWidth: 3,
    marginBottom: 20,
  },
  wrongCard: {
    backgroundColor: "#3d1f1f",
    borderColor: "#ff3b3b",
  },
  correctCard: {
    backgroundColor: "#1f3d2f",
    borderColor: "#50fa7b",
  },
  feedbackIconContainer: {
    marginBottom: 16,
  },
  wrongIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ff3b3b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  correctIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#50fa7b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  feedbackTitle: {
    fontFamily: "monospace",
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 2,
  },
  feedbackSubtitle: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#d4c5a0",
    textAlign: "center",
    marginBottom: 8,
  },
  feedbackCorrect: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#98c1d9",
    textAlign: "center",
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#3d5a80",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  nextButtonText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  // Results Panel
  resultsPanel: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  victoryBanner: {
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#ffd700",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  confetti: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  confettiDot: {
    fontSize: 20,
    color: "#ffd700",
    position: "absolute",
    top: 10,
  },
  victoryTitle: {
    fontFamily: "monospace",
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 16,
    letterSpacing: 4,
  },
  victorySubtitle: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#ffd700",
    marginTop: 8,
    letterSpacing: 1,
  },

  // Leaderboard
  leaderboardContainer: {
    gap: 12,
    marginBottom: 20,
  },
  playerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#3d5a80",
    borderRadius: 8,
    padding: 16,
  },
  winnerCard: {
    backgroundColor: "#2a2520",
    borderColor: "#ffd700",
  },
  playerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0a0e27",
    borderWidth: 2,
    borderColor: "#3d5a80",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 2,
  },
  winnerLabel: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#ffd700",
    fontWeight: "600",
  },
  playerXP: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "#00f0ff",
    fontWeight: "bold",
  },

  // Lobby Button
  lobbyButton: {
    backgroundColor: "#00f0ff",
    borderWidth: 3,
    borderColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  lobbyButtonText: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#0a0e27",
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
