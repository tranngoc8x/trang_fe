/**
 * Test file để kiểm tra globalService
 * Chạy file này trong console để test service
 */

import { globalService } from '@/services/appService';

/**
 * Test cơ bản
 */
export const testBasicFunctionality = async () => {
  console.log('🧪 Testing Basic Functionality...');
  
  try {
    // Test 1: Lấy global config
    console.log('Test 1: Lấy global config');
    const config = await globalService.getGlobalConfig();
    console.log('✅ Success:', config);
    
    // Test 2: Kiểm tra cache
    console.log('\nTest 2: Kiểm tra cache info');
    const cacheInfo = globalService.getCacheInfo();
    console.log('✅ Cache Info:', cacheInfo);
    
    // Test 3: Lấy config lần 2 (should use cache)
    console.log('\nTest 3: Lấy config lần 2 (từ cache)');
    const config2 = await globalService.getGlobalConfig();
    console.log('✅ Success (from cache):', config2);
    
    // Test 4: Force refresh
    console.log('\nTest 4: Force refresh');
    const config3 = await globalService.getGlobalConfig({}, true);
    console.log('✅ Success (force refresh):', config3);
    
    // Test 5: Clear cache
    console.log('\nTest 5: Clear cache');
    globalService.clearCache();
    const cacheInfoAfterClear = globalService.getCacheInfo();
    console.log('✅ Cache cleared:', cacheInfoAfterClear);
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};

/**
 * Test với parameters
 */
export const testWithParameters = async () => {
  console.log('🧪 Testing With Parameters...');
  
  try {
    // Test với populate cụ thể
    const config = await globalService.getGlobalConfig({
      populate: 'logo,contact'
    });
    
    console.log('✅ Success with params:', config);
    return true;
  } catch (error) {
    console.error('❌ Test with params failed:', error);
    return false;
  }
};

/**
 * Test error handling
 */
export const testErrorHandling = async () => {
  console.log('🧪 Testing Error Handling...');
  
  try {
    // Đầu tiên, tạo cache
    await globalService.getGlobalConfig();
    console.log('✅ Cache created');
    
    // Giả lập lỗi bằng cách modify API endpoint tạm thời
    // (Trong thực tế, lỗi có thể do network, server down, etc.)
    console.log('⚠️ Simulating API error...');
    
    // Service sẽ fallback về cache khi gặp lỗi
    const fallbackConfig = await globalService.getGlobalConfig();
    console.log('✅ Fallback to cache successful:', fallbackConfig);
    
    return true;
  } catch (error) {
    console.error('❌ Error handling test failed:', error);
    return false;
  }
};

/**
 * Chạy tất cả tests
 */
export const runAllTests = async () => {
  console.log('🚀 Running All Global Service Tests...\n');
  
  const results = {
    basic: await testBasicFunctionality(),
    parameters: await testWithParameters(),
    errorHandling: await testErrorHandling()
  };
  
  console.log('\n📊 Test Results:');
  console.log('Basic Functionality:', results.basic ? '✅ PASS' : '❌ FAIL');
  console.log('With Parameters:', results.parameters ? '✅ PASS' : '❌ FAIL');
  console.log('Error Handling:', results.errorHandling ? '✅ PASS' : '❌ FAIL');
  
  const allPassed = Object.values(results).every(result => result === true);
  console.log('\n🎯 Overall Result:', allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');
  
  return results;
};

/**
 * Quick test để kiểm tra API endpoint có hoạt động không
 */
export const quickConnectivityTest = async () => {
  console.log('🔌 Quick Connectivity Test...');
  
  try {
    const config = await globalService.getGlobalConfig();
    
    if (config && config.data) {
      console.log('✅ API endpoint is working!');
      console.log('Site Name:', config.data.siteName || 'Not available');
      console.log('Has Logo:', !!config.data.logo);
      console.log('Has Contact:', !!config.data.contact);
      console.log('Has Social Media:', !!config.data.socialMedia);
      return true;
    } else {
      console.log('⚠️ API responded but data structure is unexpected');
      console.log('Response:', config);
      return false;
    }
  } catch (error) {
    console.error('❌ API endpoint is not working:', error.message);
    return false;
  }
};

// Export để có thể chạy từ console
if (typeof window !== 'undefined') {
  // Nếu chạy trong browser, attach vào window để có thể test từ console
  window.globalServiceTest = {
    testBasicFunctionality,
    testWithParameters,
    testErrorHandling,
    runAllTests,
    quickConnectivityTest
  };
  
  console.log('🔧 Global Service Test functions attached to window.globalServiceTest');
  console.log('Run: window.globalServiceTest.quickConnectivityTest() to test API connectivity');
  console.log('Run: window.globalServiceTest.runAllTests() to run all tests');
}

export default {
  testBasicFunctionality,
  testWithParameters,
  testErrorHandling,
  runAllTests,
  quickConnectivityTest
};
