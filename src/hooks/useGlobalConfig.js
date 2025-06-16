/**
 * Custom React Hook để sử dụng Global Configuration
 * Cung cấp cách dễ dàng để lấy và sử dụng global config trong React components
 */

import { useState, useEffect, useCallback } from 'react';
import { globalService } from '@/services/appService';

/**
 * Hook để lấy global configuration
 * @param {Object} options - Tùy chọn cho hook
 * @param {Object} options.params - Tham số cho API call
 * @param {boolean} options.autoLoad - Tự động load khi component mount (default: true)
 * @param {boolean} options.forceRefresh - Bắt buộc refresh cache (default: false)
 * @returns {Object} Object chứa data, loading, error và các utility functions
 */
export const useGlobalConfig = (options = {}) => {
  const {
    params = {},
    autoLoad = true,
    forceRefresh = false
  } = options;

  // State management
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Function để load global config
   */
  const loadGlobalConfig = useCallback(async (customParams = {}, customForceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const mergedParams = { ...params, ...customParams };
      const shouldForceRefresh = forceRefresh || customForceRefresh;

      const response = await globalService.getGlobalConfig(mergedParams, shouldForceRefresh);
      
      setData(response.data);
      setLastUpdated(new Date());
      
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('useGlobalConfig - Lỗi khi tải global config:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [params, forceRefresh]);

  /**
   * Function để refresh data
   */
  const refresh = useCallback((customParams = {}) => {
    return loadGlobalConfig(customParams, true);
  }, [loadGlobalConfig]);

  /**
   * Function để clear cache
   */
  const clearCache = useCallback(() => {
    globalService.clearCache();
  }, []);

  /**
   * Function để lấy cache info
   */
  const getCacheInfo = useCallback(() => {
    return globalService.getCacheInfo();
  }, []);

  // Auto load khi component mount
  useEffect(() => {
    if (autoLoad) {
      loadGlobalConfig();
    }
  }, [autoLoad, loadGlobalConfig]);

  // Utility functions để truy cập dữ liệu dễ dàng hơn
  const utilities = {
    /**
     * Lấy logo URL với fallback
     */
    getLogoUrl: (fallbackUrl = '/default-logo.png') => {
      return data?.logo?.url || fallbackUrl;
    },

    /**
     * Lấy logo config
     */
    getLogo: () => {
      return data?.logo || null;
    },

    /**
     * Lấy site name
     */
    getSiteName: () => {
      return data?.siteName || '';
    },

    /**
     * Lấy site description
     */
    getSiteDescription: () => {
      return data?.siteDescription || '';
    },

    /**
     * Lấy thông tin liên hệ
     */
    getContactInfo: () => {
      return data?.contact || {};
    },

    /**
     * Lấy số điện thoại
     */
    getPhone: () => {
      return data?.contact?.phone || '';
    },

    /**
     * Lấy email
     */
    getEmail: () => {
      return data?.contact?.email || '';
    },

    /**
     * Lấy địa chỉ
     */
    getAddress: () => {
      return data?.contact?.address || '';
    },

    /**
     * Lấy social media links
     */
    getSocialMediaLinks: () => {
      return data?.socialMedia || [];
    },

    /**
     * Lấy social media link theo platform
     */
    getSocialMediaLink: (platform) => {
      const socialMedia = data?.socialMedia || [];
      return socialMedia.find(social => social.platform === platform);
    },

    /**
     * Lấy SEO config
     */
    getSeoConfig: () => {
      return data?.seo || {};
    },

    /**
     * Lấy meta title
     */
    getMetaTitle: () => {
      return data?.seo?.metaTitle || data?.siteName || '';
    },

    /**
     * Lấy meta description
     */
    getMetaDescription: () => {
      return data?.seo?.metaDescription || data?.siteDescription || '';
    },

    /**
     * Lấy favicon URL
     */
    getFaviconUrl: () => {
      return data?.favicon || '/favicon.ico';
    },

    /**
     * Kiểm tra maintenance mode
     */
    isMaintenanceMode: () => {
      return data?.maintenanceMode || false;
    },

    /**
     * Lấy theme config
     */
    getThemeConfig: () => {
      return data?.theme || {};
    },

    /**
     * Lấy analytics config
     */
    getAnalyticsConfig: () => {
      return data?.analytics || {};
    }
  };

  return {
    // Data
    data,
    loading,
    error,
    lastUpdated,

    // Actions
    loadGlobalConfig,
    refresh,
    clearCache,
    getCacheInfo,

    // Utilities
    ...utilities,

    // Raw utilities object (nếu cần)
    utilities
  };
};

/**
 * Hook đơn giản chỉ để lấy data (không có loading state)
 * Sử dụng khi bạn chỉ cần data và không quan tâm đến loading state
 */
export const useGlobalConfigData = (params = {}) => {
  const { data } = useGlobalConfig({ params, autoLoad: true });
  return data;
};

/**
 * Hook để lấy một phần cụ thể của global config
 * @param {string} path - Đường dẫn đến data cần lấy (ví dụ: 'contact.phone')
 * @param {*} defaultValue - Giá trị mặc định nếu không tìm thấy
 */
export const useGlobalConfigValue = (path, defaultValue = null) => {
  const { data } = useGlobalConfig();
  
  if (!data || !path) return defaultValue;
  
  // Hỗ trợ nested path như 'contact.phone'
  const value = path.split('.').reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined;
  }, data);
  
  return value !== undefined ? value : defaultValue;
};

export default useGlobalConfig;
