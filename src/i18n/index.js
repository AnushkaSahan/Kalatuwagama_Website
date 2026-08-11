import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import si from "./locales/si.json";

const STORAGE_KEY = "kalatuwagama_site_language";
const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, si: { translation: si } },
  lng: saved || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
};

if (typeof document !== "undefined") {
  document.documentElement.lang = saved || "en";
}

export default i18n;
