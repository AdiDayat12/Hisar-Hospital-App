import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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
// Komponen utama untuk halaman Daftar
// -----------------------------------------------------------------------------

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Fungsi untuk menangani proses pendaftaran
  const handleSignUp = () => {
    // Ini adalah langkah pendaftaran. Untuk data pasien lainnya (seperti
    // permintaan atau data pribadi), buat proses terpisah di halaman lain
    // setelah pengguna berhasil login.
    router.replace("/(auth)/login");
  };

  // Fungsi untuk navigasi kembali ke halaman login
  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <View className="flex-1">
      <LinearGradient colors={["#4299e1", "#89cff0"]} className="flex-1">
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
                  Daftar Sekarang
                </Text>
                <Text className="text-base text-white/90 text-center">
                  Buat akun untuk memulai perjalanan Anda.
                </Text>
              </View>

              <View className="w-full bg-white/30 rounded-lg p-6 backdrop-blur-lg">
                <Text className="text-sm text-white font-semibold mb-2">
                  First Name
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan nama Anda"
                  value={firstName}
                  onChangeText={setFirstName}
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  Last Name
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan nama Anda"
                  value={lastName}
                  onChangeText={setLastName}
                />

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
                  placeholder="Buat password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  className="bg-white h-12 rounded-lg justify-center items-center mt-2 shadow-lg shadow-gray-400"
                  onPress={handleSignUp}
                >
                  <Text className="text-blue-500 text-lg font-bold">
                    Daftar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin}>
                  <Text className="mt-5 text-sm text-white text-center">
                    Sudah punya akun?{" "}
                    <Text className="font-semibold">Login di sini.</Text>
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
