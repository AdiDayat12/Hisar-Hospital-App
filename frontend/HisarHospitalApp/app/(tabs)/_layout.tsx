import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import "../globals.css";
// Anda bisa membuat komponen ikon yang dapat digunakan kembali
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
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
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: "Doctors",
          tabBarIcon: ({ color }) => (
            <AntDesign name="team" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-o" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
