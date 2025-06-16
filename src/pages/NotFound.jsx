import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {t('notFound.title')}
          </h2>
          <p className="text-gray-500 mb-8">
            {t('notFound.message')}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to={getLocalizedPath('/')}
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            {t('notFound.backHome')}
          </Link>

          <div className="text-sm text-gray-500">
            <p>{t('notFound.suggestions')}</p>
            <div className="mt-2 space-x-4">
              <Link to={getLocalizedPath('/gioi-thieu')} className="text-primary hover:underline">
                {t('navigation.about')}
              </Link>
              <Link to={getLocalizedPath('/san-pham-dich-vu')} className="text-primary hover:underline">
                {t('navigation.products')}
              </Link>
              <Link to={getLocalizedPath('/lien-he')} className="text-primary hover:underline">
                {t('navigation.contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
