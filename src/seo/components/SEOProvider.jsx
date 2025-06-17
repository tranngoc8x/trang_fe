/**
 * SEO Provider Component
 * Cung cấp React Helmet context và Google Analytics
 */

import { HelmetProvider } from 'react-helmet-async';
import PerformanceMonitor from './PerformanceMonitor';
import GoogleAnalytics from './GoogleAnalytics';

const SEOProvider = ({
  children,
  enablePerformanceMonitoring = true,
  enableGoogleAnalytics = true,
  googleAnalyticsId = 'G-G62WZE9GG8',
  enableAnalyticsInDevelopment = false
}) => {
  return (
    <HelmetProvider>
      {enableGoogleAnalytics && (
        <GoogleAnalytics
          trackingId={googleAnalyticsId}
          enableInDevelopment={enableAnalyticsInDevelopment}
        />
      )}
      {children}
      {enablePerformanceMonitoring && (
        <PerformanceMonitor
          enableConsoleLog={false}
        />
      )}
    </HelmetProvider>
  );
};

export default SEOProvider;
