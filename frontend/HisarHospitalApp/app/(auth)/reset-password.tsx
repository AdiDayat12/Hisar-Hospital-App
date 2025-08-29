import { useUserContext } from "@/src/context/UserContext";
import CustomAlert from "@/src/customAlert";
import { ResetPasswordRequest } from "@/src/types/user";
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

export default function ResetPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const { resetPassword } = useUserContext();
  const [req, setReq] = useState<ResetPasswordRequest>({
    otp: "",
    newPassword: "",
    email: email as string,
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleResetPassword = () => {
    if (!req.otp || !req.newPassword || !req.newPassword) {
      Alert.alert(t("alert.failTitle"), t("resetPassword.allFieldsRequired"));
      return;
    }

    if (req.newPassword !== confirmNewPassword) {
      Alert.alert(t("alert.failTitle"), t("resetPassword.passwordsDoNotMatch"));
      return;
    }

    // ✅ Kalau sudah valid, baru kirim request
    resetPassword(req)
      .then(() => {
        Alert.alert(
          t("alert.successTitle"),
          t("resetPassword.passwordResetSuccessAlert")
        );
        router.replace("/(auth)/login");
      })
      .catch((error) => {
        console.error("Password reset failed:", error); // Sangat disarankan untuk logging error
        setAlertVisible(true);
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
                  value={req.otp}
                  onChangeText={(text) =>
                    setReq((prev) => ({ ...prev, otp: text }))
                  }
                />

                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("resetPassword.newPasswordLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("resetPassword.newPasswordPlaceholder")}
                  secureTextEntry
                  value={req.newPassword}
                  onChangeText={(text) =>
                    setReq((prev) => ({ ...prev, newPassword: text }))
                  }
                />

                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("resetPassword.confirmPasswordLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                  secureTextEntry
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                />

                <TouchableOpacity
                  className="bg-orange-600 h-12 rounded-lg justify-center items-center mt-2 shadow-lg"
                  onPress={handleResetPassword}
                >
                  <Text className="text-white text-lg font-bold">
                    {t("resetPassword.resetButton")}
                  </Text>
                </TouchableOpacity>
                {/* Komponen Custom Alert */}
                <CustomAlert
                  isVisible={isAlertVisible}
                  onClose={() => setAlertVisible(false)}
                  title={t("login.loginFailedTitle")}
                  message={t("login.loginFailedMessage")}
                />

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
