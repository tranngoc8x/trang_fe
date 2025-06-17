/**
 * Sitemap Hook
 * Hook để sử dụng sitemap generator
 */

import { useState, useCallback } from 'react';
import sitemapGenerator from '../utils/sitemapGenerator';

export const useSitemap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSitemap = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await sitemapGenerator.downloadSitemap();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateRobotsTxt = useCallback(() => {
    try {
      sitemapGenerator.downloadRobotsTxt();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  const previewSitemap = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const sitemap = await sitemapGenerator.generateSitemap();
      return sitemap;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStatistics = useCallback(async () => {
    try {
      const stats = await sitemapGenerator.getStatistics();
      return stats;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const addProductRoutes = useCallback((products) => {
    sitemapGenerator.addDynamicRoutes(
      async () => products,
      (products) => {
        const routes = [];
        
        products.forEach(product => {
          // Vietnamese routes
          routes.push({
            path: `/san-pham-dich-vu/${product.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
            lastmod: product.updatedAt || new Date().toISOString().split('T')[0],
            lang: 'vi'
          });
          
          // English routes
          routes.push({
            path: `/en/products/${product.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
            lastmod: product.updatedAt || new Date().toISOString().split('T')[0],
            lang: 'en'
          });
        });
        
        return routes;
      }
    );
  }, []);

  const addProjectRoutes = useCallback((projects) => {
    sitemapGenerator.addDynamicRoutes(
      async () => projects,
      (projects) => {
        const routes = [];
        
        projects.forEach(project => {
          // Vietnamese routes
          routes.push({
            path: `/du-an-tieu-bieu/${project.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
            lastmod: project.updatedAt || new Date().toISOString().split('T')[0],
            lang: 'vi'
          });
          
          // English routes
          routes.push({
            path: `/en/projects/${project.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
            lastmod: project.updatedAt || new Date().toISOString().split('T')[0],
            lang: 'en'
          });
        });
        
        return routes;
      }
    );
  }, []);

  return {
    loading,
    error,
    generateSitemap,
    generateRobotsTxt,
    previewSitemap,
    getStatistics,
    addProductRoutes,
    addProjectRoutes
  };
};
