import i18n from "@/src/i18n/i18n";
import { signup } from "@/src/util/api/auth";
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
// Komponen utama untuk halaman Daftar
// -----------------------------------------------------------------------------

export default function SignUp() {
  const { t } = useTranslation();
  const [identityNumber, setIdentityNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    setError(null); // reset error
    try {
      const response = await signup({
        identityNumber,
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        // Register berhasil → redirect ke login
        Alert.alert(t("alert.successTitle"), t("signUp.successMessage"));
        router.replace("/(auth)/login");
      } else {
        // Register gagal → tampilkan message
        setError(response.message || t("signUp.registerFailed"));
      }
    } catch (err: any) {
      // Error network / axios
      setError(err.response?.data?.message || t("signUp.somethingWentWrong"));
    }
  };

  // Fungsi untuk navigasi kembali ke halaman login
  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
    setLanguageModalVisible(false);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <LinearGradient colors={["#D13011", "#2563EB"]} className="flex-1">
        <SafeAreaView className="flex-1">
          {/* Ikon globe diposisikan secara absolut di kanan atas */}
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
              <View className="items-center mb-8 mt-16">
                <Ionicons
                  name="person-add-outline"
                  size={80}
                  color="white"
                  className="mb-4"
                />
                <Text className="text-3xl font-bold text-white mb-2 text-center">
                  {t("signUp.title")}
                </Text>
                <Text className="text-base text-white/90 text-center px-4">
                  {t("signUp.instruction")}
                </Text>
              </View>

              <View className="w-full bg-white rounded-2xl p-6 shadow-xl">
                {error && (
                  <Text className="text-red-500 text-center mb-4 font-semibold">
                    {error}
                  </Text>
                )}
                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("signUp.identityNumberLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("signUp.identityNumberPlaceholder")}
                  value={identityNumber}
                  onChangeText={setIdentityNumber}
                />
                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("signUp.firstNameLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("signUp.namePlaceholder")}
                  value={firstName}
                  onChangeText={setFirstName}
                />

                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("signUp.lastNameLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("signUp.namePlaceholder")}
                  value={lastName}
                  onChangeText={setLastName}
                />

                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("signUp.emailLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("signUp.emailPlaceholder")}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />

                <Text className="text-sm text-gray-700 font-semibold mb-2">
                  {t("signUp.passwordLabel")}
                </Text>
                <TextInput
                  className="bg-gray-100 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 border border-gray-200"
                  placeholder={t("signUp.passwordPlaceholder")}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  className="bg-orange-600 h-12 rounded-lg justify-center items-center mt-2 shadow-lg"
                  onPress={handleSignUp}
                >
                  <Text className="text-white text-lg font-bold">
                    {t("signUp.signUpButton")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin}>
                  <Text className="mt-5 text-sm text-center text-gray-600">
                    {t("signUp.haveAccount")}{" "}
                    <Text className="font-semibold text-blue-700">
                      {t("signUp.loginLink")}
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
        onRequestClose={() => {
          setLanguageModalVisible(!isLanguageModalVisible);
        }}
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
            {/* Opsi Turki */}
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
