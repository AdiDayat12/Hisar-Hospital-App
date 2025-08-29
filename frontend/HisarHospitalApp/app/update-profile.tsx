import { useUserContext } from "@/src/context/UserContext";
import { PatientResponse } from "@/src/types/patient";
import { updatePatientProfile } from "@/src/util/api/patient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// -----------------------------------------------------------------------------
// Komponen utama untuk halaman Pembaruan Profil
// -----------------------------------------------------------------------------

export default function UpdateProfile() {
  const { t } = useTranslation();
  const { user, loading, error, reloadUser } = useUserContext();
  const patient = user as PatientResponse;
  const [identityNumber, setIdentityNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // fungsi untuk format ke "YYYY-MM-DD"
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // isi form otomatis begitu patient tersedia
  useEffect(() => {
    if (patient) {
      setFirstName(patient.firstName);
      setLastName(patient.lastName);
      setIdentityNumber(patient.identityNumber ?? "");
      setPhone(patient.phone ?? "");
      setAddress(patient.address ?? "");
      setBirthDate(patient.birthDate ?? "");
    }
  }, [patient]);

  // Fungsi untuk menyimpan perubahan profil
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updatePatientProfile({
        identityNumber,
        firstName,
        lastName,
        phone,
        birthDate,
        address,
      });

      // refresh global patient state
      await reloadUser();

      router.replace("/(tabs)/profile");
    } catch (err: any) {
      Alert.alert(t("error"), t("profile.updateFailed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1">
      <LinearGradient colors={["#60a5fa", "#3b82f6"]} className="flex-1">
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 px-6 justify-center"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              <View className="items-center mb-10">
                <Text className="text-3xl font-bold text-white mb-2 text-center">
                  {t("updateProfile.title")}
                </Text>
                <Text className="text-base text-white/90 text-center">
                  {t("updateProfile.subtitle")}
                </Text>
              </View>

              <View className="w-full bg-white/40 rounded-xl p-6 shadow-xl">
                {/* First Name */}
                <Text className="text-sm text-gray-800 font-semibold mb-2">
                  {t("profile.firstName")}
                </Text>
                <TextInput
                  className="bg-white h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder={t("profile.firstNamePlaceholder")}
                  value={firstName}
                  onChangeText={setFirstName}
                />

                {/* Last Name */}
                <Text className="text-sm text-gray-800 font-semibold mb-2">
                  {t("profile.lastName")}
                </Text>
                <TextInput
                  className="bg-white h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder={t("profile.lastNamePlaceholder")}
                  value={lastName}
                  onChangeText={setLastName}
                />

                {/* Identity Number */}
                <Text className="text-sm text-gray-800 font-semibold mb-2">
                  {t("profile.idNumber")}
                </Text>
                <TextInput
                  className="bg-white h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder={t("profile.idNumberPlaceholder")}
                  keyboardType="phone-pad"
                  value={identityNumber}
                  onChangeText={setIdentityNumber}
                />

                {/* Phone */}
                <Text className="text-sm text-gray-800 font-semibold mb-2">
                  {t("profile.phone")}
                </Text>
                <TextInput
                  className="bg-white h-12 rounded-lg px-4 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder={t("profile.phonePlaceholder")}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />

                {/* Birth Date */}
                <Text className="text-sm text-gray-800 font-semibold mb-2">
                  {t("profile.birthDate")}
                </Text>
                <View className="relative mb-5">
                  <TextInput
                    className="bg-white h-12 rounded-lg px-4 text-base text-gray-800 shadow-sm pr-10"
                    placeholder={t("profile.birthDatePlaceholder")}
                    value={birthDate}
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className="absolute right-3 top-3"
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={24}
                      color="#4B5563"
                    />
                  </TouchableOpacity>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    value={birthDate ? new Date(birthDate) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setBirthDate(formatDate(selectedDate));
                      }
                    }}
                  />
                )}

                {/* Address */}
                <Text className="text-sm text-gray-800 font-semibold mb-2">
                  {t("profile.address")}
                </Text>
                <TextInput
                  className="bg-white h-24 rounded-lg px-4 py-3 text-base text-gray-800 mb-5 shadow-sm"
                  placeholder={t("profile.addressPlaceholder")}
                  value={address}
                  onChangeText={setAddress}
                  multiline={true}
                  textAlignVertical="top"
                />

                {/* Save Button */}
                <TouchableOpacity
                  className="bg-orange-600 h-12 rounded-lg justify-center items-center mt-2 shadow-lg"
                  onPress={handleSaveProfile}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-lg font-bold">
                      {t("profile.saveChangesButton")}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
