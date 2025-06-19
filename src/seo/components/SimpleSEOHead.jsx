/**
 * Simple SEO Head Component
 * Pure React Helmet approach - phương án đúng và tốt nhất
 */

import { Helmet } from 'react-helmet-async';
import { useGlobalConfig } from '@/contexts/GlobalConfigContext';
import { useLocation } from 'react-router-dom';

const SimpleSEOHead = ({
  title = '',
  description = '',
  keywords = '',
  image = '',
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

  const location = useLocation();

  if (!isReady()) {
    return null;
  }

  // Generate final values with fallbacks
  const finalTitle = title ? `${title} | ${getSiteName()}` : getMetaTitle();
  const finalDescription = description || getMetaDescription();
  const finalKeywords = keywords || getMetaKeywords();
  const finalImage = image || getOgImage();
  const finalUrl = `${window.location.origin}${location.pathname}`;
  const faviconUrl = getFaviconUrl();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}

      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical || finalUrl} />

      {/* Favicon */}
      {faviconUrl && <link rel="icon" type="image/x-icon" href={faviconUrl} />}

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={getSiteName()} />
      {finalImage && (
        <>
          <meta property="og:image" content={finalImage} />
          <meta property="og:image:alt" content={finalTitle} />
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={finalImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {finalImage && <meta name="twitter:image" content={finalImage} />}
    </Helmet>
  );
};

export default SimpleSEOHead;
