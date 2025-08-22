// app/doctors/[id].tsx
// Halaman Detail Profil Dokter
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Data tiruan untuk dokter
// Data ini harusnya diambil dari API, tapi untuk contoh kita gunakan data yang sama
const DUMMY_DOCTORS = [
  {
    id: "1",
    name: "Dr. John Doe",
    specialty: "General Practitioner",
    imageUrl: "https://placehold.co/400x400/2563eb/white?text=Dr+John",
    bio: "Dr. John Doe memiliki pengalaman lebih dari 10 tahun di bidang kedokteran umum. Beliau berdedikasi untuk memberikan perawatan terbaik bagi pasien dari segala usia.",
    clinic: "Hisar Medical Center",
    address: "Jl. Hisar Raya No. 12, Jakarta",
  },
  {
    id: "2",
    name: "Dr. Jane Smith",
    specialty: "Pediatrician",
    imageUrl: "https://placehold.co/400x400/ef4444/white?text=Dr+Jane",
    bio: "Dr. Jane Smith adalah seorang dokter anak yang bersemangat untuk membantu anak-anak tumbuh sehat. Fokusnya adalah pada imunisasi, gizi anak, dan penyakit umum pada anak-anak.",
    clinic: "Hisar Anak Sehat",
    address: "Jl. Anak Bahagia No. 5, Jakarta",
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    imageUrl: "https://placehold.co/400x400/10b981/white?text=Dr+Michael",
    bio: "Sebagai seorang kardiolog, Dr. Michael Chen memiliki keahlian dalam mendiagnosis dan mengobati penyakit jantung dan pembuluh darah. Beliau berkomitmen untuk meningkatkan kesehatan jantung pasiennya.",
    clinic: "Hisar Heart Clinic",
    address: "Jl. Jantung Sehat No. 34, Jakarta",
  },
  {
    id: "4",
    name: "Dr. Emily White",
    specialty: "Dermatologist",
    imageUrl: "https://placehold.co/400x400/f59e0b/white?text=Dr+Emily",
    bio: "Dr. Emily White adalah seorang ahli kulit yang berfokus pada perawatan jerawat, eksim, dan masalah kulit lainnya. Beliau selalu memberikan solusi yang personal dan efektif.",
    clinic: "Hisar Skin Center",
    address: "Jl. Kulit Cantik No. 7, Jakarta",
  },
  {
    id: "5",
    name: "Dr. Adam Brown",
    specialty: "Neurologist",
    imageUrl: "https://placehold.co/400x400/6366f1/white?text=Dr+Adam",
    bio: "Dengan pengalaman luas dalam neurologi, Dr. Adam Brown menangani gangguan yang berkaitan dengan otak, sumsum tulang belakang, dan sistem saraf. Beliau mengutamakan diagnosa yang akurat dan perawatan yang komprehensif.",
    clinic: "Hisar Neurology",
    address: "Jl. Saraf Sehat No. 22, Jakarta",
  },
  {
    id: "6",
    name: "Dr. Olivia Kim",
    specialty: "Oncologist",
    imageUrl: "https://placehold.co/400x400/ec4899/white?text=Dr+Olivia",
    bio: "Dr. Olivia Kim adalah seorang onkolog yang memiliki spesialisasi dalam pengobatan kanker. Beliau berdedikasi untuk memberikan perawatan yang berempati dan berbasis bukti kepada setiap pasien.",
    clinic: "Hisar Oncology Center",
    address: "Jl. Kanker No. 99, Jakarta",
  },
];

const DoctorProfile = () => {
  // Ambil ID dari parameter URL
  const { id } = useLocalSearchParams();

  // Cari data dokter yang sesuai dengan ID
  const doctor = DUMMY_DOCTORS.find((d) => d.id === id);

  // Jika dokter tidak ditemukan, tampilkan pesan
  if (!doctor) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 p-6 items-center justify-center">
        <Text className="text-xl font-bold text-gray-700">
          Dokter tidak ditemukan.
        </Text>
      </SafeAreaView>
    );
  }

  // Handle navigasi ke halaman buat janji temu
  const handleBookAppointment = () => {
    // Navigasi ke halaman janji temu dan kirim ID dokter
    router.push({
      pathname: "/new-appointment",
      params: { doctorId: doctor.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-6">
        {/* Header dan Foto Profil */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: doctor.imageUrl }}
            className="w-32 h-32 rounded-full mb-4 border-2 border-blue-500"
          />
          <Text className="text-3xl font-bold text-gray-800">
            {doctor.name}
          </Text>
          <Text className="text-base text-gray-600 mt-1">
            {doctor.specialty}
          </Text>
        </View>

        {/* Informasi Dokter */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-xl font-semibold mb-4">Tentang Dokter</Text>
          <Text className="text-gray-700 leading-6">{doctor.bio}</Text>
        </View>

        {/* Informasi Klinik */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-xl font-semibold mb-4">Lokasi Praktik</Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="medkit-outline" size={20} color="#4b5563" />
            <Text className="ml-2 text-gray-700">{doctor.clinic}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="#4b5563" />
            <Text className="ml-2 text-gray-700">{doctor.address}</Text>
          </View>
        </View>

        {/* Tombol Aksi */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg shadow-md flex-row items-center justify-center"
          onPress={handleBookAppointment}
        >
          <Ionicons name="calendar-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            Buat Janji Temu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorProfile;
