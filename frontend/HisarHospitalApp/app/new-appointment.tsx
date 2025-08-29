// app/(tabs)/new-appointment.tsx

import { useUserContext } from "@/src/context/UserContext";
import { PatientResponse } from "@/src/types/patient";
import {
  AppointmentRequest,
  bookAppointment,
} from "@/src/util/api/appointment";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDoctor } from "../src/hooks/userFetchDoctor";

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const NewAppointment = () => {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();

  // const {
  //   patient,
  //   loading: patientLoading,
  //   error: patientError,
  // } = usePatientContext();
  const {
    user,
    loading: patientLoading,
    error: patientError,
    reloadUser,
  } = useUserContext();
  const patient = user as PatientResponse;

  const doctorId = id ? Number(id) : null;
  const {
    doctor,
    loading: doctorLoading,
    error: doctorError,
  } = useDoctor(doctorId);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  if (patientLoading || (doctorId && doctorLoading)) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (patientError || (doctorId && doctorError)) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">
          {t("error")}: {t("error.failedToFetch")}
        </Text>
      </View>
    );
  }

  const isProfileComplete =
    patient &&
    patient?.identityNumber &&
    patient?.birthDate &&
    patient?.phone &&
    patient?.address;

  const handleCompleteProfile = () => {
    router.push("/(tabs)/profile");
  };

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setSelectedTime("");
  };

  const handleTimePress = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert(t("alert.warning"), t("alert.selectDateAndTime"));
      return;
    }

    try {
      const request: AppointmentRequest = {
        doctorId: doctorId,
        specialization: doctor?.specialization || " ",
        appointmentDate: selectedDate,
        appointmentTime: convertTo24Hour(selectedTime),
      };

      const response = await bookAppointment(request);

      Alert.alert(
        t("alert.successTitle"),
        t("alert.successMessage", {
          doctorName: doctor?.firstName || t("selected"),
          date: selectedDate,
          time: selectedTime,
        }),
        [
          {
            text: t("alert.okButton"),
            onPress: () =>
              router.replace({
                pathname: "/appointment",
                params: { appointmentId: response.data.id.toString() },
              }),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        // t("error.failedToCreateAppointment"),
        error.response?.data?.message || t("error.failedToCreateAppointment")
      );
    }
  };

  function convertTo24Hour(time: string) {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  }

  const isDoctorSelected = !!doctor;

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7 mb-12">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 text-center">
          {t("newAppointment.title")}
        </Text>

        {!isProfileComplete && (
          <View className="mx-4 mt-4 mb-5 p-4 bg-amber-100 rounded-lg border border-amber-300 flex-row items-center space-x-3 shadow-sm">
            <Ionicons name="alert-circle-outline" size={24} color="#b45309" />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-amber-800">
                {t("newAppointment.incompleteProfileMessage")}
              </Text>
            </View>
            <TouchableOpacity onPress={handleCompleteProfile} className="ml-2">
              <Text className="text-sm font-bold text-amber-800 underline">
                {t("newAppointment.completeNowButton")}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isDoctorSelected ? (
          <View className="bg-white p-6 rounded-lg shadow-sm mb-6 items-center">
            <Image
              source={{ uri: doctor.photoUrl }}
              className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400"
            />
            <Text className="text-xl font-bold text-gray-800">
              {t("doctor.namePrefix")} {doctor.firstName} {doctor.lastName}
            </Text>
            <Text className="text-base text-gray-600">
              {doctor.specialization}
            </Text>
          </View>
        ) : (
          <View className="bg-white p-6 rounded-lg shadow-sm mb-6 items-center">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              {t("newAppointment.selectDoctorTitle")}
            </Text>
            <Text className="text-gray-600 mb-4 text-center">
              {t("newAppointment.selectDoctorDescription")}
            </Text>
            <TouchableOpacity
              className="bg-blue-600 p-3 rounded-lg flex-row items-center justify-center w-full"
              onPress={() => router.push("/doctors")}
            >
              <Ionicons name="search" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">
                {t("newAppointment.searchDoctorButton")}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-xl font-semibold mb-4">
            {t("newAppointment.selectDateAndTime")}
          </Text>

          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                dotColor: "white",
              },
            }}
            theme={{
              todayTextColor: "#2563eb",
              selectedDayBackgroundColor: "#2563eb",
            }}
            renderArrow={(direction) => (
              <Ionicons
                name={direction === "left" ? "chevron-back" : "chevron-forward"}
                size={24}
                color="#6b7280"
              />
            )}
          />

          <View className="mt-6">
            <Text className="text-lg font-semibold mb-3">
              {t("newAppointment.selectTimeSlot")}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {TIME_SLOTS.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  className={`p-3 rounded-lg mr-2 border ${
                    selectedTime === time
                      ? "bg-blue-500 border-blue-500"
                      : "bg-gray-100 border-gray-300"
                  }`}
                  onPress={() => handleTimePress(time)}
                >
                  <Text
                    className={
                      selectedTime === time
                        ? "text-white font-semibold"
                        : "text-gray-700"
                    }
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <TouchableOpacity
          className={`p-4 rounded-lg shadow-md flex-row items-center justify-center mb-20 ${
            !selectedDate || !selectedTime ? "bg-gray-400" : "bg-blue-600"
          }`}
          onPress={handleConfirmAppointment}
          disabled={!selectedDate || !selectedTime}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            {t("newAppointment.confirmButton")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewAppointment;
