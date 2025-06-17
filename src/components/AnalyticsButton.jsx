/**
 * Analytics Button Component
 * Button component với analytics tracking tự động
 */

import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

const AnalyticsButton = ({
  children,
  onClick,
  trackingName,
  trackingLocation = '',
  className = '',
  ...props
}) => {
  const { trackClick } = useGoogleAnalytics();

  const handleClick = (e) => {
    // Track button click
    if (trackingName) {
      trackClick(trackingName, 'button');
    }

    // Call original onClick
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnalyticsButton;
