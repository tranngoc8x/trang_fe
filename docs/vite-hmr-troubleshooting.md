# Hướng Dẫn Sửa Lỗi Vite Không Tự Reload (HMR) Khi Sửa Code

Tài liệu này tổng hợp các nguyên nhân chính khiến Vite dev server không tự động reload/update (Hot Module Replacement - HMR) khi bạn chỉnh sửa file nguồn, cùng với cách khắc phục cho từng trường hợp.

---

## 1. Nguyên nhân 1: Hệ điều hành / Trình theo dõi file (File System Watcher) bị trễ hoặc bỏ sót event

### Mô tả
Vite sử dụng `chokidar` (dựa trên `fsevents` của macOS hoặc `inotify` của Linux) để theo dõi các sự kiện thay đổi file. Khi chạy trong một số môi trường (macOS với giới hạn file watcher, Docker, WSL, hoặc ổ đĩa mạng/folder được mount), các sự kiện lưu file không kích hoạt watcher của Node.js.

### Cách khắc phục
Thêm cấu hình `usePolling` vào `vite.config.js`:

```javascript
// vite.config.js
export default defineConfig({
  // ...
  server: {
    historyApiFallback: true,
    watch: {
      usePolling: true, // Kích hoạt cơ chế kiểm tra thay đổi theo chu kỳ
    },
  },
})
```

---

## 2. Nguyên nhân 2: Xuất file React Component bị vi phạm tắc React Fast Refresh (Mixed Exports)

### Mô tả
`@vitejs/plugin-react` sử dụng **React Fast Refresh**. Cơ chế này yêu cầu một file `.jsx`/`.tsx` **chỉ được phép export React Component**. 
Nếu một file `.jsx` xuất cả Component lẫn hàm helper, constants, hay custom hooks (ví dụ: `export const trackEvent = ...` trong file `GoogleAnalytics.jsx`), Fast Refresh sẽ không thể hot-reload an toàn cho file đó và có thể bị ngắt HMR boundary.

### Cách khắc phục
- Tách các hàm helper, constants, custom hooks ra file `.js` hoặc `.ts` độc lập trong thư mục `src/utils/`, `src/hooks/` hoặc `src/constants/`.
- File `.jsx` chỉ nên chứa và export React Component.

---

## 3. Nguyên nhân 3: Mất kết nối WebSocket HMR (Vite WS client)

### Mô tả
Vite gửi tín hiệu reload tới trình duyệt qua kết nối WebSocket (`ws://localhost:5173`). Nếu kết nối này bị gián đoạn (do cấu hình proxy, port bị xung đột, VPN, hoặc extension chặn WS), trình duyệt sẽ không nhận được thông báo thay đổi file.

### Kiểm tra & Khắc phục
1. Mở DevTools trên trình duyệt (F12) -> tab **Console** hoặc **Network (WS)**.
2. Kiểm tra xem có thông báo lỗi `[vite] connect failed` hoặc không thấy tin nhắn `[vite] hot updated` khi sửa code hay không.
3. Nếu dùng port custom hoặc proxy, cấu hình lại `server.hmr` trong `vite.config.js`:

```javascript
server: {
  hmr: {
    overlay: true, // Hiển thị khung thông báo lỗi HMR trên trang web
  }
}
```

---

## 4. Nguyên nhân 4: Vi phạm Case-Sensitivity trong Đường dẫn Import

### Mô tả
Hệ thống file mặc định trên macOS (APFS) không phân biệt chữ hoa/chữ thường (case-insensitive). 
Ví dụ: File tên `ClientsSection.jsx` nhưng đường dẫn import lại ghi `@components/clientsSection`. macOS vẫn load được file, nhưng module graph của Vite bị lệch tên dẫn đến file watcher không khớp được sự kiện file thay đổi với module trên trình duyệt.

### Cách khắc phục
Kiểm tra và sửa lại tất cả các câu lệnh `import` để khớp **chính xác 100% chữ hoa/chữ thường** với tên file thực tế.

---

## 5. Nguyên nhân 5: Cấu hình "Atomic Save" của Editor/IDE

### Mô tả
Một số Editor (như VS Code, WebStorm) có tính năng "atomic save" (viết dữ liệu ra file tạm rồi ghi đè file chính). Đôi khi việc này thay đổi inode của file làm file watcher mất vết.

### Cách khắc phục
- Bật `usePolling: true` như ở Nguyên nhân 1.
- Hoặc kiểm tra cài đặt "Safe Write" / "Atomic Save" trong IDE.
