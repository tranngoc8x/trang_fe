import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import viCommon from '../locales/vi/common.json';
import enCommon from '../locales/en/common.json';

// Translation resources
const resources = {
  vi: {
    common: viCommon
  },
  en: {
    common: enCommon
  }
};

// Language detection options
const detectionOptions = {
  // Order of language detection methods
  order: ['path', 'localStorage', 'navigator', 'htmlTag'],
  
  // Look for language in URL path
  lookupFromPathIndex: 0,
  
  // Cache user language
  caches: ['localStorage'],
  
  // Don't cache on these paths
  excludeCacheFor: ['cimode'],
  
  // Check for language in these paths
  checkWhitelist: true
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    
    // Default language
    fallbackLng: 'vi',
    
    // Available languages
    supportedLngs: ['vi', 'en'],
    
    // Language detection
    detection: detectionOptions,
    
    // Namespace
    defaultNS: 'common',
    
    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',
    
    // Interpolation options
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    // React options
    react: {
      useSuspense: false // Disable suspense for SSR compatibility
    }
  });

export default i18n;
