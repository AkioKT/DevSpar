import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Alert,
  StyleSheet,
  Dimensions,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { initSocket, getSocket } from "./socket";
import { Ionicons } from "@expo/vector-icons";
import useCustomFonts from "../../src/hooks/useCustomFonts";
import SelectCharacter from "../sounds/SelectCharacter";
import ButtonClick from "../sounds/ButtonClick";

const { width } = Dimensions.get("window");

const character = {
  1: require("../../assets/image/chibi-male-1.png"),
  2: require("../../assets/image/chibi-male-2.png"),
  3: require("../../assets/image/chibi-female-1.png"),
  4: require("../../assets/image/chibi-female-2.png"),
  5: require("../../assets/image/chibi-female-3.png"),
  6: require("../../assets/image/chibi-female-4.png"),
  7: require("../../assets/image/chibi-male-3.png"),
  8: require("../../assets/image/chibi-male-4.png"),
};

export default function BattleLobby({ navigation, route }) {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const joinAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.8)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  const backPage = () => {
    navigation.navigate("MainTabs", {
      screen: "Practice",
    });
    ButtonClick();
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animateJoin = () => {
    Animated.sequence([
      Animated.timing(joinAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(joinAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const chooseAvatar = (key) => {
    setSelectedAvatar(key);
    SelectCharacter();
  };

  const createRoom = () => {
    if (!name.trim()) return Alert.alert("Nama wajib diisi!");
    if (!selectedAvatar) return Alert.alert("Pilih avatar dulu!");

    setJoined(true);
    animateJoin();

    let socket = getSocket();
    if (!socket) socket = initSocket();

    const id = roomId || Math.floor(1000 + Math.random() * 9000).toString();

    socket.emit("create_room", {
      roomId: id,
      user: { id: socket.id, name, avatar: selectedAvatar },
    });

    console.log("Emit create_room:", id, selectedAvatar);
    ButtonClick();
  };

  useEffect(() => {
    const socket = initSocket();

    socket.on("room_created", ({ roomId, user }) => {
      console.log("Room created:", roomId, user);
      navigation.navigate("BattleRoom", { roomId, user });
    });

    socket.on("room_update", (summary) => {
      const socket = getSocket();
      const currentUser = summary.players.find((p) => p.id === socket.id);
      if (!currentUser) return;
      navigation.navigate("BattleRoom", {
        roomId: summary.roomId,
        user: currentUser,
      });
    });

    socket.on("error_msg", (msg) => {
      Alert.alert("Error", msg);
      setJoined(false);
    });

    return () => {
      socket.off("room_created");
      socket.off("room_update");
      socket.off("error_msg");
    };
  }, []);

  const joinRoom = () => {
    if (!roomId.trim()) return Alert.alert("Masukkan Room ID");
    if (!selectedAvatar) return Alert.alert("Pilih avatar dulu!");

    setJoined(true);
    animateJoin();

    let socket = getSocket();
    if (!socket) {
      socket = initSocket();
    }

    socket.emit("join_room", {
      roomId,
      user: {
        id: socket.id,
        name: name,
        avatar: selectedAvatar,
      },
    });

    console.log("Emit join_room:", roomId, selectedAvatar);
    ButtonClick();
  };

  return (
    <View style={styles.container}>
      {/* Floating decorations */}
      <View style={styles.floatingDecorations}>
        <Text style={[styles.floatingIcon, { top: "5%", left: "10%" }]}>★</Text>
        <Text style={[styles.floatingIcon, { top: "8%", right: "15%" }]}>
          ✦
        </Text>
        <Text
          style={[
            styles.floatingIcon,
            { top: "85%", left: "8%", fontSize: 14 },
          ]}
        >
          {"</>"}
        </Text>
        <Text style={[styles.floatingIcon, { top: "88%", right: "12%" }]}>
          ★
        </Text>
        <Text
          style={[
            styles.floatingIcon,
            { top: "45%", left: "5%", fontSize: 12 },
          ]}
        >
          {"{ }"}
        </Text>
        <Text
          style={[
            styles.floatingIcon,
            { top: "50%", right: "5%", fontSize: 12 },
          ]}
        >
          {"</>"}
        </Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={backPage} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleBattle}>Battle </Text>
          <LinearGradient
            colors={["#ffd700", "#ffed4e"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleGradient}
          >
            <Text style={styles.titleLobby}>Lobby</Text>
          </LinearGradient>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#6b7280"
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              value={roomId}
              onChangeText={setRoomId}
              placeholder="Room ID (leave blank to create)"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerIcon}>◆</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Avatar Preview */}
        <View style={styles.avatarPreviewSection}>
          <Text style={styles.sectionTitle}>Pilih Avatar Anda</Text>

          {selectedAvatar ? (
            <View style={styles.selectedAvatarContainer}>
              {/* Glow effect */}
              <Animated.View
                style={[
                  styles.avatarGlow,
                  {
                    opacity: glowAnim,
                    transform: [{ translateY: floatAnim }],
                  },
                ]}
              />

              {/* Avatar image */}
              <Animated.Image
                source={character[selectedAvatar]}
                style={[
                  styles.selectedAvatar,
                  {
                    transform: [{ scale: joinAnim }, { translateY: floatAnim }],
                  },
                ]}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>?</Text>
            </View>
          )}
        </View>

        {/* Avatar Grid Selection */}
        <View style={styles.avatarGridSection}>
          <View style={styles.avatarGrid}>
            {Object.keys(character).map((key, index) => {
              const isSelected = selectedAvatar === Number(key);
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => chooseAvatar(Number(key))}
                  style={[
                    styles.avatarCard,
                    isSelected && styles.avatarCardSelected,
                  ]}
                  activeOpacity={0.8}
                >
                  <View style={styles.avatarCardInner}>
                    <Image
                      source={character[key]}
                      style={[
                        styles.avatarImage,
                        !isSelected && styles.avatarImageUnselected,
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={createRoom}
            style={styles.primaryButton}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#ffd700", "#ffed4e"]}
              style={styles.buttonGradient}
            >
              <View style={styles.buttonInner}>
                <Text style={styles.primaryButtonText}>Create Room</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={joinRoom}
            style={styles.secondaryButton}
            activeOpacity={0.8}
          >
            <View style={styles.secondaryButtonInner}>
              <Text style={styles.secondaryButtonText}>Join Room</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 2,
    backgroundColor: "#1a1f3a",
    borderWidth: 2,
    borderColor: "#3d5a80",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleBattle: {
    fontFamily: "Pixel-Bold",
    fontSize: 28,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  titleGradient: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  titleLobby: {
    fontFamily: "Pixel-Bold",
    fontSize: 28,
    color: "#0a0e27",
    textShadowColor: "#00000044",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    zIndex: 1,
  },
  inputSection: {
    gap: 12,
    marginTop: 10,
  },
  inputWrapper: {
    backgroundColor: "#1a1f3a",
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 2,
    overflow: "hidden",
  },
  input: {
    fontFamily: "Pixel-Bold",
    fontSize: 16,
    color: "#fff",
    padding: 14,
    paddingHorizontal: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#3d5a80",
  },
  dividerIcon: {
    fontFamily: "Pixel-Bold",
    fontSize: 16,
    color: "#98c1d9",
  },
  avatarPreviewSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Pixel-Bold",
    fontSize: 18,
    color: "#98c1d9",
    marginBottom: 16,
    textAlign: "center",
  },
  selectedAvatarContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarGlow: {
    position: "absolute",
    bottom: 0,
    width: 180,
    height: 40,
    borderRadius: 90,
    backgroundColor: "#f7f2f2ff",
    shadowColor: "#e2ed05ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 30,
  },
  selectedAvatar: {
    width: 200,
    height: 200,
  },
  placeholderContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#1a1f3a",
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "Pixel-Bold",
    fontSize: 80,
    color: "#3d5a80",
  },
  avatarGridSection: {
    marginBottom: 24,
  },
  avatarGrid: {
    backgroundColor: "#1a1f3a",
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  avatarCard: {
    width: (width - 40 - 24 - 24 - 6) / 4,
    aspectRatio: 1,
    backgroundColor: "#0a0e27",
    borderWidth: 2,
    borderColor: "#3d5a80",
    borderRadius: 2,
    padding: 4,
    position: "relative",
  },
  avatarCardSelected: {
    borderColor: "#ffd700",
    borderWidth: 3,
    shadowColor: "#ffd700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarCardInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarImageUnselected: {
    opacity: 0.5,
  },
  selectedBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    backgroundColor: "#4caf50",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBadgeText: {
    fontFamily: "Pixel-Bold",
    fontSize: 12,
    color: "#fff",
  },
  buttonSection: {
    gap: 12,
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
