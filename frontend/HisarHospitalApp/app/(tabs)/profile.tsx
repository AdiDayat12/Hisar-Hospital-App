import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Impor useTranslation
import { useTranslation } from "react-i18next";
import { usePatientContext } from "../../src/context/PatientContext";

const Profile = () => {
  // Gunakan hook useTranslation
  const { t } = useTranslation();
  const { patient, loading, error, reloadPatient } = usePatientContext();

  const handleEditProfile = () => {
    router.push("/update-profile");
  };

  useFocusEffect(
    useCallback(() => {
      reloadPatient();
    }, [reloadPatient])
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-lg text-gray-600">{t("loading")}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-6">
        <Text className="text-red-500 text-lg text-center font-semibold">
          {t("error.failedToFetch")}
        </Text>
        <Text className="text-red-400 text-sm mt-2 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 mt-7 text-center text-gray-800">
          {t("profile.title")}
        </Text>

        {/* Profile Header Section */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center overflow-hidden border-2 border-gray-300">
            {/* Mengganti uri image dengan placeholder. Periksa kembali properti 'photoUrl' dari objek patient */}
            <Image
              source={{
                uri:
                  patient?.birthDate ||
                  "https://placehold.co/150x150/E5E7EB/4B5563?text=user",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-bold mt-4 text-gray-800">
            {patient?.name}
          </Text>
          <Text className="text-gray-500 text-sm">{patient?.email}</Text>
        </View>

        {/* Profile Details Section */}
        <View className="bg-white p-6 rounded-xl shadow-md mb-6">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            {t("profile.personalInfo")}
          </Text>
          <View className="flex-row items-center mb-4">
            <Ionicons name="card-outline" size={20} color="#6b7280" />
            <View className="ml-4">
              <Text className="text-sm font-semibold text-gray-500">
                {t("profile.idNumber")}
              </Text>
              <Text className="text-base text-gray-800">
                {patient?.identityNumber}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center mb-4">
            <Ionicons name="calendar-outline" size={20} color="#6b7280" />
            <View className="ml-4">
              <Text className="text-sm font-semibold text-gray-500">
                {t("profile.birthDate")}
              </Text>
              <Text className="text-base text-gray-800">
                {patient?.birthDate}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center mb-4">
            <Ionicons name="call-outline" size={20} color="#6b7280" />
            <View className="ml-4">
              <Text className="text-sm font-semibold text-gray-500">
                {t("profile.phone")}
              </Text>
              <Text className="text-base text-gray-800">{patient?.phone}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="#6b7280" />
            <View className="ml-4 flex-1">
              <Text className="text-sm font-semibold text-gray-500">
                {t("profile.address")}
              </Text>
              <Text className="text-base text-gray-800">
                {patient?.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Actions Section */}
        <TouchableOpacity
          // Updated: Changed button color to orange and added a stronger shadow
          className="bg-blue-600 p-4 rounded-lg shadow-md flex-row items-center justify-center mb-4"
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            {t("profile.editButton")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // Updated: Added a stronger shadow
          className="bg-red-500 p-4 rounded-lg shadow-md flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            {t("profile.logoutButton")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
