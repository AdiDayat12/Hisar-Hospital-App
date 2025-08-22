import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { usePatient } from "./hooks/useFetchPatient";

// -----------------------------------------------------------------------------
// Komponen utama untuk halaman Pembaruan Profil
// -----------------------------------------------------------------------------

export default function UpdateProfile() {
  const { patient, loading, error } = usePatient();

  // Ganti dengan data pengguna nyata yang dimuat dari state atau API
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("081234567890");
  const [address, setAddress] = useState("Jl. Contoh No. 123, Jakarta");
  const [dateOfBirth, setDateOfBirth] = useState("01/01/1990");
  const router = useRouter();

  // isi form otomatis begitu patient tersedia
  useEffect(() => {
    if (patient) {
      const parts = patient.name.split(" ");
      const firstName = parts[0];
      const lastName = parts.slice(1).join(" ");

      setFirstName(firstName);
      setLastName(lastName);
      setIdNumber(patient.idNumber ?? "");
      setPhoneNumber(patient.phone ?? "");
      setAddress(patient.address ?? "");
      setDateOfBirth(patient.birthDate ?? "");
    }
  }, [patient]);

  // Fungsi untuk menyimpan perubahan profil
  const handleSaveProfile = () => {
    // --- Ganti dengan logika nyata untuk memperbarui data di backend ---
    // Pastikan Anda memvalidasi setiap bidang sebelum mengirimnya.
    console.log("Menyimpan perubahan profil:", {
      firstName,
      lastName,
      phoneNumber,
      address,
      dateOfBirth,
    });

    Alert.alert("Berhasil", "Profil Anda telah berhasil diperbarui.");

    // Opsional: Arahkan pengguna kembali ke halaman utama atau tab lain
    // router.replace('/(tabs)');
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
                <Text className="text-3xl font-bold text-white mb-2">
                  Lengkapi Profil Anda
                </Text>
                <Text className="text-base text-white/90 text-center">
                  Kami membutuhkan informasi ini untuk janji temu Anda.
                </Text>
              </View>

              <View className="w-full bg-white/30 rounded-lg p-6 backdrop-blur-lg">
                <Text className="text-sm text-white font-semibold mb-2">
                  Firstname
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan nama lengkap"
                  value={firstName}
                  onChangeText={setFirstName}
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  Lastname
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan nama lengkap"
                  value={lastName}
                  onChangeText={setLastName}
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  ID Number
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan ID number"
                  keyboardType="phone-pad"
                  value={idNumber}
                  onChangeText={setIdNumber}
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  Nomor Telepon
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan nomor telepon"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  Tanggal Lahir
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Contoh: 01/01/1990"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                />

                <Text className="text-sm text-white font-semibold mb-2">
                  Alamat Lengkap
                </Text>
                <TextInput
                  className="bg-white/80 h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder="Masukkan alamat lengkap Anda"
                  value={address}
                  onChangeText={setAddress}
                  multiline={true}
                  numberOfLines={4}
                />

                <TouchableOpacity
                  className="bg-white h-12 rounded-lg justify-center items-center mt-2 shadow-lg shadow-gray-400"
                  onPress={handleSaveProfile}
                >
                  <Text className="text-blue-500 text-lg font-bold">
                    Simpan Perubahan
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
