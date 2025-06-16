/**
 * Ví dụ sử dụng globalService
 * Example usage of globalService
 */

import { globalService } from '@/services/appService';

/**
 * Ví dụ 1: Lấy cấu hình global cơ bản
 */
export const basicGlobalConfigExample = async () => {
  try {
    console.log('=== Ví dụ 1: Lấy cấu hình global cơ bản ===');
    
    const globalConfig = await globalService.getGlobalConfig();
    
    console.log('Global Config:', globalConfig);
    console.log('Site Name:', globalConfig.data?.siteName);
    console.log('Logo:', globalConfig.data?.logo);
    console.log('Contact Info:', globalConfig.data?.contact);
    
    return globalConfig;
  } catch (error) {
    console.error('Lỗi khi lấy global config:', error);
  }
};

/**
 * Ví dụ 2: Lấy cấu hình với tham số populate cụ thể
 */
export const specificPopulateExample = async () => {
  try {
    console.log('=== Ví dụ 2: Lấy cấu hình với populate cụ thể ===');
    
    const globalConfig = await globalService.getGlobalConfig({
      populate: 'logo,contact,socialMedia'
    });
    
    console.log('Global Config (specific populate):', globalConfig);
    
    return globalConfig;
  } catch (error) {
    console.error('Lỗi khi lấy global config:', error);
  }
};

/**
 * Ví dụ 3: Sử dụng cache và force refresh
 */
export const cacheExample = async () => {
  try {
    console.log('=== Ví dụ 3: Demo cache mechanism ===');
    
    // Lần đầu tiên - sẽ gọi API
    console.log('Lần 1 - Gọi API:');
    const config1 = await globalService.getGlobalConfig();
    console.log('Cache info sau lần 1:', globalService.getCacheInfo());
    
    // Lần thứ hai - sẽ dùng cache
    console.log('Lần 2 - Dùng cache:');
    const config2 = await globalService.getGlobalConfig();
    console.log('Cache info sau lần 2:', globalService.getCacheInfo());
    
    // Force refresh - sẽ gọi API lại
    console.log('Lần 3 - Force refresh:');
    const config3 = await globalService.getGlobalConfig({}, true);
    console.log('Cache info sau force refresh:', globalService.getCacheInfo());
    
    return { config1, config2, config3 };
  } catch (error) {
    console.error('Lỗi trong cache example:', error);
  }
};

/**
 * Ví dụ 4: Xử lý lỗi và fallback
 */
export const errorHandlingExample = async () => {
  try {
    console.log('=== Ví dụ 4: Xử lý lỗi và fallback ===');
    
    // Đầu tiên, lấy config thành công để có cache
    await globalService.getGlobalConfig();
    console.log('Đã có cache:', globalService.getCacheInfo());
    
    // Giả lập lỗi bằng cách gọi endpoint không tồn tại
    // (Trong thực tế, lỗi có thể do network, server down, etc.)
    console.log('Giả lập lỗi API...');
    
    // Service sẽ fallback về cache cũ khi gặp lỗi
    const fallbackConfig = await globalService.getGlobalConfig();
    console.log('Fallback config từ cache:', fallbackConfig);
    
    return fallbackConfig;
  } catch (error) {
    console.error('Lỗi trong error handling example:', error);
  }
};

/**
 * Ví dụ 5: Sử dụng trong React component
 */
export const reactComponentExample = `
// Ví dụ sử dụng trong React component
import React, { useState, useEffect } from 'react';
import { globalService } from '@/services/appService';

const Header = () => {
  const [globalConfig, setGlobalConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGlobalConfig = async () => {
      try {
        setLoading(true);
        const config = await globalService.getGlobalConfig();
        setGlobalConfig(config.data);
      } catch (err) {
        setError(err.message);
        console.error('Lỗi khi tải global config:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGlobalConfig();
  }, []);

  if (loading) return <div>Đang tải cấu hình...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <header>
      <div className="logo">
        {globalConfig?.logo?.url && (
          <img 
            src={globalConfig.logo.url} 
            alt={globalConfig.logo.alt || globalConfig.siteName}
            width={globalConfig.logo.width}
            height={globalConfig.logo.height}
          />
        )}
        <h1>{globalConfig?.siteName}</h1>
      </div>
      
      <div className="contact-info">
        {globalConfig?.contact?.phone && (
          <a href={\`tel:\${globalConfig.contact.phone}\`}>
            {globalConfig.contact.phone}
          </a>
        )}
        {globalConfig?.contact?.email && (
          <a href={\`mailto:\${globalConfig.contact.email}\`}>
            {globalConfig.contact.email}
          </a>
        )}
      </div>
      
      <div className="social-media">
        {globalConfig?.socialMedia?.map((social, index) => (
          <a 
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={\`social-\${social.platform}\`}
          >
            {social.platform}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
`;

/**
 * Ví dụ 6: Utility functions để xử lý global config
 */
export const utilityFunctions = {
  /**
   * Lấy logo URL với fallback
   */
  getLogoUrl: (globalConfig, fallbackUrl = '/default-logo.png') => {
    return globalConfig?.data?.logo?.url || fallbackUrl;
  },

  /**
   * Lấy thông tin liên hệ
   */
  getContactInfo: (globalConfig) => {
    return globalConfig?.data?.contact || {};
  },

  /**
   * Lấy social media links
   */
  getSocialMediaLinks: (globalConfig) => {
    return globalConfig?.data?.socialMedia || [];
  },

  /**
   * Lấy SEO config
   */
  getSeoConfig: (globalConfig) => {
    return globalConfig?.data?.seo || {};
  },

  /**
   * Kiểm tra maintenance mode
   */
  isMaintenanceMode: (globalConfig) => {
    return globalConfig?.data?.maintenanceMode || false;
  }
};

// Export tất cả examples để có thể test
export const runAllExamples = async () => {
  console.log('🚀 Chạy tất cả examples cho globalService...\n');
  
  await basicGlobalConfigExample();
  console.log('\n');
  
  await specificPopulateExample();
  console.log('\n');
  
  await cacheExample();
  console.log('\n');
  
  await errorHandlingExample();
  console.log('\n');
  
  console.log('React Component Example:');
  console.log(reactComponentExample);
  console.log('\n');
  
  console.log('Utility Functions:', utilityFunctions);
  
  console.log('✅ Đã chạy xong tất cả examples!');
};
