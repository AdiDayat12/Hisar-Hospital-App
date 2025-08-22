// app/new-appointment.tsx
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Impor pustaka kalender. Pastikan Anda sudah menginstalnya dengan 'npm install react-native-calendars'
import { Calendar } from "react-native-calendars";

// Data tiruan untuk dokter
const DUMMY_DOCTORS = [
  {
    id: "1",
    name: "Dr. John Doe",
    specialty: "General Practitioner",
    imageUrl: "https://placehold.co/400x400/2563eb/white?text=Dr+John",
  },
  {
    id: "2",
    name: "Dr. Jane Smith",
    specialty: "Pediatrician",
    imageUrl: "https://placehold.co/400x400/ef4444/white?text=Dr+Jane",
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    imageUrl: "https://placehold.co/400x400/10b981/white?text=Dr+Michael",
  },
  {
    id: "4",
    name: "Dr. Emily White",
    specialty: "Dermatologist",
    imageUrl: "https://placehold.co/400x400/f59e0b/white?text=Dr+Emily",
  },
  {
    id: "5",
    name: "Dr. Adam Brown",
    specialty: "Neurologist",
    imageUrl: "https://placehold.co/400x400/6366f1/white?text=Dr+Adam",
  },
  {
    id: "6",
    name: "Dr. Olivia Kim",
    specialty: "Oncologist",
    imageUrl: "https://placehold.co/400x400/ec4899/white?text=Dr+Olivia",
  },
];

// Data tiruan untuk slot waktu
const DUMMY_TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const NewAppointment = () => {
  // Fungsi untuk mengarahkan pengguna ke halaman profil
  const handleCompleteProfile = () => {
    // Asumsi: Halaman profil berada di rute '(tabs)/profile'
    router.push("/(tabs)/profile");
  };
  // Ambil ID dokter dari parameter URL
  const { doctorId } = useLocalSearchParams();
  const doctor = DUMMY_DOCTORS.find((d) => d.id === doctorId);

  // State untuk melacak tanggal dan waktu yang dipilih
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    // Reset waktu saat tanggal diubah
    setSelectedTime("");
  };

  const handleTimePress = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    // Validasi apakah tanggal dan waktu sudah dipilih
    if (!selectedDate || !selectedTime) {
      // Gunakan Alert sebagai pengganti confirm()
      Alert.alert("Peringatan", "Mohon pilih tanggal dan waktu janji temu.");
      return;
    }

    // Logika untuk mengonfirmasi janji temu
    console.log(
      `Janji temu dikonfirmasi untuk Dr. ${
        doctor?.name || "terpilih"
      } pada ${selectedDate} pukul ${selectedTime}`
    );
    Alert.alert(
      "Konfirmasi Berhasil",
      `Janji temu Anda dengan Dr. ${
        doctor?.name || "terpilih"
      } pada ${selectedDate} pukul ${selectedTime} telah berhasil dibuat!`,
      [{ text: "OK", onPress: () => router.replace("/appointment") }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 text-center">
          Buat Janji Temu
        </Text>

        {/* Banner peringatan di bagian atas */}
        {/* Catatan: Di sini adalah tempat Anda akan menambahkan logika untuk
          menampilkan banner hanya jika profil pengguna belum lengkap.
          Contoh: {isProfileComplete ? null : ( <View>...</View> )}
      */}
        <View className="mx-4 mt-4 mb-5 p-4 bg-amber-100 rounded-lg border border-amber-300 flex-row items-center space-x-3 shadow-sm">
          <Ionicons name="alert-circle-outline" size={24} color="#b45309" />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-amber-800">
              Untuk membuat janji temu, mohon lengkapi profil Anda terlebih
              dahulu.
            </Text>
          </View>
          <TouchableOpacity onPress={handleCompleteProfile} className="ml-2">
            <Text className="text-sm font-bold text-amber-800 underline">
              Lengkapi Sekarang
            </Text>
          </TouchableOpacity>
        </View>

        {/* Doctor Info Section */}
        {doctor ? (
          <View className="bg-white p-6 rounded-lg shadow-sm mb-6 items-center">
            <Image
              source={{ uri: doctor.imageUrl }}
              className="w-24 h-24 rounded-full mb-4"
            />
            <Text className="text-xl font-bold text-gray-800">
              {doctor.name}
            </Text>
            <Text className="text-base text-gray-600">{doctor.specialty}</Text>
          </View>
        ) : (
          <View className="bg-white p-6 rounded-lg shadow-sm mb-6 items-center">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Pilih Dokter
            </Text>
            <Text className="text-gray-600 mb-4 text-center">
              Anda bisa memilih dokter dari daftar di bawah ini atau mencari
              spesialisasi yang Anda butuhkan.
            </Text>
            <TouchableOpacity
              className="bg-blue-600 p-3 rounded-lg flex-row items-center justify-center w-full"
              onPress={() => router.push("/doctors")}
            >
              <Ionicons name="search" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Cari Dokter</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Appointment Form */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-xl font-semibold mb-4">
            Pilih Tanggal & Waktu
          </Text>

          {/* Kalender untuk memilih tanggal */}
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                dotColor: "white",
              },
            }}
            theme={{
              todayTextColor: "#2563eb",
              selectedDayBackgroundColor: "#2563eb",
            }}
            // Render panah navigasi kustom
            renderArrow={(direction) => (
              <Ionicons
                name={direction === "left" ? "chevron-back" : "chevron-forward"}
                size={24}
                color="#6b7280"
              />
            )}
          />

          {/* Slot waktu */}
          <View className="mt-6">
            <Text className="text-lg font-semibold mb-3">Pilih Slot Waktu</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {DUMMY_TIME_SLOTS.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  className={`p-3 rounded-lg mr-2 border ${
                    selectedTime === time
                      ? "bg-blue-500 border-blue-500"
                      : "bg-gray-100 border-gray-300"
                  }`}
                  onPress={() => handleTimePress(time)}
                >
                  <Text
                    className={
                      selectedTime === time
                        ? "text-white font-semibold"
                        : "text-gray-700"
                    }
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Confirmation Button */}
        <TouchableOpacity
          className={`p-4 rounded-lg shadow-md flex-row items-center justify-center mb-20 ${
            !selectedDate || !selectedTime ? "bg-gray-400" : "bg-blue-600"
          }`}
          onPress={handleConfirmAppointment}
          disabled={!selectedDate || !selectedTime}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            Konfirmasi Janji Temu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewAppointment;
