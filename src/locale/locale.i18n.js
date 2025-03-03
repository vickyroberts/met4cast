import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {en} from './en.locale';
import {fr} from './fr.local';

// Import translations (or use backend to load dynamically)
const resources = {
  en: en,
  fr: fr,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
  });

export default i18n;
