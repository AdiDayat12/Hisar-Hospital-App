// app/_layout.tsx
import { Stack } from "expo-router";
import { PatientProvider } from "../src/context/PatientContext";

export default function RootLayout() {
  return (
    <PatientProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* Rute lain di luar tab */}
        <Stack.Screen
          name="doctors/[id]"
          options={{ headerShown: true, title: "Doctor Details" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="appointment/[appointmentId]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="info-center" options={{ headerShown: false }} />
        <Stack.Screen name="new-appointment" options={{ headerShown: false }} />
        <Stack.Screen name="update-profile" options={{ headerShown: false }} />
      </Stack>
    </PatientProvider>
  );
}
