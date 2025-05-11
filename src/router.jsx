import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import About from './pages/About';

// Tạo router với các route
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'about',
        element: <About />
      }
      ,
      {
        path: 'gioi-thieu',
        element: <About />
      }
    ]
  }
]);

export default router;
