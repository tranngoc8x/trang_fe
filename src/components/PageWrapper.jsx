/**
 * Page Wrapper Component
 * Wrapper component để handle SEO cho từng page
 */

import React from 'react';
import SEOHead from './SEOHead';
import { useGlobalConfig } from '@/contexts/GlobalConfigContext';

const PageWrapper = ({ 
  children,
  title = '',
  description = '',
  keywords = '',
  image = '',
  type = 'website',
  noIndex = false,
  canonical = '',
  className = ''
}) => {
  const { isReady } = useGlobalConfig();

  return (
    <>
      {/* SEO Head for this specific page */}
      {isReady() && (
        <SEOHead
          title={title}
          description={description}
          keywords={keywords}
          image={image}
          type={type}
          noIndex={noIndex}
          canonical={canonical}
        />
      )}
      
      {/* Page content */}
      <div className={`page-wrapper ${className}`}>
        {children}
      </div>
    </>
  );
};

/**
 * Hook để dễ dàng sử dụng PageWrapper
 */
export const usePageSEO = (seoData) => {
  const { generatePageTitle } = useGlobalConfig();
  
  return {
    title: seoData.title ? generatePageTitle(seoData.title) : '',
    description: seoData.description || '',
    keywords: seoData.keywords || '',
    image: seoData.image || '',
    type: seoData.type || 'website',
    noIndex: seoData.noIndex || false,
    canonical: seoData.canonical || ''
  };
};

export default PageWrapper;
