import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles.css'
import './i18n' // Import i18n configuration
import router from './router'
import SEOProvider from './seo/components/SEOProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SEOProvider enablePerformanceMonitoring={true}>
      <RouterProvider router={router} />
    </SEOProvider>
  </StrictMode>,
)
