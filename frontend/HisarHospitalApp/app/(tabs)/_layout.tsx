import { AppointmentPatientProvider } from "@/src/context/AppointmentPatientContext";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import "../../src/i18n/i18n";
import "../globals.css";
// Anda bisa membuat komponen ikon yang dapat digunakan kembali
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <AppointmentPatientProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2e78b7", // Warna tab aktif
          headerShown: false, // Sembunyikan header default
        }}
      >
        {/* Setiap <Tabs.Screen> merepresentasikan satu tab */}
        <Tabs.Screen
          name="index" // Nama file di dalam folder (tabs)
          options={{
            title: t("tabs.home"),
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="doctors"
          options={{
            title: t("tabs.doctors"),
            tabBarIcon: ({ color }) => (
              <AntDesign name="team" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            title: t("tabs.appointment"),
            tabBarIcon: ({ color }) => (
              <AntDesign name="calendar" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("tabs.profile"),
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-o" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </AppointmentPatientProvider>
  );
}
