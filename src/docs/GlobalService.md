# Global Configuration Service

Service để lấy cấu hình toàn cục của website từ API endpoint `https://admin.kachivina.vn/api/global`.

## 📁 Files được tạo

- `src/services/appService.js` - Thêm `globalService`
- `src/constants/index.js` - Thêm `API_ENDPOINTS.GLOBAL`
- `src/types/global.js` - TypeScript-like JSDoc types
- `src/hooks/useGlobalConfig.js` - React hooks
- `src/components/GlobalConfigDemo.jsx` - Demo component
- `src/examples/globalServiceExample.js` - Ví dụ sử dụng

## 🚀 Cách sử dụng

### 1. Sử dụng trực tiếp service

```javascript
import { globalService } from '@/services/appService';

// Lấy cấu hình global
const config = await globalService.getGlobalConfig();
console.log(config.data.siteName);

// Với tham số populate cụ thể
const config = await globalService.getGlobalConfig({
  populate: 'logo,contact,socialMedia'
});

// Force refresh cache
const config = await globalService.getGlobalConfig({}, true);
```

### 2. Sử dụng React Hook (Khuyến nghị)

```javascript
import { useGlobalConfig } from '@/hooks/useGlobalConfig';

const MyComponent = () => {
  const {
    data,
    loading,
    error,
    getSiteName,
    getLogoUrl,
    getContactInfo,
    refresh
  } = useGlobalConfig();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{getSiteName()}</h1>
      <img src={getLogoUrl()} alt="Logo" />
      <p>Phone: {getContactInfo().phone}</p>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};
```

### 3. Sử dụng Hook để lấy giá trị cụ thể

```javascript
import { useGlobalConfigValue } from '@/hooks/useGlobalConfig';

const Header = () => {
  const siteName = useGlobalConfigValue('siteName', 'Default Name');
  const phone = useGlobalConfigValue('contact.phone');
  const logoUrl = useGlobalConfigValue('logo.url', '/default-logo.png');

  return (
    <header>
      <img src={logoUrl} alt={siteName} />
      <h1>{siteName}</h1>
      {phone && <a href={`tel:${phone}`}>{phone}</a>}
    </header>
  );
};
```

## 🔧 API Response Structure

```javascript
{
  "data": {
    "siteName": "Tên Website",
    "siteDescription": "Mô tả website",
    "logo": {
      "url": "https://example.com/logo.png",
      "alt": "Logo alt text",
      "width": 200,
      "height": 100
    },
    "contact": {
      "phone": "0123456789",
      "email": "contact@example.com",
      "address": "123 Đường ABC, TP.HCM",
      "workingHours": "8:00 - 17:00"
    },
    "socialMedia": [
      {
        "platform": "facebook",
        "url": "https://facebook.com/page",
        "icon": "fab fa-facebook"
      }
    ],
    "seo": {
      "metaTitle": "Default Meta Title",
      "metaDescription": "Default Meta Description",
      "metaKeywords": "keyword1, keyword2",
      "ogImage": "https://example.com/og-image.jpg"
    },
    "theme": {
      "primaryColor": "#007bff",
      "secondaryColor": "#6c757d"
    },
    "favicon": "https://example.com/favicon.ico",
    "locale": "vi",
    "maintenanceMode": false,
    "analytics": {
      "googleAnalyticsId": "GA-XXXXXXXXX"
    }
  },
  "meta": {}
}
```

## ⚡ Features

### 1. Caching
- Tự động cache kết quả trong 5 phút
- Fallback về cache cũ khi API lỗi
- Có thể force refresh cache

### 2. Error Handling
- Xử lý lỗi network, timeout
- Fallback về cache khi có lỗi
- Logging chi tiết

### 3. React Hooks
- `useGlobalConfig()` - Hook đầy đủ với loading, error states
- `useGlobalConfigData()` - Hook đơn giản chỉ trả về data
- `useGlobalConfigValue(path)` - Hook lấy giá trị cụ thể

### 4. Utility Functions
- `getSiteName()`, `getLogoUrl()`, `getContactInfo()`
- `getSocialMediaLinks()`, `isMaintenanceMode()`
- `getSeoConfig()`, `getThemeConfig()`

## 🛠️ Cache Management

```javascript
import { globalService } from '@/services/appService';

// Xóa cache
globalService.clearCache();

// Kiểm tra thông tin cache
const cacheInfo = globalService.getCacheInfo();
console.log(cacheInfo);
// {
//   hasCache: true,
//   cacheTime: 1640995200000,
//   cacheAge: 120000,
//   isExpired: false
// }
```

## 📝 Examples

### Header Component với Global Config

```javascript
import React from 'react';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';

const Header = () => {
  const {
    loading,
    error,
    getSiteName,
    getLogoUrl,
    getContactInfo,
    getSocialMediaLinks
  } = useGlobalConfig();

  if (loading) return <HeaderSkeleton />;
  if (error) return <HeaderError error={error} />;

  const contactInfo = getContactInfo();
  const socialLinks = getSocialMediaLinks();

  return (
    <header className="header">
      <div className="logo">
        <img src={getLogoUrl()} alt={getSiteName()} />
        <h1>{getSiteName()}</h1>
      </div>
      
      <div className="contact">
        {contactInfo.phone && (
          <a href={`tel:${contactInfo.phone}`}>
            📞 {contactInfo.phone}
          </a>
        )}
        {contactInfo.email && (
          <a href={`mailto:${contactInfo.email}`}>
            ✉️ {contactInfo.email}
          </a>
        )}
      </div>
      
      <div className="social">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.platform}
          </a>
        ))}
      </div>
    </header>
  );
};
```

### SEO Component

```javascript
import React from 'react';
import { Helmet } from 'react-helmet';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';

const SEOHead = ({ title, description, image }) => {
  const {
    getSiteName,
    getMetaTitle,
    getMetaDescription,
    getSeoConfig,
    getFaviconUrl
  } = useGlobalConfig();

  const seoConfig = getSeoConfig();
  const finalTitle = title || getMetaTitle();
  const finalDescription = description || getMetaDescription();
  const finalImage = image || seoConfig.ogImage;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={seoConfig.metaKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:site_name" content={getSiteName()} />
      {finalImage && <meta property="og:image" content={finalImage} />}
      
      {/* Favicon */}
      <link rel="icon" href={getFaviconUrl()} />
    </Helmet>
  );
};
```

## 🧪 Testing

Chạy demo component:

```javascript
import { runAllExamples } from '@/examples/globalServiceExample';

// Chạy tất cả examples
runAllExamples();
```

## 🔍 Troubleshooting

### 1. CORS Issues
Nếu gặp lỗi CORS, cần cấu hình server admin để allow origin từ domain hiện tại.

### 2. Network Timeout
Service có timeout 10 giây. Nếu API chậm, có thể tăng timeout trong `adminApiService`.

### 3. Cache Issues
Nếu data không cập nhật, có thể clear cache:
```javascript
globalService.clearCache();
```

## 📚 Related Files

- `src/services/api.js` - Base API service
- `src/constants/index.js` - API endpoints
- `src/utils/apiUtils.js` - API utilities
- `src/types/global.js` - Type definitions
