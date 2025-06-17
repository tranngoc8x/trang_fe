/**
 * Google Analytics Hook
 * Hook để sử dụng Google Analytics trong React components
 */

import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const GOOGLE_ANALYTICS_ID = 'G-G62WZE9GG8';

export const useGoogleAnalytics = (trackingId = GOOGLE_ANALYTICS_ID) => {
  const location = useLocation();

  // Track page views khi route thay đổi
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', trackingId, {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [location, trackingId]);

  // Function để track events
  const trackEvent = useCallback((eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Function để track custom events
  const trackCustomEvent = useCallback((action, category, label, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Function để track conversions
  const trackConversion = useCallback((conversionId, conversionLabel, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${conversionId}/${conversionLabel}`,
        value: value,
        currency: 'VND',
      });
    }
  }, []);

  // Function để track user engagement
  const trackEngagement = useCallback((engagementType, details = {}) => {
    trackEvent('engagement', {
      engagement_type: engagementType,
      ...details,
    });
  }, [trackEvent]);

  // Function để track scroll depth
  const trackScrollDepth = useCallback((percentage) => {
    trackEvent('scroll', {
      scroll_depth: percentage,
    });
  }, [trackEvent]);

  // Function để track clicks
  const trackClick = useCallback((elementName, elementType = 'button') => {
    trackEvent('click', {
      element_name: elementName,
      element_type: elementType,
    });
  }, [trackEvent]);

  // Function để track form submissions
  const trackFormSubmit = useCallback((formName, formType = 'contact') => {
    trackEvent('form_submit', {
      form_name: formName,
      form_type: formType,
    });
  }, [trackEvent]);

  // Function để track downloads
  const trackDownload = useCallback((fileName, fileType = '') => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
    });
  }, [trackEvent]);

  // Function để track external links
  const trackExternalLink = useCallback((url) => {
    trackEvent('click', {
      link_url: url,
      link_type: 'external',
    });
  }, [trackEvent]);

  // Function để track search
  const trackSearch = useCallback((searchTerm, results = 0) => {
    trackEvent('search', {
      search_term: searchTerm,
      search_results: results,
    });
  }, [trackEvent]);

  // Function để track video play
  const trackVideoPlay = useCallback((videoTitle, duration = 0) => {
    trackEvent('video_play', {
      video_title: videoTitle,
      video_duration: duration,
    });
  }, [trackEvent]);

  // Function để track contact
  const trackContact = useCallback((method) => {
    trackEvent('contact', {
      contact_method: method,
    });
  }, [trackEvent]);

  // Function để track language change
  const trackLanguageChange = useCallback((fromLang, toLang) => {
    trackEvent('language_change', {
      from_language: fromLang,
      to_language: toLang,
    });
  }, [trackEvent]);

  // Function để track timing
  const trackTiming = useCallback((name, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: name,
        value: value
      });
    }
  }, []);

  // Function để track exceptions
  const trackException = useCallback((description, fatal = false) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: description,
        fatal: fatal
      });
    }
  }, []);

  // Function để set user properties
  const setUserProperties = useCallback((properties) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', trackingId, {
        user_properties: properties
      });
    }
  }, [trackingId]);

  return {
    trackEvent,
    trackCustomEvent,
    trackConversion,
    trackEngagement,
    trackScrollDepth,
    trackClick,
    trackFormSubmit,
    trackDownload,
    trackExternalLink,
    trackSearch,
    trackVideoPlay,
    trackContact,
    trackLanguageChange,
    trackTiming,
    trackException,
    setUserProperties,
  };
};

export default useGoogleAnalytics;
