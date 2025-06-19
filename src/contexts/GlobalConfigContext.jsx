/**
 * Global Configuration Context
 * Provides global website configuration data to the entire application
 */

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { globalService } from '@/services/appService';

// Create context
const GlobalConfigContext = createContext();

/**
 * Global Configuration Provider
 * Loads global config when app starts and provides it to all components
 */
export const GlobalConfigProvider = ({ children }) => {
  // State management
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [initialized, setInitialized] = useState(false);

  /**
   * Load global configuration
   */
  const loadGlobalConfig = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await globalService.getGlobalConfig({
        populate: {
          favicon: {
            fields: ['url']
          },
          logo2: {
            fields: ['url']
          },
          logo: {
            fields: ['url']
          },
          defaultSeo: {
            populate: "*"
          }
        }
      }, forceRefresh);

      setData(response);
      setLastUpdated(new Date());
      setInitialized(true);

      return response;
    } catch (err) {
      setError(err.message);
      console.error('❌ GlobalConfigProvider: Failed to load global configuration:', err);

      // If we have cached data, use it
      const cacheInfo = globalService.getCacheInfo();
      if (cacheInfo.hasCache) {
        // Try to get cached data
        try {
          const cachedResponse = await globalService.getGlobalConfig();
          setData(cachedResponse.data);
          setInitialized(true);
        } catch (cacheError) {
          console.error('❌ GlobalConfigProvider: Failed to get cached data:', cacheError);
        }
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refresh global configuration
   */
  const refresh = useCallback(() => {
    return loadGlobalConfig(true);
  }, [loadGlobalConfig]);

  /**
   * Clear cache
   */
  const clearCache = useCallback(() => {
    globalService.clearCache();
  }, []);

  // Load global config when provider mounts
  useEffect(() => {
    loadGlobalConfig();
  }, [loadGlobalConfig]);

  // Utility functions for easy access to common data
  const utilities = {
    /**
     * Get site name with fallback
     */
    getSiteName: (fallback = 'Website') => {
      return data?.siteName || fallback;
    },

    /**
     * Get site description
     */
    getSiteDescription: (fallback = '') => {
      return data?.siteDescription || fallback;
    },

    /**
     * Get logo URL with fallback
     */
    getLogoUrl: (fallback = '/favicon.jpg') => {
      return 'https://assets.kachivina.vn' + data?.logo?.url || fallback;
    },

    getLogoUrl2: (fallback = '/favicon.jpg') => {
      return 'https://assets.kachivina.vn' + data?.logo2?.url || fallback;
    },


    /**
     * Get logo config
     */
    getLogo: () => {
      return data?.logo || null;
    },
    getLogo2: () => {
      return data?.logo2 || null;
    },

    /**
     * Get contact information
     */
    getContactInfo: () => {
      return data?.contact || {};
    },

    /**
     * Get phone number
     */
    getPhone: () => {
      return data?.contact?.phone || '';
    },

    /**
     * Get email
     */
    getEmail: () => {
      return data?.contact?.email || '';
    },

    /**
     * Get address
     */
    getAddress: () => {
      return data?.contact?.address || '';
    },

    /**
     * Get social media links
     */
    getSocialMediaLinks: () => {
      return data?.socialMedia || [];
    },

    /**
     * Get social media link by platform
     */
    getSocialMediaLink: (platform) => {
      const socialMedia = data?.socialMedia || [];
      return socialMedia.find(social => social.platform === platform);
    },

    /**
     * Get SEO configuration
     */
    getSeoConfig: () => {
      return data?.seo || {};
    },

    /**
     * Get meta title with fallback
     */
    getMetaTitle: (pageTitle = '') => {
      if (pageTitle) return pageTitle;
      return data?.defaultSeo?.metaTitle || data?.siteName || 'Website';
    },

    /**
     * Get meta description with fallback
     */
    getMetaDescription: (pageDescription = '') => {
      if (pageDescription) return pageDescription;
      return data?.defaultSeo?.metaDescription || data?.siteDescription || '';
    },

    /**
     * Get meta keywords
     */
    getMetaKeywords: () => {
      return data?.defaultSeo?.metaKeywords || '';
    },

    /**
     * Get OG image
     */
    getOgImage: () => {
      const shareImageUrl = data?.defaultSeo?.shareImage?.url;
      return shareImageUrl ? `https://assets.kachivina.vn${shareImageUrl}` : '';
    },

    /**
     * Get favicon URL
     */
    getFaviconUrl: () => {
      const faviconUrl = data?.favicon?.url;
      return faviconUrl ? `https://assets.kachivina.vn${faviconUrl}` : '/favicon.jpg';
    },

    /**
     * Check if maintenance mode is enabled
     */
    isMaintenanceMode: () => {
      return data?.maintenanceMode || false;
    },

    /**
     * Get theme configuration
     */
    getThemeConfig: () => {
      return data?.theme || {};
    },

    /**
     * Get analytics configuration
     */
    getAnalyticsConfig: () => {
      return data?.analytics || {};
    },

    /**
     * Generate page title with site name
     */
    generatePageTitle: (pageTitle = '') => {
      const siteName = utilities.getSiteName();
      if (!pageTitle) return siteName;
      return `${pageTitle} | ${siteName}`;
    },

    /**
     * Check if global config is ready
     */
    isReady: () => {
      return initialized && !loading && data !== null;
    }
  };

  // Context value
  const contextValue = {
    // Raw data
    data,
    loading,
    error,
    lastUpdated,
    initialized,

    // Actions
    loadGlobalConfig,
    refresh,
    clearCache,

    // Utilities
    ...utilities,

    // Raw utilities object (if needed)
    utilities
  };

  return (
    <GlobalConfigContext.Provider value={contextValue}>
      {children}
    </GlobalConfigContext.Provider>
  );
};

/**
 * Hook to use Global Configuration Context
 */
export const useGlobalConfig = () => {
  const context = useContext(GlobalConfigContext);
  if (!context) {
    throw new Error('useGlobalConfig must be used within a GlobalConfigProvider');
  }
  return context;
};

/**
 * Hook to get only the data (simplified)
 */
export const useGlobalConfigData = () => {
  const { data } = useGlobalConfig();
  return data;
};

/**
 * Hook to get a specific value from global config
 */
export const useGlobalConfigValue = (path, defaultValue = null) => {
  const { data } = useGlobalConfig();

  if (!data || !path) return defaultValue;

  // Support nested paths like 'contact.phone'
  const value = path.split('.').reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined;
  }, data);

  return value !== undefined ? value : defaultValue;
};

export default GlobalConfigContext;
