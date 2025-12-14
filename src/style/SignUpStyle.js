import { StyleSheet } from "react-native";

const signupStyles = StyleSheet.create({
  formCard: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#98c1d9",
    fontWeight: "600",
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(26, 31, 58, 0.6)",
    borderWidth: 2,
    borderColor: "rgba(0, 240, 255, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 52,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    padding: 10,
  },
  eyeButton: {
    padding: 8,
  },
  termsContainer: {
    marginTop: 4,
  },
  termsText: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#98c1d9",
    textAlign: "center",
    lineHeight: 16,
  },
  termsLink: {
    color: "#00f0ff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  signUpButton: {
    marginTop: 8,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#ffd700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  signUpGradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderColor: "#000",
  },
  signUpText: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#0a0e27",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 240, 255, 0.2)",
  },
  dividerText: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#6b7280",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(26, 31, 58, 0.6)",
    borderWidth: 2,
    borderColor: "rgba(0, 240, 255, 0.3)",
    borderRadius: 10,
    paddingVertical: 12,
    gap: 8,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00f0ff",
  },
  socialText: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#fff",
    fontWeight: "600",
  },
});

export default signupStyles;
