import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
export default function SelectMode() {
  const [selectedMode, setSelectedMode] = useState("syntax");

  const battleModes = [
    {
      id: "syntax",
      title: "Syntax Clash 1v1",
      description:
        "Complete in real-time coding duels. Test your syntax skills!",
      players: "1,245",
      icon: "⚔️",
      badge: "🎯 Live",
      iconBg: "#3d5a80",
    },
    {
      id: "debug",
      title: "Debug Frenzy",
      description: "Find and fix bugs against the clock. Speed is key!",
      players: "890",
      icon: "🐛",
      badge: "⏱️ Timed",
      iconBg: "#8b4789",
    },
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.modeScroll}
    >
      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Select Battle Mode</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {battleModes.map((mode) => {
          const isSelected = selectedMode === mode.id;
          return (
            <TouchableOpacity
              key={mode.id}
              style={[styles.modeCard, isSelected && styles.modeCardSelected]}
              onPress={() => setSelectedMode(mode.id)}
              activeOpacity={0.8}
            >
              <View style={styles.modeCardInner}>
                {/* Icon */}
                <View
                  style={[
                    styles.modeIconContainer,
                    { backgroundColor: mode.iconBg },
                  ]}
                >
                  <Text style={styles.modeIcon}>{mode.icon}</Text>
                  {/* Corner decorations */}
                  <View style={styles.cornerTopLeft} />
                  <View style={styles.cornerTopRight} />
                  <View style={styles.cornerBottomLeft} />
                  <View style={styles.cornerBottomRight} />
                </View>

                {/* Badge */}
                <View style={styles.modeBadge}>
                  <Text style={styles.modeBadgeText}>{mode.badge}</Text>
                </View>

                {/* Title */}
                <Text style={styles.modeTitle}>{mode.title}</Text>

                {/* Description */}
                <Text style={styles.modeDescription}>{mode.description}</Text>

                {/* Footer */}
                <View style={styles.modeFooter}>
                  <View style={styles.playerCount}>
                    <Text style={styles.playerIcon}>👥</Text>
                    <Text style={styles.playerText}>
                      Online Players: {mode.players}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Selection indicator */}
              {isSelected && (
                <View style={styles.selectionGlow}>
                  <View style={styles.selectionCornerTL} />
                  <View style={styles.selectionCornerTR} />
                  <View style={styles.selectionCornerBL} />
                  <View style={styles.selectionCornerBR} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modeScroll: {
    paddingBottom: 10,
    gap: 16,
    flexDirection: "column",
  },
  sectionTitle: {
    fontFamily: "Pixel-Bold",
    fontSize: 24,
    color: "#ffd700",
    textShadowColor: "#8b6914",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  modeCard: {
    width: width * 0.7,
    backgroundColor: "#1a1f3a",
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
    padding: 16,
    position: "relative",
  },

  modeCardSelected: {
    borderColor: "#ffd700",
    shadowColor: "#ffd700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },

  modeCardInner: {
    gap: 12,
  },

  modeIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    alignSelf: "flex-start",
  },

  modeIcon: {
    fontSize: 36,
  },

  cornerTopLeft: {
    position: "absolute",
    top: -3,
    left: -3,
    width: 8,
    height: 8,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#98c1d9",
  },

  cornerTopRight: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#98c1d9",
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: -3,
    left: -3,
    width: 8,
    height: 8,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#98c1d9",
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: -3,
    right: -3,
    width: 8,
    height: 8,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#98c1d9",
  },

  modeBadge: {
    backgroundColor: "#0a0e27",
    borderWidth: 2,
    borderColor: "#3d5a80",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
    alignSelf: "flex-start",
  },

  modeBadgeText: {
    fontFamily: "Pixel-Bold",
    fontSize: 12,
    color: "#98c1d9",
  },

  modeTitle: {
    fontFamily: "Pixel-Bold",
    fontSize: 18,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
  },

  modeDescription: {
    fontFamily: "Pixel-Bold",
    fontSize: 13,
    color: "#98c1d9",
    lineHeight: 18,
  },

  modeFooter: {
    marginTop: 4,
  },

  playerCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#0a0e27",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#3d5a80",
    alignSelf: "flex-start",
  },

  playerIcon: {
    fontSize: 14,
  },

  playerText: {
    fontFamily: "Pixel-Bold",
    fontSize: 11,
    color: "#98c1d9",
  },

  selectionGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },

  selectionCornerTL: {
    position: "absolute",
    top: -6,
    left: -6,
    width: 16,
    height: 16,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#ffd700",
  },

  selectionCornerTR: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 16,
    height: 16,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#ffd700",
  },

  selectionCornerBL: {
    position: "absolute",
    bottom: -6,
    left: -6,
    width: 16,
    height: 16,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#ffd700",
  },

  selectionCornerBR: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: 16,
    height: 16,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#ffd700",
  },
});
