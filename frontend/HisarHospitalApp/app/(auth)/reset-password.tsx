import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// -----------------------------------------------------------------------------
// Main component for the Reset Password page
// -----------------------------------------------------------------------------

export default function ResetPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Mengambil email dari parameter URL
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle the password reset process
  const handleResetPassword = () => {
    // --- Replace with actual logic to verify OTP and reset password ---
    // This logic should interact with your backend API.
    console.log(t("resetPassword.resettingFor"), email);

    if (!otp || !newPassword || !confirmPassword) {
      Alert.alert(t("alert.failTitle"), t("resetPassword.allFieldsRequired"));
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(t("alert.failTitle"), t("resetPassword.passwordsDoNotMatch"));
      return;
    }

    // Simulate a successful process
    console.log(t("resetPassword.passwordResetSuccessLog"));
    Alert.alert(
      t("alert.successTitle"),
      t("resetPassword.passwordResetSuccessAlert")
    );

    // Navigate back to the login page after success
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <LinearGradient colors={["#D13011", "#2563EB"]} className="flex-1">
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 px-6 justify-center"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              <View className="items-center mb-8 mt-16">
                <Ionicons
                  name="key-outline"
                  size={80}
                  color="white"
                  className="mb-4"
                />
                <Text className="text-3xl font-bold text-white mb-2 text-center">
                  {t("resetPassword.title")}
                </Text>
                <Text className="text-base text-white/90 text-center px-4">
                  {t("resetPassword.description", { email })}
                </Text>
              </View>

              <View className="w-full bg-white rounded-2xl p-6 shadow-xl">
                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("resetPassword.otpLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("resetPassword.otpPlaceholder")}
                  keyboardType="numeric"
                  value={otp}
                  onChangeText={setOtp}
                />

                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("resetPassword.newPasswordLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("resetPassword.newPasswordPlaceholder")}
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />

                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("resetPassword.confirmPasswordLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                  className="bg-orange-600 h-12 rounded-lg justify-center items-center mt-2 shadow-lg"
                  onPress={handleResetPassword}
                >
                  <Text className="text-white text-lg font-bold">
                    {t("resetPassword.resetButton")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="mt-5 text-sm text-gray-600 text-center">
                    <Text className="font-semibold text-blue-700">
                      {t("resetPassword.backButton")}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
