// src/components/CustomAlert.tsx

import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

// Mendefinisikan interface untuk props
interface CustomAlertProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const CustomAlert = ({
  isVisible,
  onClose,
  title,
  message,
}: CustomAlertProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View className="bg-white p-6 rounded-lg shadow-xl mx-auto w-11/12">
        <Text className="text-xl font-bold text-gray-800 mb-2">{title}</Text>
        <Text className="text-sm text-gray-600 mb-6 leading-relaxed">
          {message}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-blue-600 rounded-lg p-3 w-full"
        >
          <Text className="text-white text-base font-semibold text-center">
            {t("alert.close.button")}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomAlert;
