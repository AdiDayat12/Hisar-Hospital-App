// Halaman Doctors
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
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
  {
    id: "7",
    name: "Dr. Olivia Kim",
    specialty: "Oncologist",
    imageUrl: "https://placehold.co/400x400/ec4899/white?text=Dr+Olivia",
  },
  {
    id: "8",
    name: "Dr. Olivia Kim",
    specialty: "Oncologist",
    imageUrl: "https://placehold.co/400x400/ec4899/white?text=Dr+Olivia",
  },
  {
    id: "9",
    name: "Dr. Olivia Kim",
    specialty: "Oncologist",
    imageUrl: "https://placehold.co/400x400/ec4899/white?text=Dr+Olivia",
  },
  {
    id: "10",
    name: "Dr. Olivia Kim",
    specialty: "Oncologist",
    imageUrl: "https://placehold.co/400x400/ec4899/white?text=Dr+Olivia",
  },
];

const Doctors = () => {
  const handlePressCard = (id: string) => {
    // Navigasi ke halaman detail dokter dengan ID yang dipilih
    router.push(`/doctors/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 mt-4 text-center">
          Temukan Dokter Terbaik
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {DUMMY_DOCTORS.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              className="w-[48%] mb-4 p-4 bg-white rounded-lg shadow-md items-center"
              onPress={() => handlePressCard(doctor.id)}
            >
              <Image
                source={{ uri: doctor.imageUrl }}
                className="w-24 h-24 rounded-full mb-3"
              />
              <Text className="font-semibold text-lg text-center">
                {doctor.name}
              </Text>
              <Text className="text-sm text-gray-500 text-center">
                {doctor.specialty}
              </Text>
              <View className="mt-3 w-full">
                <TouchableOpacity
                  className="bg-blue-500 p-2 rounded-md flex-row justify-center items-center"
                  onPress={() => handlePressCard(doctor.id)}
                >
                  <Text className="text-white font-semibold mr-2">
                    Lihat Profil
                  </Text>
                  <MaterialIcons
                    name="arrow-right-alt"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Doctors;
