import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Impor file-file bahasa
import en from "./locales/en.json";
import id from "./locales/id.json";
import tr from "./locales/tr.json";

// Konfigurasi i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    id: {
      translation: id,
    },
    tr: {
      translation: tr,
    },
  },
  lng: "en", // Bahasa default
  fallbackLng: "id", // Bahasa cadangan jika bahasa default tidak ada
  interpolation: {
    escapeValue: false, // Tidak perlu melarikan nilai untuk React
  },
});

export default i18n;
