import { AppointmentDoctorProvider } from "@/src/context/AppointmentDoctorContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import "../globals.css";
// Ini adalah tata letak tab untuk aplikasi dokter.
// Rute-rute di dalam folder ini akan menggunakan navigasi tab ini.
export default function DoctorAppLayout() {
  const { t } = useTranslation();
  return (
    <AppointmentDoctorProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#6B7280",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("tabs.home"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            title: t("tabs.appointment"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("tabs.profile"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </AppointmentDoctorProvider>
  );
}
