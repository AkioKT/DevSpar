import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import signupStyles from "../style/SignUpStyle";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    console.log("Sign Up:", name, signupEmail, signupPassword);
    // Add your sign up logic here
  };

  return (
    <View style={signupStyles.formCard}>
      {/* Name Input */}
      <View style={signupStyles.inputContainer}>
        <Text style={signupStyles.label}>Full Name</Text>
        <View style={signupStyles.inputWrapper}>
          <View style={signupStyles.iconContainer}>
            <Feather name="user" size={20} color="#6b7280" />
          </View>
          <TextInput
            style={signupStyles.input}
            placeholder="Your name"
            placeholderTextColor="#6b7280"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoComplete="name"
          />
        </View>
      </View>

      {/* Email Input */}
      <View style={signupStyles.inputContainer}>
        <Text style={signupStyles.label}>Email</Text>
        <View style={signupStyles.inputWrapper}>
          <View style={signupStyles.iconContainer}>
            <MaterialIcons name="email" size={20} color="#6b7280" />
          </View>
          <TextInput
            style={signupStyles.input}
            placeholder="your@email.com"
            placeholderTextColor="#6b7280"
            value={signupEmail}
            onChangeText={setSignupEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={signupStyles.inputContainer}>
        <Text style={signupStyles.label}>Password</Text>
        <View style={signupStyles.inputWrapper}>
          <View style={signupStyles.iconContainer}>
            <Ionicons name="lock-closed" size={20} color="#6b7280" />
          </View>
          <TextInput
            style={signupStyles.input}
            placeholder="Create a password"
            placeholderTextColor="#6b7280"
            value={signupPassword}
            onChangeText={setSignupPassword}
            secureTextEntry={!showSignupPassword}
            autoCapitalize="none"
            autoComplete="password"
          />
          <TouchableOpacity
            onPress={() => setShowSignupPassword(!showSignupPassword)}
            style={signupStyles.eyeButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showSignupPassword ? "eye-off" : "eye-off-outline"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password Input */}
      <View style={signupStyles.inputContainer}>
        <Text style={signupStyles.label}>Confirm Password</Text>
        <View style={signupStyles.inputWrapper}>
          <View style={signupStyles.iconContainer}>
            <Ionicons name="lock-closed" size={20} color="#6b7280" />
          </View>
          <TextInput
            style={signupStyles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#6b7280"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoComplete="password"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={signupStyles.eyeButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye-off-outline"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms & Conditions */}
      <View style={signupStyles.termsContainer}>
        <Text style={signupStyles.termsText}>
          By signing up, you agree to our{" "}
          <Text style={signupStyles.termsLink}>Terms</Text> and{" "}
          <Text style={signupStyles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleSignUp}
        activeOpacity={0.8}
        style={signupStyles.signUpButton}
      >
        <LinearGradient
          colors={["#ffd700", "#ffed4e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={signupStyles.signUpGradient}
        >
          <Text style={signupStyles.signUpText}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Divider */}
      <View style={signupStyles.divider}>
        <View style={signupStyles.dividerLine} />
        <Text style={signupStyles.dividerText}>or sign up with</Text>
        <View style={signupStyles.dividerLine} />
      </View>

      {/* Social Sign Up */}
      <View style={signupStyles.socialContainer}>
        <TouchableOpacity style={signupStyles.socialButton} activeOpacity={0.8}>
          <Text style={signupStyles.socialIcon}>G</Text>
          <Text style={signupStyles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={signupStyles.socialButton} activeOpacity={0.8}>
          <Text style={signupStyles.socialIcon}>⚫</Text>
          <Text style={signupStyles.socialText}>GitHub</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
