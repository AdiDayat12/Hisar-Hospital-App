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

import { useUserContext } from "@/src/context/UserContext";
import { PatientResponse } from "@/src/types/patient";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { user, loading, error, reloadUser, logout } = useUserContext();

  const patient =
    user && `ROLE_${user.role}` === "ROLE_PATIENT"
      ? (user as PatientResponse)
      : null;

  const handleEditProfile = () => {
    router.push("/update-profile");
  };

  useFocusEffect(
    useCallback(() => {
      reloadUser();
    }, [reloadUser])
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
        <TouchableOpacity
          onPress={reloadUser}
          className="mt-4 p-2 rounded-md bg-blue-500"
        >
          <Text className="text-white font-bold">{t("retry")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!patient) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-gray-600">{t("error.userNotFound")}</Text>
        <Text className="text-md text-gray-500 mt-2 text-center">
          {t("error.userNotFoundDetail")}
        </Text>
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
            <Image
              source={{
                uri:
                  patient?.firstName ||
                  "https://placehold.co/150x150/E5E7EB/4B5563?text=user",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <Text className="text-2xl font-bold mt-4 text-gray-800">
            {patient?.firstName} {patient?.lastName}
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
          className="bg-blue-600 p-4 rounded-lg shadow-md flex-row items-center justify-center mb-4"
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            {t("profile.editButton")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
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
};

export default Profile;
