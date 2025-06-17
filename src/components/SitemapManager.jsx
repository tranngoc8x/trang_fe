/**
 * Sitemap Manager Component
 * Giao diện quản lý sitemap
 */

import { useState, useEffect } from 'react';
import sitemapGenerator from '../utils/sitemapGenerator';

const SitemapManager = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sitemapPreview, setSitemapPreview] = useState('');

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const statistics = await sitemapGenerator.getStatistics();
      setStats(statistics);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const handleGenerateSitemap = async () => {
    setLoading(true);
    try {
      await sitemapGenerator.downloadSitemap();
      await loadStatistics();
    } catch (error) {
      console.error('Error generating sitemap:', error);
      alert('Lỗi khi tạo sitemap: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRobots = () => {
    try {
      sitemapGenerator.downloadRobotsTxt();
    } catch (error) {
      console.error('Error generating robots.txt:', error);
      alert('Lỗi khi tạo robots.txt: ' + error.message);
    }
  };

  const handlePreviewSitemap = async () => {
    setLoading(true);
    try {
      const sitemap = await sitemapGenerator.generateSitemap();
      setSitemapPreview(sitemap);
    } catch (error) {
      console.error('Error previewing sitemap:', error);
      alert('Lỗi khi preview sitemap: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDynamicRoutes = () => {
    // Thêm dynamic routes cho sản phẩm
    sitemapGenerator.addDynamicRoutes(
      // Fetch function - thay thế bằng API call thực tế
      async () => {
        // Giả lập API call
        return [
          { id: 1, slug: 'website-development', updatedAt: '2024-01-15' },
          { id: 2, slug: 'mobile-app', updatedAt: '2024-01-10' },
          { id: 3, slug: 'digital-marketing', updatedAt: '2024-01-05' }
        ];
      },
      // Map function
      (products) => {
        const routes = [];
        
        products.forEach(product => {
          // Vietnamese routes
          routes.push({
            path: `/san-pham-dich-vu/${product.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
            lastmod: product.updatedAt,
            lang: 'vi'
          });
          
          // English routes
          routes.push({
            path: `/en/products/${product.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
            lastmod: product.updatedAt,
            lang: 'en'
          });
        });
        
        return routes;
      }
    );

    // Thêm dynamic routes cho dự án
    sitemapGenerator.addDynamicRoutes(
      // Fetch function - thay thế bằng API call thực tế
      async () => {
        // Giả lập API call
        return [
          { id: 1, slug: 'ecommerce-platform', updatedAt: '2024-01-12' },
          { id: 2, slug: 'corporate-website', updatedAt: '2024-01-08' },
          { id: 3, slug: 'mobile-banking-app', updatedAt: '2024-01-03' }
        ];
      },
      // Map function
      (projects) => {
        const routes = [];
        
        projects.forEach(project => {
          // Vietnamese routes
          routes.push({
            path: `/du-an-tieu-bieu/${project.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
            lastmod: project.updatedAt,
            lang: 'vi'
          });
          
          // English routes
          routes.push({
            path: `/en/projects/${project.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
            lastmod: project.updatedAt,
            lang: 'en'
          });
        });
        
        return routes;
      }
    );

    alert('Đã thêm dynamic routes! Hãy tạo sitemap để xem kết quả.');
    loadStatistics();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Sitemap Manager</h1>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleGenerateSitemap}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Đang tạo...' : 'Tạo & Download Sitemap'}
        </button>
        
        <button
          onClick={handleGenerateRobots}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Tạo & Download Robots.txt
        </button>
        
        <button
          onClick={handlePreviewSitemap}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Preview Sitemap
        </button>
        
        <button
          onClick={handleAddDynamicRoutes}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Thêm Dynamic Routes
        </button>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Thống kê Sitemap</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <strong>Tổng routes:</strong> {stats.totalRoutes}
            </div>
            <div>
              <strong>Static routes:</strong> {stats.staticRoutes}
            </div>
            <div>
              <strong>Dynamic routes:</strong> {stats.dynamicRoutes}
            </div>
            <div>
              <strong>Cập nhật:</strong> {new Date(stats.lastGenerated).toLocaleString('vi-VN')}
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <strong>Ngôn ngữ:</strong>
              <ul className="text-sm mt-1">
                {Object.entries(stats.languageBreakdown).map(([lang, count]) => (
                  <li key={lang}>
                    {lang === 'vi' ? 'Tiếng Việt' : lang === 'en' ? 'English' : lang}: {count}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong>Priority:</strong>
              <ul className="text-sm mt-1">
                {Object.entries(stats.priorityDistribution).map(([priority, count]) => (
                  <li key={priority}>{priority}: {count}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong>Change Frequency:</strong>
              <ul className="text-sm mt-1">
                {Object.entries(stats.changefreqDistribution).map(([freq, count]) => (
                  <li key={freq}>{freq}: {count}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sitemap Preview */}
      {sitemapPreview && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Preview Sitemap</h3>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto max-h-96 overflow-y-auto">
            {sitemapPreview}
          </pre>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Hướng dẫn sử dụng</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Tạo Sitemap:</strong> Tạo và download file sitemap.xml</li>
          <li>• <strong>Tạo Robots.txt:</strong> Tạo và download file robots.txt</li>
          <li>• <strong>Preview:</strong> Xem trước nội dung sitemap</li>
          <li>• <strong>Dynamic Routes:</strong> Thêm routes từ API (sản phẩm, dự án)</li>
          <li>• <strong>Hreflang:</strong> Tự động tạo alternate links cho đa ngôn ngữ</li>
          <li>• <strong>Upload:</strong> Upload files lên server tại /sitemap.xml và /robots.txt</li>
        </ul>
      </div>
    </div>
  );
};

export default SitemapManager;
