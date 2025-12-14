// BattleRoom.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { initSocket, getSocket } from "./socket";
import ButtonClick from "../sounds/ButtonClick";

export const character = {
  1: {
    image: require("../../assets/image/chibi-male-1.png"),
    name: "Rai",
  },
  2: {
    image: require("../../assets/image/chibi-male-2.png"),
    name: "Ken",
  },
  3: {
    image: require("../../assets/image/chibi-female-1.png"),
    name: "Mira",
  },
  4: {
    image: require("../../assets/image/chibi-female-2.png"),
    name: "Luna",
  },
  5: {
    image: require("../../assets/image/chibi-female-3.png"),
    name: "Saki",
  },
  6: {
    image: require("../../assets/image/chibi-female-4.png"),
    name: "Aira",
  },
  7: {
    image: require("../../assets/image/chibi-male-3.png"),
    name: "Hiro",
  },
  8: {
    image: require("../../assets/image/chibi-male-4.png"),
    name: "Zane",
  },
};

const { width } = Dimensions.get("window");

export default function BattleRoom({ navigation, route }) {
  const { roomId, user } = route.params;
  const [room, setRoom] = useState(null);
  const socket = getSocket() || initSocket();
  const isHost = socket.id === room?.host;

  const startBattle = () => {
    socket.emit("start_battle", { roomId });
    ButtonClick();
  };

  const readyBattle = () => {
    socket.emit("player_ready", { roomId });
    ButtonClick();
  };

  const backPage = () => {
    const socket = getSocket();

    // HOST
    if (socket && room && socket.id === room.host) {
      socket.emit("leave_room", { roomId });
      navigation.navigate("BattleLobby");
      ButtonClick();
      return;
    }
    // PLAYER biasa
    if (socket) {
      socket.emit("leave_room", { roomId });
      navigation.navigate("BattleLobby");
      ButtonClick();
    }
  };

  const canStart = () => {
    if (!room) return false;

    const players = room.players || [];

    // butuh minimal 2 pemain
    if (players.length < 2) return false;

    // semua pemain harus ready
    const allReady = players.every((p) => p.ready === true);
    if (!allReady) return false;

    // hanya host
    return user.id === room.host;
  };

  useEffect(() => {
    socket.on("room_update", (summary) => {
      console.log("UPDATE:", summary.players);
      if (!summary) return;
      summary.players = summary.players.map((p) => ({
        ...p,
        avatar: Number(p.avatar), // fallback default
      }));
      setRoom(summary);
    });

    socket.on("battle_starting", ({ startTime }) => {
      navigation.navigate("BattleScreen", { roomId, user, startTime });
    });

    // 🔥 penting: semua player keluar jika host menutup room
    socket.on("room_closed", () => {
      navigation.goBack();
    });

    // request update
    socket.emit("join_room", { roomId, user });
    socket.emit("get_room");
    if (socket.id === room?.host) {
      socket.emit("player_ready", { roomId });
    }

    return () => {
      socket.off("room_update");
      socket.off("battle_starting");
      socket.off("room_closed"); // ✨ bersihkan listener
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated floating pixel decorations */}
      <View style={styles.floatingDecorations}>
        <Text style={[styles.floatingIcon, { top: "10%", left: "15%" }]}>
          ★
        </Text>
        <Text
          style={[
            styles.floatingIcon,
            { top: "15%", right: "20%", fontSize: 14 },
          ]}
        >
          {"</>"}
        </Text>
        <Text
          style={[
            styles.floatingIcon,
            { top: "70%", left: "10%", fontSize: 16 },
          ]}
        >
          {"{ }"}
        </Text>
        <Text style={[styles.floatingIcon, { top: "75%", right: "15%" }]}>
          ★
        </Text>
        <Text
          style={[
            styles.floatingIcon,
            { top: "40%", left: "5%", fontSize: 12 },
          ]}
        >
          ✦
        </Text>
        <Text
          style={[
            styles.floatingIcon,
            { top: "50%", right: "8%", fontSize: 12 },
          ]}
        >
          ✦
        </Text>
      </View>

      <View style={styles.contentWrapper}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.mainTitleWhite}>CODING</Text>
            <LinearGradient
              colors={["#ffd700", "#ffed4e", "#ffd700"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleGradient}
            >
              <Text style={styles.mainTitleGold}>BATTLE</Text>
            </LinearGradient>
          </View>

          <View style={styles.roomCodeContainer}>
            <View style={styles.pixelBorder}>
              <Text style={styles.roomCodeLabel}>ROOM</Text>
              <Text style={styles.roomCode}>{roomId}</Text>
            </View>
          </View>
        </View>

        {/* Players Section */}
        <View style={styles.playersSection}>
          <FlatList
            data={room?.players ?? []}
            keyExtractor={(p) => p.id || p.socketId}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.playersList}
            renderItem={({ item }) => (
              <View style={styles.playerCard}>
                {/* Character frame with glow */}
                <View style={styles.characterFrame}>
                  {/* Pixel glow effect */}
                  <View
                    style={[
                      styles.pixelGlow,
                      {
                        backgroundColor: item.ready ? "#4caf5044" : "#ff660044",
                      },
                    ]}
                  />

                  {/* Character info */}
                  <View style={styles.playerInfoTop}>
                    <Text style={styles.playerName}>{item.name}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: item.ready ? "#4caf50" : "#de1111",
                        },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {character[item.avatar]?.name.toUpperCase()} -{" "}
                        {item.ready ? "READY" : "NOT READY"}
                      </Text>
                    </View>
                  </View>

                  {/* Character sprite */}
                  <View style={styles.spriteContainer}>
                    <View style={styles.spriteFrame}>
                      <Image
                        source={character[item.avatar].image}
                        style={styles.characterSprite}
                        resizeMode="contain"
                      />
                    </View>
                  </View>

                  {/* Score */}
                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>(SCORE: </Text>
                    <Text style={styles.scoreValue}>{item.score || 0}</Text>
                    <Text style={styles.scoreLabel}>)</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        {/* Pixel divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerIcon}>⚔</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {isHost && user.ready ? (
            <TouchableOpacity
              style={styles.primaryButton}
              disabled={!canStart()}
              onPress={() => {
                if (!canStart()) {
                  if (room?.players?.length < 2) {
                    Alert.alert("Tidak bisa mulai", "Pemain kurang dari 2!");
                  } else {
                    Alert.alert(
                      "Tidak bisa mulai",
                      "Semua pemain harus ready!"
                    );
                  }
                  return;
                }
                startBattle();
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  canStart() ? ["#ffd700", "#ffed4e"] : ["#666666", "#888888"]
                }
                style={styles.buttonGradient}
              >
                <View style={styles.buttonInner}>
                  <Text style={styles.primaryButtonText}>
                    ⚡ START BATTLE ⚡
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.primaryButton}
              disabled={user.ready}
              onPress={readyBattle}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  user.ready ? ["#666666", "#888888"] : ["#4caf50", "#66bb6a"]
                }
                style={styles.buttonGradient}
              >
                <View style={styles.buttonInner}>
                  <Text style={styles.primaryButtonText}>
                    {user.ready ? "✓ READY" : "→ GET READY"}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={backPage}
            activeOpacity={0.8}
          >
            <View style={styles.secondaryButtonInner}>
              <Text style={styles.secondaryButtonText}>← BACK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
    position: "relative",
  },
  floatingDecorations: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  floatingIcon: {
    position: "absolute",
    color: "#ffd70033",
    fontSize: 18,
    fontFamily: "Pixel-Bold",
    textShadowColor: "#ffd70066",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 24,
    zIndex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    gap: 12,
  },
  titleWrapper: {
    alignItems: "center",
    gap: 4,
  },
  mainTitleWhite: {
    fontFamily: "Pixel-Bold",
    fontSize: 48,
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "#000000",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
  },
  titleGradient: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  mainTitleGold: {
    fontFamily: "Pixel-Bold",
    fontSize: 48,
    color: "#0a0e27",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "#00000044",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  roomCodeContainer: {
    alignItems: "center",
  },
  pixelBorder: {
    backgroundColor: "#1a1f3a",
    borderWidth: 3,
    borderColor: "#3d5a80",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 2,
    shadowColor: "#3d5a80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  roomCodeLabel: {
    fontFamily: "Pixel-Bold",
    fontSize: 14,
    color: "#98c1d9",
  },
  roomCode: {
    fontFamily: "Pixel-Bold",
    fontSize: 20,
    color: "#fff",
    letterSpacing: 2,
  },
  playersSection: {
    flex: 1,
    justifyContent: "center",
  },
  playersList: {
    paddingHorizontal: 10,
    gap: 16,
  },
  playerCard: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  characterFrame: {
    backgroundColor: "#1a1f3a",
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    // minWidth: 240,
  },
  pixelGlow: {
    position: "absolute",
    width: "90%",
    height: "90%",
    borderRadius: 4,
    opacity: 0.3,
    shadowRadius: 20,
    shadowOpacity: 1,
    elevation: 0,
  },
  playerInfoTop: {
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    zIndex: 1,
  },
  playerName: {
    fontFamily: "Pixel-Bold",
    fontSize: 20,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#000",
  },
  statusText: {
    fontFamily: "Pixel-Bold",
    fontSize: 11,
    color: "#fff",
    letterSpacing: 1,
  },
  spriteContainer: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    zIndex: 1,
  },
  spriteFrame: {
    borderWidth: 3,
    borderColor: "#d4af37",
    borderRadius: 4,
    padding: 4,
    backgroundColor: "#0a0e2755",
  },
  characterSprite: {
    width: 160,
    height: 160,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a0e27",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#3d5a80",
    zIndex: 1,
  },
  scoreLabel: {
    fontFamily: "Pixel-Bold",
    fontSize: 14,
    color: "#98c1d9",
  },
  scoreValue: {
    fontFamily: "Pixel-Bold",
    fontSize: 18,
    color: "#ffd700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#3d5a80",
  },
  dividerIcon: {
    fontFamily: "Pixel-Bold",
    fontSize: 20,
    color: "#ffd700",
  },
  buttonContainer: {
    gap: 12,
    paddingHorizontal: 10,
  },
  primaryButton: {
    borderRadius: 2,
    shadowColor: "#ffd700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonGradient: {
    borderRadius: 2,
    borderWidth: 3,
    borderColor: "#000",
  },
  buttonInner: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: "#ffffff44",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  primaryButtonText: {
    fontFamily: "Pixel-Bold",
    fontSize: 20,
    color: "#0a0e27",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "#ffffff66",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  secondaryButton: {
    backgroundColor: "#3d5a80",
    borderRadius: 2,
    borderWidth: 3,
    borderColor: "#98c1d9",
    shadowColor: "#3d5a80",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButtonInner: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: "#ffffff22",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  secondaryButtonText: {
    fontFamily: "Pixel-Bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    letterSpacing: 2,
  },
});
