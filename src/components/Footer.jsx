import { useGlobalConfig } from '@/contexts/GlobalConfigContext';

const Footer = () => {
  const {
    getSiteName,
    getLogoUrl2,
    isReady
  } = useGlobalConfig();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Logo and Social Media */}
          <div className="footer-logo">
            <a href="/">
              <div style={{ width: '2rem', height: '2rem' }}>
                <img src={isReady() ? getLogoUrl2() : "/favicon.jpg"} alt={isReady() ? getSiteName() : "Kachivina"} />
              </div>
              <span>{isReady() ? getSiteName() : "Kachivina"}</span>
            </a>

            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
                <svg style={{ width: '2rem', height: '2rem' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="white" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
                <svg style={{ width: '2rem', height: '2rem' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.19 14.41 4.53 14.44 3.89 14.31C4.16 15.14 4.69 15.86 5.41 16.38C6.13 16.89 7.01 17.17 7.92 17.17C6.29 18.44 4.27 19.13 2.21 19.11C1.87 19.11 1.54 19.09 1.21 19.05C3.25 20.38 5.64 21.13 8.12 21.13C16 21.13 20.33 14.5 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="white" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                <svg style={{ width: '2rem', height: '2rem' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="white" />
                </svg>
              </a>
            </div>

            <p className="footer-copyright">© 2023 Nexcent ltd. All rights reserved.</p>
          </div>

          {/* Company Links */}
          <div className="footer-links">
            <h3>Company</h3>
            <ul>
              <li><a href="/about">About us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact us</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/testimonials">Testimonials</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-links">
            <h3>Support</h3>
            <ul>
              <li><a href="/help-center">Help center</a></li>
              <li><a href="/terms">Terms of service</a></li>
              <li><a href="/legal">Legal</a></li>
              <li><a href="/privacy">Privacy policy</a></li>
              <li><a href="/status">Status</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-links">
            <h3>Stay up to date</h3>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button
                className="newsletter-button"
                aria-label="Subscribe"
              >
                <svg style={{ width: '1.5rem', height: '1.5rem' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
