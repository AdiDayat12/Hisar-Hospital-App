// app/(tabs)/index.tsx
// Halaman Home
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePatient } from "../hooks/useFetchPatient";
const Home = () => {
  const { patient, loading, error } = usePatient();
  const firstName = patient?.name.split(" ")[0];

  const handleNewAppointment = () => {
    router.push("/new-appointment");
  };

  const handleInfoCenter = () => {
    router.push("/info-center");
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        {/* Header Section */}
        <View className="flex-row items-center justify-between mb-8 mt-6">
          <View>
            <Text className="text-3xl font-bold text-gray-800">
              Hello, {firstName}!
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Selamat datang kembali
            </Text>
          </View>
          <View className="w-12 h-12 bg-gray-300 rounded-full items-center justify-center">
            <Ionicons name="globe-outline" size={24} color="#6b7280" />
          </View>
        </View>

        {/* Upcoming Appointment Section */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-xl font-bold mb-4">Janji Temu Mendatang</Text>
          <View className="border-l-4 border-blue-500 pl-4 py-2">
            <Text className="text-lg font-semibold text-gray-800">
              Dr. Sarah Johnson
            </Text>
            <Text className="text-sm text-gray-600">Spesialis Jantung</Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="calendar-outline" size={16} color="#4b5563" />
              <Text className="ml-2 text-gray-600">
                Selasa, 22 Agustus 2025
              </Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="time-outline" size={16} color="#4b5563" />
              <Text className="ml-2 text-gray-600">10:30 AM</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold mb-4">Aksi Cepat</Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Find a Doctor Card */}
            <TouchableOpacity
              className="w-[48%] bg-white p-5 rounded-lg shadow-sm items-center mb-4"
              onPress={() => router.push("/doctors")}
            >
              <MaterialCommunityIcons name="doctor" size={48} color="#2563eb" />
              <Text className="mt-3 text-base font-semibold text-center">
                Temukan Dokter
              </Text>
            </TouchableOpacity>

            {/* Book Appointment Card */}
            <TouchableOpacity
              className="w-[48%] bg-white p-5 rounded-lg shadow-sm items-center mb-4"
              onPress={handleNewAppointment}
            >
              <MaterialCommunityIcons
                name="calendar-plus"
                size={48}
                color="#2563eb"
              />
              <Text className="mt-3 text-base font-semibold text-center">
                Buat Janji Temu
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* General Info Card */}
        <TouchableOpacity
          className="bg-blue-50 p-6 rounded-lg shadow-sm"
          onPress={handleInfoCenter}
        >
          <Text className="text-lg font-semibold text-gray-700">
            Pusat Informasi Kesehatan
          </Text>
          <Text className="mt-2 text-gray-600">
            Temukan artikel, tips, dan panduan kesehatan dari para ahli medis
            kami.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
