import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuService } from '@services/appService';
import { MAIN_MENU_ID } from '@/constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useGlobalConfig } from '../contexts/GlobalConfigContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentLanguage, getLocalizedPath } = useLanguage();

  // Get global configuration
  const {
    getSiteName,
    getLogoUrl,
    isReady
  } = useGlobalConfig();
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const { data } = await menuService.getTreeMenuById(MAIN_MENU_ID, currentLanguage);
        if (data && data.items) {
          setMenuItems(data.items);
        }
      } catch (err) {
        console.error('Error fetching menu:', err);
      }
    };

    fetchMenuData();
  }, [currentLanguage]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container">
        {/* Logo */}
        <Link to={getLocalizedPath('/')} className="logo">
          <div style={{ width: '2rem', height: '2rem' }}>
            <img
              src={isReady() ? getLogoUrl() : "/favicon.jpg"}
              alt={isReady() ? getSiteName() : "Kachivina"}
            />
          </div>
          <span>{isReady() ? getSiteName() : "Kachivina"}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="flex space-x-4 items-center">
            {menuItems && menuItems.map((item) => (
              <li
                key={item.id}
                className={
                  (item.children && item.children.length > 0
                    ? 'relative group has-children'
                    : '') +
                  ' flex items-center'
                }
              >
                <Link
                  to={item.url}
                  className={
                    (currentPath === item.url ? 'active text-primary' : 'text-gray-700 hover:text-primary') +
                    ' px-3 py-2 rounded transition-colors duration-200'
                  }
                >
                  {item.title}
                </Link>
                {/* Submenu (nếu có) */}
                {item.children && item.children.length > 0 && (
                  <div
                    className="absolute left-0 top-full z-30 min-w-[180px] bg-white shadow-lg rounded-md py-1 mt-0 hidden group-hover:block group-hover:pointer-events-auto pointer-events-none"
                  >
                    <ul className="flex flex-col space-y-2 gap-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            to={child.url}
                            className={
                              (currentPath === child.url ? 'active text-primary' : 'text-gray-700 hover:text-primary') +
                              ' block px-4 py-2 whitespace-nowrap transition-colors duration-200'
                            }
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            {/* Language Switcher */}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>

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
              <li key={item.id} className={item.children && item.children.length > 0 ? 'has-children' : ''}>
                <Link
                  to={item.url}
                  className={currentPath === item.url ? 'active' : ''}
                >
                  {item.title}
                </Link>
                {/* Submenu (nếu có) */}
                {item.children && item.children.length > 0 && (
                  <ul className="submenu">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={child.url}
                          className={currentPath === child.url ? 'active' : ''}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
