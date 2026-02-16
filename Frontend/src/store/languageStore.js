import { create } from "zustand";
import i18n from "../i18n";

export const useLanguageStore = create((set) => ({
  // Renamed from 'lang' to 'language' for clarity and consistency
  language: "en", 
  
  // Set the language and update i18n
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },

  // Toggle function to cycle through 'en' -> 'am' -> 'or' -> 'en'
  toggleLanguage: () => {
    set((state) => {
      let nextLang;
      if (state.language === "en") {
        nextLang = "am";
      } else if (state.language === "am") {
        nextLang = "or";
      } else {
        nextLang = "en";
      }
      i18n.changeLanguage(nextLang);
      return { language: nextLang };
    });
  },
}));