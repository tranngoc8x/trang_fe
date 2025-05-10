# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Biến môi trường

Dự án sử dụng biến môi trường để lưu trữ các thông tin nhạy cảm như API token. Các biến môi trường được lưu trong file `.env` ở thư mục gốc của dự án.

### Cấu hình biến môi trường

1. Tạo file `.env` ở thư mục gốc của dự án (nếu chưa có)
2. Thêm các biến môi trường vào file `.env` theo định dạng sau:

```
VITE_API_ACCESS_TOKEN=your_api_token_here
```

Lưu ý: Trong Vite, tất cả các biến môi trường phải bắt đầu bằng `VITE_` để có thể truy cập từ mã nguồn phía client.

### Sử dụng biến môi trường trong code

Để sử dụng biến môi trường trong code, bạn có thể sử dụng cú pháp sau:

```javascript
const apiToken = import.meta.env.VITE_API_ACCESS_TOKEN;
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
