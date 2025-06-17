# 📊 Google Analytics 4 - Hướng dẫn sử dụng

## ✅ Đã tạo lại Google Analytics

### 🎯 Tính năng:
- ✅ **Google Analytics 4** integration
- ✅ **Auto page tracking** khi chuyển trang
- ✅ **Event tracking** cho buttons, links, forms
- ✅ **Scroll depth tracking** tự động
- ✅ **Error tracking** tự động
- ✅ **Performance timing** tracking
- ✅ **Custom events** dễ dàng
- ✅ **Debug mode** trong development

### 📁 Files đã tạo:
```
src/
├── utils/analytics.js           # Core Analytics service
├── hooks/useAnalytics.js        # Analytics hooks
├── components/
│   ├── AnalyticsProvider.jsx    # Analytics Provider
│   ├── AnalyticsButton.jsx      # Button với tracking
│   └── AnalyticsLink.jsx        # Link với tracking
└── main.jsx                     # Đã thêm AnalyticsProvider
```

## 🚀 Cách sử dụng

### 1. Cấu hình Google Analytics ID:

**Trong `src/main.jsx`:**
```jsx
<AnalyticsProvider gaId="G-XXXXXXXXXX"> // Thay bằng GA ID thực tế
  <RouterProvider router={router} />
</AnalyticsProvider>
```

### 2. Sử dụng hooks trong components:

```jsx
import { useAnalytics, useScrollTracking, useFormTracking } from '@/hooks/useAnalytics';

const MyComponent = () => {
  const { 
    trackEvent, 
    trackButtonClick, 
    trackFormSubmit,
    trackDownload 
  } = useAnalytics();

  // Auto scroll tracking
  useScrollTracking([25, 50, 75, 100]);

  // Form tracking
  const { trackFormStart, handleFormSubmit } = useFormTracking('contact_form');

  const handleClick = () => {
    trackButtonClick('cta_button', 'header');
  };

  const handleDownload = () => {
    trackDownload('brochure.pdf', 'pdf');
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <a onClick={handleDownload}>Download</a>
    </div>
  );
};
```

### 3. Sử dụng Analytics Components:

```jsx
import AnalyticsButton from '@/components/AnalyticsButton';
import AnalyticsLink from '@/components/AnalyticsLink';

const MyPage = () => {
  return (
    <div>
      {/* Button với auto tracking */}
      <AnalyticsButton 
        trackingName="cta_button"
        trackingLocation="hero"
        className="btn btn-primary"
        onClick={() => console.log('clicked')}
      >
        Get Started
      </AnalyticsButton>

      {/* External link với auto tracking */}
      <AnalyticsLink 
        href="https://google.com"
        trackAsExternal={true}
      >
        Visit Google
      </AnalyticsLink>

      {/* Internal link với auto tracking */}
      <AnalyticsLink href="/about">
        About Us
      </AnalyticsLink>
    </div>
  );
};
```

### 4. Track custom events:

```jsx
const { trackEvent } = useAnalytics();

// Custom event
trackEvent('video_play', 'engagement', 'intro_video', 120);

// Search
trackEvent('search', 'engagement', 'react tutorial', 5);

// Contact
trackEvent('contact', 'engagement', 'email');
```

## 📊 Events được track tự động

### 1. Page Views:
- Tự động track khi chuyển trang
- Bao gồm page path và title

### 2. Scroll Depth:
- Track khi scroll đến 25%, 50%, 75%, 100%
- Có thể customize thresholds

### 3. Errors:
- JavaScript errors
- Unhandled promise rejections

### 4. Performance:
- Page load time
- DOM content loaded time

## 🎯 Predefined Events

### Button Clicks:
```jsx
trackButtonClick('button_name', 'location');
// Example: trackButtonClick('cta_button', 'header');
```

### Form Interactions:
```jsx
const { trackFormStart, handleFormSubmit, trackFormError } = useFormTracking('contact_form');

// Form start
trackFormStart();

// Form submit
handleFormSubmit();

// Form error
trackFormError('email_field');
```

### Downloads:
```jsx
trackDownload('filename.pdf', 'pdf');
trackDownload('brochure.zip', 'zip');
```

### External Links:
```jsx
trackExternalLink('https://external-site.com');
```

### Search:
```jsx
trackSearch('search term', 5); // 5 results
```

### Video:
```jsx
trackVideoPlay('intro_video', 120); // 120 seconds
```

### Contact:
```jsx
trackContact('email');
trackContact('phone');
trackContact('form');
```

### Language Change:
```jsx
trackLanguageChange('vi', 'en');
```

## 🔧 Advanced Usage

### Custom User Properties:
```jsx
import analytics from '@/utils/analytics';

analytics.setUserProperties({
  user_type: 'premium',
  preferred_language: 'vi'
});
```

### Exception Tracking:
```jsx
try {
  // Some code
} catch (error) {
  analytics.trackException(error.message, false);
}
```

### Performance Timing:
```jsx
const startTime = performance.now();
// Do something
const endTime = performance.now();
analytics.trackTiming('custom_operation', endTime - startTime);
```

## 🐛 Debug Mode

Trong development mode, tất cả events sẽ được log ra console:

```
Google Analytics initialized: G-XXXXXXXXXX
Page view tracked: { path: "/", title: "Home | Site Name" }
Event tracked: { action: "click", category: "button", label: "cta_button_header", value: 0 }
```

## 📈 Google Analytics 4 Setup

### 1. Tạo GA4 Property:
1. Truy cập [Google Analytics](https://analytics.google.com/)
2. Tạo property mới
3. Chọn "Web" platform
4. Lấy Measurement ID (G-XXXXXXXXXX)

### 2. Cập nhật GA ID:
```jsx
// src/main.jsx
<AnalyticsProvider gaId="G-YOUR-ACTUAL-ID">
```

### 3. Verify trong GA4:
- Realtime reports
- Events reports
- Page views

## 🎉 Kết quả

✅ **Auto tracking:** Page views, scroll, errors
✅ **Easy tracking:** Buttons, links, forms
✅ **Custom events:** Flexible event system
✅ **Debug friendly:** Console logs trong dev
✅ **Performance:** Lightweight và efficient
✅ **Type safe:** Consistent API

**Google Analytics đã được tích hợp hoàn chỉnh!** 🚀

### Next Steps:
1. Thay GA ID thực tế trong main.jsx
2. Test events trong GA4 Realtime
3. Thêm custom tracking cho business events
4. Monitor performance và user behavior
