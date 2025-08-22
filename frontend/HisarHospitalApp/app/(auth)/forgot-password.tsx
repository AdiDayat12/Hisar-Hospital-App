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

// -----------------------------------------------------------------------------
// Komponen utama untuk halaman Lupa Password
// -----------------------------------------------------------------------------

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Fungsi untuk mengirim OTP ke email
  const handleSendOTP = () => {
    // --- Ganti dengan logika nyata untuk mengirim OTP ke email pengguna ---
    // Logika ini harus berinteraksi dengan API backend Anda.
    console.log("Mencoba mengirim OTP ke:", email);

    if (!email) {
      Alert.alert("Gagal", "Silakan masukkan alamat email Anda.");
      return;
    }

    // Simulasi respons berhasil
    Alert.alert("Berhasil", "OTP telah dikirim ke email Anda.");

    // Arahkan ke halaman reset password, bisa dengan membawa parameter email
    router.replace({
      pathname: "/(auth)/reset-password",
      params: { email: email },
    });
  };

  return (
    <View className="flex-1">
      <LinearGradient colors={["#4299e1", "#89cff0"]} className="flex-1">
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 px-6 justify-center"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              <View className="items-center mb-10">
                <Text className="text-3xl font-bold text-white mb-2 text-center">
                  Lupa Password?
                </Text>
                <Text className="text-base text-white/90 text-center">
                  Masukkan email Anda. Kami akan mengirimkan kode OTP untuk
                  mengatur ulang password.
                </Text>
              </View>

              <View className="w-full bg-white/30 rounded-lg p-6 backdrop-blur-lg">
                <Text className="text-sm text-white font-semibold mb-2">
                  Email
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan email terdaftar Anda"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  className="bg-white h-12 rounded-lg justify-center items-center mt-2 shadow-lg shadow-gray-400"
                  onPress={handleSendOTP}
                >
                  <Text className="text-blue-500 text-lg font-bold">
                    Kirim OTP
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="mt-5 text-sm text-white text-center">
                    <Text className="font-semibold">
                      Kembali ke halaman Login
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
