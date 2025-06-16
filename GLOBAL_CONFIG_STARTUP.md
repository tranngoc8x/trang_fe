# 🚀 Global Configuration Auto-Load Setup Complete

Đã thành công implement solution để tự động load global configuration khi ứng dụng React khởi động và make it available cho toàn bộ app.

## 📁 Files đã được tạo/cập nhật

### Core Context & Provider
- ✅ `src/contexts/GlobalConfigContext.jsx` - Context và Provider cho global config
- ✅ `src/App.jsx` - Updated để wrap app với GlobalConfigProvider

### UI Components
- ✅ `src/components/LoadingScreen.jsx` - Loading, Error, và Maintenance screens
- ✅ `src/components/SEOHead.jsx` - SEO management component
- ✅ `src/components/PageWrapper.jsx` - Wrapper cho pages với SEO

### Updated Components
- ✅ `src/components/Header.jsx` - Updated để sử dụng global config
- ✅ `src/pages/HomePage.jsx` - Example sử dụng PageWrapper

## 🔄 App Startup Flow

```
1. App starts → main.jsx
2. RouterProvider loads → router.jsx
3. App component loads → App.jsx
4. GlobalConfigProvider wraps everything
5. GlobalConfigProvider auto-loads global config from API
6. While loading: Shows LoadingScreen
7. If error: Shows ErrorScreen with retry
8. If maintenance mode: Shows MaintenanceScreen
9. If success: Renders normal app with global config available
10. SEOHead automatically updates document head
11. All components can access global config via useGlobalConfig()
```

## 🎯 Key Features Implemented

### ✅ Auto-Load on Startup
- Global config loads automatically when app starts
- No manual intervention needed
- Happens before any components render

### ✅ Loading States
- Professional loading screen while fetching
- Error screen with retry functionality
- Maintenance mode screen

### ✅ Error Handling
- Graceful fallback to cached data
- Retry mechanism
- User-friendly error messages

### ✅ SEO Management
- Automatic meta tags management
- Dynamic document title updates
- Open Graph and Twitter Card support
- Structured data for organization

### ✅ Global Availability
- All components can access global config
- Consistent data across entire app
- Utility functions for common operations

## 🚀 Usage Examples

### 1. Accessing Global Config in Components

```javascript
import { useGlobalConfig } from '@/contexts/GlobalConfigContext';

const MyComponent = () => {
  const { 
    getSiteName, 
    getLogoUrl, 
    getContactInfo,
    isReady 
  } = useGlobalConfig();

  if (!isReady()) return <div>Loading...</div>;

  return (
    <div>
      <img src={getLogoUrl()} alt={getSiteName()} />
      <h1>{getSiteName()}</h1>
      <p>Phone: {getContactInfo().phone}</p>
    </div>
  );
};
```

### 2. Using PageWrapper for SEO

```javascript
import PageWrapper from '@/components/PageWrapper';

const AboutPage = () => {
  return (
    <PageWrapper
      title="Giới thiệu"
      description="Trang giới thiệu về công ty chúng tôi"
      keywords="giới thiệu, về chúng tôi, công ty"
    >
      <h1>Giới thiệu</h1>
      <p>Nội dung trang...</p>
    </PageWrapper>
  );
};
```

### 3. Manual SEO Control

```javascript
import SEOHead from '@/components/SEOHead';

const ProductPage = ({ product }) => {
  return (
    <>
      <SEOHead
        title={product.name}
        description={product.description}
        image={product.image}
        type="product"
      />
      <div>Product content...</div>
    </>
  );
};
```

## 📊 Available Global Config Data

Sau khi load thành công, bạn có thể access các data sau:

```javascript
const {
  // Raw data
  data,
  loading,
  error,
  initialized,

  // Site info
  getSiteName(),
  getSiteDescription(),
  
  // Logo
  getLogoUrl(),
  getLogo(),
  
  // Contact
  getContactInfo(),
  getPhone(),
  getEmail(),
  getAddress(),
  
  // Social media
  getSocialMediaLinks(),
  getSocialMediaLink('facebook'),
  
  // SEO
  getSeoConfig(),
  getMetaTitle(),
  getMetaDescription(),
  getMetaKeywords(),
  getOgImage(),
  
  // Other
  getFaviconUrl(),
  isMaintenanceMode(),
  getThemeConfig(),
  getAnalyticsConfig(),
  
  // Utilities
  generatePageTitle('Page Name'),
  isReady(),
  
  // Actions
  refresh(),
  clearCache()
} = useGlobalConfig();
```

## 🔧 Configuration

### Cache Settings
```javascript
// Trong GlobalConfigContext.jsx
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút
```

### API Settings
```javascript
// Trong globalService (appService.js)
const API_ENDPOINT = 'https://admin.kachivina.vn/api/global';
const TIMEOUT = 10000; // 10 giây
```

### Loading Messages
```javascript
// Trong LoadingScreen.jsx
<LoadingScreen message="Đang tải cấu hình website..." />
```

## 🧪 Testing

### 1. Test Auto-Load
- Refresh trang và xem loading screen
- Check console logs cho loading process
- Verify global config data trong React DevTools

### 2. Test Error Handling
- Disconnect internet và refresh
- Should show error screen với retry button
- Retry should work khi internet trở lại

### 3. Test Maintenance Mode
- Set `maintenanceMode: true` trong API response
- Should show maintenance screen

### 4. Test SEO
- Check document title updates
- Inspect meta tags trong browser DevTools
- Verify Open Graph tags

## 🎨 Customization

### Custom Loading Screen
```javascript
// Trong App.jsx
<LoadingScreen 
  message="Custom loading message..."
  showLogo={false}
/>
```

### Custom Error Handling
```javascript
// Trong GlobalConfigContext.jsx
const handleError = (error) => {
  // Custom error handling logic
  console.error('Custom error handler:', error);
};
```

### Custom SEO Templates
```javascript
// Trong SEOHead.jsx
const generateTitle = (pageTitle, siteName) => {
  return `${pageTitle} - ${siteName} | Custom Suffix`;
};
```

## 📈 Performance Benefits

- ✅ **Single API Call**: Global config loaded once at startup
- ✅ **Caching**: 5-minute cache reduces API calls
- ✅ **Fallback**: Uses cached data when API fails
- ✅ **Lazy Loading**: Components render after config loads
- ✅ **Error Recovery**: Graceful handling of API failures

## 🔍 Debugging

### Check Global Config Status
```javascript
// Trong browser console
window.globalConfigDebug = {
  context: useGlobalConfig(),
  service: globalService,
  cache: globalService.getCacheInfo()
};
```

### Enable Debug Logs
```javascript
// Trong GlobalConfigContext.jsx
const DEBUG = true; // Set to true for debug logs
```

## ✅ Checklist

- [x] Global config auto-loads on app startup
- [x] Loading screen shows while fetching
- [x] Error handling with retry functionality
- [x] Maintenance mode support
- [x] SEO meta tags auto-update
- [x] Header uses global logo and site name
- [x] All components can access global config
- [x] Caching mechanism implemented
- [x] Fallback to cached data on errors
- [x] TypeScript-like JSDoc types
- [x] Structured data for SEO
- [x] PageWrapper for easy SEO management

## 🎉 Ready to Use!

Global configuration system đã hoàn toàn sẵn sàng! App sẽ tự động:

1. **Load global config** khi khởi động
2. **Show loading screen** trong khi fetch data
3. **Handle errors** gracefully với retry
4. **Update SEO tags** automatically
5. **Provide global data** cho tất cả components

Bạn có thể bắt đầu sử dụng `useGlobalConfig()` trong bất kỳ component nào! 🚀
