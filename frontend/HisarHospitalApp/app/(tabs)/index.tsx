import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePatientContext } from "../../src/context/PatientContext";
import {
  AppointmentResponse,
  getAllAppointments,
} from "../../src/util/api/appointment";

const Home = () => {
  const { t, i18n } = useTranslation();
  const { patient, loading, error } = usePatientContext();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    AppointmentResponse[]
  >([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  const firstName = patient?.name.split(" ")[0];

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await getAllAppointments();
        if (response.data) {
          const now = new Date();
          const scheduled = response.data.filter(
            (app) =>
              app.status === "SCHEDULED" &&
              new Date(`${app.appointmentDate}T${app.appointmentTime}`) > now
          );

          // Urutkan berdasarkan tanggal dan waktu terdekat
          scheduled.sort(
            (a, b) =>
              new Date(`${a.appointmentDate}T${a.appointmentTime}`).getTime() -
              new Date(`${b.appointmentDate}T${b.appointmentTime}`).getTime()
          );

          setUpcomingAppointments(scheduled.slice(0, 1)); // Ambil satu janji temu terdekat
        }
      } catch (error) {
        console.error("Failed to fetch upcoming appointments:", error);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    if (!loading && patient) {
      fetchUpcomingAppointments();
    }
  }, [loading, patient]);

  const handleNewAppointment = () => {
    router.push("/new-appointment");
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguageModalVisible(false);
  };

  if (loading) return <Text>{t("loading")}</Text>;
  if (error)
    return (
      <Text>
        {t("error")}: {error}
      </Text>
    );

  const nearestAppointment = upcomingAppointments[0];

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-5">
      <ScrollView className="p-6">
        {/* Header Section */}
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
            // Updated: Changed background and icon color for a more vibrant look
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
            <Text className="text-center text-gray-500">
              {t("loadingDetail")}
            </Text>
          ) : nearestAppointment ? (
            <TouchableOpacity
              // Updated: Added a subtle hover effect and improved border styling
              className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50"
              onPress={() =>
                router.push(`/appointment/${nearestAppointment.id}`)
              }
            >
              <Text className="text-lg font-semibold text-gray-800">
                {nearestAppointment.doctorName}
              </Text>
              <Text className="text-sm text-gray-600">
                {nearestAppointment.specialization}
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

        {/* Quick Actions Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold mb-4">
            {t("profile.quickActions")}
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Find a Doctor Card */}
            <TouchableOpacity
              // Updated: Added a subtle blue background and stronger shadow
              className="w-[48%] bg-blue-50 p-5 rounded-lg shadow-md items-center mb-4"
              onPress={() => router.push("/doctors")}
            >
              <MaterialCommunityIcons name="doctor" size={48} color="#2563eb" />
              <Text className="mt-3 text-base font-semibold text-center">
                {t("profile.findDoctor")}
              </Text>
            </TouchableOpacity>

            {/* Book Appointment Card */}
            <TouchableOpacity
              // Updated: Added a subtle blue background and stronger shadow
              className="w-[48%] bg-blue-50 p-5 rounded-lg shadow-md items-center mb-4"
              onPress={handleNewAppointment}
            >
              <MaterialCommunityIcons
                name="calendar-plus"
                size={48}
                color="#2563eb"
              />
              <Text className="mt-3 text-base font-semibold text-center">
                {t("profile.bookAppointment")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* General Info Card */}
        <TouchableOpacity
          // Updated: Added a stronger shadow
          className="bg-blue-50 p-6 rounded-lg shadow-md"
          onPress={() => router.push("/info-center")}
        >
          <Text className="text-lg font-semibold text-gray-700">
            {t("profile.infoCenterTitle")}
          </Text>
          <Text className="mt-2 text-gray-600">
            {t("profile.infoCenterDescription")}
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
              {t("selectLanguage.title")}
            </Text>
            {/* Updated: Added subtle gray background to language buttons on press */}
            <TouchableOpacity
              className="flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 active:bg-gray-200"
              onPress={() => changeLanguage("id")}
            >
              <Text className="text-3xl mr-3">🇮🇩</Text>
              <Text className="text-base font-semibold">Bahasa Indonesia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 active:bg-gray-200"
              onPress={() => changeLanguage("en")}
            >
              <Text className="text-3xl mr-3">🇺🇸</Text>
              <Text className="text-base font-semibold">English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center p-3 rounded-lg bg-gray-100 active:bg-gray-200"
              onPress={() => changeLanguage("tr")}
            >
              <Text className="text-3xl mr-3">🇹🇷</Text>
              <Text className="text-base font-semibold">Türkçe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLanguageModalVisible(false)}
              className="mt-4 p-3 bg-red-500 rounded-lg items-center"
            >
              <Text className="text-white font-bold">
                {t("selectLanguage.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
