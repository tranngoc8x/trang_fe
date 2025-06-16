import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { currentLanguage, switchLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'vi', name: t('common.vietnamese'), flag: '🇻🇳' },
    { code: 'en', name: t('common.english'), flag: '🇺🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode) => {
    switchLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 rounded-md hover:bg-gray-100"
        aria-label={t('common.language')}
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden md:inline text-sm font-medium">
          {currentLang?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3 ${
                    currentLanguage === language.code
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                  {currentLanguage === language.code && (
                    <svg
                      className="w-4 h-4 ml-auto text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
