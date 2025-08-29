import { useUserContext } from "@/src/context/UserContext";
import { Doctor } from "@/src/types/doctor";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

// --- Komponen Halaman Profil ---
export default function ProfileScreen() {
  const { t } = useTranslation();
  const { user, loading, error, logout } = useUserContext();

  const doctor = user as Doctor;
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 p-6 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-xl font-bold text-gray-700 mt-4">
          {t("profile.loading")}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <View className="items-center mb-6">
          <View className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500 shadow-md overflow-hidden">
            <Image
              source={{ uri: doctor?.photoUrl }}
              className="w-full h-full"
            />
          </View>
          <Text className="text-3xl font-bold text-gray-800 text-center">
            {t("doctor.namePrefix")} {doctor?.firstName} {doctor?.lastName}
          </Text>
          <Text className="text-base text-gray-600 mt-1 text-center">
            {doctor?.specialization}
          </Text>
        </View>
        <View className="bg-white p-6 rounded-xl shadow-md mb-6">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            {t("doctorProfile.about")}
          </Text>
          <Text className="text-gray-700 leading-6">{doctor?.bio}</Text>
        </View>
        <View className="bg-white p-6 rounded-xl shadow-md mb-6">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            {t("doctorProfile.info")}
          </Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="mail-outline" size={20} color="#6b7280" />
            <Text className="ml-2 text-gray-700">{doctor?.email}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="call-outline" size={20} color="#6b7280" />
            <Text className="ml-2 text-gray-700">{doctor?.phone}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={20} color="#6b7280" />
            <Text className="ml-2 text-gray-700">
              {doctor?.practiceLocation}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          // Updated: Added a stronger shadow
          className="bg-red-500 p-4 rounded-lg shadow-md flex-row items-center justify-center"
          onPress={async () => {
            await logout();
            router.replace("/(auth)/login");
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            {t("profile.logoutButton")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
