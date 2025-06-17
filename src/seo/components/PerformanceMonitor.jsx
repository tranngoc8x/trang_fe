/**
 * Performance Monitor Component
 * Theo dõi Web Vitals và hiệu suất website
 */

import { useEffect } from 'react';

const PerformanceMonitor = ({
  enableConsoleLog = false,
  onMetric = null
}) => {
  useEffect(() => {
    // Function to handle metric reporting
    const handleMetric = (metric) => {
      // Log to console if enabled
      if (enableConsoleLog) {
        console.log(`${metric.name}:`, metric.value, metric);
      }

      // Analytics tracking removed - keeping it simple

      // Custom callback
      if (onMetric && typeof onMetric === 'function') {
        onMetric(metric);
      }

      // Store in localStorage for debugging
      if (typeof window !== 'undefined') {
        try {
          const perfData = JSON.parse(localStorage.getItem('webVitals') || '{}');
          perfData[metric.name] = {
            value: metric.value,
            rating: metric.rating || 'unknown',
            timestamp: Date.now()
          };
          localStorage.setItem('webVitals', JSON.stringify(perfData));
        } catch (error) {
          console.warn('Error storing performance data:', error);
        }
      }
    };

    // Collect Web Vitals using dynamic import
    const collectWebVitals = async () => {
      try {
        const webVitals = await import('web-vitals');

        // Check if functions exist before calling
        if (webVitals.getCLS) webVitals.getCLS(handleMetric);
        if (webVitals.getFID) webVitals.getFID(handleMetric);
        if (webVitals.getFCP) webVitals.getFCP(handleMetric);
        if (webVitals.getLCP) webVitals.getLCP(handleMetric);
        if (webVitals.getTTFB) webVitals.getTTFB(handleMetric);
      } catch (error) {
        if (enableConsoleLog) {
          console.warn('Web Vitals not available:', error);
        }
        // Fallback to basic performance metrics
        collectBasicMetrics();
      }
    };

    // Fallback basic performance metrics
    const collectBasicMetrics = () => {
      if (typeof window === 'undefined' || !window.performance) return;

      try {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          handleMetric({
            name: 'page_load_time',
            value: navigation.loadEventEnd - navigation.loadEventStart,
            rating: 'good'
          });
        }
      } catch (error) {
        console.warn('Error collecting basic metrics:', error);
      }
    };

    collectWebVitals();

    // Additional performance metrics
    if ('performance' in window) {
      // Navigation timing
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      if (navigationTiming) {
        const metrics = {
          domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
          loadComplete: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
          domInteractive: navigationTiming.domInteractive - navigationTiming.navigationStart,
          pageLoadTime: navigationTiming.loadEventEnd - navigationTiming.navigationStart
        };

        Object.entries(metrics).forEach(([name, value]) => {
          if (value > 0) {
            handleMetric({
              name,
              value,
              rating: value < 1000 ? 'good' : value < 2500 ? 'needs-improvement' : 'poor'
            });
          }
        });
      }

      // Resource timing
      const resourceEntries = performance.getEntriesByType('resource');
      const slowResources = resourceEntries.filter(entry => entry.duration > 1000);

      if (slowResources.length > 0 && enableConsoleLog) {
        console.warn('Slow loading resources:', slowResources);
      }

      // Memory usage (if available)
      if ('memory' in performance) {
        const memoryInfo = performance.memory;
        handleMetric({
          name: 'memoryUsage',
          value: memoryInfo.usedJSHeapSize / 1024 / 1024, // MB
          rating: memoryInfo.usedJSHeapSize < 50 * 1024 * 1024 ? 'good' : 'needs-improvement'
        });
      }
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            handleMetric({
              name: 'longTask',
              value: entry.duration,
              rating: entry.duration < 50 ? 'good' : entry.duration < 100 ? 'needs-improvement' : 'poor'
            });
          });
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // Monitor layout shifts
        const layoutShiftObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              handleMetric({
                name: 'layoutShift',
                value: entry.value,
                rating: entry.value < 0.1 ? 'good' : entry.value < 0.25 ? 'needs-improvement' : 'poor'
              });
            }
          });
        });
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });

        // Cleanup observers
        return () => {
          longTaskObserver.disconnect();
          layoutShiftObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }

    // Monitor page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Page is being hidden - analytics removed for simplicity
        if (enableConsoleLog) {
          console.log('Page visibility changed to hidden');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enableConsoleLog, onMetric]);

  // This component doesn't render anything
  return null;
};

/**
 * Hook to get current performance metrics
 */
export const usePerformanceMetrics = () => {
  const getStoredMetrics = () => {
    if (typeof window === 'undefined') return {};

    try {
      return JSON.parse(localStorage.getItem('webVitals') || '{}');
    } catch {
      return {};
    }
  };

  const clearStoredMetrics = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('webVitals');
    }
  };

  const getPerformanceScore = () => {
    const metrics = getStoredMetrics();
    const scores = [];

    // Score based on Web Vitals thresholds
    if (metrics.CLS && typeof metrics.CLS.value === 'number') {
      scores.push(metrics.CLS.value < 0.1 ? 100 : metrics.CLS.value < 0.25 ? 75 : 50);
    }
    if (metrics.FID && typeof metrics.FID.value === 'number') {
      scores.push(metrics.FID.value < 100 ? 100 : metrics.FID.value < 300 ? 75 : 50);
    }
    if (metrics.LCP && typeof metrics.LCP.value === 'number') {
      scores.push(metrics.LCP.value < 2500 ? 100 : metrics.LCP.value < 4000 ? 75 : 50);
    }
    if (metrics.FCP && typeof metrics.FCP.value === 'number') {
      scores.push(metrics.FCP.value < 1800 ? 100 : metrics.FCP.value < 3000 ? 75 : 50);
    }
    if (metrics.page_load_time && typeof metrics.page_load_time.value === 'number') {
      scores.push(metrics.page_load_time.value < 1000 ? 100 : metrics.page_load_time.value < 3000 ? 75 : 50);
    }

    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 85;
  };

  return {
    metrics: getStoredMetrics(),
    clearMetrics: clearStoredMetrics,
    performanceScore: getPerformanceScore()
  };
};

export default PerformanceMonitor;
