/**
 * SEO Provider Component
 * Cung cấp React Helmet context
 */

import { HelmetProvider } from 'react-helmet-async';
import PerformanceMonitor from './PerformanceMonitor';

const SEOProvider = ({
  children,
  enablePerformanceMonitoring = true
}) => {
  return (
    <HelmetProvider>
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
