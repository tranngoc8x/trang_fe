import apiService from './api';
import { API_ENDPOINTS } from '@/constants';


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
    return apiService.get('/products', params);
  },

  // Lấy thông tin chi tiết của một product
  getProductById: (id) => {
    return apiService.get(`/products/${id}`);
  },

  // Các phương thức khác...
};

// Service để gọi API tree-menus
export const menuService = {
  // Lấy tất cả menu từ API tree-menus
  getTreeMenu: () => {
    return apiService.get(API_ENDPOINTS.TREE_MENU);
  },

  // Lấy menu theo ID từ API tree-menus
  getTreeMenuById: (id) => {
    return apiService.get(`${API_ENDPOINTS.TREE_MENU}/${id}`);
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

export default {
  userService,
  productService,
  menuService,
  clientService
};
