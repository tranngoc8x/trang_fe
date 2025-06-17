/**
 * SEO Tools Export
 * Xuất các công cụ SEO cần thiết
 */

// Components
export { default as SimpleSEOHead } from './components/SimpleSEOHead';
export { default as PerformanceMonitor, usePerformanceMetrics } from './components/PerformanceMonitor';
export { default as SEOProvider } from './components/SEOProvider';
export {
    default as GoogleAnalytics,
    trackEvent,
    trackPageView,
    trackCustomEvent,
    trackButtonClick,
    trackFormSubmit,
    trackDownload,
    trackExternalLink,
    trackScrollDepth,
    trackSearch,
    trackVideoPlay,
    trackContact,
    trackLanguageChange,
    trackTiming,
    trackException,
    setUserProperties
} from './components/GoogleAnalytics';

// Hooks
export { default as useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
