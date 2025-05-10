import { useState, useEffect } from 'react';
import { menuService } from '@services/appService';
import { MAIN_MENU_ID } from '@/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [currentPath, setCurrentPath] = useState('');

  // Lấy đường dẫn hiện tại khi component được mount
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const {data} = await menuService.getTreeMenuById(MAIN_MENU_ID);
        if (data && data.items) {
          setMenuItems(data.items);
        }
      } catch (err) {
        console.error('Error fetching menu:', err);
      }
    };

    fetchMenuData();
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container">
        {/* Logo */}
        <a href="/" className="logo">
          <div style={{ width: '2rem', height: '2rem' }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#263238" />
              <path d="M2 17L12 22L22 17" fill="#263238" />
              <path d="M2 12L12 17L22 12" fill="#4CAF4F" />
            </svg>
          </div>
          <span>Nexcent</span>
        </a>

        {/* Desktop Navigation */}
        <nav>
          <ul>
            {menuItems && menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className={currentPath === item.url ? 'active' : ''}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/Signup Buttons */}
        <div className="auth-buttons">
          <a href="/login" className="btn btn-outline">
            Login
          </a>
          <a href="/signup" className="btn btn-primary">
            Sign up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {menuItems && menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className={currentPath === item.url ? 'active' : ''}
                >
                  {item.title}
                </a>
              </li>
            ))}
            <li style={{ borderTop: '1px solid #eee', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
              <a href="/login" style={{ fontWeight: 500 }}>Login</a>
            </li>
            <li>
              <a href="/signup" className="btn btn-primary" style={{ display: 'block', margin: '0.5rem 1rem', textAlign: 'center' }}>Sign up</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
