// app/(tabs)/info-center.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Data tiruan untuk artikel kesehatan
const DUMMY_ARTICLES = [
  {
    id: "1",
    title: "Manfaat Tidur yang Cukup untuk Kesehatan Mental",
    summary:
      "Tidur yang cukup memiliki dampak besar pada kesehatan mental dan emosional. Kekurangan tidur dapat meningkatkan risiko depresi dan kecemasan.",
    content:
      "Tidur yang berkualitas adalah fondasi kesehatan mental yang kuat. Selama tidur, otak memproses emosi dan pengalaman dari hari itu, yang membantu kita menghadapi stres dan menjaga keseimbangan emosional. Kekurangan tidur, di sisi lain, dapat memicu iritabilitas, kesulitan berkonsentrasi, dan peningkatan risiko depresi. Usahakan tidur 7-9 jam setiap malam untuk mendukung kesehatan mental Anda.",
    imageUrl: "https://placehold.co/600x400/818cf8/white?text=Tidur+Cukup",
  },
  {
    id: "2",
    title: "Pentingnya Sarapan Sehat untuk Produktivitas",
    summary:
      "Sarapan adalah makanan terpenting dalam sehari. Melewatkannya dapat berdampak negatif pada energi dan fokus Anda sepanjang hari.",
    content:
      "Memulai hari dengan sarapan bergizi memberikan energi yang dibutuhkan tubuh dan otak untuk berfungsi secara optimal. Sarapan sehat yang mengandung protein dan serat dapat membantu menjaga kadar gula darah tetap stabil, mencegah rasa lapar yang datang terlalu cepat, dan meningkatkan konsentrasi. Contoh sarapan sehat adalah oatmeal dengan buah-buahan, telur, atau yogurt Yunani.",
    imageUrl: "https://placehold.co/600x400/f59e0b/white?text=Sarapan+Sehat",
  },
  {
    id: "3",
    title: "Cara Mengatasi Stres di Tempat Kerja",
    summary:
      "Stres kerja adalah hal yang umum, namun bisa dikelola dengan strategi yang tepat untuk menjaga keseimbangan hidup.",
    content:
      "Stres di tempat kerja dapat memengaruhi produktivitas dan kesejahteraan Anda. Mengelola stres melibatkan kombinasi dari istirahat yang cukup, olahraga teratur, dan teknik relaksasi seperti meditasi. Penting juga untuk menetapkan batasan yang jelas antara kehidupan kerja dan pribadi, serta mencari dukungan dari rekan kerja atau atasan jika diperlukan.",
    imageUrl: "https://placehold.co/600x400/34d399/white?text=Atasi+Stres",
  },
  {
    id: "4",
    title: "Panduan Latihan Kardio untuk Pemula",
    summary:
      "Latihan kardio sangat penting untuk kesehatan jantung. Mulailah dengan langkah-langkah sederhana untuk membangun rutinitas yang berkelanjutan.",
    content:
      "Jika Anda baru memulai, latihan kardio tidak harus intens. Anda bisa memulai dengan jalan kaki cepat, jogging ringan, atau bersepeda. Tujuannya adalah untuk meningkatkan detak jantung Anda secara bertahap. Mulailah dengan 20-30 menit, 3-5 kali seminggu, dan tingkatkan intensitasnya seiring waktu. Latihan kardio secara teratur dapat mengurangi risiko penyakit jantung, meningkatkan stamina, dan membakar kalori.",
    imageUrl: "https://placehold.co/600x400/ef4444/white?text=Latihan+Kardio",
  },
  {
    id: "5",
    title: "Panduan Latihan Kardio untuk Pemula",
    summary:
      "Latihan kardio sangat penting untuk kesehatan jantung. Mulailah dengan langkah-langkah sederhana untuk membangun rutinitas yang berkelanjutan.",
    content:
      "Jika Anda baru memulai, latihan kardio tidak harus intens. Anda bisa memulai dengan jalan kaki cepat, jogging ringan, atau bersepeda. Tujuannya adalah untuk meningkatkan detak jantung Anda secara bertahap. Mulailah dengan 20-30 menit, 3-5 kali seminggu, dan tingkatkan intensitasnya seiring waktu. Latihan kardio secara teratur dapat mengurangi risiko penyakit jantung, meningkatkan stamina, dan membakar kalori.",
    imageUrl: "https://placehold.co/600x400/ef4444/white?text=Latihan+Kardio",
  },
  {
    id: "6",
    title: "Panduan Latihan Kardio untuk Pemula",
    summary:
      "Latihan kardio sangat penting untuk kesehatan jantung. Mulailah dengan langkah-langkah sederhana untuk membangun rutinitas yang berkelanjutan.",
    content:
      "Jika Anda baru memulai, latihan kardio tidak harus intens. Anda bisa memulai dengan jalan kaki cepat, jogging ringan, atau bersepeda. Tujuannya adalah untuk meningkatkan detak jantung Anda secara bertahap. Mulailah dengan 20-30 menit, 3-5 kali seminggu, dan tingkatkan intensitasnya seiring waktu. Latihan kardio secara teratur dapat mengurangi risiko penyakit jantung, meningkatkan stamina, dan membakar kalori.",
    imageUrl: "https://placehold.co/600x400/ef4444/white?text=Latihan+Kardio",
  },
  {
    id: "7",
    title: "Panduan Latihan Kardio untuk Pemula",
    summary:
      "Latihan kardio sangat penting untuk kesehatan jantung. Mulailah dengan langkah-langkah sederhana untuk membangun rutinitas yang berkelanjutan.",
    content:
      "Jika Anda baru memulai, latihan kardio tidak harus intens. Anda bisa memulai dengan jalan kaki cepat, jogging ringan, atau bersepeda. Tujuannya adalah untuk meningkatkan detak jantung Anda secara bertahap. Mulailah dengan 20-30 menit, 3-5 kali seminggu, dan tingkatkan intensitasnya seiring waktu. Latihan kardio secara teratur dapat mengurangi risiko penyakit jantung, meningkatkan stamina, dan membakar kalori.",
    imageUrl: "https://placehold.co/600x400/ef4444/white?text=Latihan+Kardio",
  },
];

const InfoCenter = () => {
  // State untuk melacak artikel mana yang sedang diperluas
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  const handlePressArticle = (id: string) => {
    // Jika artikel yang sama ditekan, tutup (collapse)
    if (expandedArticleId === id) {
      setExpandedArticleId(null);
    } else {
      // Jika artikel lain ditekan, perluas (expand) artikel tersebut
      setExpandedArticleId(id);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mb-safe-or-2 mt-7">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold mb-6 text-center">
          Pusat Informasi Kesehatan
        </Text>

        {DUMMY_ARTICLES.map((article) => (
          <TouchableOpacity
            key={article.id}
            className="bg-white p-5 rounded-lg shadow-md mb-4 flex-row items-start"
            onPress={() => handlePressArticle(article.id)}
          >
            {expandedArticleId !== article.id && (
              <Image
                source={{ uri: article.imageUrl }}
                className="w-24 h-24 rounded-lg mr-4"
              />
            )}

            <View className="flex-1">
              <Text className="text-xl font-semibold mb-2">
                {article.title}
              </Text>

              {expandedArticleId === article.id ? (
                <>
                  <Text className="text-gray-700 leading-6">
                    {article.content}
                  </Text>
                  <Ionicons
                    name="chevron-up"
                    size={24}
                    color="#4b5563"
                    className="mt-2 text-center"
                  />
                </>
              ) : (
                <>
                  <Text className="text-gray-600 mb-2">{article.summary}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    color="#4b5563"
                    className="mt-2 text-center"
                  />
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoCenter;
