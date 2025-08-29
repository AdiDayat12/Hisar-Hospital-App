// import { AppointmentProvider } from "@/src/context/appointmentContext";
import { Stack } from "expo-router";
// import { PatientProvider } from "../src/context/PatientContext";
import { UserProvider } from "@/src/context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      {/* <AppointmentProvider> */}
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="doctors/[id]"
          options={{ headerShown: true, title: "Doctor Details" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabsDoctor)" options={{ headerShown: false }} />
        <Stack.Screen
          name="appointment/[appointmentId]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="info-center" options={{ headerShown: false }} />
        <Stack.Screen name="new-appointment" options={{ headerShown: false }} />
        <Stack.Screen name="update-profile" options={{ headerShown: false }} />
      </Stack>
      {/* </AppointmentProvider> */}
    </UserProvider>
  );
}
