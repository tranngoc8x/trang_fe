# 🗺️ Sitemap Generator - Hướng dẫn sử dụng

## ✅ Đã hoàn thành

### 🎯 Tính năng chính:
- ✅ **Đa ngôn ngữ:** Hỗ trợ Tiếng Việt (mặc định) và English
- ✅ **Hreflang:** Tự động tạo alternate links cho SEO đa ngôn ngữ
- ✅ **Static routes:** Dựa trên cấu trúc router.jsx
- ✅ **Dynamic routes:** Hỗ trợ thêm routes từ API (sản phẩm, dự án)
- ✅ **Auto-generation:** Tự động tạo khi build
- ✅ **Management UI:** Giao diện quản lý sitemap
- ✅ **Robots.txt:** Tự động tạo robots.txt

### 📁 Cấu trúc files:
```
src/
├── utils/sitemapGenerator.js     # Core sitemap generator
├── components/SitemapManager.jsx # UI quản lý sitemap
├── pages/SitemapPage.jsx         # Trang sitemap manager
├── hooks/useSitemap.js           # Hook sử dụng sitemap
└── router.jsx                    # Routes (đã thêm /sitemap-manager)

scripts/
└── generateSitemap.js            # Script tạo sitemap khi build

public/
├── sitemap.xml                   # Generated sitemap
└── robots.txt                    # Generated robots.txt
```

## 🚀 Cách sử dụng

### 1. Tự động tạo khi build:
```bash
npm run build  # Tự động tạo sitemap.xml và robots.txt
```

### 2. Tạo sitemap thủ công:
```bash
npm run generate:sitemap
```

### 3. Sử dụng UI Manager:
Truy cập: http://localhost:5174/sitemap-manager

### 4. Sử dụng trong code:
```javascript
import sitemapGenerator from '@/utils/sitemapGenerator';

// Tạo và download sitemap
await sitemapGenerator.downloadSitemap();

// Tạo và download robots.txt
sitemapGenerator.downloadRobotsTxt();

// Preview sitemap
const xml = await sitemapGenerator.generateSitemap();
console.log(xml);
```

### 5. Sử dụng hook:
```javascript
import { useSitemap } from '@/hooks/useSitemap';

const { generateSitemap, addProductRoutes, loading } = useSitemap();

// Thêm dynamic routes cho sản phẩm
addProductRoutes(products);

// Tạo sitemap
await generateSitemap();
```

## 📋 Routes được tạo

### Static Routes (12 routes):

**Tiếng Việt (6 routes):**
- `/` (priority: 1.0, daily)
- `/gioi-thieu` (priority: 0.8, monthly)
- `/san-pham-dich-vu` (priority: 0.9, weekly)
- `/bao-gia-tu-van` (priority: 0.7, monthly)
- `/du-an-tieu-bieu` (priority: 0.9, weekly)
- `/lien-he` (priority: 0.6, monthly)

**English (6 routes):**
- `/en` (priority: 1.0, daily)
- `/en/about` (priority: 0.8, monthly)
- `/en/products` (priority: 0.9, weekly)
- `/en/pricing` (priority: 0.7, monthly)
- `/en/projects` (priority: 0.9, weekly)
- `/en/contact` (priority: 0.6, monthly)

### Dynamic Routes (có thể thêm):
- Sản phẩm: `/san-pham-dich-vu/{slug}` và `/en/products/{slug}`
- Dự án: `/du-an-tieu-bieu/{slug}` và `/en/projects/{slug}`

## 🌐 Hreflang Implementation

Mỗi URL đều có hreflang links:

```xml
<url>
  <loc>http://assets.kachivina.vn/gioi-thieu</loc>
  <xhtml:link rel="alternate" hreflang="vi" href="http://assets.kachivina.vn/gioi-thieu" />
  <xhtml:link rel="alternate" hreflang="en" href="http://assets.kachivina.vn/en/about" />
  <xhtml:link rel="alternate" hreflang="x-default" href="http://assets.kachivina.vn/gioi-thieu" />
</url>
```

**Quy tắc:**
- `vi`: Tiếng Việt (mặc định)
- `en`: English
- `x-default`: Trỏ về phiên bản Tiếng Việt

## 🔧 Thêm Dynamic Routes

### Từ API:
```javascript
// Thêm routes sản phẩm
sitemapGenerator.addDynamicRoutes(
  // Fetch function
  async () => {
    const response = await fetch('/api/products');
    return response.json();
  },
  // Map function
  (products) => {
    const routes = [];
    products.forEach(product => {
      // Vietnamese
      routes.push({
        path: `/san-pham-dich-vu/${product.slug}`,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: product.updatedAt,
        lang: 'vi'
      });
      
      // English
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
```

### Sử dụng hook:
```javascript
const { addProductRoutes, addProjectRoutes } = useSitemap();

// Thêm sản phẩm
addProductRoutes([
  { slug: 'website-development', updatedAt: '2024-01-15' },
  { slug: 'mobile-app', updatedAt: '2024-01-10' }
]);

// Thêm dự án
addProjectRoutes([
  { slug: 'ecommerce-platform', updatedAt: '2024-01-12' },
  { slug: 'corporate-website', updatedAt: '2024-01-08' }
]);
```

## 📊 Sitemap Statistics

```javascript
const stats = await sitemapGenerator.getStatistics();
console.log(stats);

// Output:
{
  totalRoutes: 12,
  staticRoutes: 12,
  dynamicRoutes: 0,
  languageBreakdown: { vi: 6, en: 6 },
  priorityDistribution: { "1": 2, "0.8": 2, "0.9": 4, "0.7": 2, "0.6": 2 },
  changefreqDistribution: { daily: 2, monthly: 6, weekly: 4 },
  lastGenerated: "2025-06-17T05:06:06.747Z"
}
```

## 🤖 Robots.txt

Tự động tạo với cấu hình:

```
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /private/
Disallow: /*.json
Disallow: /sitemap-manager

Sitemap: http://assets.kachivina.vn/sitemap.xml
```

## 🎛️ Sitemap Manager UI

**Truy cập:** `/sitemap-manager`

**Tính năng:**
- ✅ Tạo & Download sitemap.xml
- ✅ Tạo & Download robots.txt
- ✅ Preview sitemap
- ✅ Thêm dynamic routes
- ✅ Xem thống kê
- ✅ Hướng dẫn sử dụng

## 🔄 Workflow

### Development:
1. Thêm routes mới vào `router.jsx`
2. Cập nhật `STATIC_ROUTES` trong `sitemapGenerator.js`
3. Test bằng `/sitemap-manager`

### Production:
1. `npm run build` → Tự động tạo sitemap
2. Upload `public/sitemap.xml` và `public/robots.txt` lên server
3. Đảm bảo accessible tại `/sitemap.xml` và `/robots.txt`

### Dynamic Content:
1. Thêm API calls trong `addDynamicRoutes`
2. Map data thành routes với đúng format
3. Regenerate sitemap khi có content mới

## 🎉 Kết quả

✅ **SEO-friendly sitemap** với hreflang đầy đủ
✅ **Đa ngôn ngữ** (Tiếng Việt mặc định + English)
✅ **Tự động hóa** trong build process
✅ **Dễ quản lý** với UI manager
✅ **Extensible** cho dynamic content
✅ **Standards compliant** theo XML sitemap protocol

**Files được tạo:**
- `public/sitemap.xml` - Sitemap chính
- `public/robots.txt` - Robots directives

**Truy cập sitemap:** http://assets.kachivina.vn/sitemap.xml
**Truy cập robots:** http://assets.kachivina.vn/robots.txt

Sitemap của bạn giờ đã hoàn hảo cho SEO đa ngôn ngữ! 🚀
