/**
 * Sitemap Page
 * Trang quản lý sitemap
 */

import React from 'react';
import SitemapManager from '../components/SitemapManager';
import SimpleSEOHead from '@/seo/components/SimpleSEOHead';

const SitemapPage = () => {
  return (
    <>
      <SimpleSEOHead 
        title="Sitemap Manager"
        description="Quản lý sitemap và robots.txt cho website"
        noIndex={true}
      />
      <div className="min-h-screen bg-gray-50 py-8">
        <SitemapManager />
      </div>
    </>
  );
};

export default SitemapPage;
