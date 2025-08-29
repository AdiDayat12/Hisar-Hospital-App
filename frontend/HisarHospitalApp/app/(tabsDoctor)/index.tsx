import { useUserContext } from "@/src/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AppointmentResponse,
  getAllAppointmentsByDoctor,
} from "../../src/util/api/appointment";

// --- Komponen Halaman Home ---
export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  const { user, role, loading, error } = useUserContext();

  console.log(role);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    AppointmentResponse[]
  >([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchUpcomingAppointments = async () => {
        if (loading || !user) {
          return;
        }

        try {
          setAppointmentsLoading(true);
          const response = await getAllAppointmentsByDoctor();
          if (response.data) {
            const now = new Date();
            const scheduled = response.data.filter(
              (app) =>
                app.status === "SCHEDULED" &&
                new Date(`${app.appointmentDate}T${app.appointmentTime}`) > now
            );
            scheduled.sort(
              (a, b) =>
                new Date(
                  `${a.appointmentDate}T${a.appointmentTime}`
                ).getTime() -
                new Date(`${b.appointmentDate}T${b.appointmentTime}`).getTime()
            );
            setUpcomingAppointments(scheduled.slice(0, 1));
          }
        } catch (error) {
          console.error("Failed to fetch upcoming appointments:", error);
        } finally {
          setAppointmentsLoading(false);
        }
      };

      fetchUpcomingAppointments();
    }, [loading, user])
  );

  const nearestAppointment = upcomingAppointments[0];
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguageModalVisible(false);
  };

  const firstName = user?.firstName;
  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <View className="flex-row items-center justify-between mb-8 mt-6">
          <View>
            <Text className="text-3xl font-bold text-gray-800">
              {t("profile.greetings", { firstName })}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {t("profile.welcomeBack")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setLanguageModalVisible(true)}
            className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center"
          >
            <Ionicons name="globe-outline" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointment Section */}
        <View className="bg-white p-6 rounded-lg shadow-md mb-6">
          <Text className="text-xl font-bold mb-4">
            {t("profile.upcomingAppointment")}
          </Text>
          {appointmentsLoading ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : nearestAppointment ? (
            <TouchableOpacity
              className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50"
              onPress={() =>
                router.push(`/appointment/${nearestAppointment.id}`)
              }
            >
              <Text className="text-lg font-semibold text-gray-800">
                {nearestAppointment.patientName}
              </Text>
              <Text className="text-sm text-gray-600">
                {t("appointmentDetail.notes")}:{nearestAppointment.notes}
              </Text>
              <View className="flex-row items-center mt-2">
                <Ionicons name="calendar-outline" size={16} color="#4b5563" />
                <Text className="ml-2 text-gray-600">
                  {nearestAppointment.appointmentDate}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="time-outline" size={16} color="#4b5563" />
                <Text className="ml-2 text-gray-600">
                  {nearestAppointment.appointmentTime}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="items-center justify-center">
              <Text className="text-gray-500">
                {t("myAppointments.noAppointmentFound", {
                  0: t("myAppointments.upcoming").toLowerCase(),
                })}
              </Text>
            </View>
          )}
        </View>

        {/* Aksi Cepat */}
        <View className="mb-6">
          <Text className="text-xl font-bold mb-4">
            {t("profile.quickActions")}
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              className="w-[48%] bg-blue-50 p-5 rounded-lg shadow-md items-center mb-4"
              onPress={() => router.push(`/(tabsDoctor)/appointments`)}
            >
              <Ionicons name="calendar" size={48} color="#2563eb" />
              <Text className="mt-3 text-base font-semibold text-center">
                {t("doctor.viewSchedule")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[48%] bg-blue-50 p-5 rounded-lg shadow-md items-center mb-4"
              onPress={() => router.push(`/(tabsDoctor)/profile`)}
            >
              <Ionicons name="person" size={48} color="#2563eb" />
              <Text className="mt-3 text-base font-semibold text-center">
                {t("viewProfile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal Pemilihan Bahasa */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isLanguageModalVisible}
          onRequestClose={() => {
            setLanguageModalVisible(!isLanguageModalVisible);
          }}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-lg w-3/4">
              <Text className="text-xl font-bold mb-4 text-center">
                {t("languages.title")}
              </Text>
              <TouchableOpacity
                className="flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 active:bg-gray-200"
                onPress={() => changeLanguage("id")}
              >
                <Text className="text-3xl mr-3">🇮🇩</Text>
                <Text className="text-base font-semibold">
                  {t("languages.indonesian")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 active:bg-gray-200"
                onPress={() => changeLanguage("en")}
              >
                <Text className="text-3xl mr-3">🇺🇸</Text>
                <Text className="text-base font-semibold">
                  {t("languages.english")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center p-3 rounded-lg bg-gray-100 active:bg-gray-200"
                onPress={() => changeLanguage("tr")}
              >
                <Text className="text-3xl mr-3">🇹🇷</Text>
                <Text className="text-base font-semibold">
                  {t("languages.turkish")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLanguageModalVisible(false)}
                className="mt-4 p-3 bg-red-500 rounded-lg items-center"
              >
                <Text className="text-white font-bold">
                  {t("languages.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
