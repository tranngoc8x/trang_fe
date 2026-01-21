import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Route mapping between Vietnamese and English
export const ROUTE_MAPPING = {
  vi: {
    '/': '/',
    '/gioi-thieu': '/gioi-thieu',
    '/san-pham-dich-vu': '/san-pham-dich-vu',
    '/san-pham': '/san-pham',
    '/bao-gia-tu-van': '/bao-gia-tu-van',
    '/du-an-tieu-bieu': '/du-an-tieu-bieu',
    '/lien-he': '/lien-he'
  },
  en: {
    '/': '/en',
    '/gioi-thieu': '/en/about',
    '/san-pham-dich-vu': '/en/services',
    '/san-pham': '/en/products',
    '/bao-gia-tu-van': '/en/pricing',
    '/du-an-tieu-bieu': '/en/projects',
    '/lien-he': '/en/contact'
  }
};

// Reverse mapping for language switching
export const REVERSE_ROUTE_MAPPING = {
  // Vietnamese to English
  '/': '/en',
  '/gioi-thieu': '/en/about',
  '/san-pham-dich-vu': '/en/services',
  '/san-pham': '/en/products',
  '/bao-gia-tu-van': '/en/pricing',
  '/du-an-tieu-bieu': '/en/projects',
  '/lien-he': '/en/contact',

  // English to Vietnamese
  '/en': '/',
  '/en/about': '/gioi-thieu',
  '/en/products': '/san-pham',
  '/en/services': '/san-pham-dich-vu',
  '/en/pricing': '/bao-gia-tu-van',
  '/en/projects': '/du-an-tieu-bieu',
  '/en/contact': '/lien-he'
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('vi');

  // Detect language from URL
  useEffect(() => {
    const path = location.pathname;
    const isEnglish = path.startsWith('/en');
    const detectedLang = isEnglish ? 'en' : 'vi';

    if (detectedLang !== currentLanguage) {
      setCurrentLanguage(detectedLang);
      i18n.changeLanguage(detectedLang);
    }
  }, [location.pathname, currentLanguage, i18n]);

  // Switch language function
  const switchLanguage = (newLang) => {
    if (newLang === currentLanguage) return;

    const currentPath = location.pathname;
    let newPath;

    // Find the corresponding path in the new language
    if (newLang === 'en') {
      // Switching to English
      newPath = REVERSE_ROUTE_MAPPING[currentPath] || '/en';
    } else {
      // Switching to Vietnamese
      newPath = REVERSE_ROUTE_MAPPING[currentPath] || '/';
    }

    // Navigate to new path
    navigate(newPath);
    setCurrentLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  // Get localized path
  const getLocalizedPath = (path, lang = currentLanguage) => {
    if (lang === 'en') {
      return ROUTE_MAPPING.en[path] || `/en${path}`;
    }
    return ROUTE_MAPPING.vi[path] || path;
  };

  const value = {
    currentLanguage,
    switchLanguage,
    getLocalizedPath,
    isEnglish: currentLanguage === 'en',
    isVietnamese: currentLanguage === 'vi'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
