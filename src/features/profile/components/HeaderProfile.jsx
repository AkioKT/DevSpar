import React from "react";
import { View, TextInput, TouchableOpacity, Image, Text } from "react-native";
import styles from "../styles/ProfileScreen";
import DefaultImage from "../../../../assets/image/MyFotoGua.jpg";

export const HeaderProfile = ({
  username,
  setUsername,
  image, // URI image dari user
  onPickImage, // function pick image
}) => {
  return (
    <View style={styles.avatarSection}>
      <View style={styles.avatarFrame}>
        {/* Corner Stars */}
        <View style={styles.starTopLeft}>
          <Text style={styles.starIcon}>✦</Text>
        </View>
        <View style={styles.starBottomRight}>
          <Text style={styles.starIcon}>✦</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarImageContainer}>
          <TouchableOpacity onPress={onPickImage}>
            <Image
              source={image ? { uri: image } : DefaultImage}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.playerNameLabel}>PLAYER NAME</Text>

      <View style={styles.usernameInputWrapper}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.usernameInput}
          textAlign="center"
        />
      </View>
    </View>
  );
};

export default HeaderProfile;
