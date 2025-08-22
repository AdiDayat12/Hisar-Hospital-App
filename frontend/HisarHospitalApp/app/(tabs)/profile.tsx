// app/(tabs)/profile.tsx
// Halaman Profile
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePatient } from "../hooks/useFetchPatient";

const Profile = () => {
  const handleEditProfile = () => {
    router.push("/update-profile");
  };

  const { patient, loading, error } = usePatient();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 mt-7 text-center">
          Profil Saya
        </Text>

        {/* Profile Header Section */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-gray-300 rounded-full items-center justify-center overflow-hidden">
            <Image
              source={{ uri: patient?.address }}
              className="w-full h-full"
            />
          </View>
          <Text className="text-2xl font-bold mt-4">{patient?.name}</Text>
          <Text className="text-gray-500 text-sm">{patient?.email}</Text>
        </View>

        {/* Profile Details Section */}

        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-xl font-semibold mb-4">Informasi Pribadi</Text>

          {/* National ID number */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="card-outline" size={20} color="#4b5563" />
            <View className="ml-4">
              <Text className="text-sm font-semibold text-gray-500">
                ID Number
              </Text>
              <Text className="text-base text-gray-800">
                {patient?.idNumber}
              </Text>
            </View>
          </View>

          {/* Date of birth */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="calendar-outline" size={20} color="#4b5563" />
            <View className="ml-4">
              <Text className="text-sm font-semibold text-gray-500">
                Tanggal Lahir
              </Text>
              <Text className="text-base text-gray-800">
                {patient?.address}
              </Text>
            </View>
          </View>
          {/* Phone */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="call-outline" size={20} color="#4b5563" />
            <View className="ml-4">
              <Text className="text-sm font-semibold text-gray-500">
                Telepon
              </Text>
              <Text className="text-base text-gray-800">{patient?.phone}</Text>
            </View>
          </View>
          {/* Address */}
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="#4b5563" />
            <View className="ml-4 flex-1">
              <Text className="text-sm font-semibold text-gray-500">
                Alamat
              </Text>
              <Text className="text-base text-gray-800">
                {patient?.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Actions Section */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg shadow-md flex-row items-center justify-center mb-4"
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            Edit Profil
          </Text>
        </TouchableOpacity>

        {/* Tambahan: Logout Button (opsional) */}
        <TouchableOpacity className="bg-red-500 p-4 rounded-lg shadow-md flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
