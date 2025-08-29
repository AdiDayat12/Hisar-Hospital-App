import { useAppointmentDoctorContext } from "@/src/context/AppointmentDoctorContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

// --- Type untuk Calendar day ---
interface CalendarDay {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

// --- Tipe status appointment ---
type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export default function AppointmentsScreen() {
  const { t } = useTranslation();
  const { appointments, loading, refreshAppointments } =
    useAppointmentDoctorContext();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    refreshAppointments(selectedDate);
  }, [selectedDate]);

  const getBorderColor = (status: AppointmentStatus) => {
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

  const appointmentsForSelectedDate = appointments.filter(
    (app) => app.appointmentDate === selectedDate
  );

  const markedDates: Record<string, any> = {};
  appointments.forEach((app) => {
    const date = app.appointmentDate;
    if (!markedDates[date])
      markedDates[date] = { marked: true, dotColor: "#2563eb" };
  });

  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    selected: true,
    selectedColor: "#2563eb",
    dotColor: "white",
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 mt-6 text-gray-800">
          {t("myAppointments.title")}
        </Text>

        <View className="bg-white rounded-xl shadow-md p-4 mb-6">
          <Calendar
            onDayPress={(day: CalendarDay) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            theme={{
              todayTextColor: "#2563eb",
              arrowColor: "#2563eb",
              textDayHeaderFontWeight: "bold",
            }}
          />
        </View>

        <Text className="text-xl font-semibold text-blue-800 mb-4">
          {t("myAppointments.titleByDate", {
            date: selectedDate,
          })}
        </Text>

        {loading ? (
          <View className="flex-1 justify-center items-center py-10">
            <ActivityIndicator size="large" color="#2563EB" />
            <Text className="mt-4 text-lg text-gray-600">
              {t("myAppointments.loading")}
            </Text>
          </View>
        ) : appointmentsForSelectedDate.length > 0 ? (
          appointmentsForSelectedDate.map((app) => (
            <TouchableOpacity
              key={app.id}
              className={`bg-white p-5 rounded-xl shadow-md mb-4 border-l-4 ${getBorderColor(
                app.status as AppointmentStatus
              )}`}
            >
              <Text className="text-lg font-semibold text-gray-800">
                {app.patientName}
              </Text>
              <View className="flex-row items-center mt-2">
                <Ionicons name="calendar-outline" size={16} color="#4b5563" />
                <Text className="ml-2 text-gray-600">
                  {app.appointmentDate}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="time-outline" size={16} color="#4b5563" />
                <Text className="ml-2 text-gray-600">
                  {app.appointmentTime}
                </Text>
              </View>
              <View className="flex-row items-center mt-2">
                <Text
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    app.status === "SCHEDULED"
                      ? "bg-blue-100 text-blue-600"
                      : app.status === "COMPLETED"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t(`status.${app.status.toLowerCase()}`)}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="bg-white p-6 rounded-lg shadow-md items-center justify-center">
            <Text className="text-gray-500">
              {t("myAppointments.noAppointmentFoundForDate")}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
