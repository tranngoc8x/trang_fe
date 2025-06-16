/**
 * Component demo để showcase cách sử dụng globalService và useGlobalConfig hook
 */

import React from 'react';
import { useGlobalConfig, useGlobalConfigValue } from '@/hooks/useGlobalConfig';

/**
 * Component chính để demo global config
 */
const GlobalConfigDemo = () => {
  const {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    clearCache,
    getCacheInfo,
    getSiteName,
    getLogoUrl,
    getContactInfo,
    getSocialMediaLinks,
    isMaintenanceMode
  } = useGlobalConfig();

  const handleRefresh = async () => {
    try {
      await refresh();
      alert('Đã refresh global config thành công!');
    } catch (err) {
      alert(`Lỗi khi refresh: ${err.message}`);
    }
  };

  const handleClearCache = () => {
    clearCache();
    alert('Đã xóa cache!');
  };

  const showCacheInfo = () => {
    const cacheInfo = getCacheInfo();
    alert(`Cache Info:\n${JSON.stringify(cacheInfo, null, 2)}`);
  };

  if (loading) {
    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-5/6"></div>
        </div>
        <p className="text-blue-600 mt-4">Đang tải cấu hình global...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">Lỗi khi tải Global Config</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Global Configuration Demo
        </h2>
        
        {/* Control buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Clear Cache
          </button>
          <button
            onClick={showCacheInfo}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cache Info
          </button>
        </div>

        {/* Last updated info */}
        {lastUpdated && (
          <p className="text-sm text-gray-500 mb-4">
            Cập nhật lần cuối: {lastUpdated.toLocaleString('vi-VN')}
          </p>
        )}

        {/* Maintenance mode warning */}
        {isMaintenanceMode() && (
          <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded mb-4">
            ⚠️ Website đang trong chế độ bảo trì
          </div>
        )}
      </div>

      {/* Site Info */}
      <SiteInfoSection 
        siteName={getSiteName()}
        logoUrl={getLogoUrl()}
        data={data}
      />

      {/* Contact Info */}
      <ContactInfoSection contactInfo={getContactInfo()} />

      {/* Social Media */}
      <SocialMediaSection socialLinks={getSocialMediaLinks()} />

      {/* Raw Data */}
      <RawDataSection data={data} />

      {/* Hook Examples */}
      <HookExamplesSection />
    </div>
  );
};

/**
 * Section hiển thị thông tin site
 */
const SiteInfoSection = ({ siteName, logoUrl, data }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Thông tin Site</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <p><strong>Tên site:</strong> {siteName}</p>
        <p><strong>Mô tả:</strong> {data?.siteDescription || 'Không có'}</p>
        <p><strong>Locale:</strong> {data?.locale || 'vi'}</p>
      </div>
      <div>
        {logoUrl && logoUrl !== '/default-logo.png' && (
          <div>
            <p><strong>Logo:</strong></p>
            <img 
              src={logoUrl} 
              alt={siteName}
              className="max-w-32 max-h-16 object-contain mt-2"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

/**
 * Section hiển thị thông tin liên hệ
 */
const ContactInfoSection = ({ contactInfo }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Thông tin liên hệ</h3>
    {Object.keys(contactInfo).length > 0 ? (
      <div className="grid md:grid-cols-2 gap-4">
        {contactInfo.phone && (
          <p><strong>Điện thoại:</strong> 
            <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline ml-2">
              {contactInfo.phone}
            </a>
          </p>
        )}
        {contactInfo.email && (
          <p><strong>Email:</strong> 
            <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline ml-2">
              {contactInfo.email}
            </a>
          </p>
        )}
        {contactInfo.address && (
          <p><strong>Địa chỉ:</strong> {contactInfo.address}</p>
        )}
        {contactInfo.workingHours && (
          <p><strong>Giờ làm việc:</strong> {contactInfo.workingHours}</p>
        )}
      </div>
    ) : (
      <p className="text-gray-500">Không có thông tin liên hệ</p>
    )}
  </div>
);

/**
 * Section hiển thị social media links
 */
const SocialMediaSection = ({ socialLinks }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Social Media</h3>
    {socialLinks.length > 0 ? (
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
          >
            {social.platform}
          </a>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">Không có social media links</p>
    )}
  </div>
);

/**
 * Section hiển thị raw data
 */
const RawDataSection = ({ data }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Raw Data</h3>
    <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

/**
 * Section demo các hook khác
 */
const HookExamplesSection = () => {
  // Demo useGlobalConfigValue hook
  const siteName = useGlobalConfigValue('siteName', 'Default Site Name');
  const phone = useGlobalConfigValue('contact.phone', 'Không có số điện thoại');
  const logoUrl = useGlobalConfigValue('logo.url', '/default-logo.png');

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Hook Examples</h3>
      <div className="space-y-2">
        <p><strong>useGlobalConfigValue('siteName'):</strong> {siteName}</p>
        <p><strong>useGlobalConfigValue('contact.phone'):</strong> {phone}</p>
        <p><strong>useGlobalConfigValue('logo.url'):</strong> {logoUrl}</p>
      </div>
    </div>
  );
};

export default GlobalConfigDemo;
