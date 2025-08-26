import { usePatientContext } from "@/src/context/PatientContext";
import i18n from "@/src/i18n/i18n";
import { login } from "@/src/util/api/patient";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// -----------------------------------------------------------------------------
// Komponen utama untuk halaman Login
// -----------------------------------------------------------------------------

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const router = useRouter();
  const { reloadPatient } = usePatientContext();

  // Fungsi untuk menangani proses login
  const handleLogin = async () => {
    try {
      const token = await login({ email, password });
      await reloadPatient();
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
      Alert.alert(t("alert.failTitle"), t("login.loginFailed"));
    }
  };

  // Fungsi untuk navigasi ke halaman signup
  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  // Fungsi untuk navigasi ke halaman reset password
  const handleResetPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  // Fungsi untuk mengganti bahasa
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguageModalVisible(false);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <LinearGradient colors={["#D13011", "#2563EB"]} className="flex-1">
        <SafeAreaView className="flex-1">
          {/* Ikon globe diposisikan di kanan atas */}
          <TouchableOpacity
            onPress={() => setLanguageModalVisible(true)}
            className="absolute top-10 right-6 z-10 w-12 h-12 bg-white/50 rounded-full items-center justify-center shadow-md"
          >
            <Ionicons name="globe-outline" size={24} color="#6b7280" />
          </TouchableOpacity>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 px-6 justify-center"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              {/* Logo dan Header */}
              <View className="items-center mb-10">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={80}
                  color="white"
                  className="mb-4"
                />
                <Text className="text-3xl font-bold text-white mb-2">
                  {t("login.welcomeBack")}
                </Text>
                <Text className="text-base text-white/90 text-center px-4">
                  {t("login.instruction")}
                </Text>
              </View>

              {/* Form Login */}
              <View className="w-full bg-white rounded-2xl p-6 shadow-xl">
                {/* Email */}
                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("login.emailLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("login.emailPlaceholder")}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />

                {/* Password */}
                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("login.passwordLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("login.passwordPlaceholder")}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                {/* Tombol Login */}
                <TouchableOpacity
                  className="bg-orange-600 h-12 rounded-lg justify-center items-center mt-2 shadow-lg"
                  onPress={handleLogin}
                >
                  <Text className="text-white text-lg font-bold">
                    {t("login.loginButton")}
                  </Text>
                </TouchableOpacity>

                {/* Link Sign Up */}
                <TouchableOpacity onPress={handleSignUp}>
                  <Text className="mt-5 text-sm text-center text-gray-600">
                    {t("login.noAccount")}{" "}
                    <Text className="font-semibold text-orange-600">
                      {t("login.signUpLink")}
                    </Text>
                  </Text>
                </TouchableOpacity>

                {/* Link Reset Password */}
                <TouchableOpacity onPress={handleResetPassword}>
                  <Text className="mt-3 text-sm text-center text-gray-600">
                    {t("login.forgotPassword")}{" "}
                    <Text className="font-semibold text-blue-700">
                      {t("login.resetPasswordLink")}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>

      {/* Modal Pemilihan Bahasa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-3/4 shadow-2xl">
            <Text className="text-xl font-bold mb-4 text-center text-gray-800">
              {t("selectLanguage.title")}
            </Text>

            {/* Opsi Bahasa Indonesia */}
            <TouchableOpacity
              className="flex-row items-center p-3 mb-2 rounded-lg bg-gray-100"
              onPress={() => changeLanguage("id")}
            >
              <Text className="text-3xl mr-3">🇮🇩</Text>
              <Text className="text-base font-semibold text-gray-700">
                Bahasa Indonesia
              </Text>
            </TouchableOpacity>

            {/* Opsi English */}
            <TouchableOpacity
              className="flex-row items-center p-3 mb-2 rounded-lg bg-gray-100"
              onPress={() => changeLanguage("en")}
            >
              <Text className="text-3xl mr-3">🇺🇸</Text>
              <Text className="text-base font-semibold text-gray-700">
                English
              </Text>
            </TouchableOpacity>

            {/* Opsi Türkçe */}
            <TouchableOpacity
              className="flex-row items-center p-3 rounded-lg bg-gray-100"
              onPress={() => changeLanguage("tr")}
            >
              <Text className="text-3xl mr-3">🇹🇷</Text>
              <Text className="text-base font-semibold text-gray-700">
                Türkçe
              </Text>
            </TouchableOpacity>

            {/* Tombol Batal */}
            <TouchableOpacity
              onPress={() => setLanguageModalVisible(false)}
              className="mt-4 p-3 bg-gray-200 rounded-lg items-center"
            >
              <Text className="text-gray-600 font-bold">
                {t("selectLanguage.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
