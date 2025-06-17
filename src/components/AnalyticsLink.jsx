/**
 * Analytics Link Component
 * Link component với analytics tracking tự động
 */

import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

const AnalyticsLink = ({
  children,
  href,
  onClick,
  trackAsExternal = false,
  className = '',
  ...props
}) => {
  const { trackExternalLink, trackEvent } = useGoogleAnalytics();

  const handleClick = (e) => {
    // Check if it's an external link
    const isExternal = trackAsExternal || (href && (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ));

    // Track link click
    if (isExternal) {
      trackExternalLink(href);
    } else {
      trackEvent('click', 'internal_link', href);
    }

    // Call original onClick
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default AnalyticsLink;
