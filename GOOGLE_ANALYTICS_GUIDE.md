# Google Analytics Integration Guide

## Tổng quan

Dự án đã được tích hợp Google Analytics 4 với mã tracking ID: **G-G62WZE9GG8**

## Cấu hình

### 1. Tự động khởi tạo

Google Analytics được tự động khởi tạo thông qua `SEOProvider` trong `src/main.jsx`:

```jsx
<SEOProvider 
  enablePerformanceMonitoring={true}
  enableGoogleAnalytics={true}
  googleAnalyticsId="G-G62WZE9GG8"
  enableAnalyticsInDevelopment={false}
>
  <RouterProvider router={router} />
</SEOProvider>
```

### 2. Tính năng tự động

- **Page View Tracking**: Tự động track khi user chuyển trang
- **Performance Monitoring**: Track thời gian load trang và DOM ready
- **Error Tracking**: Tự động track JavaScript errors và unhandled promises
- **SPA Navigation**: Hỗ trợ Single Page Application navigation

## Cách sử dụng

### 1. Import Hook

```jsx
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
```

### 2. Import Tracking Functions

```jsx
import { 
  trackButtonClick, 
  trackFormSubmit, 
  trackDownload,
  trackExternalLink,
  trackSearch,
  trackContact,
  trackLanguageChange,
  trackVideoPlay,
  trackScrollDepth,
  trackTiming,
  trackException,
  setUserProperties
} from '../seo';
```

### 3. Sử dụng trong Component

```jsx
const MyComponent = () => {
  const {
    trackEvent,
    trackCustomEvent,
    trackClick,
    trackEngagement
  } = useGoogleAnalytics();

  const handleButtonClick = () => {
    // Cách 1: Sử dụng function import
    trackButtonClick('my_button', 'header');
    
    // Cách 2: Sử dụng hook
    trackClick('my_button', 'button');
  };

  return (
    <button onClick={handleButtonClick}>
      Click me
    </button>
  );
};
```

## Các loại tracking có sẵn

### 1. Basic Events

```jsx
// Track button clicks
trackButtonClick('button_name', 'location');

// Track form submissions
trackFormSubmit('form_name');

// Track custom events
trackCustomEvent('action', 'category', 'label', value);
```

### 2. File & Link Tracking

```jsx
// Track file downloads
trackDownload('filename.pdf', 'pdf');

// Track external links
trackExternalLink('https://example.com');
```

### 3. User Interactions

```jsx
// Track search
trackSearch('search_term', results_count);

// Track contact actions
trackContact('email'); // 'email', 'phone', 'form'

// Track video interactions
trackVideoPlay('video_title', duration_seconds);

// Track scroll depth
trackScrollDepth(percentage); // 25, 50, 75, 100
```

### 4. Advanced Tracking

```jsx
// Track language changes
trackLanguageChange('vi', 'en');

// Track performance timing
trackTiming('custom_timing', milliseconds);

// Track exceptions
trackException('error_description', is_fatal);

// Set user properties
setUserProperties({
  user_type: 'premium',
  preferred_language: 'vi',
  subscription_status: 'active'
});
```

## Hook Functions

### useGoogleAnalytics()

Trả về object với các functions:

```jsx
const {
  trackEvent,           // Track generic events
  trackCustomEvent,     // Track với category/label
  trackConversion,      // Track conversions
  trackEngagement,      // Track user engagement
  trackScrollDepth,     // Track scroll percentage
  trackClick,           // Track clicks
  trackFormSubmit,      // Track form submissions
  trackDownload,        // Track downloads
  trackExternalLink,    // Track external links
  trackSearch,          // Track searches
  trackVideoPlay,       // Track video plays
  trackContact,         // Track contact actions
  trackLanguageChange,  // Track language changes
  trackTiming,          // Track custom timing
  trackException,       // Track exceptions
  setUserProperties     // Set user properties
} = useGoogleAnalytics();
```

## Tự động tracking

### 1. Page Views
- Tự động track khi route thay đổi
- Bao gồm page path, title, và location

### 2. Performance
- Page load time
- DOM content loaded time
- Được track tự động sau 1 giây

### 3. Errors
- JavaScript errors
- Unhandled promise rejections
- Tự động track với fatal/non-fatal flag

## Development Mode

Trong development mode:
- Analytics được tắt mặc định
- Có thể bật bằng cách set `enableAnalyticsInDevelopment={true}`
- Debug logs được hiển thị trong console

## Production Setup

Trong production:
- Analytics tự động hoạt động
- Không có debug logs
- Tối ưu performance

## Demo Component

Xem file `src/examples/GoogleAnalyticsDemo.jsx` để có ví dụ chi tiết về cách sử dụng tất cả các tính năng.

## Kiểm tra hoạt động

1. Mở Google Analytics dashboard
2. Vào Real-time reports
3. Thực hiện các actions trên website
4. Kiểm tra events trong Real-time events

## Lưu ý quan trọng

1. **Privacy**: Đảm bảo tuân thủ GDPR và các quy định về privacy
2. **Performance**: Tracking được tối ưu để không ảnh hưởng performance
3. **Error Handling**: Tất cả tracking functions đều có error handling
4. **Browser Support**: Hỗ trợ tất cả modern browsers

## Troubleshooting

### Analytics không hoạt động
1. Kiểm tra tracking ID có đúng không
2. Kiểm tra có bị ad blocker chặn không
3. Kiểm tra console có errors không

### Events không được track
1. Đảm bảo gtag đã được load
2. Kiểm tra network tab trong DevTools
3. Kiểm tra Real-time reports trong GA

### Development mode
1. Set `enableAnalyticsInDevelopment={true}` để test
2. Sử dụng GA Debug View để kiểm tra events
