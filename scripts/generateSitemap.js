/**
 * Generate Sitemap Script
 * Script để tạo sitemap.xml và robots.txt khi build
 */

import fs from 'fs';
import path from 'path';

// Cấu hình routes tĩnh
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

const BASE_URL = 'http://kachivina.vn';

/**
 * Tạo hreflang cho một route
 */
function generateHreflang(route) {
  const hreflang = {};

  const routeMapping = {
    '/': '/en',
    '/gioi-thieu': '/en/about',
    '/san-pham-dich-vu': '/en/products',
    '/bao-gia-tu-van': '/en/pricing',
    '/du-an-tieu-bieu': '/en/projects',
    '/lien-he': '/en/contact'
  };

  if (route.lang === 'vi') {
    hreflang['vi'] = `${BASE_URL}${route.path}`;
    const enPath = routeMapping[route.path];
    if (enPath) {
      hreflang['en'] = `${BASE_URL}${enPath}`;
    }
    hreflang['x-default'] = `${BASE_URL}${route.path}`;
  } else if (route.lang === 'en') {
    hreflang['en'] = `${BASE_URL}${route.path}`;
    const viPath = Object.keys(routeMapping).find(key => routeMapping[key] === route.path);
    if (viPath) {
      hreflang['vi'] = `${BASE_URL}${viPath}`;
      hreflang['x-default'] = `${BASE_URL}${viPath}`;
    }
  }

  return hreflang;
}

/**
 * Lấy tất cả routes tĩnh
 */
function getStaticRoutes() {
  const routes = [];
  const today = new Date().toISOString().split('T')[0];

  Object.entries(STATIC_ROUTES).forEach(([lang, langRoutes]) => {
    langRoutes.forEach(route => {
      routes.push({
        ...route,
        lang,
        lastmod: today
      });
    });
  });

  return routes;
}

/**
 * Tạo sitemap XML
 */
function generateSitemap() {
  const routes = getStaticRoutes();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;

    // Thêm hreflang links
    const hreflang = generateHreflang(route);
    Object.entries(hreflang).forEach(([lang, url]) => {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />\n`;
    });

    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

/**
 * Tạo robots.txt
 */
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /private/
Disallow: /*.json
Disallow: /sitemap-manager

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

/**
 * Main function
 */
function main() {
  try {
    // Tạo thư mục public nếu chưa có
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Tạo sitemap.xml
    const sitemapXml = generateSitemap();
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
    console.log('✅ Generated sitemap.xml');

    // Tạo robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = path.join(publicDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log('✅ Generated robots.txt');

    // Log thống kê
    const routes = getStaticRoutes();
    const viRoutes = routes.filter(r => r.lang === 'vi').length;
    const enRoutes = routes.filter(r => r.lang === 'en').length;

    console.log(`📊 Sitemap Statistics:`);
    console.log(`   Total routes: ${routes.length}`);
    console.log(`   Vietnamese routes: ${viRoutes}`);
    console.log(`   English routes: ${enRoutes}`);
    console.log(`   Generated at: ${new Date().toISOString()}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Chạy script
main();
