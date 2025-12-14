import { View, Text } from "react-native";
import styles from "../styles/ProfileScreen";
import NeonCard from "./NeonCard";
import { Ionicons } from "@expo/vector-icons";
export const HistoryLog = ({ logs }) => {
  const hours = Math.floor(logs.totalPlayTime / 3600);
  const minutes = Math.floor((logs.totalPlayTime % 3600) / 60);
  const seconds = logs.totalPlayTime % 60;

  return (
    <View style={styles.card}>
      {/* <Text style={styles.cardTitle}>History / Logs</Text>

      <Text>Last Login: {logs.lastLogin}</Text>
      <Text>Total Play Time: {minutes} minutes</Text>
      <Text>Total Wins: {logs.totalWins}</Text>
      <Text>Total Fails: {logs.totalFails}</Text> */}
      <NeonCard>
        <Text style={styles.cardTitle}>History / Logs</Text>

        {/* Last Login */}
        <View style={styles.historyRow}>
          <View style={styles.historyLeft}>
            <Ionicons name="calendar" size={18} color="#00f0ff" />
            <Text style={styles.historyLabel}>Last Login:</Text>
          </View>
          <Text style={styles.historyValue}>{logs.lastLogin}</Text>
        </View>

        {/* Play Time */}
        <View style={styles.historyRow}>
          <View style={styles.historyLeft}>
            <Ionicons name="time" size={18} color="#00f0ff" />
            <Text style={styles.historyLabel}>Play Time:</Text>
          </View>
          <Text style={styles.historyValue}>{minutes} Minutes</Text>
        </View>

        {/* Total Wins */}
        <View style={styles.historyRow}>
          <View style={styles.historyLeft}>
            <Ionicons name="trophy" size={18} color="#ffd700" />
            <Text style={styles.historyLabel}>Total Wins:</Text>
          </View>
          <Text style={[styles.historyValue, { color: "#4caf50" }]}>
            {logs.totalWins}
          </Text>
        </View>

        {/* Total Fails */}
        <View style={[styles.historyRow, { borderBottomWidth: 0 }]}>
          <View style={styles.historyLeft}>
            <Ionicons name="close-circle" size={18} color="#ff3b3b" />
            <Text style={styles.historyLabel}>Total Fails:</Text>
          </View>
          <Text style={[styles.historyValue, { color: "#ff3b3b" }]}>
            {logs.totalFails}
          </Text>
        </View>
      </NeonCard>
    </View>
  );
};

export default HistoryLog;
