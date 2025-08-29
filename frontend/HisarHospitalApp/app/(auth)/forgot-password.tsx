import { useUserContext } from "@/src/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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
// Komponen utama untuk halaman Lupa Password
// -----------------------------------------------------------------------------

export default function ForgotPassword() {
  const { t } = useTranslation();
  const { sendOtp } = useUserContext();
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Fungsi untuk mengirim OTP ke email
  const handleSendOTP = () => {
    if (!email) {
      Alert.alert(t("alert.failTitle"), t("forgotPassword.enterEmailPrompt"));
      return;
    }

    sendOtp(email);
    // Simulasi respons berhasil
    Alert.alert(t("alert.successTitle"), t("forgotPassword.otpSentMessage"));

    // Arahkan ke halaman reset password, bisa dengan membawa parameter email
    router.replace({
      pathname: "/(auth)/reset-password",
      params: { email: email },
    });
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
                  name="lock-closed-outline"
                  size={80}
                  color="white"
                  className="mb-4"
                />
                <Text className="text-3xl font-bold text-white mb-2 text-center">
                  {t("forgotPassword.title")}
                </Text>
                <Text className="text-base text-white/90 text-center px-4">
                  {t("forgotPassword.description")}
                </Text>
              </View>

              <View className="w-full bg-white rounded-2xl p-6 shadow-xl">
                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("forgotPassword.emailLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  className="bg-orange-600 h-12 rounded-lg justify-center items-center mt-2 shadow-lg"
                  onPress={handleSendOTP}
                >
                  <Text className="text-white text-lg font-bold">
                    {t("forgotPassword.sendOtpButton")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="mt-5 text-sm text-center text-gray-600">
                    <Text className="font-semibold text-blue-700">
                      {t("forgotPassword.backToLogin")}
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
