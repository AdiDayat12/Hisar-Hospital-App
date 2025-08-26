import {
  AppointmentResponse,
  getAllAppointments,
} from "@/src/util/api/appointment";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Impor hook useTranslation dari react-i18next
import { useTranslation } from "react-i18next";

const Appointment = () => {
  // Gunakan hook useTranslation
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "SCHEDULED"
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await getAllAppointments();
        if (response.data) {
          setAppointments(response.data);
        } else {
          // Teks di Alert juga perlu dilokalisasi
          Alert.alert(t("error"), t("error.fetchAppointments"));
        }
      } catch (error) {
        Alert.alert(t("error"), t("error.failedToFetch"));
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const scheduledAppointments = appointments.filter(
    (app) => app.status === "SCHEDULED"
  );
  const completedAppointments = appointments.filter(
    (app) => app.status === "COMPLETED"
  );
  const cancelledAppointments = appointments.filter(
    (app) => app.status === "CANCELLED"
  );

  const handleNewAppointment = () => {
    router.push("/new-appointment");
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "border-blue-500";
      case "COMPLETED":
        return "border-green-500";
      case "CANCELLED":
        return "border-gray-500";
      default:
        return "border-gray-300";
    }
  };

  const renderAppointmentCard = (appointment: AppointmentResponse) => (
    <TouchableOpacity
      key={appointment.id}
      // Updated: Added stronger shadow and more rounded corners
      className={`bg-white p-5 rounded-xl shadow-md mb-4 border-l-4 ${getBorderColor(
        appointment.status
      )}`}
      onPress={() => router.push(`/appointment/${appointment.id}`)}
    >
      <Text className="text-lg font-semibold text-gray-800">
        {appointment.doctorName}
      </Text>
      <Text className="text-sm text-gray-600">
        {appointment.specialization}
      </Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name="calendar-outline" size={16} color="#4b5563" />
        <Text className="ml-2 text-gray-600">
          {appointment.appointmentDate}
        </Text>
      </View>
      <View className="flex-row items-center mt-1">
        <Ionicons name="time-outline" size={16} color="#4b5563" />
        <Text className="ml-2 text-gray-600">
          {appointment.appointmentTime}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title: string, data: AppointmentResponse[]) => (
    <View className="mb-8">
      <TouchableOpacity
        onPress={() => toggleSection(title)}
        className="flex-row items-center justify-between mb-4"
      >
        <Text className="text-xl font-semibold text-gray-800">{title}</Text>
        <Ionicons
          name={
            expandedSection === title
              ? "chevron-up-outline"
              : "chevron-down-outline"
          }
          size={24}
          color="#2563eb"
        />
      </TouchableOpacity>
      {expandedSection === title && (
        <>
          {data.length > 0 ? (
            data.map(renderAppointmentCard)
          ) : (
            <View className="bg-white p-6 rounded-lg shadow-md items-center justify-center">
              <Text className="text-gray-500">
                {/* Menggunakan interpolasi untuk menyisipkan judul */}
                {t("myAppointments.noAppointmentFound", {
                  0: title.toLowerCase(),
                })}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 mt-6 text-gray-800">
          {t("myAppointments.title")}
        </Text>

        {loading ? (
          <View className="flex-1 justify-center items-center py-10">
            <ActivityIndicator size="large" color="#2563EB" />
            <Text className="mt-4 text-lg text-gray-600">
              {t("myAppointments.loading")}
            </Text>
          </View>
        ) : (
          <>
            {/* Menggunakan t() untuk judul bagian */}
            {renderSection(t("myAppointments.upcoming"), scheduledAppointments)}
            {renderSection(
              t("myAppointments.completed"),
              completedAppointments
            )}
            {renderSection(
              t("myAppointments.cancelled"),
              cancelledAppointments
            )}
          </>
        )}

        <TouchableOpacity
          // Updated: Changed button color to orange and added a stronger shadow
          className="bg-blue-600 p-4 rounded-lg shadow-md flex-row items-center justify-center mb-7"
          onPress={handleNewAppointment}
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            {t("myAppointments.newAppointmentButton")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointment;
