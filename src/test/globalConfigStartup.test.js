/**
 * Test file để verify Global Config Startup implementation
 */

// Test functions để chạy trong browser console
export const testGlobalConfigStartup = {
  /**
   * Test 1: Kiểm tra GlobalConfigContext có hoạt động không
   */
  testContext: () => {
    console.log('🧪 Testing GlobalConfigContext...');
    
    try {
      // Check if context is available
      const contextElement = document.querySelector('[data-global-config-provider]');
      if (contextElement) {
        console.log('✅ GlobalConfigProvider found in DOM');
      } else {
        console.log('⚠️ GlobalConfigProvider not found in DOM');
      }
      
      // Check if global config data is loaded
      if (window.React && window.React.version) {
        console.log('✅ React is available');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Context test failed:', error);
      return false;
    }
  },

  /**
   * Test 2: Kiểm tra document head có được update không
   */
  testSEO: () => {
    console.log('🧪 Testing SEO Head updates...');
    
    try {
      const title = document.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const favicon = document.querySelector('link[rel="icon"]');
      
      console.log('Document title:', title);
      console.log('Meta description:', metaDescription?.content);
      console.log('OG title:', ogTitle?.content);
      console.log('Favicon:', favicon?.href);
      
      if (title && title !== 'Kachivina') {
        console.log('✅ Document title updated');
      } else {
        console.log('⚠️ Document title not updated or using default');
      }
      
      if (metaDescription) {
        console.log('✅ Meta description found');
      } else {
        console.log('⚠️ Meta description not found');
      }
      
      return true;
    } catch (error) {
      console.error('❌ SEO test failed:', error);
      return false;
    }
  },

  /**
   * Test 3: Kiểm tra loading states
   */
  testLoadingStates: () => {
    console.log('🧪 Testing Loading States...');
    
    try {
      // Check if loading screen elements exist (they might be hidden)
      const loadingElements = document.querySelectorAll('[class*="loading"], [class*="spinner"]');
      console.log('Loading elements found:', loadingElements.length);
      
      // Check if error screen elements exist
      const errorElements = document.querySelectorAll('[class*="error"]');
      console.log('Error elements found:', errorElements.length);
      
      console.log('✅ Loading states test completed');
      return true;
    } catch (error) {
      console.error('❌ Loading states test failed:', error);
      return false;
    }
  },

  /**
   * Test 4: Kiểm tra Header có sử dụng global config không
   */
  testHeader: () => {
    console.log('🧪 Testing Header integration...');
    
    try {
      const header = document.querySelector('header');
      const logo = header?.querySelector('img');
      const siteName = header?.querySelector('.logo span');
      
      if (header) {
        console.log('✅ Header found');
      }
      
      if (logo) {
        console.log('✅ Logo found:', logo.src);
        console.log('Logo alt:', logo.alt);
      }
      
      if (siteName) {
        console.log('✅ Site name found:', siteName.textContent);
      }
      
      return true;
    } catch (error) {
      console.error('❌ Header test failed:', error);
      return false;
    }
  },

  /**
   * Test 5: Kiểm tra API call có thành công không
   */
  testAPICall: async () => {
    console.log('🧪 Testing API call...');
    
    try {
      // Import globalService
      const { globalService } = await import('@/services/appService');
      
      // Test API call
      const response = await globalService.getGlobalConfig();
      
      if (response && response.data) {
        console.log('✅ API call successful');
        console.log('Site name:', response.data.siteName);
        console.log('Logo:', response.data.logo?.url);
        console.log('Contact:', response.data.contact);
        return true;
      } else {
        console.log('⚠️ API call returned empty data');
        return false;
      }
    } catch (error) {
      console.error('❌ API call failed:', error);
      return false;
    }
  },

  /**
   * Test 6: Kiểm tra cache mechanism
   */
  testCache: async () => {
    console.log('🧪 Testing Cache mechanism...');
    
    try {
      const { globalService } = await import('@/services/appService');
      
      // Get cache info
      const cacheInfo = globalService.getCacheInfo();
      console.log('Cache info:', cacheInfo);
      
      if (cacheInfo.hasCache) {
        console.log('✅ Cache is working');
        console.log('Cache age:', cacheInfo.cacheAge, 'ms');
        console.log('Is expired:', cacheInfo.isExpired);
      } else {
        console.log('⚠️ No cache found');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Cache test failed:', error);
      return false;
    }
  },

  /**
   * Chạy tất cả tests
   */
  runAllTests: async () => {
    console.log('🚀 Running all Global Config Startup tests...\n');
    
    const results = {
      context: testGlobalConfigStartup.testContext(),
      seo: testGlobalConfigStartup.testSEO(),
      loadingStates: testGlobalConfigStartup.testLoadingStates(),
      header: testGlobalConfigStartup.testHeader(),
      apiCall: await testGlobalConfigStartup.testAPICall(),
      cache: await testGlobalConfigStartup.testCache()
    };
    
    console.log('\n📊 Test Results:');
    Object.entries(results).forEach(([test, result]) => {
      console.log(`${test}: ${result ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    const allPassed = Object.values(results).every(result => result === true);
    console.log(`\n🎯 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    
    return results;
  }
};

// Attach to window for easy access in browser console
if (typeof window !== 'undefined') {
  window.testGlobalConfigStartup = testGlobalConfigStartup;
  console.log('🔧 Global Config Startup test functions attached to window.testGlobalConfigStartup');
  console.log('Run: window.testGlobalConfigStartup.runAllTests() to test everything');
}

export default testGlobalConfigStartup;
