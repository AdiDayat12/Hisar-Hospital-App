import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
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
// Komponen utama untuk halaman Reset Password
// -----------------------------------------------------------------------------

export default function ResetPassword() {
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Mengambil email dari parameter URL
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fungsi untuk menangani proses reset password
  const handleResetPassword = () => {
    // --- Ganti dengan logika nyata untuk memverifikasi OTP dan mengatur ulang password ---
    // Logika ini harus berinteraksi dengan API backend Anda.
    console.log("Mencoba mengatur ulang password untuk:", email);

    if (!otp || !newPassword || !confirmPassword) {
      Alert.alert("Gagal", "Semua bidang harus diisi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Gagal", "Password baru tidak cocok.");
      return;
    }

    // Simulasi proses berhasil
    console.log("Password berhasil diatur ulang.");
    Alert.alert(
      "Berhasil",
      "Password Anda telah berhasil diatur ulang. Silakan login dengan password baru."
    );

    // Arahkan kembali ke halaman login setelah berhasil
    router.replace("/(auth)/login");
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
                  Atur Ulang Password
                </Text>
                <Text className="text-base text-white/90 text-center">
                  Masukkan kode OTP yang dikirim ke{" "}
                  <Text className="font-semibold">{email}</Text> dan password
                  baru Anda.
                </Text>
              </View>

              <View className="w-full bg-white/30 rounded-lg p-6 backdrop-blur-lg">
                <Text className="text-sm text-white font-semibold mb-2">
                  Kode OTP
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan kode OTP"
                  keyboardType="numeric"
                  value={otp}
                  onChangeText={setOtp}
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  Password Baru
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Buat password baru"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  Konfirmasi Password Baru
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Konfirmasi password baru"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                  className="bg-white h-12 rounded-lg justify-center items-center mt-2 shadow-lg shadow-gray-400"
                  onPress={handleResetPassword}
                >
                  <Text className="text-blue-500 text-lg font-bold">
                    Atur Ulang
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="mt-5 text-sm text-white text-center">
                    <Text className="font-semibold">Kembali</Text>
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
