/**
 * SEO Head Component
 * Manages document head meta tags using global configuration
 */

import { useEffect } from 'react';
import { useGlobalConfig } from '@/contexts/GlobalConfigContext';

const SEOHead = ({
  title = '',
  description = '',
  keywords = '',
  image = '',
  url = '',
  type = 'website',
  noIndex = false,
  canonical = ''
}) => {
  const {
    getSiteName,
    getMetaTitle,
    getMetaDescription,
    getMetaKeywords,
    getOgImage,
    getFaviconUrl,
    isReady
  } = useGlobalConfig();

  useEffect(() => {
    if (!isReady()) return;

    // Generate final values with fallbacks
    const finalTitle = title ? `${title} | ${getSiteName()}` : getMetaTitle();
    const finalDescription = description || getMetaDescription();
    const finalKeywords = keywords || getMetaKeywords();
    const finalImage = image || getOgImage();
    const finalUrl = url || window.location.href;
    const faviconUrl = getFaviconUrl();

    // Update document title
    document.title = finalTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector, content, property = 'content') => {
      if (!content) return;

      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('name=')) {
          element.name = selector.match(/name="([^"]+)"/)[1];
        } else if (selector.includes('property=')) {
          element.property = selector.match(/property="([^"]+)"/)[1];
        }
        document.head.appendChild(element);
      }
      element[property] = content;
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel, href, type = '') => {
      if (!href) return;

      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
      if (type) element.type = type;
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', finalDescription);
    updateMetaTag('meta[name="keywords"]', finalKeywords);

    // Robots meta tag
    if (noIndex) {
      updateMetaTag('meta[name="robots"]', 'noindex, nofollow');
    } else {
      updateMetaTag('meta[name="robots"]', 'index, follow');
    }

    // Open Graph meta tags
    updateMetaTag('meta[property="og:title"]', finalTitle);
    updateMetaTag('meta[property="og:description"]', finalDescription);
    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[property="og:url"]', finalUrl);
    updateMetaTag('meta[property="og:site_name"]', getSiteName());

    if (finalImage) {
      updateMetaTag('meta[property="og:image"]', finalImage);
      updateMetaTag('meta[property="og:image:alt"]', finalTitle);
    }

    // Twitter Card meta tags
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', finalTitle);
    updateMetaTag('meta[name="twitter:description"]', finalDescription);

    if (finalImage) {
      updateMetaTag('meta[name="twitter:image"]', finalImage);
    }

    // Canonical URL
    const canonicalUrl = canonical || finalUrl;
    updateLinkTag('canonical', canonicalUrl);

    // Favicon
    updateLinkTag('icon', faviconUrl, 'image/x-icon');

    // Viewport meta tag (ensure it exists)
    updateMetaTag('meta[name="viewport"]', 'width=device-width, initial-scale=1.0');

    // Charset meta tag (ensure it exists)
    let charsetElement = document.querySelector('meta[charset]');
    if (!charsetElement) {
      charsetElement = document.createElement('meta');
      charsetElement.charset = 'UTF-8';
      document.head.insertBefore(charsetElement, document.head.firstChild);
    }

  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    noIndex,
    canonical,
    getSiteName,
    getMetaTitle,
    getMetaDescription,
    getMetaKeywords,
    getOgImage,
    getFaviconUrl,
    isReady
  ]);

  // This component doesn't render anything
  return null;
};

/**
 * Hook to easily set SEO data
 */
export const useSEO = ({
  title = '',
  description = ''
} = {}) => {
  const {
    getSiteName,
    getMetaTitle,
    getMetaDescription,
    generatePageTitle
  } = useGlobalConfig();

  // Generate final title
  const finalTitle = title ? generatePageTitle(title) : getMetaTitle();

  return {
    title: finalTitle,
    description: description || getMetaDescription(),
    siteName: getSiteName(),
    generatePageTitle: (pageTitle) => generatePageTitle(pageTitle)
  };
};

/**
 * Structured Data Component
 * Adds JSON-LD structured data to the page
 */
export const StructuredData = ({ data }) => {
  useEffect(() => {
    if (!data) return;

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
};

/**
 * Organization Structured Data Hook
 * Generates organization structured data from global config
 */
export const useOrganizationStructuredData = () => {
  const {
    getSiteName,
    getSiteDescription,
    getLogoUrl,
    getContactInfo,
    getSocialMediaLinks,
    isReady
  } = useGlobalConfig();

  if (!isReady()) return null;

  const contactInfo = getContactInfo();
  const socialLinks = getSocialMediaLinks();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": getSiteName(),
    "description": getSiteDescription(),
    "url": window.location.origin,
  };

  // Add logo
  const logoUrl = getLogoUrl();
  if (logoUrl && logoUrl !== '/default-logo.png') {
    structuredData.logo = logoUrl;
  }

  // Add contact info
  if (contactInfo.phone || contactInfo.email) {
    structuredData.contactPoint = {
      "@type": "ContactPoint",
      "contactType": "customer service"
    };

    if (contactInfo.phone) {
      structuredData.contactPoint.telephone = contactInfo.phone;
    }
    if (contactInfo.email) {
      structuredData.contactPoint.email = contactInfo.email;
    }
  }

  // Add address
  if (contactInfo.address) {
    structuredData.address = {
      "@type": "PostalAddress",
      "streetAddress": contactInfo.address
    };
  }

  // Add social media
  if (socialLinks.length > 0) {
    structuredData.sameAs = socialLinks.map(social => social.url);
  }

  return structuredData;
};

export default SEOHead;
