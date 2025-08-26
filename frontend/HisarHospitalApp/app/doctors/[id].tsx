// app/doctors/[id].tsx
// Halaman Detail Profil Dokter
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDoctor } from "../../src/hooks/userFetchDoctor";

const DoctorProfile = () => {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { doctor, loading, error } = useDoctor(Number(id));

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 p-6 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-xl font-bold text-gray-700 mt-4">
          {t("loading")}
        </Text>
      </SafeAreaView>
    );
  }

  if (error || !doctor) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 p-6 items-center justify-center">
        <Text className="text-xl font-bold text-gray-700 text-center">
          {t("doctor.notFound")}
        </Text>
        <Text className="text-sm text-gray-500 text-center mt-2">
          {t("error.failedToFetch")}
        </Text>
      </SafeAreaView>
    );
  }

  const handleBookAppointment = () => {
    router.push({
      pathname: "/new-appointment",
      params: { id: doctor.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-6">
        {/* Header dan Foto Profil */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: doctor.photoUrl }}
            className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500 shadow-md"
          />
          <Text className="text-3xl font-bold text-gray-800 text-center">
            {doctor.qualification}. {doctor.firstName} {doctor.lastName}
          </Text>
          <Text className="text-base text-gray-600 mt-1 text-center">
            {doctor.specialization}
          </Text>
        </View>

        {/* Informasi Dokter */}
        <View className="bg-white p-6 rounded-xl shadow-md mb-6">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            {t("doctorProfile.about")}
          </Text>
          <Text className="text-gray-700 leading-6">{doctor.bio}</Text>
        </View>

        {/* Informasi Kontak dan Klinik */}
        <View className="bg-white p-6 rounded-xl shadow-md mb-6">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            {t("doctorProfile.info")}
          </Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="mail-outline" size={20} color="#6b7280" />
            <Text className="ml-2 text-gray-700">{doctor.email}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="call-outline" size={20} color="#6b7280" />
            <Text className="ml-2 text-gray-700">{doctor.phone}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="medkit-outline" size={20} color="#6b7280" />
            <Text className="ml-2 text-gray-700">
              {doctor.practiceLocation}
            </Text>
          </View>
        </View>

        {/* Tombol Aksi */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg shadow-md flex-row items-center justify-center mb-4"
          onPress={handleBookAppointment}
        >
          <Ionicons name="calendar-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            {t("doctorProfile.bookButton")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorProfile;
