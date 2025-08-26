// app/appointment/[appointmentId].tsx
import {
  AppointmentResponse,
  cancelAppointment,
  getAppointmentById,
} from "@/src/util/api/appointment";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Impor useTranslation
import { useTranslation } from "react-i18next";

const AppointmentDetail = () => {
  // Gunakan hook useTranslation
  const { t } = useTranslation();
  const { appointmentId } = useLocalSearchParams<{
    appointmentId: string;
  }>();
  const [appointment, setAppointment] = useState<AppointmentResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointmentDetail = async () => {
    if (!appointmentId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getAppointmentById(Number(appointmentId));
      if (response.data) {
        setAppointment(response.data);
        setError(null);
      } else {
        setError(response.message || t("error.failedToLoadDetails"));
        setAppointment(null);
      }
    } catch (err) {
      setError(t("error.occurredWhileFetching"));
      setAppointment(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentDetail();
  }, [appointmentId]);

  const handleCancelAppointment = async () => {
    Alert.alert(
      t("alert.cancelAppointmentTitle"),
      t("alert.cancelAppointmentMessage"),
      [
        {
          text: t("alert.noButton"),
          style: "cancel",
        },
        {
          text: t("alert.yesButton"),
          onPress: async () => {
            try {
              if (!appointment || !appointment.id) {
                Alert.alert(t("error"), t("error.appointmentIdNotFound"));
                return;
              }

              setLoading(true);
              const response = await cancelAppointment(appointment.id);

              if (response.status === 200) {
                Alert.alert(
                  t("alert.successTitle"),
                  t("alert.cancellationSuccess"),
                  [
                    {
                      text: t("alert.okButton"),
                      onPress: () => {
                        fetchAppointmentDetail();
                      },
                    },
                  ]
                );
              } else {
                Alert.alert(
                  t("alert.failTitle"),
                  response.message || t("alert.cancellationFailed")
                );
              }
            } catch (error) {
              Alert.alert(t("error"), t("error.occurredDuringCancellation"));
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("loadingDetail")}</Text>
      </View>
    );
  }

  if (error || !appointment) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">
          {error || t("error.appointmentNotFound")}
        </Text>
      </View>
    );
  }

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

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 mt-6">
          {t("appointmentDetail.title")}
        </Text>

        <View
          className={`bg-white p-6 rounded-lg shadow-sm mb-6 border-l-4 ${getBorderColor(
            appointment.status
          )}`}
        >
          <Text className="text-2xl font-semibold text-gray-800 mb-2">
            {appointment.doctorName}
          </Text>
          <Text className="text-lg text-gray-600 mb-4">
            {appointment.specialization}
          </Text>

          <View className="flex-row items-center mb-4">
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={
                appointment.status === "SCHEDULED"
                  ? "blue"
                  : appointment.status === "COMPLETED"
                  ? "green"
                  : "gray"
              }
            />
            <Text className="ml-2 text-base font-medium">
              {t("appointmentDetail.status")}:{" "}
              <Text className="font-bold">
                {t(`status.${appointment.status.toLowerCase()}`)}
              </Text>
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar-outline" size={20} color="#4b5563" />
            <View className="ml-4">
              <Text className="text-sm font-semibold text-gray-500">
                {t("appointmentDetail.date")}
              </Text>
              <Text className="text-base text-gray-800">
                {appointment.appointmentDate}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="time-outline" size={20} color="#4b5563" />
            <View className="ml-4">
              <Text className="text-sm font-semibold text-gray-500">
                {t("appointmentDetail.time")}
              </Text>
              <Text className="text-base text-gray-800">
                {appointment.appointmentTime}
              </Text>
            </View>
          </View>

          {appointment.notes && (
            <View className="mt-4 border-t border-gray-200 pt-4">
              <Text className="text-sm font-semibold text-gray-500">
                {t("appointmentDetail.notes")}
              </Text>
              <Text className="text-base text-gray-800 mt-1">
                {appointment.notes}
              </Text>
            </View>
          )}
        </View>

        {appointment.status === "SCHEDULED" && (
          <TouchableOpacity
            className="bg-red-500 p-4 rounded-lg shadow-md flex-row items-center justify-center mt-4"
            onPress={() => handleCancelAppointment()}
          >
            <Ionicons name="close-circle-outline" size={24} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">
              {t("appointmentDetail.cancelButton")}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentDetail;
