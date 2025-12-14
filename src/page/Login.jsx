import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import loginStyles from "../style/LoginStyle";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import listAccounts from "../../assets/data/accounts/acc.json";

export default function Login({ navigation }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleLogin = () => {
    const foundUser = listAccounts.find(
      (user) =>
        user.username === loginUsername && user.password === loginPassword
    );
    if (foundUser) {
      setIsValid(false);
      navigation.navigate("MainTabs", {
        screen: "Home",
      });
      console.log("User:", foundUser);
    } else {
      setIsValid(true);
    }
  };

  return (
    <View style={loginStyles.formCard}>
      {/* Email Input */}
      <View style={loginStyles.inputContainer}>
        <Text style={loginStyles.label}>Email</Text>
        <View style={loginStyles.inputWrapper}>
          <View style={loginStyles.iconContainer}>
            <MaterialIcons name="email" size={20} color="#6b7280" />
          </View>
          <TextInput
            style={loginStyles.input}
            placeholder="Example@gmail.com"
            placeholderTextColor="#6b7280"
            value={loginUsername}
            onChangeText={setLoginUsername}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={loginStyles.inputContainer}>
        <Text style={loginStyles.label}>Password</Text>
        <View style={loginStyles.inputWrapper}>
          <View style={loginStyles.iconContainer}>
            <Ionicons name="lock-closed" size={20} color="#6b7280" />
          </View>
          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            placeholderTextColor="#6b7280"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry={!showLoginPassword}
            autoCapitalize="none"
            autoComplete="password"
          />
          <TouchableOpacity
            onPress={() => setShowLoginPassword(!showLoginPassword)}
            style={loginStyles.eyeButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showLoginPassword ? "eye-off" : "eye-off-outline"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {isValid && (
          <View style={loginStyles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color="#ff3b3b" />
            <Text style={loginStyles.errorText}>
              Email atau Password salah!
            </Text>
          </View>
        )}
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.8}
        style={loginStyles.signInButton}
      >
        <LinearGradient
          colors={["#ffd700", "#ffed4e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={loginStyles.signInGradient}
        >
          <Text style={loginStyles.signInText}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
