/**
 * Global Configuration Service - Main Export File
 * File tổng hợp để export tất cả các utilities liên quan đến global config
 */

// Export service
export { globalService } from './appService';

// Export hooks
export {
  useGlobalConfig,
  useGlobalConfigData,
  useGlobalConfigValue
} from '@/hooks/useGlobalConfig';

// Export types (for JSDoc reference)
export * from '@/types/global';

// Export test utilities
export { default as globalServiceTest } from '@/test/globalService.test';

/**
 * Utility functions để làm việc với global config data
 */
export const globalConfigUtils = {
  /**
   * Kiểm tra xem có phải maintenance mode không
   */
  isMaintenanceMode: (globalData) => {
    return globalData?.maintenanceMode || false;
  },

  /**
   * Lấy logo URL với fallback
   */
  getLogoUrl: (globalData, fallback = '/default-logo.png') => {
    return globalData?.logo?.url || fallback;
  },

  /**
   * Lấy site name với fallback
   */
  getSiteName: (globalData, fallback = 'Website') => {
    return globalData?.siteName || fallback;
  },

  /**
   * Lấy contact phone với format
   */
  getFormattedPhone: (globalData) => {
    const phone = globalData?.contact?.phone;
    if (!phone) return null;
    
    // Format phone number (simple Vietnamese format)
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  },

  /**
   * Lấy social media link theo platform
   */
  getSocialLink: (globalData, platform) => {
    const socialMedia = globalData?.socialMedia || [];
    return socialMedia.find(social => social.platform === platform);
  },

  /**
   * Tạo structured data cho SEO
   */
  generateStructuredData: (globalData) => {
    if (!globalData) return null;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": globalData.siteName,
      "description": globalData.siteDescription,
      "url": window.location.origin,
    };

    // Thêm logo nếu có
    if (globalData.logo?.url) {
      structuredData.logo = globalData.logo.url;
    }

    // Thêm contact info nếu có
    if (globalData.contact) {
      const contact = globalData.contact;
      if (contact.phone || contact.email || contact.address) {
        structuredData.contactPoint = {
          "@type": "ContactPoint",
          "contactType": "customer service"
        };

        if (contact.phone) {
          structuredData.contactPoint.telephone = contact.phone;
        }
        if (contact.email) {
          structuredData.contactPoint.email = contact.email;
        }
      }

      if (contact.address) {
        structuredData.address = {
          "@type": "PostalAddress",
          "streetAddress": contact.address
        };
      }
    }

    // Thêm social media nếu có
    if (globalData.socialMedia && globalData.socialMedia.length > 0) {
      structuredData.sameAs = globalData.socialMedia.map(social => social.url);
    }

    return structuredData;
  },

  /**
   * Tạo meta tags cho SEO
   */
  generateMetaTags: (globalData, pageTitle, pageDescription) => {
    if (!globalData) return [];

    const tags = [];
    const seo = globalData.seo || {};
    
    // Title
    const title = pageTitle || seo.metaTitle || globalData.siteName;
    if (title) {
      tags.push({ name: 'title', content: title });
      tags.push({ property: 'og:title', content: title });
    }

    // Description
    const description = pageDescription || seo.metaDescription || globalData.siteDescription;
    if (description) {
      tags.push({ name: 'description', content: description });
      tags.push({ property: 'og:description', content: description });
    }

    // Keywords
    if (seo.metaKeywords) {
      tags.push({ name: 'keywords', content: seo.metaKeywords });
    }

    // OG Image
    if (seo.ogImage) {
      tags.push({ property: 'og:image', content: seo.ogImage });
    }

    // Site name
    if (globalData.siteName) {
      tags.push({ property: 'og:site_name', content: globalData.siteName });
    }

    return tags;
  },

  /**
   * Validate global config data structure
   */
  validateGlobalConfig: (globalData) => {
    const errors = [];
    const warnings = [];

    if (!globalData) {
      errors.push('Global config data is null or undefined');
      return { isValid: false, errors, warnings };
    }

    // Required fields
    if (!globalData.siteName) {
      errors.push('siteName is required');
    }

    // Optional but recommended fields
    if (!globalData.siteDescription) {
      warnings.push('siteDescription is recommended for SEO');
    }

    if (!globalData.logo?.url) {
      warnings.push('logo.url is recommended');
    }

    if (!globalData.contact?.phone && !globalData.contact?.email) {
      warnings.push('At least one contact method (phone or email) is recommended');
    }

    if (!globalData.seo?.metaDescription) {
      warnings.push('seo.metaDescription is recommended for SEO');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
};

/**
 * Constants liên quan đến global config
 */
export const GLOBAL_CONFIG_CONSTANTS = {
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  DEFAULT_TIMEOUT: 10000, // 10 seconds
  DEFAULT_LOGO: '/default-logo.png',
  DEFAULT_FAVICON: '/favicon.ico',
  
  // Social media platforms
  SOCIAL_PLATFORMS: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok'
  },

  // Contact types
  CONTACT_TYPES: {
    PHONE: 'phone',
    EMAIL: 'email',
    ADDRESS: 'address',
    WORKING_HOURS: 'workingHours'
  }
};

// Default export
export default {
  globalService,
  globalConfigUtils,
  GLOBAL_CONFIG_CONSTANTS
};
