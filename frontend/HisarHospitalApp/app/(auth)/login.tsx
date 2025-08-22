import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import { login } from "../util/api";
// -----------------------------------------------------------------------------
// Komponen utama untuk halaman Login
// -----------------------------------------------------------------------------

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Fungsi untuk menangani proses login
  const handleLogin = async () => {
    try {
      const token = await login({ email, password });
      console.log("JWT Token:", token);
      Alert.alert("Login sukses!");
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
      Alert.alert("Login gagal!");
    }
  };

  // Fungsi untuk navigasi ke halaman signup
  const handleSignUp = () => {
    // Arahkan pengguna ke halaman signup
    router.push("/(auth)/signup");
  };

  const handleResetPassword = () => {
    // Arahkan pengguna ke halaman signup
    router.push("/(auth)/forgot-password");
  };

  return (
    <View className="flex-1">
      <LinearGradient colors={["#89cff0", "#4299e1"]} className="flex-1">
        <SafeAreaView className="flex-1">
          {/* Ikon globe diposisikan secara absolut di kiri atas */}
          <View className="absolute top-10 right-6 z-10 w-12 h-12 bg-white/50 rounded-full items-center justify-center shadow-md">
            <Ionicons name="globe-outline" size={24} color="#6b7280" />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 px-6 justify-center"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              <View className="items-center mb-10">
                <Text className="text-3xl font-bold text-white mb-2">
                  Selamat Datang Kembali!
                </Text>
                <Text className="text-base text-white/90 text-center">
                  Silakan login untuk melanjutkan ke akun Anda.
                </Text>
              </View>

              <View className="w-full bg-white/30 rounded-lg p-6 backdrop-blur-lg">
                <Text className="text-sm text-white font-semibold mb-2">
                  Email
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan email Anda"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  Password
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  className="bg-white h-12 rounded-lg justify-center items-center mt-2 shadow-lg shadow-gray-400"
                  onPress={handleLogin}
                >
                  <Text className="text-blue-500 text-lg font-bold">Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignUp}>
                  <Text className="mt-5 text-sm text-white text-center">
                    Belum punya akun?{" "}
                    <Text className="font-semibold">Daftar di sini.</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleResetPassword}>
                  <Text className="mt-5 text-sm text-white text-center">
                    Lupa password? Password{" "}
                    <Text className="font-semibold">Daftar di sini.</Text>
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
