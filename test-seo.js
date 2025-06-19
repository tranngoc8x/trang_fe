/**
 * SEO Test Script
 * Kiểm tra SEO components hoạt động đúng cách
 */

const testSEO = {
  /**
   * Test 1: Kiểm tra meta tags cơ bản
   */
  testBasicMetaTags: () => {
    console.log('🧪 Testing Basic Meta Tags...');

    try {
      // Check title
      const title = document.title;
      console.log('📄 Title:', title);

      // Check meta description
      const description = document.querySelector('meta[name="description"]');
      console.log('📝 Description:', description?.content || 'Not found');

      // Check meta keywords
      const keywords = document.querySelector('meta[name="keywords"]');
      console.log('🔑 Keywords:', keywords?.content || 'Not found');

      // Check canonical
      const canonical = document.querySelector('link[rel="canonical"]');
      console.log('🔗 Canonical:', canonical?.href || 'Not found');

      // Check favicon
      const favicon = document.querySelector('link[rel="icon"]');
      console.log('🎯 Favicon:', favicon?.href || 'Not found');

      console.log('✅ Basic meta tags test completed');
      return true;
    } catch (error) {
      console.error('❌ Basic meta tags test failed:', error);
      return false;
    }
  },

  /**
   * Test 2: Kiểm tra Open Graph tags
   */
  testOpenGraphTags: () => {
    console.log('🧪 Testing Open Graph Tags...');

    try {
      const ogTags = {
        title: document.querySelector('meta[property="og:title"]')?.content,
        description: document.querySelector('meta[property="og:description"]')?.content,
        type: document.querySelector('meta[property="og:type"]')?.content,
        url: document.querySelector('meta[property="og:url"]')?.content,
        siteName: document.querySelector('meta[property="og:site_name"]')?.content,
        image: document.querySelector('meta[property="og:image"]')?.content,
        imageAlt: document.querySelector('meta[property="og:image:alt"]')?.content
      };

      console.log('📱 Open Graph Tags:', ogTags);

      console.log('✅ Open Graph tags test completed');
      return true;
    } catch (error) {
      console.error('❌ Open Graph tags test failed:', error);
      return false;
    }
  },

  /**
   * Test 3: Kiểm tra Twitter Card tags
   */
  testTwitterCardTags: () => {
    console.log('🧪 Testing Twitter Card Tags...');

    try {
      const twitterTags = {
        card: document.querySelector('meta[name="twitter:card"]')?.content,
        title: document.querySelector('meta[name="twitter:title"]')?.content,
        description: document.querySelector('meta[name="twitter:description"]')?.content,
        image: document.querySelector('meta[name="twitter:image"]')?.content
      };

      console.log('🐦 Twitter Card Tags:', twitterTags);

      console.log('✅ Twitter Card tags test completed');
      return true;
    } catch (error) {
      console.error('❌ Twitter Card tags test failed:', error);
      return false;
    }
  },

  /**
   * Test 4: Kiểm tra robots và viewport
   */
  testRobotsAndViewport: () => {
    console.log('🧪 Testing Robots and Viewport...');

    try {
      const robots = document.querySelector('meta[name="robots"]')?.content;
      const viewport = document.querySelector('meta[name="viewport"]')?.content;

      console.log('🤖 Robots:', robots || 'Not found');
      console.log('📱 Viewport:', viewport || 'Not found');

      console.log('✅ Robots and viewport test completed');
      return true;
    } catch (error) {
      console.error('❌ Robots and viewport test failed:', error);
      return false;
    }
  },

  /**
   * Test 5: Kiểm tra duplicate meta tags
   */
  testDuplicateTags: () => {
    console.log('🧪 Testing for Duplicate Tags...');

    try {
      const duplicateChecks = [
        { selector: 'title', name: 'Title' },
        { selector: 'meta[name="description"]', name: 'Description' },
        { selector: 'meta[property="og:title"]', name: 'OG Title' },
        { selector: 'meta[property="og:description"]', name: 'OG Description' },
        { selector: 'link[rel="canonical"]', name: 'Canonical' }
      ];

      duplicateChecks.forEach(check => {
        const elements = document.querySelectorAll(check.selector);
        if (elements.length > 1) {
          console.warn(`⚠️ Duplicate ${check.name} tags found:`, elements.length);
        } else {
          console.log(`✅ ${check.name}: No duplicates`);
        }
      });

      console.log('✅ Duplicate tags test completed');
      return true;
    } catch (error) {
      console.error('❌ Duplicate tags test failed:', error);
      return false;
    }
  },

  /**
   * Chạy tất cả tests
   */
  runAllTests: () => {
    console.log('🚀 Running all SEO tests...\n');

    const results = {
      basicMetaTags: testSEO.testBasicMetaTags(),
      openGraphTags: testSEO.testOpenGraphTags(),
      twitterCardTags: testSEO.testTwitterCardTags(),
      robotsAndViewport: testSEO.testRobotsAndViewport(),
      duplicateTags: testSEO.testDuplicateTags()
    };

    console.log('\n📊 SEO Test Results:');
    Object.entries(results).forEach(([test, result]) => {
      console.log(`${test}: ${result ? '✅ PASS' : '❌ FAIL'}`);
    });

    const allPassed = Object.values(results).every(result => result);
    console.log(`\n🎯 Overall SEO Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

    return results;
  },

  /**
   * Test 6: Kiểm tra SimpleSEOHead debug logs
   */
  testDebugLogs: () => {
    console.log('🧪 Testing SimpleSEOHead Debug Logs...');
    console.log('📝 Check browser console for SimpleSEOHead debug messages:');
    console.log('   - 🔍 SimpleSEOHead Debug: (component props)');
    console.log('   - 🎯 SimpleSEOHead Final Values: (computed values)');
    console.log('   - 🚀 SimpleSEOHead: Rendering Helmet (render confirmation)');
    console.log('   - ⏳ SimpleSEOHead: Global config not ready yet (if not ready)');

    // Check if React DevTools is available
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      console.log('✅ React DevTools detected - you can inspect components');
    } else {
      console.log('⚠️ React DevTools not detected - install for better debugging');
    }

    return true;
  }
};

// Export for use in browser console
window.testSEO = testSEO;

// Auto-run debug test
setTimeout(() => {
  console.log('🔧 SEO Test Script loaded. Running debug test...');
  testSEO.testDebugLogs();
  console.log('\n🚀 Run testSEO.runAllTests() to test all SEO functionality.');
}, 1000);
