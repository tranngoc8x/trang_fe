# 🌐 Global Configuration Service - Setup Complete

Đã tạo thành công service để lấy cấu hình trang web từ API endpoint `https://admin.kachivina.vn/api/global`.

## 📁 Files đã được tạo

### Core Service Files
- ✅ `src/services/appService.js` - Thêm `globalService` với caching và error handling
- ✅ `src/constants/index.js` - Thêm `API_ENDPOINTS.GLOBAL`
- ✅ `src/services/globalConfig.js` - Main export file với utilities

### Type Definitions
- ✅ `src/types/global.js` - JSDoc types cho TypeScript-like support

### React Hooks
- ✅ `src/hooks/useGlobalConfig.js` - Custom hooks cho React components

### Demo & Examples
- ✅ `src/components/GlobalConfigDemo.jsx` - Demo component
- ✅ `src/examples/globalServiceExample.js` - Ví dụ sử dụng chi tiết

### Testing & Documentation
- ✅ `src/test/globalService.test.js` - Test utilities
- ✅ `src/docs/GlobalService.md` - Documentation chi tiết

## 🚀 Quick Start

### 1. Import và sử dụng service trực tiếp

```javascript
import { globalService } from '@/services/appService';

// Lấy global config
const config = await globalService.getGlobalConfig();
console.log(config.data.siteName);
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
    getLogoUrl 
  } = useGlobalConfig();

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <img src={getLogoUrl()} alt={getSiteName()} />
      <h1>{getSiteName()}</h1>
    </div>
  );
};
```

### 3. Import tất cả từ main file

```javascript
import { 
  globalService, 
  useGlobalConfig, 
  globalConfigUtils 
} from '@/services/globalConfig';
```

## ⚡ Key Features

### ✅ Caching System
- Cache kết quả trong 5 phút
- Fallback về cache cũ khi API lỗi
- Có thể force refresh cache

### ✅ Error Handling
- Xử lý lỗi network, timeout
- Fallback mechanism
- Detailed logging

### ✅ React Integration
- Multiple hooks cho different use cases
- Loading và error states
- Utility functions

### ✅ TypeScript Support
- JSDoc types cho IntelliSense
- Type-safe API responses

## 🧪 Testing

### Quick Test
```javascript
// Trong browser console
import { quickConnectivityTest } from '@/test/globalService.test';
await quickConnectivityTest();
```

### Full Test Suite
```javascript
import { runAllTests } from '@/test/globalService.test';
await runAllTests();
```

## 📊 API Response Structure

```javascript
{
  "data": {
    "siteName": "Tên Website",
    "siteDescription": "Mô tả website", 
    "logo": {
      "url": "https://example.com/logo.png",
      "alt": "Logo alt text"
    },
    "contact": {
      "phone": "0123456789",
      "email": "contact@example.com",
      "address": "123 Đường ABC"
    },
    "socialMedia": [
      {
        "platform": "facebook",
        "url": "https://facebook.com/page"
      }
    ],
    "seo": {
      "metaTitle": "Default Meta Title",
      "metaDescription": "Default Meta Description"
    }
  }
}
```

## 🔧 Configuration

Service sử dụng:
- ✅ Axios cho HTTP requests (theo preference)
- ✅ Alias imports `@/` (theo preference)
- ✅ Timeout 10 giây
- ✅ Cache duration 5 phút
- ✅ Admin domain: `https://admin.kachivina.vn`

## 📝 Next Steps

### 1. Test API Connection
```bash
# Mở browser console và chạy:
window.globalServiceTest.quickConnectivityTest()
```

### 2. Integrate vào components hiện tại
```javascript
// Ví dụ: Header component
import { useGlobalConfig } from '@/hooks/useGlobalConfig';

const Header = () => {
  const { getSiteName, getLogoUrl, getContactInfo } = useGlobalConfig();
  // ... rest of component
};
```

### 3. Add vào routing nếu cần
```javascript
// Trong router.jsx, có thể add route để xem demo
{
  path: '/global-config-demo',
  element: <GlobalConfigDemo />
}
```

## 🛠️ Customization

### Thay đổi cache duration
```javascript
// Trong src/services/appService.js
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút
```

### Thay đổi timeout
```javascript
// Trong globalService.getGlobalConfig()
timeout: 15000 // 15 giây
```

### Thêm custom headers
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer your-token',
  // Thêm headers khác
}
```

## 📚 Documentation

Xem file `src/docs/GlobalService.md` để có hướng dẫn chi tiết hơn.

## ✅ Checklist

- [x] Service tạo thành công với axios
- [x] Sử dụng alias imports
- [x] Caching mechanism implemented
- [x] Error handling với fallback
- [x] React hooks created
- [x] TypeScript types defined
- [x] Demo component created
- [x] Test utilities created
- [x] Documentation complete

## 🎯 Ready to Use!

Service đã sẵn sàng để sử dụng. Bạn có thể:

1. **Test ngay**: Chạy `quickConnectivityTest()` để kiểm tra API
2. **Integrate**: Sử dụng `useGlobalConfig()` hook trong components
3. **Customize**: Modify theo nhu cầu cụ thể của dự án

Chúc bạn code vui vẻ! 🚀
