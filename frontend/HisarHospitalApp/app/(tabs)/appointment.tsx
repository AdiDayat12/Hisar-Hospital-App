// app/(tabs)/appointment.tsx
// Halaman Appointment
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Data tiruan untuk janji temu
const DUMMY_APPOINTMENTS = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Spesialis Jantung",
    date: "Selasa, 22 Agustus 2025",
    time: "10:30 AM",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "Jumat, 25 Agustus 2025",
    time: "02:00 PM",
  },
];

const Appointment = () => {
  const handleNewAppointment = () => {
    // Navigasi ke halaman untuk membuat janji temu baru
    router.push("/new-appointment");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 mt-6">Janji Temu Saya</Text>

        {/* Upcoming Appointments List */}
        {DUMMY_APPOINTMENTS.length > 0 ? (
          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4">Mendatang</Text>
            {DUMMY_APPOINTMENTS.map((appointment) => (
              <View
                key={appointment.id}
                className="bg-white p-5 rounded-lg shadow-sm mb-4 border-l-4 border-blue-500"
              >
                <Text className="text-lg font-semibold text-gray-800">
                  {appointment.doctorName}
                </Text>
                <Text className="text-sm text-gray-600">
                  {appointment.specialty}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="calendar-outline" size={16} color="#4b5563" />
                  <Text className="ml-2 text-gray-600">{appointment.date}</Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="time-outline" size={16} color="#4b5563" />
                  <Text className="ml-2 text-gray-600">{appointment.time}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="bg-white p-6 rounded-lg shadow-sm items-center justify-center mb-8">
            <Text className="text-gray-500">
              Tidak ada janji temu mendatang.
            </Text>
          </View>
        )}

        {/* New Appointment Button */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg shadow-md flex-row items-center justify-center"
          onPress={handleNewAppointment}
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            Buat Janji Temu Baru
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointment;
