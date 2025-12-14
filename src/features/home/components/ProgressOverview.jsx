import styles from "./styles/ProgressOverview";
import { View, Text, Image } from "react-native";
import { useContext, useMemo } from "react";
import { ProgressContext } from "../../../context/ProgressOverview";
import ProgressIcon from "../../../../assets/image/progress-icon.png";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function ProgressOverview() {
  const { progress } = useContext(ProgressContext);

  const totalProgressPercent = useMemo(() => {
    const vals = Object.values(progress);
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100);
  }, [progress]);
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.sectionTitle}>Progress Overview</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          {Object.entries(progress).map(([category, value]) => (
            <View
              key={category}
              style={{
                width: "48%", // <<--- ini membuat 2 item per baris
                marginBottom: 12,
              }}
            >
              <View style={styles.row}>
                <Text style={styles.smallText}>{category}</Text>
              </View>

              <View style={styles.progressBarBg}>
                <View
                  style={{
                    width: `${value * 100}%`,
                    height: "100%",
                    overflow: "hidden",
                    flexDirection: "row",
                  }}
                >
                  {/* STRIPES */}
                  {[...Array(20)].map((_, i) => (
                    <View key={i} style={styles.stripe} />
                  ))}
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    position: "absolute",
                  }}
                >
                  <Text style={[styles.smallText, { textAlign: "center" }]}>
                    {Math.round(value * 100)}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.smallText}>Overall: {totalProgressPercent}%</Text>
      </View>
    </View>
  );
}
