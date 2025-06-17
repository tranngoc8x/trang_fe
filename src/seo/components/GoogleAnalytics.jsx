/**
 * Google Analytics Component
 * Tích hợp Google Analytics 4 với G-Tag
 */

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const GOOGLE_ANALYTICS_ID = 'G-G62WZE9GG8';

const GoogleAnalytics = ({
  trackingId = GOOGLE_ANALYTICS_ID,
  enableInDevelopment = false
}) => {
  const isDevelopment = import.meta.env.DEV;

  // Không chạy analytics trong development mode trừ khi được bật
  const shouldTrack = !isDevelopment || enableInDevelopment;

  useEffect(() => {
    if (!shouldTrack || !trackingId) return;

    // Khởi tạo gtag function nếu chưa có
    if (typeof window !== 'undefined' && !window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', trackingId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [trackingId, shouldTrack]);

  // Track page views khi component mount
  useEffect(() => {
    if (!shouldTrack || !trackingId || typeof window === 'undefined') return;

    const trackPageView = () => {
      if (window.gtag) {
        window.gtag('config', trackingId, {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
    };

    // Track initial page view
    trackPageView();

    // Track subsequent navigation (for SPA)
    const handleLocationChange = () => {
      setTimeout(trackPageView, 100); // Delay để đảm bảo title đã được cập nhật
    };

    // Listen for popstate events (back/forward buttons)
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [trackingId, shouldTrack]);

  // Track performance và errors
  useEffect(() => {
    if (!shouldTrack || !trackingId || typeof window === 'undefined') return;

    // Track performance timing
    const trackPerformance = () => {
      if ('performance' in window && window.gtag) {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          trackTiming('page_load_time', navigation.loadEventEnd - navigation.loadEventStart);
          trackTiming('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
        }
      }
    };

    // Track errors
    const handleError = (event) => {
      if (window.gtag) {
        trackException(event.error?.message || 'Unknown error', true);
      }
    };

    const handleUnhandledRejection = (event) => {
      if (window.gtag) {
        trackException(event.reason?.message || 'Unhandled promise rejection', false);
      }
    };

    // Setup event listeners
    setTimeout(trackPerformance, 1000); // Delay để đảm bảo page đã load xong
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackingId, shouldTrack]);

  if (!shouldTrack || !trackingId) {
    return null;
  }

  return (
    <Helmet>
      {/* Google Analytics Global Site Tag (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </script>
    </Helmet>
  );
};

// Utility functions để track events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GOOGLE_ANALYTICS_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

export const trackCustomEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Advanced tracking functions
export const trackButtonClick = (buttonName, location = '') => {
  trackCustomEvent('click', 'button', `${buttonName}${location ? `_${location}` : ''}`);
};

export const trackFormSubmit = (formName) => {
  trackCustomEvent('form_submit', 'engagement', formName);
};

export const trackDownload = (fileName, fileType = '') => {
  trackCustomEvent('file_download', 'engagement', `${fileName}${fileType ? `_${fileType}` : ''}`);
};

export const trackExternalLink = (url) => {
  trackCustomEvent('click', 'external_link', url);
};

export const trackScrollDepth = (percentage) => {
  trackCustomEvent('scroll', 'engagement', `${percentage}%`, percentage);
};

export const trackSearch = (searchTerm, results = 0) => {
  trackCustomEvent('search', 'engagement', searchTerm, results);
};

export const trackVideoPlay = (videoTitle, duration = 0) => {
  trackCustomEvent('video_play', 'engagement', videoTitle, duration);
};

export const trackContact = (method) => {
  trackCustomEvent('contact', 'engagement', method);
};

export const trackLanguageChange = (fromLang, toLang) => {
  trackCustomEvent('language_change', 'engagement', `${fromLang}_to_${toLang}`);
};

export const trackTiming = (name, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: name,
      value: value
    });
  }
};

export const trackException = (description, fatal = false) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: description,
      fatal: fatal
    });
  }
};

export const setUserProperties = (properties) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GOOGLE_ANALYTICS_ID, {
      user_properties: properties
    });
  }
};

export default GoogleAnalytics;
