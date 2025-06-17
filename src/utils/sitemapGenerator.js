/**
 * Sitemap Generator
 * Tạo sitemap.xml dựa trên routes và hỗ trợ đa ngôn ngữ
 */

// Cấu hình routes tĩnh từ router.jsx
const STATIC_ROUTES = {
  vi: [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/gioi-thieu', priority: 0.8, changefreq: 'monthly' },
    { path: '/san-pham-dich-vu', priority: 0.9, changefreq: 'weekly' },
    { path: '/bao-gia-tu-van', priority: 0.7, changefreq: 'monthly' },
    { path: '/du-an-tieu-bieu', priority: 0.9, changefreq: 'weekly' },
    { path: '/lien-he', priority: 0.6, changefreq: 'monthly' }
  ],
  en: [
    { path: '/en', priority: 1.0, changefreq: 'daily' },
    { path: '/en/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/en/products', priority: 0.9, changefreq: 'weekly' },
    { path: '/en/pricing', priority: 0.7, changefreq: 'monthly' },
    { path: '/en/projects', priority: 0.9, changefreq: 'weekly' },
    { path: '/en/contact', priority: 0.6, changefreq: 'monthly' }
  ]
};

// Cấu hình ngôn ngữ
const LANGUAGES = {
  vi: {
    code: 'vi',
    domain: 'http://kachivina.vn',
    name: 'Tiếng Việt'
  },
  en: {
    code: 'en',
    domain: 'http://kachivina.vn',
    name: 'English'
  }
};

class SitemapGenerator {
  constructor(baseUrl = 'http://kachivina.vn') {
    this.baseUrl = baseUrl;
    this.dynamicRoutes = [];
  }

  /**
   * Thêm dynamic routes (từ API)
   * @param {Function} fetchFunction - Function để fetch data
   * @param {Function} mapFunction - Function để map data thành routes
   */
  addDynamicRoutes(fetchFunction, mapFunction) {
    this.dynamicRoutes.push({ fetchFunction, mapFunction });
  }

  /**
   * Lấy tất cả routes tĩnh
   * @returns {Array} - Mảng các routes
   */
  getStaticRoutes() {
    const routes = [];

    Object.entries(STATIC_ROUTES).forEach(([lang, langRoutes]) => {
      langRoutes.forEach(route => {
        routes.push({
          ...route,
          lang,
          lastmod: new Date().toISOString().split('T')[0]
        });
      });
    });

    return routes;
  }

  /**
   * Lấy dynamic routes từ API
   * @returns {Promise<Array>} - Mảng các dynamic routes
   */
  async getDynamicRoutes() {
    const routes = [];

    for (const { fetchFunction, mapFunction } of this.dynamicRoutes) {
      try {
        const data = await fetchFunction();
        const dynamicRoutes = mapFunction(data);
        routes.push(...dynamicRoutes);
      } catch (error) {
        console.error('Error fetching dynamic routes:', error);
      }
    }

    return routes;
  }

  /**
   * Tạo hreflang cho một route
   * @param {Object} route - Route object
   * @returns {Object} - Hreflang mappings
   */
  generateHreflang(route) {
    const hreflang = {};

    // Mapping giữa Vietnamese và English routes
    const routeMapping = {
      '/': '/en',
      '/gioi-thieu': '/en/about',
      '/san-pham-dich-vu': '/en/products',
      '/bao-gia-tu-van': '/en/pricing',
      '/du-an-tieu-bieu': '/en/projects',
      '/lien-he': '/en/contact'
    };

    if (route.lang === 'vi') {
      hreflang['vi'] = `${this.baseUrl}${route.path}`;
      const enPath = routeMapping[route.path];
      if (enPath) {
        hreflang['en'] = `${this.baseUrl}${enPath}`;
      }
      hreflang['x-default'] = `${this.baseUrl}${route.path}`;
    } else if (route.lang === 'en') {
      hreflang['en'] = `${this.baseUrl}${route.path}`;
      const viPath = Object.keys(routeMapping).find(key => routeMapping[key] === route.path);
      if (viPath) {
        hreflang['vi'] = `${this.baseUrl}${viPath}`;
        hreflang['x-default'] = `${this.baseUrl}${viPath}`;
      }
    }

    return hreflang;
  }

  /**
   * Tạo sitemap XML
   * @returns {Promise<string>} - Sitemap XML string
   */
  async generateSitemap() {
    const staticRoutes = this.getStaticRoutes();
    const dynamicRoutes = await this.getDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    allRoutes.forEach(route => {
      xml += '  <url>\n';
      xml += `    <loc>${this.baseUrl}${route.path}</loc>\n`;
      xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;

      // Thêm hreflang links
      const hreflang = this.generateHreflang(route);
      Object.entries(hreflang).forEach(([lang, url]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />\n`;
      });

      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Download sitemap as file
   */
  async downloadSitemap() {
    try {
      const sitemapXml = await this.generateSitemap();

      const blob = new Blob([sitemapXml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      console.log('Sitemap downloaded successfully!');
    } catch (error) {
      console.error('Error downloading sitemap:', error);
    }
  }

  /**
   * Tạo robots.txt
   * @param {Object} options - Robots.txt options
   * @returns {string} - Robots.txt content
   */
  generateRobotsTxt(options = {}) {
    const {
      userAgent = '*',
      allow = ['/'],
      disallow = ['/admin/', '/private/', '/*.json'],
      sitemapUrl = `${this.baseUrl}/sitemap.xml`,
      crawlDelay = null
    } = options;

    let robotsTxt = `User-agent: ${userAgent}\n`;

    allow.forEach(path => {
      robotsTxt += `Allow: ${path}\n`;
    });

    disallow.forEach(path => {
      robotsTxt += `Disallow: ${path}\n`;
    });

    if (crawlDelay) {
      robotsTxt += `Crawl-delay: ${crawlDelay}\n`;
    }

    robotsTxt += `\nSitemap: ${sitemapUrl}\n`;

    return robotsTxt;
  }

  /**
   * Download robots.txt as file
   */
  downloadRobotsTxt(options = {}) {
    const robotsTxt = this.generateRobotsTxt(options);

    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    console.log('Robots.txt downloaded successfully!');
  }

  /**
   * Log sitemap to console (for debugging)
   */
  async logSitemap() {
    try {
      const sitemapXml = await this.generateSitemap();
      console.log('Generated Sitemap:');
      console.log(sitemapXml);
    } catch (error) {
      console.error('Error generating sitemap:', error);
    }
  }

  /**
   * Get sitemap statistics
   * @returns {Promise<Object>} - Sitemap statistics
   */
  async getStatistics() {
    const staticRoutes = this.getStaticRoutes();
    const dynamicRoutes = await this.getDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    const stats = {
      totalRoutes: allRoutes.length,
      staticRoutes: staticRoutes.length,
      dynamicRoutes: dynamicRoutes.length,
      languageBreakdown: {},
      priorityDistribution: {},
      changefreqDistribution: {},
      lastGenerated: new Date().toISOString()
    };

    // Language breakdown
    allRoutes.forEach(route => {
      const lang = route.lang || 'unknown';
      stats.languageBreakdown[lang] = (stats.languageBreakdown[lang] || 0) + 1;
    });

    // Priority distribution
    allRoutes.forEach(route => {
      const priority = route.priority.toString();
      stats.priorityDistribution[priority] = (stats.priorityDistribution[priority] || 0) + 1;
    });

    // Changefreq distribution
    allRoutes.forEach(route => {
      stats.changefreqDistribution[route.changefreq] = (stats.changefreqDistribution[route.changefreq] || 0) + 1;
    });

    return stats;
  }
}

// Create singleton instance
const sitemapGenerator = new SitemapGenerator();

export default sitemapGenerator;
