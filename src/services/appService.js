import apiService from './api';
import { API_ENDPOINTS } from '@/constants';
import { addLanguageToParams, getLanguageMenuId } from '../utils/apiUtils';


// Ví dụ về một service để gọi API liên quan đến users
export const userService = {
  // Lấy danh sách users
  getUsers: (params) => {
    return apiService.get('/users', params);
  },

  // Lấy thông tin chi tiết của một user
  getUserById: (id) => {
    return apiService.get(`/users/${id}`);
  },

  // Tạo user mới
  createUser: (userData) => {
    return apiService.post('/users', userData);
  },

  // Cập nhật thông tin user
  updateUser: (id, userData) => {
    return apiService.put(`/users/${id}`, userData);
  },

  // Xóa user
  deleteUser: (id) => {
    return apiService.delete(`/users/${id}`);
  }
};

// Ví dụ về một service khác (ví dụ: products)
export const productService = {
  // Lấy danh sách products
  getProducts: (params) => {
    return apiService.get(API_ENDPOINTS.PRODUCTS, params);
  },

  // Lấy thông tin chi tiết của một product
  getProductById: (id, params) => {
    return apiService.get(`${API_ENDPOINTS.PRODUCT_DETAIL}/${id}`, params);
  },

  // Các phương thức khác...
};

// Service để gọi API tree-menus
export const menuService = {
  // Lấy tất cả menu từ API tree-menus
  getTreeMenu: (language = 'vi') => {
    const params = addLanguageToParams({}, language);
    return apiService.get(API_ENDPOINTS.TREE_MENU, params);
  },

  // Lấy menu theo ID từ API tree-menus
  getTreeMenuById: (id, language = 'vi') => {
    const languageMenuId = getLanguageMenuId(id, language);
    const params = addLanguageToParams({}, language);
    return apiService.get(`${API_ENDPOINTS.TREE_MENU}/${languageMenuId}`, params);
  }
};

// Service để gọi API khách hàng
export const clientService = {
  // Lấy danh sách khách hàng
  getClients: (params) => {
    return apiService.get(API_ENDPOINTS.CLIENTS, params);
  },

  // Lấy thông tin chi tiết của một khách hàng
  getClientById: (id) => {
    return apiService.get(`${API_ENDPOINTS.CLIENTS}/${id}`);
  }
};

// Service để gọi API slides
export const slideService = {
  // Lấy danh sách slides
  getSlides: (params) => {
    return apiService.get(API_ENDPOINTS.SLIDES, params);
  },

  // Lấy thông tin chi tiết của một slide
  getSlideById: (id) => {
    return apiService.get(`${API_ENDPOINTS.SLIDES}/${id}`);
  }
};

// Service để gọi API home page content
export const homePageService = {
  // Lấy nội dung trang chủ
  getHomePageContent: (params, language = 'vi') => {
    const languageParams = addLanguageToParams(params, language);
    return apiService.get(API_ENDPOINTS.HOME_PAGE_CONTENT, languageParams);
  }
};

// Service để gọi API about-uses
export const aboutService = {
  // Lấy danh sách about-uses
  getAboutUses: (params) => {
    return apiService.get(API_ENDPOINTS.ABOUT_USES, params);
  },

  // Lấy thông tin chi tiết của một about-use
  getAboutUseById: (id, params) => {
    return apiService.get(`${API_ENDPOINTS.ABOUT_USES}/${id}`, params);
  }
};

// Service để gọi API pricing (bao-gia-and-tu-vans)
export const pricingService = {
  // Lấy dữ liệu báo giá & tư vấn
  getPricing: (params) => {
    return apiService.get(API_ENDPOINTS.PRICING, params);
  },
  savePricing: (data) => {
    return apiService.post(API_ENDPOINTS.PRICING, { data: data });
  }
};

// Service để gọi API projects (articles)
export const projectsService = {
  // Lấy dữ liệu dự án (bài viết)
  getProjects: (params) => {
    return apiService.get(API_ENDPOINTS.PROJECTS, params);
  }
};
export const pageService = {
  getPage: (slug) => {
    return apiService.get(`${API_ENDPOINTS.PAGE}`, {
      filters: { slug },
      populate: "*"
    });
  }
};

// Cache cho global configuration
let globalConfigCache = null;
let globalConfigCacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút cache

/**
 * Service để gọi API global configuration
 * Lấy cấu hình toàn cục của website như logo, thông tin liên hệ, social media, v.v.
 */
export const globalService = {
  /**
   * Lấy cấu hình global của website
   * @param {Object} params - Tham số query (populate, locale, etc.)
   * @param {boolean} forceRefresh - Bắt buộc refresh cache
   * @returns {Promise<GlobalApiResponse>} Promise chứa dữ liệu global config
   */
  getGlobalConfig: async (params = {}, forceRefresh = false) => {
    try {
      // Kiểm tra cache nếu không bắt buộc refresh
      if (!forceRefresh && globalConfigCache && globalConfigCacheTime) {
        const now = Date.now();
        const cacheAge = now - globalConfigCacheTime;

        // Nếu cache còn hiệu lực, trả về cache
        if (cacheAge < CACHE_DURATION) {
          return globalConfigCache;
        }
      }

      // Gọi API trực tiếp với axios và base URL admin
      const axiosResponse = await apiService.get(API_ENDPOINTS.GLOBAL, params);

      // Lưu vào cache (chỉ lưu data, không lưu toàn bộ axios response)
      const response = axiosResponse.data;
      globalConfigCache = response;
      globalConfigCacheTime = Date.now();

      return response;

    } catch (error) {
      console.error('❌ Lỗi khi tải global config:', error);

      // Nếu có cache cũ, trả về cache cũ khi gặp lỗi
      if (globalConfigCache) {
        return globalConfigCache;
      }

      // Nếu không có cache, throw error
      throw new Error(`Không thể tải cấu hình global: ${error.message}`);
    }
  },

  /**
   * Xóa cache global config
   */
  clearCache: () => {
    globalConfigCache = null;
    globalConfigCacheTime = null;
    console.log('🗑️ Đã xóa cache global config');
  },

  /**
   * Kiểm tra trạng thái cache
   * @returns {Object} Thông tin về cache
   */
  getCacheInfo: () => {
    return {
      hasCache: !!globalConfigCache,
      cacheTime: globalConfigCacheTime,
      cacheAge: globalConfigCacheTime ? Date.now() - globalConfigCacheTime : null,
      isExpired: globalConfigCacheTime ? (Date.now() - globalConfigCacheTime) > CACHE_DURATION : true
    };
  }
};

export default {
  userService,
  productService,
  menuService,
  clientService,
  slideService,
  homePageService,
  aboutService,
  pricingService,
  projectsService,
  pageService,
  globalService
};
