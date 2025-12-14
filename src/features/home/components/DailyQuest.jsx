import styles from "./styles/DailyQuest";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { LivesContext } from "../../../context/LivesContext";
import DailyQuestIcon from "../../../../assets/image/dailyquest-icon.png";
import useCustomFonts from "../../../hooks/useCustomFonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import AlertAddLife from "./AlertAddLife";

export default function DailyQuest({ onRewardHeart }) {
  const { addLife } = useContext(LivesContext); // <── gunakan LivesContext
  const [showAlert, setShowAlert] = useState(false);
  const [xp, setXp] = useState(420);

  const [dailyQuests, setDailyQuests] = useState([
    {
      id: "d1",
      title: "Selesaikan 2 level HTML",
      reward: "10 XP",
      done: false,
    },
    {
      id: "d2",
      title: "Jawab 5 soal benar tanpa salah",
      reward: "1 ❤",
      done: false,
    },
    {
      id: "d3",
      title: "Main 15 menit latihan",
      reward: "5 XP",
      done: false,
    },
  ]);

  const completeDailyQuest = (id) => {
    setDailyQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, done: true } : q))
    );

    const quest = dailyQuests.find((q) => q.id === id);
    if (!quest) return;

    // 🔹 Reward XP
    if (quest.reward.includes("XP")) {
      const amount = parseInt(quest.reward);
      setXp((prev) => prev + amount);
      Alert.alert("Reward", `+${amount} XP berhasil ditambahkan`);
    }

    // 🔹 Reward Heart ❤
    if (quest.reward.includes("❤")) {
      const amount = parseInt(quest.reward);
      addLife(amount, true);
      if (onRewardHeart) onRewardHeart(); // ⬅️ kirim sinyal ke HomeScreen
    }
  };

  return (
    <View style={styles.card}>
      <View style={{ gap: 6 }}>
        <Text style={[styles.sectionTitle, { fontSize: 16, color: "#f4c713" }]}>
          Your Daily Quest, Adventure!
        </Text>
        <Text style={styles.sectionTitle}>Daily Quest</Text>
        <Text style={[styles.sectionTitle, { fontSize: 16 }]}>
          New quest available every day. Complete all for a bonus chest!
        </Text>
      </View>
      {dailyQuests.map((q) => (
        <TouchableOpacity
          key={q.id}
          style={[
            styles.questRow,
            { flexDirection: "row", alignItems: "center", gap: 12 },
          ]}
          disabled={q.done}
          onPress={() => completeDailyQuest(q.id)}
        >
          {/* ✅ Checklist Icon */}
          <Feather
            name={q.done ? "check-circle" : "circle"}
            size={22}
            color={q.done ? "#22c55e" : "#6b7280"}
          />

          {/* 📄 Text Content */}
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.questTitle,
                q.done && {
                  textDecorationLine: "line-through",
                  color: "#8b949e",
                },
              ]}
            >
              {q.title}
            </Text>
            <Text style={styles.questReward}>{q.reward}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
