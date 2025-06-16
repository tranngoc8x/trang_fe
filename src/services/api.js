import axios from 'axios';

// Lấy API token từ biến môi trường
const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

// Tạo một instance của axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'https://assets.kachivina.vn', // API endpoint local
  timeout: 10000, // Thời gian timeout cho mỗi request (ms)
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_ACCESS_TOKEN}`,
    // Thêm các headers khác nếu cần
  }
});

// Thêm interceptor để xử lý request trước khi gửi đi
api.interceptors.request.use(
  (config) => {
    // Nếu có token trong localStorage, ưu tiên sử dụng token này thay vì token từ biến môi trường
    // Điều này cho phép thay đổi token động (ví dụ: sau khi đăng nhập)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý response trước khi trả về
api.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    return response.data;
  },
  (error) => {
    // Xử lý lỗi
    if (error.response) {
      // Lỗi từ server với status code
      console.error('API Error:', error.response.status, error.response.data);

      // Xử lý lỗi 401 Unauthorized
      if (error.response.status === 401) {
        // Có thể logout user hoặc refresh token
        localStorage.removeItem('token');
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request đã được gửi nhưng không nhận được response
      console.error('No response received:', error.request);
    } else {
      // Lỗi khi setting up request
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Các hàm helper để gọi API
export const apiService = {
  // GET request
  get: (url, params) => api.get(url, { params }),

  // POST request
  post: (url, data) => api.post(url, data),

  // PUT request
  put: (url, data) => api.put(url, data),

  // PATCH request
  patch: (url, data) => api.patch(url, data),

  // DELETE request
  delete: (url) => api.delete(url),
};

export default apiService;
