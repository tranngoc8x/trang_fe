import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './styles.css'
import './i18n' // Import i18n configuration
import router from './router'
import SEOProvider from './seo/components/SEOProvider'

// Tạo HelmetProvider instance để tránh StrictMode issues
const helmetContext = {};

createRoot(document.getElementById('root')).render(
  <HelmetProvider context={helmetContext}>
    <SEOProvider
      enablePerformanceMonitoring={true}
      enableGoogleAnalytics={true}
      googleAnalyticsId="G-G62WZE9GG8"
      enableAnalyticsInDevelopment={false}
    >
      <RouterProvider router={router} />
    </SEOProvider>
  </HelmetProvider>
)
