# Hướng dẫn Deploy React Router App với i18n

## Vấn đề 404 khi refresh trang

Khi sử dụng React Router với client-side routing và i18n, việc refresh trang hoặc truy cập trực tiếp vào URL sẽ gây lỗi 404 vì server không biết cách xử lý các route này. Dự án đã được cấu hình để khắc phục vấn đề này cho cả route Tiếng Việt và Tiếng Anh.

## Cấu trúc URL đa ngôn ngữ

- **Tiếng Việt (mặc định)**: `/`, `/gioi-thieu`, `/san-pham-dich-vu`, `/lien-he`
- **Tiếng Anh**: `/en`, `/en/about`, `/en/products`, `/en/contact`

## Development Server (Vite)

Vite đã được cấu hình trong `vite.config.js` với:
```javascript
server: {
  historyApiFallback: true,
},
preview: {
  historyApiFallback: true,
}
```

Chạy development server:
```bash
npm run dev
```

## Production Deployment

### 1. Build ứng dụng
```bash
npm run build
```

### 2. Apache Server

File `.htaccess` đã được tạo trong thư mục `public/`. Khi build, file này sẽ được copy vào thư mục `dist/`.

**Cách deploy:**
1. Upload toàn bộ nội dung thư mục `dist/` lên server
2. Đảm bảo Apache có module `mod_rewrite` được bật
3. File `.htaccess` sẽ tự động xử lý routing

### 3. Nginx Server

Sử dụng cấu hình trong file `nginx.conf`:

1. Copy nội dung file `nginx.conf` vào cấu hình Nginx của bạn
2. Thay đổi `server_name` và `root` path phù hợp
3. Reload Nginx: `sudo nginx -s reload`

### 4. Hosting Services

#### Vercel
Tạo file `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Netlify
Tạo file `public/_redirects`:
```
/*    /index.html   200
```

#### GitHub Pages
Tạo file `public/404.html` với nội dung giống `index.html`

## Kiểm tra

Sau khi deploy, kiểm tra:
1. Truy cập trang chủ: `https://your-domain.com/`
2. Truy cập route khác: `https://your-domain.com/about`
3. Refresh trang ở route khác - không được lỗi 404
4. Truy cập URL không tồn tại - hiển thị trang 404 custom

## Troubleshooting

### Vẫn gặp lỗi 404?
1. Kiểm tra server có hỗ trợ URL rewriting không
2. Đảm bảo file cấu hình (.htaccess, nginx.conf) được áp dụng đúng
3. Kiểm tra đường dẫn base URL trong router

### CSS/JS không load?
1. Kiểm tra đường dẫn tương đối/tuyệt đối
2. Đảm bảo static files được serve đúng cách
3. Kiểm tra CORS headers nếu cần

## Lưu ý

- File `.htaccess` chỉ hoạt động với Apache server
- Nginx cần cấu hình trong file config chính
- Một số hosting có thể cần cấu hình riêng
- Luôn test trên production environment trước khi go-live
