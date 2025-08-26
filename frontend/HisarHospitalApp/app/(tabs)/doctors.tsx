import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDoctors } from "../../src/hooks/useFetchAllDoctors";
// Impor hook useTranslation
import { useTranslation } from "react-i18next";

const Doctors = () => {
  // Gunakan hook useTranslation
  const { t } = useTranslation();
  const handlePressCard = (id: number) => {
    router.push(`/doctors/${id}`);
  };

  const { doctors, loading, error, page, totalPages, setPage } = useDoctors();

  // Tampilkan loading screen saat pertama kali memuat data
  if (loading && doctors.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-lg text-gray-600">{t("loading")}</Text>
      </View>
    );
  }

  // Tampilkan pesan error jika terjadi
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-6">
        <Text className="text-red-500 text-lg text-center font-semibold">
          {t("error.failedToFetch")}
        </Text>
        <Text className="text-red-400 text-sm mt-2 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            // Updated: Added shadow-md and slightly rounded corners
            className="w-[48%] mb-4 p-4 bg-white rounded-xl shadow-md items-center"
            onPress={() => handlePressCard(item.id)}
          >
            {/* Gambar Profil Dokter */}
            <Image
              source={{
                uri: item.photoUrl || "https://via.placeholder.com/150",
              }}
              className="w-24 h-24 rounded-full mb-3 border-2 border-gray-200"
            />
            {/* Nama dan Spesialisasi Dokter */}
            <Text className="font-bold text-lg text-center text-gray-800">
              {item.qualification}. {item.firstName} {item.lastName}
            </Text>
            <Text className="text-sm text-gray-500 text-center mt-1">
              {item.specialization}
            </Text>
            {/* Tombol Lihat Profil */}
            <View className="mt-3 w-full">
              <TouchableOpacity
                // Updated: Changed button color to orange and added shadow
                className="bg-blue-500 p-2 rounded-lg flex-row justify-center items-center shadow-sm"
                onPress={() => handlePressCard(item.id)}
              >
                <Text className="text-white font-semibold mr-2">
                  {t("viewProfile")}
                </Text>
                <MaterialIcons name="arrow-right-alt" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={() => {
          if (!loading && page < totalPages - 1) {
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingTop: 20 }}
        ListHeaderComponent={() => (
          <View className="p-6">
            <Text className="text-3xl font-bold mb-6 mt-4 text-center text-gray-800">
              {t("findDoctor.title")}
            </Text>
          </View>
        )}
        ListFooterComponent={() =>
          loading && doctors.length > 0 ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="#2563EB" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Doctors;
