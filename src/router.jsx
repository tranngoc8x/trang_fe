import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Pricing from './pages/Pricing';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import SitemapPage from './pages/SitemapPage';

// Tạo router với hỗ trợ đa ngôn ngữ
const router = createBrowserRouter([
  // Vietnamese routes (default - no language prefix)
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'gioi-thieu',
        element: <About />
      },
      {
        path: 'san-pham-dich-vu',
        element: <Products />
      },
      {
        path: 'san-pham-dich-vu/:slug',
        element: <ProductDetail />
      },
      {
        path: 'bao-gia-tu-van',
        element: <Pricing />
      },
      {
        path: 'du-an-tieu-bieu',
        element: <Projects />
      },
      {
        path: 'du-an-tieu-bieu/:slug',
        element: <ProjectDetail />
      },
      {
        path: 'lien-he',
        element: <Contact />
      },
      {
        path: 'sitemap-manager',
        element: <SitemapPage />
      }
    ]
  },
  // English routes (with /en prefix)
  {
    path: '/en',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'products/:slug',
        element: <ProductDetail />
      },
      {
        path: 'pricing',
        element: <Pricing />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'projects/:slug',
        element: <ProjectDetail />
      },
      {
        path: 'contact',
        element: <Contact />
      }
    ]
  },
  // Catch-all route cho các URL không tồn tại
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
