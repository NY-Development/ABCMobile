import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import am from "./translations/am.json";
import or from "./translations/or.json"; // Renamed import from 'om' to 'or'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
      or: { translation: or }, // Changed key from 'om' to 'or'
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;