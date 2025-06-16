/**
 * TypeScript-like JSDoc types for Global Configuration API response
 * Định nghĩa các types cho response từ API global configuration
 */

/**
 * @typedef {Object} SocialMediaLink
 * @property {string} platform - Tên platform (facebook, twitter, instagram, etc.)
 * @property {string} url - URL của social media
 * @property {string} [icon] - Icon class hoặc URL
 */

/**
 * @typedef {Object} ContactInfo
 * @property {string} [phone] - Số điện thoại
 * @property {string} [email] - Email liên hệ
 * @property {string} [address] - Địa chỉ
 * @property {string} [workingHours] - Giờ làm việc
 */

/**
 * @typedef {Object} SeoConfig
 * @property {string} [metaTitle] - Meta title mặc định
 * @property {string} [metaDescription] - Meta description mặc định
 * @property {string} [metaKeywords] - Meta keywords mặc định
 * @property {string} [ogImage] - Open Graph image URL
 */

/**
 * @typedef {Object} LogoConfig
 * @property {string} [url] - URL của logo
 * @property {string} [alt] - Alt text cho logo
 * @property {number} [width] - Chiều rộng logo
 * @property {number} [height] - Chiều cao logo
 */

/**
 * @typedef {Object} GlobalConfig
 * @property {string} siteName - Tên website
 * @property {string} [siteDescription] - Mô tả website
 * @property {LogoConfig} [logo] - Cấu hình logo
 * @property {ContactInfo} [contact] - Thông tin liên hệ
 * @property {SocialMediaLink[]} [socialMedia] - Danh sách social media links
 * @property {SeoConfig} [seo] - Cấu hình SEO mặc định
 * @property {Object} [theme] - Cấu hình theme/màu sắc
 * @property {string} [favicon] - URL favicon
 * @property {string} [locale] - Ngôn ngữ mặc định
 * @property {boolean} [maintenanceMode] - Chế độ bảo trì
 * @property {Object} [analytics] - Cấu hình analytics (Google Analytics, etc.)
 */

/**
 * @typedef {Object} GlobalApiResponse
 * @property {GlobalConfig} data - Dữ liệu cấu hình global
 * @property {Object} [meta] - Metadata từ API
 */

// Export empty object để có thể import file này
export {};
